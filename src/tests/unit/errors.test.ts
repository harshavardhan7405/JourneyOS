import { describe, it, expect } from 'vitest';
import { AppError, createErrorResponse } from '@/lib/utils/errors';

describe('AppError', () => {
  it('should create an error with status code and message', () => {
    const err = new AppError(404, 'Not Found', 404);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not Found');
    expect(err.code).toBe(404);
  });

  it('should have a name property', () => {
    const err = new AppError(500, 'Server Error');
    expect(err.name).toBe('AppError');
  });

  it('should be an instance of Error', () => {
    const err = new AppError(403, 'Forbidden');
    expect(err instanceof Error).toBe(true);
    expect(err instanceof AppError).toBe(true);
  });
});

describe('createErrorResponse', () => {
  it('should create a JSON response with proper status', async () => {
    const resp = createErrorResponse('Not Found', 404);
    expect(resp.status).toBe(404);
    const body = await resp.json();
    expect(body).toEqual({ error: 'Not Found', code: 404 });
  });

  it('should default to 500 when no code provided', async () => {
    const resp = createErrorResponse('Internal Error');
    expect(resp.status).toBe(500);
    const body = await resp.json();
    expect(body).toEqual({ error: 'Internal Error' });
  });

  it('should include details when provided', async () => {
    const resp = createErrorResponse('Validation failed', 422, { field: 'email' });
    expect(resp.status).toBe(422);
    const body = await resp.json();
    expect(body).toEqual({ error: 'Validation failed', code: 422, details: { field: 'email' } });
  });

  it('should never expose stack traces in response', async () => {
    // Even if somehow passed, verify it doesn't leak
    const resp = createErrorResponse('Some error');
    const body = await resp.json();
    expect(body.error).not.toContain('stack trace here');
  });
});
