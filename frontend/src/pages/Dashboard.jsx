import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [courierRequests, setCourierRequests] = useState([]);
  const [verify, setVerify] = useState('none');

  const load = async () => {
    const [{ data: b }, { data: v }, { data: cr }] = await Promise.all([
      api.get('/bookings/me'),
      api.get('/auth/verify/status'),
      api.get('/courier/me/bookings')
    ]);
    setBookings(b.bookings || []);
    setCourierRequests(cr.bookings || []);
    setVerify(v.status);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Dashboard</h2>
      <div className="mt-2 text-sm">Verification status: <span className="font-medium capitalize">{verify}</span></div>

      <h3 className="mt-6 text-xl font-semibold">My Ride Bookings</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(b => (
          <div key={b._id} className="bg-white border rounded-lg p-4 shadow">
            <div className="font-semibold">{b.ride?.source} → {b.ride?.destination}</div>
            <div className="text-sm text-gray-600">{b.ride?.date} • {b.ride?.time}</div>
            <div className="text-sm">Seats: {b.seats} • Paid: ₹{b.priceTotal}</div>
          </div>
        ))}
        {bookings.length === 0 && <div className="text-gray-600">No ride bookings yet.</div>}
      </div>

      <h3 className="mt-8 text-xl font-semibold">My Courier Requests</h3>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        {courierRequests.map(r => (
          <div key={r._id} className="bg-white border rounded-lg p-4 shadow">
            <div className="font-semibold">{r.pickup} → {r.drop}</div>
            <div className="text-sm text-gray-600">{r.date} • {r.time}</div>
            <div className="text-sm">Weight: {r.weightKg}kg • Status: {r.status}</div>
          </div>
        ))}
        {courierRequests.length === 0 && <div className="text-gray-600">No courier requests yet.</div>}
      </div>
    </div>
  );
}
