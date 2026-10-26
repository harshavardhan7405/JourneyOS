import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/db/types';

let serviceClient: SupabaseClient<Database> | null = null;

export const getSupabaseServiceClient = (): SupabaseClient<Database> => {
  if (!serviceClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key';

    serviceClient = createClient<Database>(
      url,
      key,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  return serviceClient;
};

/**
 * WARNING: This client bypasses Row-Level Security.
 * Only use in server-side API routes and Server Actions where you have
 * explicitly verified authorization before performing operations.
 * Never expose this client to browser code.
 */
