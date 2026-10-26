import { NextResponse } from 'next/server';

/**
 * Test helper that creates a NextResponse without needing the full Next.js runtime.
 * This is used in unit tests where we want to verify error response shapes
 * without spinning up the entire application.
 */
export const createNextResponseFromClient = (options: {
  body: unknown;
  status?: number;
}) => {
  return new NextResponse(JSON.stringify(options.body), {
    status: options.status ?? 500,
    headers: { 'Content-Type': 'application/json' },
  });
};
