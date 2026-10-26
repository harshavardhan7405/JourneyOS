'use client';

import { useEffect, useState } from 'react';
import { Bell, AlertTriangle, FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { SEED_ANNOUNCEMENTS } from '@/lib/data/seed-data';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>(SEED_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/announcements?user=me')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setAnnouncements(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Field Communications
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Expedition Dispatches & Notices
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Real-time advisories, flight coordination updates, and academic prep guides.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
          <Bell className="w-4 h-4 text-amber-600" />
          <span>{announcements.length} Total Dispatches</span>
        </div>
      </div>

      <div className="space-y-4">
        {announcements.map((a: any, i: number) => {
          const isUrgent = a.priority === 'urgent' || a.priority === 'high';
          return (
            <div
              key={a.id ?? i}
              className={`rounded-2xl border p-6 transition-all shadow-xs ${
                isUrgent
                  ? 'border-amber-300 bg-amber-50/50'
                  : 'border-stone-200 bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2.5">
                  {isUrgent ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800">
                      Priority Action
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700">
                      {a.category ?? 'Dispatch'}
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {a.title}
                  </h3>
                </div>

                <span className="text-xs text-stone-400">
                  {new Date(a.created_at || '2025-05-10T00:00:00Z').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                {a.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
