'use client';

import { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle2, Clock, AlertTriangle, Search } from 'lucide-react';
import { SEED_REGISTRATIONS } from '@/lib/data/seed-data';
import { formatCurrency, formatDateShort } from '@/lib/utils/format';

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>(SEED_REGISTRATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/registrations?page=1&limit=50')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setRegistrations(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleStatusToggle = (id: string) => {
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === 'confirmed' ? 'pending' : 'confirmed' } : r
      )
    );
  };

  const filtered = registrations.filter((r) => {
    const studentName = r.student?.full_name?.toLowerCase() ?? '';
    const programmeTitle = r.programme?.title?.toLowerCase() ?? '';
    const term = searchTerm.toLowerCase();
    return studentName.includes(term) || programmeTitle.includes(term);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Enrollment Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Student Registration Management
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Verify academic transcripts, parental consent waivers, and admissions status.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search scholar or expedition..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Scholar & Guardian</th>
                <th className="py-3.5 px-4">Expedition Programme</th>
                <th className="py-3.5 px-4">Tuition</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Admissions Status</th>
                <th className="py-3.5 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-900">{reg.student?.full_name ?? 'Scholar'}</div>
                    <div className="text-stone-500 text-[11px]">{reg.guardian?.full_name ?? 'Guardian'}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-stone-900">{reg.programme?.title ?? 'Expedition'}</div>
                    <div className="text-stone-400 text-[11px]">{reg.programme?.destination_name}</div>
                  </td>
                  <td className="py-4 px-4 font-mono font-medium text-stone-900">
                    {formatCurrency(reg.programme?.price_cents ?? 480000, reg.programme?.currency ?? 'USD')}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        reg.payment_status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {reg.payment_status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        reg.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {reg.status === 'confirmed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {reg.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => handleStatusToggle(reg.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        reg.status === 'confirmed'
                          ? 'border border-stone-300 text-stone-700 hover:bg-stone-100'
                          : 'bg-stone-900 text-white hover:bg-stone-800'
                      }`}
                    >
                      {reg.status === 'confirmed' ? 'Mark Pending' : 'Approve Admission'}
                    </button>
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
