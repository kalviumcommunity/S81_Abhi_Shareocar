import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function RideList() {
  const [rides, setRides] = useState([]);
  useEffect(() => { (async()=>{ const { data } = await api.get('/rides'); setRides(data.rides || []); })(); }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid gap-4">
      {rides.map(r => (
        <div key={r._id} className="bg-white shadow p-4 rounded">
          <div className="font-semibold">{r.source} → {r.destination}</div>
          <div className="text-sm text-gray-600">{r.date} at {r.time}</div>
          <div className="text-sm mt-1">Seats: {r.seatsAvailable} · ₹{r.pricePerSeat}/seat</div>
        </div>
      ))}
    </div>
  );
}
