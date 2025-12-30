import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';

export default function RideDetail() {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  useEffect(() => { (async()=>{ const { data } = await api.get(`/rides/${id}`); setRide(data.ride); })(); }, [id]);
  const book = async () => { await api.post(`/bookings/${id}`, { seats }); alert('Booked!'); };
  if (!ride) return <div className="p-6">Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow mt-6">
      <div className="font-semibold text-lg">{ride.source} → {ride.destination}</div>
      <div className="text-sm text-gray-600">{ride.date} at {ride.time}</div>
      <div className="mt-2">Seats left: {ride.seatsAvailable}</div>
      <div className="mt-4 flex gap-2">
        <input type="number" min={1} max={ride.seatsAvailable} value={seats} onChange={(e)=>setSeats(Number(e.target.value))} className="border p-2 w-24" />
        <button onClick={book} className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded">Book</button>
      </div>
    </div>
  );
}
