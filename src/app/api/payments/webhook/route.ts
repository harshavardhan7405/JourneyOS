import { NextResponse } from 'next/server';
import { processWebhookEvent } from '@/lib/actions/payments';
import { createErrorResponse } from '@/lib/utils/errors';

/**
 * Razorpay webhook endpoint.
 *
 * IMPORTANT: This endpoint receives raw webhooks from Razorpay.
 * - It MUST verify the signature before processing anything.
 * - It MUST be idempotent — processing the same event twice must be safe.
 * - It NEVER trusts client-reported success — only server-side webhook data.
 * - The raw body is required for signature verification.
 *
 * Security: The webhook secret is never exposed to the browser.
 * Webhook verification uses HMAC-SHA256 computed over the raw payload.
 */
export const POST = async (req: Request) => {
  const requestHeaders = new Headers(req.headers);
  const signature = requestHeaders.get('x-razorpay-signature') ?? '';
  const payload = await req.arrayBuffer();

  // Convert buffer to string for signature verification
  const payloadStr = Buffer.from(payload).toString('utf8');

  let result;
  try {
    result = await processWebhookEvent({
      payload: payloadStr,
      signature,
    });
  } catch (err) {
    console.error('Webhook processing error:', err);
    if (err instanceof Error && err.name === 'AppError') {
      const e = err as any;
      return createErrorResponse(e.message, e.statusCode ?? 400);
    }
    return createErrorResponse('Webhook processing failed', 400);
  }

  // Always return 200 — idempotency means reprocessing is safe
  return NextResponse.json({ received: true, alreadyProcessed: result?.alreadyProcessed ?? true });
};
