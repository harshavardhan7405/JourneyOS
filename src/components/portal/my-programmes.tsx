'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/utils/format';
import { Badge } from '@/components/ui';
import type { Programme } from '@/db/types';

interface Props {
  programmes: Programme[];
  loading?: boolean;
}

export default function MyProgrammes({ programmes, loading }: Props) {
  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading your programmes...</div>;
  }

  if (!programmes || programmes.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-600 mb-2">You haven&apos;t registered for any programmes yet.</p>
        <Link href="/programmes" className="text-sm font-medium text-blue-600 hover:text-blue-700">Browse Programmes →</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {programmes.map((prog) => (
        <Link
          key={prog.id}
          href={`/itinerary?programme=${prog.id}`}
          className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{prog.title}</h3>
              <p className="text-sm text-gray-500">{prog.destination_name ?? 'N/A'}</p>
            </div>
            <span className="ml-4 text-sm font-bold text-gray-900">
              {formatCurrency(prog.price_cents, prog.currency)}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            <Badge color="green">{prog.duration_weeks}w</Badge>
            <Badge color="yellow">{prog.status}</Badge>
            {prog.payment_status && (
              <Badge color={prog.payment_status === 'paid' ? 'green' : 'red'}>{prog.payment_status}</Badge>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
