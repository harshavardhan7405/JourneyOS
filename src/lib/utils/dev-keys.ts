import { randomBytes, createHmac } from 'crypto';

/**
 * Generate a development-only webhook secret for local testing.
 * This simulates what Razorpay would provide in test mode.
 * NEVER use this in production — the real RAZORPAY_WEBHOOK_SECRET must be set.
 */
export const generateDevWebhookSecret = (): string => {
  return `whsec_dev_${randomBytes(24).toString('hex')}`;
};

/**
 * Create a development Razorpay-style test key pair for offline testing.
 * This is only for unit tests and development mocking.
 */
export const generateDevSignature = (data: string): string => {
  const secret = process.env.RAZORPAY_DEV_SECRET ?? 'dev_secret_test_only';
  return createHmac('sha256', secret).update(data).digest('hex');
};
