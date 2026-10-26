import '@testing-library/jest-dom/vitest';

// Set test environment variables
(process.env as Record<string, string | undefined>).NODE_ENV = 'test';
process.env.NEXT_PUBLIC_SUPABASE_URL = '';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = '';
process.env.SUPABASE_SERVICE_ROLE_KEY = '';
process.env.RAZORPAY_WEBHOOK_SECRET = 'test_webhook_secret';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
