import { useState } from 'react';
import { api } from '../lib/api.js';

export default function ParcelForm() {
  const [form, setForm] = useState({ pickup: '', drop: '', date: '', time: '', capacityKg: 0, pricePerKg: 0, notes: '' });
  const [message, setMessage] = useState('');

  const create = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await api.post('/parcels', form);
      setMessage(`Parcel slot posted ${data.slot.pickup} → ${data.slot.drop}`);
      setForm({ pickup: '', drop: '', date: '', time: '', capacityKg: 0, pricePerKg: 0, notes: '' });
    } catch (e) {
      setMessage(e.response?.data?.message || 'Failed to post parcel slot');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Post Parcel Delivery</h2>
      {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
      <form onSubmit={create} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Pickup" value={form.pickup} onChange={(e)=>setForm({...form,pickup:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Drop" value={form.drop} onChange={(e)=>setForm({...form,drop:e.target.value})} />
        <input type="date" className="border p-2 rounded" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} />
        <input type="time" className="border p-2 rounded" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})} />
        <input type="number" className="border p-2 rounded" placeholder="Capacity (kg)" value={form.capacityKg} min={0} onChange={(e)=>setForm({...form,capacityKg:Number(e.target.value)})} />
        <input type="number" className="border p-2 rounded" placeholder="Price per kg" value={form.pricePerKg} min={0} onChange={(e)=>setForm({...form,pricePerKg:Number(e.target.value)})} />
        <textarea className="md:col-span-2 border p-2 rounded" placeholder="Notes" value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
        <div className="md:col-span-2">
          <button className="bg-brand text-white px-4 py-2 rounded">Post</button>
        </div>
      </form>
    </div>
  );
}
