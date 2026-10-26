'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, Plus, Edit3, Eye, Calendar, Users, DollarSign } from 'lucide-react';
import { SEED_PROGRAMMES } from '@/lib/data/seed-data';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';
import type { Programme } from '@/db/types';

export default function AdminProgrammesPage() {
  const [programmes, setProgrammes] = useState<any[]>(SEED_PROGRAMMES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/programmes?page=1&limit=50')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setProgrammes(data.data);
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
            Curriculum Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Expedition Programme Management
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Configure academic field programmes, tuition pricing, age gates, and seat availability.
          </p>
        </div>

        <Link
          href="/admin/programmes/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Create New Programme
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Expedition Title & Destination</th>
                <th className="py-3.5 px-4">Duration & Age</th>
                <th className="py-3.5 px-4">Tuition</th>
                <th className="py-3.5 px-4">Capacity</th>
                <th className="py-3.5 px-4">Expedition Dates</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {programmes.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-serif font-bold text-stone-900 text-sm">{p.title}</div>
                    <div className="text-stone-500 text-[11px] mt-0.5">{p.destination_name}</div>
                  </td>
                  <td className="py-4 px-4 text-stone-700 font-medium">
                    <div>{p.duration_weeks} Weeks</div>
                    <div className="text-stone-400 text-[11px]">Ages {p.age_min}–{p.age_max}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-stone-900">
                    {formatCurrency(p.price_cents, p.currency)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-semibold text-[11px]">
                      {p.availability} seats left
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    {formatDateShort(p.start_date)} – {formatDateShort(p.end_date)}
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <Link
                      href={`/programmes/${p.id}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-md border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 text-[11px] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3 text-stone-500" />
                      Public View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
