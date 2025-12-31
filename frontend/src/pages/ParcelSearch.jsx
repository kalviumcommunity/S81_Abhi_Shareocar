import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function ParcelSearch() {
  const { user } = useAuth();
  const [q, setQ] = useState({ pickup: '', drop: '', date: '' });
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState(1);
  const [message, setMessage] = useState('');

  const search = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(Object.fromEntries(Object.entries(q).filter(([,v])=>v)));
      const { data } = await api.get(`/parcels?${params.toString()}`);
      setSlots(data.slots);
    } finally { setLoading(false); }
  };

  useEffect(() => { search(); }, []);

  const book = async (id) => {
    setMessage('');
    try {
      const { data } = await api.post(`/parcels/${id}/book`, { weightKg: weight });
      setMessage(`Parcel booked for ${weight}kg. Total ₹${data.booking.priceTotal}`);
      await search();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Failed to book');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Find Parcel Transfer</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="border p-2 rounded" placeholder="Pickup" value={q.pickup} onChange={(e)=>setQ({...q,pickup:e.target.value})} />
        <input className="border p-2 rounded" placeholder="Drop" value={q.drop} onChange={(e)=>setQ({...q,drop:e.target.value})} />
        <input type="date" className="border p-2 rounded" value={q.date} onChange={(e)=>setQ({...q,date:e.target.value})} />
        <input type="number" min="0.1" step="0.1" className="border p-2 rounded" value={weight} onChange={(e)=>setWeight(Number(e.target.value))} placeholder="Weight (kg)" />
        <button onClick={search} className="bg-brand text-white rounded px-4">{loading? 'Searching...' : 'Search'}</button>
      </div>

      {message && <div className="mt-3 text-sm text-gray-700">{message}</div>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {slots.map((s) => (
          <div key={s._id} className="bg-white border rounded-lg p-4 shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{s.pickup} → {s.drop}</div>
                <div className="text-sm text-gray-600">{s.date} • {s.time}</div>
                <div className="text-sm text-gray-600">Capacity left: {s.capacityKg}kg</div>
              </div>
              <div className="text-right">
                <div className="text-brand font-bold">₹{s.pricePerKg}/kg</div>
                <button onClick={() => book(s._id)} className="mt-2 inline-block bg-brand text-white px-3 py-1 rounded" disabled={!user}>Book</button>
                {!user && <div className="text-xs text-gray-500">Login to book</div>}
              </div>
            </div>
          </div>
        ))}
        {slots.length === 0 && !loading && (
          <div className="text-gray-600">No parcel slots found.</div>
        )}
      </div>
    </div>
  );
}
