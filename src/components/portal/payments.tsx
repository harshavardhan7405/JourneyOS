'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui';
import type { Registration, Programme } from '@/db/types';

interface Props {
  studentId?: string;
}

export default function Payments({ studentId: _studentId }: Props) {
  const [payments] = useState<any[]>([]);
  const [loading] = useState(false);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading payments...</div>;

  return (
    <div className="space-y-4">
      {payments.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">No payment records found.</p>
        </div>
      ) : (
        payments.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
            <div>
              <p className="font-medium text-gray-900">{formatAmount(p.amount_cents, p.currency)}</p>
              <p className="text-sm text-gray-500 mt-1">{new Date(p.created_at).toLocaleDateString()}</p>
            </div>
            <Badge color={p.status === 'paid' ? 'green' : p.status === 'pending' ? 'yellow' : 'red'}>
              {p.status}
            </Badge>
          </div>
        ))
      )}
    </div>
  );
}

const formatAmount = (cents: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(cents / 100);
  } catch {
    return `$${cents / 100}`;
  }
};
