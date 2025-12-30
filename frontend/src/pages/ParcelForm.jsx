import { useState } from 'react';
import { api } from '../lib/api';

export default function ParcelForm() {
  const [form, setForm] = useState({ size: '', weight: 0, pickup: '', drop: '', estimatedCost: 0 });
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/parcels', form);
      alert('Parcel request submitted');
    } catch (e) {
      alert('Failed');
    } finally { setLoading(false); }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-semibold text-brand">Send a Parcel</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        {['size','pickup','drop'].map((f)=>(
          <input key={f} className="w-full border p-2" placeholder={f} value={form[f]} onChange={(e)=>setForm({...form,[f]:e.target.value})} />
        ))}
        <input type="number" className="w-full border p-2" placeholder="Weight" value={form.weight} onChange={(e)=>setForm({...form,weight:Number(e.target.value)})} />
        <input type="number" className="w-full border p-2" placeholder="Estimated Cost" value={form.estimatedCost} onChange={(e)=>setForm({...form,estimatedCost:Number(e.target.value)})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full" disabled={loading}>{loading? 'Submitting...' : 'Submit'}</button>
      </form>
    </div>
  );
}
