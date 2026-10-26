'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Compass, ShieldCheck, User, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { supabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabaseBrowserClient.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || 'Invalid email or password.');
        return;
      }

      if (data.user) {
        router.push(returnTo || '/portal');
        router.refresh();
      }
    } catch {
      setError('An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async (role: 'parent' | 'student' | 'admin') => {
    setDemoLoading(role);
    setError(null);

    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        throw new Error('Failed to create demo session');
      }

      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push(returnTo || '/portal');
      }
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Demo login failed';
      setError(msg);
    } finally {
      setDemoLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-stone-200">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-900 text-amber-400 mb-2 shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Welcome to Journey<span className="text-amber-600 font-sans font-light">OS</span>
          </h1>
          <p className="text-sm text-stone-600">
            Sign in to access your parent, student, or administrative portal
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 1-Click Demo Showcase (Essential for local testing) */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            1-Click Interactive Demo Access
          </div>
          <p className="text-xs text-stone-500">
            Explore the authenticated portals immediately without manual registration:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              type="button"
              disabled={!!demoLoading}
              onClick={() => handleDemoSignIn('parent')}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-left hover:border-stone-900 hover:shadow-sm transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Parent Experience</div>
                  <div className="text-stone-500 text-[11px]">Manage registered students & payments</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              type="button"
              disabled={!!demoLoading}
              onClick={() => handleDemoSignIn('student')}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white border border-stone-300 text-left hover:border-stone-900 hover:shadow-sm transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-stone-900">Student Portal</div>
                  <div className="text-stone-500 text-[11px]">View daily itinerary & announcements</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              type="button"
              disabled={!!demoLoading}
              onClick={() => handleDemoSignIn('admin')}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-stone-900 text-white text-left hover:bg-stone-800 transition-all text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-stone-800 text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Administrator Dashboard</div>
                  <div className="text-stone-400 text-[11px]">Manage expeditions, pricing & audits</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-stone-400 font-semibold">
            Or Sign In With Password
          </span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-500">
          Need to enroll a new student?{' '}
          <Link href="/register" className="font-semibold text-amber-700 hover:text-amber-800 underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
