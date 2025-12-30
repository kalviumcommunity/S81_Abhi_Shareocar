import { useState } from 'react';
import { api } from '../lib/api';

export default function Home() {
  const [query, setQuery] = useState({ source: '', destination: '', date: '', priceMax: '', seatsMin: '' });
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get('/rides', { params: query });
      setRides(data.rides || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <form onSubmit={search} className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input className="border p-2" placeholder="Source" value={query.source} onChange={(e)=>setQuery({...query,source:e.target.value})} />
        <input className="border p-2" placeholder="Destination" value={query.destination} onChange={(e)=>setQuery({...query,destination:e.target.value})} />
        <input className="border p-2" placeholder="Date" value={query.date} onChange={(e)=>setQuery({...query,date:e.target.value})} />
        <input className="border p-2" placeholder="Max Price" value={query.priceMax} onChange={(e)=>setQuery({...query,priceMax:e.target.value})} />
        <input className="border p-2" placeholder="Min Seats" value={query.seatsMin} onChange={(e)=>setQuery({...query,seatsMin:e.target.value})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded" disabled={loading}>{loading? 'Searching...' : 'Search'}</button>
      </form>
      <div className="mt-6 grid gap-4">
        {rides.map(r => (
          <div key={r._id} className="bg-white shadow p-4 rounded">
            <div className="font-semibold">{r.source} → {r.destination}</div>
            <div className="text-sm text-gray-600">{r.date} at {r.time}</div>
            <div className="text-sm mt-1">Seats: {r.seatsAvailable} · ₹{r.pricePerSeat}/seat</div>
          </div>
        ))}
        {!loading && rides.length===0 && (<div className="text-gray-500">No rides yet. Try searching above.</div>)}
      </div>
    </div>
  );
}
