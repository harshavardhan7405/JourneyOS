'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEED_REGISTRATIONS } from '@/lib/data/seed-data';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

export default function MyProgrammesClient() {
  const [registrations, setRegistrations] = useState<any[]>(SEED_REGISTRATIONS.slice(0, 2));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/registrations?page=1&limit=50')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setRegistrations(data.data);
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
            Active Enrollments
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            My Enrolled Expeditions
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Confirmed student expedition cohorts, syllabus materials, and departure milestones.
          </p>
        </div>

        <Link
          href="/programmes"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-xs"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          Explore Catalogue
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  {reg.programme?.destination_name ?? 'Field Expedition'}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    reg.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {reg.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                  {reg.programme?.title ?? 'Academic Expedition'}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Enrolled Scholar: <span className="font-semibold text-stone-800">{reg.student?.full_name ?? 'Leo Vance'}</span>
                </p>
              </div>

              <div className="rounded-xl bg-stone-50 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Expedition Window:</span>
                  <span className="font-medium text-stone-800">
                    {reg.programme?.start_date ? `${formatDateShort(reg.programme.start_date)} – ${formatDateShort(reg.programme.end_date)}` : 'Summer 2025'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Payment Status:</span>
                  <span className="font-semibold text-stone-900 capitalize">
                    {reg.payment_status === 'paid' ? 'Paid in Full' : '50% Balance Remaining'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-3">
              <Link
                href="/portal/itinerary"
                className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 hover:text-stone-950"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                View Field Itinerary
              </Link>
              <Link
                href="/portal/payments"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                Invoices & Receipts
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
