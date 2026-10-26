import { getSupabaseServiceClient } from '@/lib/supabase/service';
import type { Database } from '@/db/types';
import { AppError } from '@/lib/utils/errors';
import { createRazorpayClient } from '@/lib/payments/razorpay';
import { createPaymentOrder, verifyPaymentSignature, reconcilePaymentOrder, reconcileRegistration } from '@/lib/payments/payment-reconciliation';

const client = () => getSupabaseServiceClient();

/**
 * Create a payment order for a registration.
 * Returns a Razorpay order ID and the redirect URL to client.
 */
export const createPaymentOrderForRegistration = async (registrationId: string) => {
  // Fetch the registration details first
  const regResult = await client()
    .from('registrations')
    .select('id, amount_cents, currency, user_id')
    .eq('id', registrationId);

  if (!regResult.data?.length) {
    throw new AppError(404, 'Registration not found', 404);
  }

  const registration = regResult.data[0] as any;
  const currency = registration.currency;
  const amountCents = registration.amount_cents;

  // Create Razorpay order on the server — never trust the browser
  const razorpayClient = createRazorpayClient();

  try {
    const order = await razorpayClient.orders.create({
      amount: amountCents,
      currency,
      type: 'ONETIME',
      receipt: registrationId,
      notes: {
        'registration-id': registrationId,
      },
    });

    // Save the order ID to the payment_orders table
    await client()
      .from('payment_orders')
      .insert({
        user_id: registration.user_id,
        registration_id: registrationId,
        amount_cents: amountCents,
        currency,
        status: 'pending',
        razorpay_order_id: order.id,
        razorpay_payment_id: null,
        razorpay_signature: null,
        attempts: 0,
      });

    // Update registration with razorpay references
    await client()
      .from('registrations')
      .update({
        razorpay_order_id: order.id,
        razorpay_payment_id: null,
        razorpay_signature: null,
      })
      .eq('id', registrationId);

    return {
      razorpayOrderId: order.id,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      clientKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    };
  } catch (err) {
    console.error('Payment order creation failed:', err);
    throw new AppError(500, 'Failed to create payment order', 500);
  }
};

/**
 * Handle webhook processing — idempotent by design.
 * Verifies signature, processes payment, updates records, returns idempotency key.
 */
export const processWebhookEvent = async (event: {
  payload?: string;
  signature?: string;
}): Promise<{ alreadyProcessed: boolean }> => {
  const payload = event.payload ?? '';
  const signature = event.signature ?? '';

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    throw new AppError(500, 'Webhook secret not configured', 500);
  }

  const razorpayClient = createRazorpayClient();
  try {
    // Verify the webhook signature — never trust unverified callbacks
    const verified = await razorpayClient.webhooks.verify(payload, signature, process.env.RAZORPAY_WEBHOOK_SECRET!);
    if (!verified.success) {
      console.warn('Webhook signature verification failed');
      return { alreadyProcessed: false };
    }
  } catch (err) {
    console.error('Webhook verification error:', err);
    throw new AppError(400, 'Webhook verification failed', 400);
  }

  // Parse the notification
  let notification;
  try {
    notification = JSON.parse(payload);
  } catch {
    throw new AppError(400, 'Invalid webhook payload', 400);
  }

  // IDempotency check: if payment_id or order_id already exists as paid, skip
  if (notification.payment.entity && notification.payment.entity.id) {
    const existingPaid = await client()
      .from('payment_orders')
      .select('id')
      .eq('razorpay_payment_id', notification.payment.entity.id)
      .eq('status', 'paid');

    if (existingPaid.data?.length) {
      return { alreadyProcessed: true };
    }
  }

  // Find matching payment_orders and registrations
  const paymentOrders = await client()
    .from('payment_orders')
    .select('id, razorpay_order_id')
    .in('razorpay_order_id', [
      notification.payload?.order?.id ?? '',
      ...(notification.payload?.current_order?.id ? [notification.payload.current_order.id] : []),
    ]);

  // Match by order ID
  const orderId = notification.payload?.order?.id ?? notification.payload?.current_order?.id;
  if (!orderId || !paymentOrders.data) {
    return { alreadyProcessed: true }; // Can't do anything without an order reference
  }

  const matchedOrders = paymentOrders.data.filter((po: any) => po.razorpay_order_id === orderId);
  if (matchedOrders.length === 0) {
    // Order not found in our DB, skip silently
    return { alreadyProcessed: true };
  }

  const paymentOrderId = (matchedOrders[0] as any).id;

  // Verify signature for the specific order
  const orderData = await client()
    .from('payment_orders')
    .select('*')
    .eq('id', paymentOrderId);

  const po = orderData.data?.[0];
  if (!po) {
    return { alreadyProcessed: true };
  }

  try {
    const verifyResult = await verifyPaymentSignature(
      notification.payload?.order?.id ?? notification.payload?.current_order?.id,
      notification.payload?.payment?.entity?.id,
      notification.payload?.payment?.entity?.currency_code,
      notification.payload?.payment?.entity?.amount,
      notification.payload?.payment?.entity?.invoice_id,
      notification.payload?.payment?.entity?.status,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET!
    );

    if (!verifyResult) {
      console.warn(`Payment signature verification failed for order ${orderId}`);
      return { alreadyProcessed: false };
    }
  } catch (err) {
    console.error('Signature verification error:', err);
    return { alreadyProcessed: false };
  }

  // Process payment reconciliation — idempotent
  const success = await reconcilePaymentOrder(paymentOrderId, {
    razorpayOrderId: orderId,
    razorpayPaymentId: notification.payload?.payment?.entity?.id ?? null,
    razorpaySignature: signature,
    status: notification.payload?.payment?.entity?.status as string,
  });

  if (success) {
    // Also reconcile the registration
    await reconcileRegistration(paymentOrderId);
  }

  return { alreadyProcessed: true };
};
