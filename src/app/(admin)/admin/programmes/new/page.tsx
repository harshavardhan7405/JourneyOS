'use client';

import { useEffect, useState } from 'react';
import { Button, Input, Label, Textarea } from '@/components/ui';
import type { Programme } from '@/db/types';

export default function NewProgrammePage() {
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/admin/programmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          learningOutcomes: ['Field research methodology', 'Academic capstone defense'],
          whatIncluded: ['Research residency', 'Field equipment', 'Pastoral safety coverage'],
          startDate: new Date(form.startDate).toISOString(),
          endDate: new Date(form.endDate).toISOString(),
        }),
      });
      if (!res.ok) throw new Error('Failed to create programme');
      window.location.href = '/admin/programmes';
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Create Programme</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>

        <div>
          <Label htmlFor="destination">Destination ID</Label>
          <Input id="destination" required placeholder="e.g. d1" value={form.destinationId} onChange={(e) => setForm({ ...form, destinationId: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Duration (weeks)</Label>
            <Input id="duration" type="number" min={1} max={52} required value={form.durationWeeks} onChange={(e) => setForm({ ...form, durationWeeks: Number(e.target.value) })} />
          </div>
          <div>
            <Label htmlFor="availability">Availability</Label>
            <Input id="availability" type="number" min={0} max={100} value={form.availability} onChange={(e) => setForm({ ...form, availability: Number(e.target.value) })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ageMin">Min Age</Label>
            <Input id="ageMin" type="number" min={0} max={100} required value={form.ageMin} onChange={(e) => setForm({ ...form, ageMin: Number(e.target.value) })} />
          </div>
          <div>
            <Label htmlFor="ageMax">Max Age</Label>
            <Input id="ageMax" type="number" min={0} max={100} required value={form.ageMax} onChange={(e) => setForm({ ...form, ageMax: Number(e.target.value) })} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="priceCents">Price (cents)</Label>
            <Input id="priceCents" type="number" min={1} required value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} />
          </div>
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input id="currency" required maxLength={3} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
          </div>
        </div>

        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" required value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" required min={form.startDate} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        </div>

        <Textarea id="learningOutcomes" placeholder="Learning outcomes (one per line)" rows={3} required />
        <Textarea id="whatIncluded" placeholder="What's included (one per line)" />

        {Object.entries(errors).map(([field, msg]) => (
          <div key={field} className="mt-2 rounded-md bg-red-50 p-3 text-sm text-red-700">{msg}</div>
        ))}

        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Programme'}</Button>
      </form>
    </div>
  );
}
