'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MyProgrammes from '@/components/portal/my-programmes';
import { Badge } from '@/components/ui';
import type { Programme } from '@/db/types';

export default function DashboardPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch my programmes
    fetch('/api/registrations?page=1&limit=20')
      .then((r) => r.json())
      .then((data) => {
        // Map registrations to programmes for display
        setProgrammes(data.data?.map((reg: any) => ({ ...reg, status: reg.status, payment_status: reg.payment_status })) ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-3">Recent Activity</h2>
        <p className="text-sm text-gray-600">Your recent programme registrations:</p>
        {loading ? (
          <div className="py-4 text-center text-gray-400">Loading...</div>
        ) : (
          <MyProgrammes programmes={programmes} loading={loading} />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/itinerary" className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900">My Itinerary</h3>
          <p className="mt-1 text-sm text-gray-500">View your upcoming trips</p>
        </Link>
        <Link href="/payments" className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900">Payment History</h3>
          <p className="mt-1 text-sm text-gray-500">Track all your payments</p>
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-blue-50 p-5">
        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/programmes" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">Browse Programmes</Link>
          <Link href="/sign-in" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">Sign Out</Link>
        </div>
      </div>
    </div>
  );
}
