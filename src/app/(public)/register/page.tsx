'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, CheckCircle2, User, GraduationCap, ArrowRight } from 'lucide-react';
import { supabaseBrowserClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'student'>('parent');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabaseBrowserClient.auth.signUp({
        email,
        password,
        options: { data: { full_name: name, role } },
      });

      if (authError) {
        // Fallback for local demo mode without active remote Supabase connection
        if (authError.message?.includes('FetchError') || authError.message?.includes('Failed to fetch') || authError.message?.includes('placeholder')) {
          // Log into demo mode directly
          await fetch('/api/auth/demo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role }),
          });
          setSuccess(true);
          return;
        }
        setError(authError.message || 'Registration failed.');
        return;
      }

      if (data.user) {
        setSuccess(true);
      }
    } catch {
      setError('An unexpected error occurred during account creation.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-stone-200 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Welcome to JourneyOS!
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Your profile has been created. You can now explore programme bookings and manage expedition documents.
            </p>
          </div>
          <button
            onClick={() => router.push('/portal')}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors shadow-md"
          >
            Enter Student & Parent Portal
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-stone-200">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-900 text-amber-400 mb-2 shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">
            Create an Account
          </h1>
          <p className="text-sm text-stone-600">
            Join JourneyOS to enroll in accredited global educational journeys
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              I am registering as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === 'parent'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Parent / Guardian
              </button>

              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  role === 'student'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                Student
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Full Legal Name
            </label>
            <input
              id="name"
              type="text"
              required
              minLength={2}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Jane Smith"
            />
          </div>

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
              placeholder="you@domain.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Password (min. 8 characters)
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-800 transition-colors shadow-md disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-semibold text-amber-700 hover:text-amber-800 underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
