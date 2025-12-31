import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api.js';

export default function RideList() {
  const [q, setQ] = useState({ source: '', destination: '', date: '' });
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(Object.fromEntries(Object.entries(q).filter(([,v])=>v)));
      const { data } = await api.get(`/rides?${params.toString()}`);
      setRides(data.rides);
    } finally { setLoading(false); }
  };

  useEffect(() => { search(); }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Find a Ride</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input className="border p-2 rounded" placeholder="From" value={q.source} onChange={(e)=>setQ({...q,source:e.target.value})} />
        <input className="border p-2 rounded" placeholder="To" value={q.destination} onChange={(e)=>setQ({...q,destination:e.target.value})} />
        <input type="date" className="border p-2 rounded" value={q.date} onChange={(e)=>setQ({...q,date:e.target.value})} />
        <button onClick={search} className="bg-brand text-white rounded px-4">{loading? 'Searching...' : 'Search'}</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {rides.map((r) => (
          <div key={r._id} className="bg-white border rounded-lg p-4 shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{r.source} → {r.destination}</div>
                <div className="text-sm text-gray-600">{r.date} • {r.time}</div>
                <div className="text-sm text-gray-600">Seats: {r.seatsAvailable}</div>
              </div>
              <div className="text-right">
                <div className="text-brand font-bold">₹{r.pricePerSeat}/seat</div>
                <Link to={`/rides/${r._id}`} className="mt-2 inline-block bg-brand text-white px-3 py-1 rounded">View</Link>
              </div>
            </div>
          </div>
        ))}
        {rides.length === 0 && !loading && (
          <div className="text-gray-600">No rides found. Try different filters.</div>
        )}
      </div>
    </div>
  );
}
