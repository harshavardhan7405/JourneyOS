'use client';

import { useEffect, useState } from 'react';
import { Bell, Plus, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SEED_ANNOUNCEMENTS } from '@/lib/data/seed-data';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>(SEED_ANNOUNCEMENTS);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Logistics');
  const [priority, setPriority] = useState('normal');
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/announcements')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setAnnouncements(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn = {
      id: 'ann-' + Date.now(),
      title,
      content,
      category,
      priority,
      created_at: new Date().toISOString(),
    };
    setAnnouncements([newAnn, ...announcements]);
    setTitle('');
    setContent('');
    setShowForm(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Dispatches & Broadcasts
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Expedition Announcements & Emergency Alerts
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Broadcast urgent logistical advisories directly to parents and scholar mobile portals.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          {showForm ? 'Close Composer' : 'Broadcast New Dispatch'}
        </button>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Announcement broadcasted successfully to all enrolled guardians and scholars.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleBroadcast} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <h3 className="font-serif font-bold text-base text-stone-900">Compose Dispatch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Headline / Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Flight Departure Update for Santorini"
                className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                >
                  <option value="Logistics">Logistics</option>
                  <option value="Medical">Medical / Safety</option>
                  <option value="Academic">Academic Prep</option>
                  <option value="Emergency">Urgent Alert</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Message Content
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide exact instructions, meeting coordinates, or deadlines..."
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Send Broadcast Now
          </button>
        </form>
      )}

      <div className="space-y-4">
        {announcements.map((a, i) => (
          <div
            key={a.id ?? i}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    a.priority === 'urgent'
                      ? 'bg-red-100 text-red-800'
                      : a.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-700'
                  }`}
                >
                  {a.category ?? 'Dispatch'}
                </span>
                <h3 className="font-serif font-bold text-base text-stone-900">{a.title}</h3>
              </div>
              <span className="text-xs text-stone-400">
                {new Date(a.created_at || '2025-05-10T00:00:00Z').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
