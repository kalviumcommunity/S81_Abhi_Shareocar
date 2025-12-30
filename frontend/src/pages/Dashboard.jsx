import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [parcels, setParcels] = useState([]);
  useEffect(() => { (async()=>{ const { data } = await api.get('/bookings/me'); setBookings(data.bookings||[]); })(); }, []);
  useEffect(() => { (async()=>{ const { data } = await api.get('/parcels/me'); setParcels(data.parcels||[]); })(); }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">My Bookings</h3>
        <ul className="space-y-2 text-sm">
          {bookings.map(b => (
            <li key={b._id} className="border p-2 rounded">
              {b.ride?.source} → {b.ride?.destination} · Seats: {b.seats} · ₹{b.amount}
            </li>
          ))}
          {bookings.length===0 && (<li className="text-gray-500">No bookings yet.</li>)}
        </ul>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h3 className="font-semibold mb-2">Parcel History</h3>
        <ul className="space-y-2 text-sm">
          {parcels.map(p => (
            <li key={p._id} className="border p-2 rounded">
              {p.pickup} → {p.drop} · {p.size} · {p.weight}kg · {p.status}
            </li>
          ))}
          {parcels.length===0 && (<li className="text-gray-500">No parcels yet.</li>)}
        </ul>
      </div>
    </div>
  );
}
