import type { Database } from '@/db/types';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppError } from '@/lib/utils/errors';

/**
 * Create a Razorpay client instance.
 * Only created in server-side contexts — never in the browser.
 */
export const createRazorpayClient = async (): Promise<any> => {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured');
  }

  const Razorpay = (await import('razorpay')).default;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

/**
 * Verify webhook signature using SHA256 HMAC.
 * This is the authoritative check — never trust unverified callbacks.
 */
export const verifyPaymentSignature = async (
  orderId: string,
  paymentId: string,
  currencyCode: string,
  amount: number,
  invoiceId: string,
  status: string,
  signature: string,
  webhookSecret: string
): Promise<boolean> => {
  try {
    const crypto = await import('crypto');
    const payload = `${orderId}:${paymentId}:${currencyCode}:${amount}:${invoiceId}:${status}`;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    // Use constant-time comparison to prevent timing attacks
    if (expectedSignature.length !== signature.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < expectedSignature.length; i++) {
      result |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return result === 0;
  } catch {
    return false;
  }
};

/**
 * Reconcile a payment order against the database.
 * Idempotent — safe to call multiple times for the same event.
 */
export const reconcilePaymentOrder = async (
  orderId: string,
  updates: {
    razorpayOrderId: string;
    razorpayPaymentId: string | null;
    razorpaySignature: string | null;
    status: string;
  }
): Promise<boolean> => {
  const client = getSupabaseService();

  // Check if this order already has a successful payment
  const existing = await client
    .from('payment_orders')
    .select('id, status')
    .eq('razorpay_order_id', updates.razorpayOrderId)
    .maybeSingle();

  if (!existing || !existing.data) return false;

  if (existing.data.status === 'paid') {
    // Already processed — idempotency
    console.log(`Payment order ${updates.razorpayOrderId} already processed`);
    return true;
  }

  // Check if this exact razorpay payment ID has already been recorded
  if (updates.razorpayPaymentId) {
    const existingPayment = await client
      .from('payment_orders')
      .select('id')
      .eq('razorpay_payment_id', updates.razorpayPaymentId);

    if (existingPayment.data?.length) {
      console.log(`Payment ${updates.razorpayPaymentId} already recorded`);
      return true; // Idempotency
    }
  }

  const { data: updatedData, error } = await client
    .from('payment_orders')
    .update({
      status: updates.status as 'pending' | 'paid' | 'failed' | 'refunded',
      razorpay_payment_id: updates.razorpayPaymentId,
      razorpay_signature: updates.razorpaySignature,
    })
    .eq('id', existing.data.id)
    .select()
    .single();

  if (error) {
    console.error('Payment reconciliation failed:', error);
    return false;
  }

  // Update related registrations
  if (updatedData && updatedData.registration_id) {
    await reconcileRegistration(updatedData.registration_id, {
      razorpayPaymentId: updates.razorpayPaymentId ?? undefined,
      razorpaySignature: updates.razorpaySignature ?? undefined,
    });
  }

  return true;
};

/**
 * Reconcile a registration's payment status based on payment order state.
 */
export const reconcileRegistration = async (
  registrationId: string,
  paymentUpdates?: { razorpayPaymentId?: string; razorpaySignature?: string }
): Promise<void> => {
  const client = getSupabaseService();

  const regResult = await client
    .from('registrations')
    .select('id, payment_status, razorpay_order_id, razorpay_payment_id, razorpay_signature')
    .eq('id', registrationId);

  const registration = regResult.data?.[0];
  if (!registration) return;

  const orderId = registration.razorpay_order_id;
  const paymentId = paymentUpdates?.razorpayPaymentId ?? registration.razorpay_payment_id;
  const sig = paymentUpdates?.razorpaySignature ?? registration.razorpay_signature;

  let newStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  switch (orderId) {
    case 'pending':
    case 'failed':
      newStatus = 'pending';
      break;
    case 'paid':
    default:
      newStatus = 'paid';
      break;
  }

  await client
    .from('registrations')
    .update({
      payment_status: newStatus,
      razorpay_payment_id: paymentId,
      razorpay_signature: sig,
    })
    .eq('id', registrationId);
};

export const createPaymentOrder = async (data: {
  userId: string;
  registrationId?: string | null;
  amountCents: number;
  currency: string;
  razorpayOrderId: string;
}) => {
  const client = getSupabaseService();
  return await client.from('payment_orders').insert({
    user_id: data.userId,
    registration_id: data.registrationId ?? null,
    amount_cents: data.amountCents,
    currency: data.currency,
    status: 'pending',
    razorpay_order_id: data.razorpayOrderId,
    attempts: 1,
  }).select().single();
};

let supabaseServiceClient: SupabaseClient<Database> | null = null;

export const getSupabaseService = (): SupabaseClient<Database> => {
  if (!supabaseServiceClient) {
    supabaseServiceClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return supabaseServiceClient;
};

export { AppError };
