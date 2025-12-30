import { useState } from 'react';
import { api } from '../lib/api';

export default function PostRide() {
  const [form, setForm] = useState({ source: '', destination: '', date: '', time: '', seatsAvailable: 1, pricePerSeat: 0 });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/rides', { ...form });
      alert('Ride posted!');
    } catch (e) {
      alert('Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-semibold text-brand">Post a Ride</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        {['source','destination','date','time'].map((f)=>(
          <input key={f} className="w-full border p-2" placeholder={f} value={form[f]} onChange={(e)=>setForm({...form,[f]:e.target.value})} />
        ))}
        <input type="number" className="w-full border p-2" placeholder="Seats Available" value={form.seatsAvailable} onChange={(e)=>setForm({...form,seatsAvailable:Number(e.target.value)})} />
        <input type="number" className="w-full border p-2" placeholder="Price per seat" value={form.pricePerSeat} onChange={(e)=>setForm({...form,pricePerSeat:Number(e.target.value)})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full" disabled={loading}>{loading? 'Posting...' : 'Post Ride'}</button>
      </form>
    </div>
  );
}
