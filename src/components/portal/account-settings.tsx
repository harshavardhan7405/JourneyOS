'use client';

import { useEffect, useState } from 'react';
import { Badge, Button } from '@/components/ui';
import type { Profile } from '@/db/types';

interface Props {
  profile: Profile;
}

export default function AccountSettings({ profile }: Props) {
  const [displayName, setDisplayName] = useState(profile.full_name ?? '');
  const [email, setEmail] = useState(profile.email ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      // Call API to update profile
      await fetch('/api/auth/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: displayName }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>

        {error && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input id="full-name" type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" />
            <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
          </div>

          {saved && <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">Settings saved!</div>}

          <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Account Information</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Role</dt><dd className="capitalize">{profile.role}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Member since</dt><dd>{new Date(profile.created_at).toLocaleDateString()}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}
