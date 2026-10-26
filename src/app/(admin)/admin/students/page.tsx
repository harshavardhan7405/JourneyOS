'use client';

import { useEffect, useState } from 'react';
import { Users, GraduationCap, Mail, School, Shield } from 'lucide-react';
import { SEED_STUDENTS } from '@/lib/data/seed-data';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>(SEED_STUDENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/students?page=1&limit=100')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setStudents(data.data);
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
            Scholar Roster
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Student Cohort Management
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Participating scholars, school affiliations, pastoral care assignments, and guardian contacts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs">
          <Users className="w-4 h-4 text-amber-600" />
          <span>{students.length} Active Scholars Enrolled</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  {s.full_name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">{s.full_name}</h3>
                  <div className="text-xs text-stone-500">{s.grade} • {s.school}</div>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                Active Scholar
              </span>
            </div>

            <div className="rounded-xl bg-stone-50 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Student Email:</span>
                <span className="font-mono text-stone-800">{s.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Primary Guardian:</span>
                <span className="font-medium text-stone-800">{s.guardian_name} ({s.guardian_email})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Assigned Cohorts:</span>
                <span className="font-semibold text-amber-800">{s.enrolled_programmes?.join(', ') ?? 'Santorini'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
