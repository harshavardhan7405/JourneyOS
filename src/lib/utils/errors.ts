import { z } from 'zod';
import { createNextResponseFromClient } from '@/lib/utils/test-helpers';

// Error Response Schema — code is REQUIRED so malformed responses are rejected
export const errorResponseSchema = z.object({
  error: z.string().min(1),
  code: z.number().int().min(100).max(599),
  details: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Custom application error class with status code and optional details.
 */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: number,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Create a JSON error response with proper HTTP status code.
 * Never expose internal stack traces or database details.
 */
export const createErrorResponse = (
  error: string,
  code?: number,
  details?: Record<string, unknown>
) => {
  const status = typeof code === 'number' ? (code >= 400 && code < 600 ? code : 500) : 500;
  return createNextResponseFromClient({
    body: {
      error,
      code,
      details,
    },
    status,
  });
};
