'use client';

import { useEffect, useState } from 'react';
import { CreditCard, CheckCircle2, Clock, Download, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SEED_PAYMENTS } from '@/lib/data/seed-data';
import { formatCurrency } from '@/lib/utils/format';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>(SEED_PAYMENTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/payments?page=1&limit=50')
      .then((r) => r.json())
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setPayments(data.data);
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
            Financial Reconciliations
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Tuition Payment History & Invoices
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-0.5">
            Razorpay transaction audit logs, currency conversions, and official tax receipts.
          </p>
        </div>

        <div className="bg-white px-4 py-2.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-stone-700 font-medium">Razorpay 256-bit Encrypted Checkout</span>
        </div>
      </div>

      <div className="space-y-4">
        {payments.map((p: any, i: number) => (
          <div
            key={p.id ?? i}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    p.status === 'paid'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {p.status === 'paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {p.status.toUpperCase()}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {p.razorpay_order_id}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base text-stone-900">
                {p.programme_title ?? 'Tuition Payment'}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                <div>
                  Scholar: <span className="font-semibold text-stone-800">{p.student_name}</span>
                </div>
                <div>
                  Method: <span className="font-semibold text-stone-800">{p.payment_method}</span>
                </div>
                <div>
                  Settled: <span className="text-stone-600">{new Date(p.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-4 sm:pt-0 border-stone-100 shrink-0">
              <div className="text-right">
                <span className="text-[11px] text-stone-400 block uppercase">Settled Amount</span>
                <span className="text-xl font-bold font-serif text-stone-900">
                  {formatCurrency(p.amount_cents, p.currency)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading official VAT tax receipt for ${p.razorpay_order_id}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                Receipt PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
