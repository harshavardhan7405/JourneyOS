import { describe, it, expect, beforeEach } from 'vitest';
import { verifyPaymentSignature } from '@/lib/payments/payment-reconciliation';
import { createMockRazorpayClient, shouldUseMockRazorpay, withRazorpay } from '@/lib/payments/mock-razorpay';
import { generateDevWebhookSecret } from '@/lib/utils/dev-keys';
import crypto from 'crypto';

describe('verifyPaymentSignature', () => {
  const validData = 'order123:pay123:USD:500000:INV-123:PAID';
  const invalidSig = 'a'.repeat(64); // Wrong signature
  const correctSig = crypto.createHmac('sha256', 'test_secret_12345').update(validData).digest('hex');

  beforeEach(() => {
    process.env.RAZORPAY_WEBHOOK_SECRET = 'test_secret_12345';
  });

  it('should return true for correct signature', async () => {
    const result = await verifyPaymentSignature('order123', 'pay123', 'USD', 500000, 'INV-123', 'PAID', correctSig, process.env.RAZORPAY_WEBHOOK_SECRET!);
    expect(result).toBe(true);
  });

  it('should return false for wrong signature', async () => {
    const result = await verifyPaymentSignature('order123', 'pay123', 'USD', 500000, 'INV-123', 'PAID', invalidSig, process.env.RAZORPAY_WEBHOOK_SECRET!);
    expect(result).toBe(false);
  });

  it('should return false when RAZORPAY_WEBHOOK_SECRET is not set', async () => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
    const sig = await verifyPaymentSignature('order123', 'pay123', 'USD', 500000, 'INV-123', 'PAID', '', '');
    expect(sig).toBe(false);
  });

  it('should be case-sensitive', async () => {
    // Compute with wrong case (lowercase secret)
    const wrongCaseSig = crypto.createHmac('sha256', 'testsecret_12345').update(validData).digest('hex');
    const result = await verifyPaymentSignature('order123', 'pay123', 'USD', 500000, 'INV-123', 'PAID', wrongCaseSig, process.env.RAZORPAY_WEBHOOK_SECRET!);
    expect(result).toBe(false);
  });
});

describe('shouldUseMockRazorpay', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
    delete process.env.RAZORPAY_WEBHOOK_SECRET;
  });

  it('should return true when no Razorpay credentials are configured', () => {
    expect(shouldUseMockRazorpay()).toBe(true);
  });

  it('should return false when both public and service keys are set', () => {
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'test_key';
    process.env.RAZORPAY_KEY_SECRET = 'test_secret';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook_secret';
    expect(shouldUseMockRazorpay()).toBe(false);
  });

  it('should return true if only public key is missing but secret exists', () => {
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = '';
    process.env.RAZORPAY_KEY_SECRET = 'test_secret';
    expect(shouldUseMockRazorpay()).toBe(true);
  });
});

describe('withRazorpay', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;
  });

  it('should call the function in mock mode and return its result', async () => {
    const mockResult = await withRazorpay(async () => ({ id: 'mock_result' }));
    expect(mockResult).toEqual({ id: 'mock_result' });
  });

  it('should throw AppError on exception in mock mode', async () => {
    await expect(withRazorpay(async () => { throw new Error('DB error'); })).rejects.toMatchObject({ message: 'Payment processing error', statusCode: 500 });
  });

  it('should pass through real errors without wrapping in mock mode', async () => {
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'real_key';
    process.env.RAZORPAY_KEY_SECRET = 'real_secret';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook_secret';
    await expect(withRazorpay(async () => { throw new Error('Original DB error'); })).rejects.toThrow('Original DB error');
  });

  it('should allow successful calls in real mode', async () => {
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'real_key';
    process.env.RAZORPAY_KEY_SECRET = 'real_secret';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'webhook_secret';
    const result = await withRazorpay(async () => ({ id: 'real_mock' }));
    expect(result).toEqual({ id: 'real_mock' });
  });
});

describe('createMockRazorpayClient', () => {
  it('should create a mock client with orders.create and webhooks.verify', async () => {
    const mock = createMockRazorpayClient();
    const orderResult = await mock.orders.create({ amount: 500000, currency: 'USD', type: 'ONETIME' });
    expect(orderResult.id).toBeDefined();
    expect(orderResult.entity.status).toBe('created');

    const webhookResult = await mock.webhooks.verify('payload', 'sig', 'secret');
    expect(webhookResult.success).toBe(true);
  });
});

describe('generateDevWebhookSecret', () => {
  it('should generate a non-empty string starting with whsec_dev_', () => {
    const secret = generateDevWebhookSecret();
    expect(typeof secret).toBe('string');
    expect(secret.startsWith('whsec_dev_')).toBe(true);
    expect(secret.length).toBeGreaterThan(20);
  });

  it('should produce different secrets each time (uniqueness)', () => {
    const s1 = generateDevWebhookSecret();
    const s2 = generateDevWebhookSecret();
    expect(s1).not.toBe(s2);
  });
});
