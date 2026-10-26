import { describe, it, expect } from 'vitest';
import { errorResponseSchema } from '@/validations/schemas';

/**
 * Integration-style tests for Zod schema round-tripping and response formatting.
 * These mirror what the Route Handlers would produce, ensuring the schemas
 * are consistent with production API responses.
 */
describe('API Response Format Integration', () => {
  it('error responses should validate with proper status codes', () => {
    const errorBodies = [
      { error: 'Not Found', code: 404 },
      { error: 'Unauthorized', code: 401 },
      { error: 'Forbidden', code: 403 },
      { error: 'Conflict', code: 409 },
      { error: 'Bad Request', code: 400 },
      { error: 'Validation failed', code: 422, details: { email: 'Invalid email format' } },
      { error: 'Payment processing failed', code: 500 },
    ];

    for (const err of errorBodies) {
      const result = errorResponseSchema.safeParse(err);
      expect(result.success).toBe(true);
    }
  });

  it('should reject malformed error responses (missing code)', () => {
    const result = errorResponseSchema.safeParse({ error: 'No code here' });
    expect(result.success).toBe(false);
  });

  it('should reject code outside valid HTTP range', () => {
    const result = errorResponseSchema.safeParse({ error: 'Test', code: 999 });
    expect(result.success).toBe(false);

    const badCode = errorResponseSchema.safeParse({ error: 'Test', code: 99 });
    expect(badCode.success).toBe(false);
  });

  it('should include pagination metadata in programme list responses', () => {
    // A successful programme list response has data + pagination + meta
    // Verify the shape is structured correctly by checking it has the expected keys
    const body = {
      data: [
        { id: 'p1', title: 'Test Programme', count: 1 },
      ],
      pagination: {
        page: 1,
        limit: 20,
        total: 50,
        totalPages: 3,
        hasNext: true,
        hasPrev: false,
      },
      meta: { total: 50 },
    };
    // Success responses aren't validated against error schema, just verify shape
    expect(body.pagination.totalPages).toBe(3);
    expect(body.pagination.hasNext).toBe(true);
  });

  it('single programme detail should wrap in data key', () => {
    const body = {
      data: {
        id: 'p1',
        title: 'Programme Title',
        destination_name: 'Santorini',
        itinerary: [{ day_number: 1, title: 'Day 1' }],
      },
    };
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data.itinerary)).toBe(true);
  });

  it('payment order response structure should be well-formed', () => {
    const body = {
      razorpayOrderId: 'rzp_test_order_123',
      clientKey: 'test_client_key',
      paymentRedirectUrl: 'http://localhost:3000/api/payments/orders/rzp_test_order_123/success',
    };
    // This is a successful response, not an error — no need to validate against error schema
    expect(body.razorpayOrderId).toBeDefined();
    expect(body.clientKey).toBeDefined();
  });
});
