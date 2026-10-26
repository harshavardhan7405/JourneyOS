'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { SEED_REGISTRATIONS } from '@/lib/data/seed-data';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>(SEED_REGISTRATIONS);
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
            Official Documentation
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Student Enrollment Records
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Verified admissions, legal consent filings, and passport clearance records.
          </p>
        </div>

        <Link
          href="/portal/payments"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors shadow-xs"
        >
          View Tuition Receipts
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </Link>
      </div>

      <div className="space-y-4">
        {registrations.map((reg: any, i: number) => (
          <div
            key={reg.id ?? i}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    reg.status === 'confirmed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {reg.status === 'confirmed' ? 'Admissions Confirmed' : 'Verification In Progress'}
                </span>
                <span className="text-xs text-stone-400">• Application #{reg.id}</span>
              </div>

              <h3 className="font-serif font-bold text-lg text-stone-900">
                {reg.programme?.title ?? 'Educational Expedition'}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                <div>
                  Enrolled Scholar: <span className="font-semibold text-stone-800">{reg.student?.full_name ?? 'Leo Vance'}</span>
                </div>
                <div>
                  Registered Guardian: <span className="font-semibold text-stone-800">{reg.guardian?.full_name ?? 'Eleanor Vance'}</span>
                </div>
                <div>
                  Destination: <span className="font-semibold text-stone-800">{reg.programme?.destination_name ?? 'Aegean Caldera'}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-stone-100 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-stone-400 block uppercase">Tuition Fee</span>
                <span className="text-base font-bold font-serif text-stone-900">
                  {formatCurrency(reg.programme?.price_cents ?? 480000, reg.programme?.currency ?? 'USD')}
                </span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  reg.payment_status === 'paid'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-amber-700 bg-amber-50'
                }`}
              >
                {reg.payment_status === 'paid' ? 'Payment Reconciled' : 'Deposit Received'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
