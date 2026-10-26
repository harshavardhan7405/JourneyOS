'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui';
import type { Announcement } from '@/db/types';

interface Props {
  userId: string | null;
}

export default function Announcements({ userId }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/announcements?user=${userId}`)
      .then((r) => r.json())
      .then((data) => {
        setAnnouncements(data.data ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading announcements...</div>;
  if (!announcements || announcements.length === 0) return <div className="py-8 text-center text-gray-500">No announcements.</div>;

  return (
    <div className="space-y-4">
      {announcements.map((ann: any, i: number) => (
        <div key={ann.id ?? i} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900">{ann.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{ann.content}</p>
          <p className="mt-2 text-xs text-gray-400">{new Date(ann.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
