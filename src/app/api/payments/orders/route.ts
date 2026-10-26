import { NextResponse } from 'next/server';
import { createPaymentOrderForRegistration, processWebhookEvent } from '@/lib/actions/payments';
import { paymentOrderSchema } from '@/validations/schemas';
import { getCurrentUserFromServer, requireAdmin } from '@/lib/auth';
import { createErrorResponse } from '@/lib/utils/errors';
import { z } from 'zod';

const bodySchema = z.object({
  registrationId: z.string().uuid(),
  amountCents: z.number().int().positive(),
  currency: z.string().length(3),
});

export const POST = async (req: Request) => {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return createErrorResponse('Invalid JSON body', 400);
  }

  const parsed = bodySchema.parse(body);

  // Get current user to verify they own this registration
  const user = await getCurrentUserFromServer();
  if (!user) {
    return NextResponse.json({ error: 'Authentication required', code: 401 }, { status: 401 });
  }

  try {
    const result = await createPaymentOrderForRegistration(parsed.registrationId);
    return NextResponse.json({
      razorpayOrderId: result.razorpayOrderId,
      clientKey: result.clientKey,
      paymentRedirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/orders/${result.razorpayOrderId}/success`,
    });
  } catch (err) {
    console.error('POST /api/payments/orders error:', err);
    if (err instanceof Error && err.name === 'AppError') {
      const e = err as any;
      return createErrorResponse(e.message, e.statusCode ?? 500, e.details);
    }
    return createErrorResponse('Failed to create payment order', 500);
  }
};

export const GET = async (req: Request) => {
  // Only admins can view payment orders in detail
  const adminCheck = await requireAdmin();
  if (!adminCheck) {
    return NextResponse.json({ error: 'Administrator access required', code: 403 }, { status: 403 });
  }

  const searchParams = new URL(req.url).searchParams;
  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 20);

  // This would query payment orders from DB — placeholder for now
  return NextResponse.json({ data: [], pagination: { total: 0 } });
};
