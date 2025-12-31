import { useState } from 'react';
import { api } from '../lib/api.js';

export default function Courier() {
  const [form, setForm] = useState({ pickup: '', drop: '', date: '', time: '', weightKg: 1, instructions: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const { data } = await api.post('/courier', {
        pickup: form.pickup,
        drop: form.drop,
        date: form.date,
        time: form.time,
        weightKg: Number(form.weightKg),
        instructions: form.instructions
      });
      setStatus({ ok: true, message: `Request created (#${data.request._id})` });
      setForm({ pickup: '', drop: '', date: '', time: '', weightKg: 1, instructions: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to create request';
      setStatus({ ok: false, message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Request Courier</h2>
      <p className="text-gray-600 mt-1">Book a courier pickup and delivery.</p>
      <form onSubmit={submit} className="mt-6 space-y-4 bg-white p-6 rounded-lg shadow border">
        <div>
          <label className="block text-sm font-medium">Pickup</label>
          <input name="pickup" value={form.pickup} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="Pickup address" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Drop</label>
          <input name="drop" value={form.drop} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="Drop address" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" name="date" value={form.date} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input type="time" name="time" value={form.time} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input type="number" min="0.1" step="0.1" name="weightKg" value={form.weightKg} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Instructions</label>
          <textarea name="instructions" value={form.instructions} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" placeholder="Any handling notes" />
        </div>
        <button disabled={loading} className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark disabled:opacity-50">
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
        {status && (
          <div className={"mt-3 text-sm " + (status.ok ? 'text-green-700' : 'text-red-700')}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
