'use client';

import { use, useEffect, useState } from 'react';
import { Button, Input, Label, Textarea } from '@/components/ui';
import type { Programme } from '@/db/types';

export default function EditProgrammePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [programme, setProgramme] = useState<Programme | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    destinationId: '',
    durationWeeks: 4,
    ageMin: 8,
    ageMax: 12,
    priceCents: 0,
    currency: 'USD',
    availability: 10,
    startDate: '',
    endDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/programmes/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setProgramme(data.data);
          setForm({
            title: data.data.title ?? '',
            description: data.data.description ?? '',
            destinationId: data.data.destination_id ?? '',
            durationWeeks: data.data.duration_weeks ?? 4,
            ageMin: data.data.age_min ?? 8,
            ageMax: data.data.age_max ?? 12,
            priceCents: data.data.price_cents ?? 0,
            currency: data.data.currency ?? 'USD',
            availability: data.data.availability ?? 10,
            startDate: new Date(data.data.start_date).toISOString().split('T')[0],
            endDate: new Date(data.data.end_date).toISOString().split('T')[0],
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch(`/api/admin/programmes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Failed to update programme');
      window.location.href = '/admin/programmes';
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Unknown error' });
    }
  };

  if (loading || !programme) return <div className="py-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Programme</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Simplified form — using existing fields */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="duration">Duration (weeks)</Label><Input id="duration" type="number" required value={form.durationWeeks} onChange={(e) => setForm({ ...form, durationWeeks: Number(e.target.value) })} /></div>
          <div><Label htmlFor="availability">Availability</Label><Input id="availability" type="number" required value={form.availability} onChange={(e) => setForm({ ...form, availability: Number(e.target.value) })} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label htmlFor="ageMin">Min Age</Label><Input id="ageMin" type="number" required value={form.ageMin} onChange={(e) => setForm({ ...form, ageMin: Number(e.target.value) })} /></div>
          <div><Label htmlFor="ageMax">Max Age</Label><Input id="ageMax" type="number" required value={form.ageMax} onChange={(e) => setForm({ ...form, ageMax: Number(e.target.value) })} /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><Label htmlFor="currency">Currency</Label><Input id="currency" required maxLength={3} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} /></div>
          <div><Label htmlFor="priceCents">Price (cents)</Label><Input id="priceCents" type="number" required value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} /></div>
        </div>
        <div><Label htmlFor="destId">Destination ID</Label><Input id="destId" placeholder="d1" required value={form.destinationId} onChange={(e) => setForm({ ...form, destinationId: e.target.value })} /></div>

        {Object.entries(errors).map(([field, msg]) => (
          <div key={field} className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-700">{msg}</div>
        ))}

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}
