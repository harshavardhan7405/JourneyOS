'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Users,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';

export default function AdminOverviewPage() {
  const [registrations, setRegistrations] = useState([
    {
      id: 'reg-01',
      student: 'Leo Vance',
      guardian: 'Eleanor Vance',
      programme: 'STEAM Explorers: Santorini Caldera',
      amountCents: 480000,
      currency: 'USD',
      status: 'confirmed',
      date: 'Today, 14:22',
    },
    {
      id: 'reg-02',
      student: 'Maya Lin',
      guardian: 'David Lin',
      programme: 'Innovation Lab: Tokyo & Tsukuba',
      amountCents: 720000,
      currency: 'USD',
      status: 'pending',
      date: 'Yesterday, 19:10',
    },
    {
      id: 'reg-03',
      student: 'Aiden Patel',
      guardian: 'Priya Patel',
      programme: 'Earth & Ice: Reykjavik Glaciology',
      amountCents: 360000,
      currency: 'EUR',
      status: 'confirmed',
      date: 'May 02, 2025',
    },
    {
      id: 'reg-04',
      student: 'Sophia Rossi',
      guardian: 'Marco Rossi',
      programme: 'Reef Ecology: Bali Reserve',
      amountCents: 420000,
      currency: 'USD',
      status: 'action_required',
      date: 'May 01, 2025',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
            Operations Console
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-0.5">
            Executive Operations Overview
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Real-time enrollment health, faculty assignments, and financial reconciliations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/programmes/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Expedition
          </Link>
          <Link
            href="/admin/announcements"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors shadow-xs"
          >
            Broadcast Dispatch
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Active Expeditions
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">5</div>
            <div className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              100% On Schedule
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Total Enrolled Scholars
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">58</div>
            <div className="text-xs text-stone-500 mt-1">Across 5 international field sites</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Tuition Processed (Razorpay)
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">$278,400</div>
            <div className="text-xs text-emerald-700 font-medium mt-1">Test mode reconciled</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Field Safety Index
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">100%</div>
            <div className="text-xs text-emerald-700 font-medium mt-1">0 Critical Incidents</div>
          </div>
        </div>
      </div>

      {/* Recent Enrollment Applications Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Enrollment Records & Status
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Parent-submitted applications requiring review or verification
            </p>
          </div>
          <Link
            href="/admin/registrations"
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 flex items-center gap-1"
          >
            Manage All Registrations
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Scholar & Guardian</th>
                <th className="py-3 px-4">Expedition Programme</th>
                <th className="py-3 px-4">Tuition Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900">{reg.student}</div>
                    <div className="text-stone-500 text-[11px]">{reg.guardian}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-stone-800">
                    {reg.programme}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-stone-900">
                    {formatCurrency(reg.amountCents, reg.currency)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                        reg.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : reg.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reg.status === 'confirmed' && <CheckCircle2 className="w-3 h-3" />}
                      {reg.status === 'pending' && <Clock className="w-3 h-3" />}
                      {reg.status === 'action_required' && <AlertTriangle className="w-3 h-3" />}
                      {reg.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {reg.date}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    {reg.status !== 'confirmed' && (
                      <button
                        onClick={() => handleStatusChange(reg.id, 'confirmed')}
                        className="px-2.5 py-1 rounded-md bg-stone-900 text-white font-semibold hover:bg-stone-800 text-[11px]"
                      >
                        Approve
                      </button>
                    )}
                    <Link
                      href={`/admin/registrations`}
                      className="px-2.5 py-1 rounded-md border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 text-[11px]"
                    >
                      Details
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
