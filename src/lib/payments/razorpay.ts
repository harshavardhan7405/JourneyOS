import { createRazorpayClient as createClientInstance } from './payment-reconciliation';
import { createMockRazorpayClient, shouldUseMockRazorpay } from './mock-razorpay';

export const createRazorpayClient = () => {
  if (shouldUseMockRazorpay()) {
    return createMockRazorpayClient();
  }
  return createClientInstance();
};
