'use client';

import { useEffect, useState } from 'react';
import AccountSettings from '@/components/portal/account-settings';
import { DEMO_USERS } from '@/lib/auth/constants';
import type { Profile } from '@/db/types';

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>(DEMO_USERS.parent as Profile);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setProfile(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
          Profile & Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          Guardian & Scholar Profile Settings
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
          Update primary communication contact, passport information, and medical emergency delegates.
        </p>
      </div>

      <AccountSettings profile={profile} />
    </div>
  );
}
