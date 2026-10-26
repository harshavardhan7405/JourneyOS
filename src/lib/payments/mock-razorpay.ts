import { AppError } from '@/lib/utils/errors';

/**
 * Development-only mock Razorpay client.
 * Use this only in local development when real Razorpay credentials are unavailable.
 * NEVER use this in production — always prefer real credentials with proper configuration.
 *
 * The mock returns canned data that simulates successful payment creation and webhook
 * delivery. It does NOT actually process real payments. Always check process.env
 * for RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to determine which implementation
 * to use at runtime.
 */
export const createMockRazorpayClient = (): any => ({
  orders: {
    create: async (params: any) => {
      const orderId = `mock_order_${Date.now()}`;
      return {
        id: orderId,
        entity: {
          id: orderId,
          amount: params.amount,
          currency: params.currency || 'INR',
          status: 'created',
          notes: params.notes || {},
        },
      };
    },
  },
  webhooks: {
    verify: async () => ({ success: true }),
  },
});

/**
 * Determine whether we should use mock or real Razorpay.
 */
export const shouldUseMockRazorpay = (): boolean => {
  // In development with no real credentials, use mock
  return !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET;
};

/**
 * Wrap Razorpay operations with appropriate error handling.
 * In mock mode, this catches errors and converts to AppError.
 * In real mode, this simply passes through exceptions.
 */
export const withRazorpay = async <T>(fn: () => Promise<T> | T): Promise<T> => {
  if (shouldUseMockRazorpay()) {
    try {
      return await fn();
    } catch {
      throw new AppError(500, 'Payment processing error', 500);
    }
  }
  return await fn();
};
