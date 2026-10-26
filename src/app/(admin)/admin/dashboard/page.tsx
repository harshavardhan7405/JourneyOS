'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ programmes: 0, registrations: 0, payments: 0 });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Programmes" value={stats.programmes} />
        <StatCard label="Registrations" value={stats.registrations} />
        <StatCard label="Payments Processed" value={stats.payments} />
        <StatCard label="Active Destinations" value={5} />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Recent Registrations</h3>
        <p className="text-sm text-gray-500 mb-4">Latest registrations across all programmes:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200">
              <tr><th className="py-2 px-3 font-semibold text-gray-700">Programme</th><th className="py-2 px-3 font-semibold text-gray-700">Student</th><th className="py-2 px-3 font-semibold text-gray-700">Status</th></tr>
            </thead>
            <tbody>
              {[
                { programme: 'STEAM Explorers — Santorini', student: 'Alex Johnson', status: 'confirmed' },
                { programme: 'Nature Detectives — Reykjavik', student: 'Sam Rodriguez', status: 'pending' },
                { programme: 'Innovation Lab — Tokyo', student: 'Alex Johnson', status: 'pending' },
                { programme: 'Reef Rangers — Bali', student: 'Sam Rodriguez', status: 'refunded' },
                { programme: 'Medinas & Markets — Marrakech', student: 'Alex Johnson', status: 'confirmed' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-700">{row.programme}</td>
                  <td className="py-2 px-3 text-gray-700">{row.student}</td>
                  <td className="py-2 px-3"><Badge color={row.status === 'confirmed' ? 'green' : row.status === 'pending' ? 'yellow' : 'red'}>{row.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
