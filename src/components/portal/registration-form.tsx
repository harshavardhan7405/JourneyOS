'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui';
import Link from 'next/link';
import type { Programme } from '@/db/types';

interface Props {
  programmeId: string;
  userId?: string;
}

export default function RegistrationForm({ programmeId, userId }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [regDate, setRegDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Call API to create registration
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programmeId, studentId: userId ?? '', name, email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Registration failed');
      }
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) return <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center text-green-800">Registration submitted! Check your email for next steps.</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
      </div>

      <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Register'}</Button>
    </form>
  );
}
