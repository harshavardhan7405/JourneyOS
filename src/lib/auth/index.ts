import type { Database, Profile } from '@/db/types';
import { createBrowserClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { DEMO_USERS } from './constants';

export { DEMO_USERS };

/**
 * Get the current authenticated user from browser context.
 * Returns null if not signed in.
 */
export const getCurrentUser = async (): Promise<Profile | null> => {
  if (typeof window === 'undefined') {
    return getCurrentUserFromServer();
  }

  // Check client-side cookie for demo user
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/(^|;)\s*journeyos_demo_user=([^;]+)/);
    if (match) {
      try {
        const decoded = decodeURIComponent(match[2]);
        const user = JSON.parse(decoded);
        if (user && user.role) return user as Profile;
      } catch {}
    }
  }

  try {
    const supabase = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return profile ?? null;
  } catch {
    return null;
  }
};

/**
 * Extract the signed-in user from server cookies for server-side checks.
 * Checks for demo user session cookie first, falling back to Supabase auth.
 */
export const getCurrentUserFromServer = async (): Promise<Profile | null> => {
  if (typeof window !== 'undefined') {
    return getCurrentUser();
  }

  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const demoCookie = cookieStore.get('journeyos_demo_user');
    if (demoCookie?.value) {
      try {
        const user = JSON.parse(decodeURIComponent(demoCookie.value));
        if (user && user.role) return user as Profile;
      } catch {}
    }

    const { createSupabaseServerClient } = await import('@/lib/supabase/server');
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    return profile ?? null;
  } catch {
    return null;
  }
};

/**
 * Check if current user is an admin.
 */
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUserFromServer();
  return user?.role === 'admin';
};

/**
 * Check if current user is a parent or student.
 */
export const isCurrentUserParentOrStudent = async (): Promise<boolean> => {
  const user = await getCurrentUserFromServer();
  return user?.role === 'parent' || user?.role === 'student';
};

/**
 * Guard helper for Server Components.
 */
export const requireAuth = async (): Promise<{ user: Profile } | null> => {
  const user = await getCurrentUserFromServer();
  if (!user) return null;
  return { user };
};

/**
 * Guard that requires admin access.
 */
export const requireAdmin = async (): Promise<{ user: Profile } | null> => {
  const auth = await requireAuth();
  if (!auth) return null;
  if (auth.user.role !== 'admin') return null;
  return auth;
};

/**
 * Redirect to sign-in page if not authenticated.
 */
export const redirectIfNotAuthenticated = async (returnTo?: string): Promise<NextResponse> => {
  const user = await getCurrentUserFromServer();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  if (!user) {
    return NextResponse.redirect(new URL(`/sign-in?returnTo=${encodeURIComponent(returnTo ?? '')}`, appUrl));
  }
  return NextResponse.next();
};
