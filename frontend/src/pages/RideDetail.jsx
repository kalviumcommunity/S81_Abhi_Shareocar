import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api.js';

export default function RideDetail() {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const [weightKg, setWeightKg] = useState(1);
  const [message, setMessage] = useState('');

  const load = async () => {
    const { data } = await api.get(`/rides/${id}`);
    setRide(data.ride);
  };
  useEffect(() => { load(); }, [id]);

  const book = async () => {
    setMessage('');
    try {
      const { data } = await api.post(`/rides/${id}/book`, { seats });
      setMessage(`Booked ${data.booking.seats} seats. Total ₹${data.booking.priceTotal}`);
      await load();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Booking failed');
    }
  };

  const bookCourier = async () => {
    setMessage('');
    try {
      const { data } = await api.post(`/rides/${id}/courier-book`, { weightKg });
      setMessage(`Courier booked for ${data.booking.weightKg}kg. Total ₹${data.booking.priceTotal}`);
      await load();
    } catch (e) {
      setMessage(e.response?.data?.message || 'Courier booking failed');
    }
  };

  if (!ride) return <div className="p-6">Loading...</div>;
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white border rounded-lg p-6 shadow">
        <div className="text-xl font-semibold">{ride.source} → {ride.destination}</div>
        <div className="text-gray-600 mt-1">{ride.date} • {ride.time}</div>
        <div className="mt-2">Price: <span className="font-semibold">₹{ride.pricePerSeat}</span> per seat</div>
        <div className="mt-1">Seats available: {ride.seatsAvailable}</div>
        <div className="mt-2">Driver: {ride.owner?.name}</div>
        {ride.notes && <div className="mt-2 text-gray-700">Notes: {ride.notes}</div>}
        <div className="mt-4 flex items-center gap-2">
          <input type="number" min="1" max={ride.seatsAvailable} value={seats} onChange={(e)=>setSeats(Number(e.target.value))} className="border p-2 rounded w-24" />
          <button onClick={book} className="bg-brand text-white px-4 py-2 rounded disabled:opacity-50" disabled={ride.seatsAvailable === 0}>Book</button>
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="font-semibold">Courier on this ride</div>
          <div className="text-sm text-gray-600 mt-1">Parcel capacity: {Math.max(0, (ride.parcelCapacityKg || 0) - (ride.parcelBookedKg || 0))}kg • Price: ₹{ride.pricePerKg || 20}/kg</div>
          <div className="mt-3 flex items-center gap-2">
            <input type="number" min="0.1" step="0.1" value={weightKg} onChange={(e)=>setWeightKg(Number(e.target.value))} className="border p-2 rounded w-28" />
            <button onClick={bookCourier} className="bg-brand text-white px-4 py-2 rounded">Book Courier</button>
          </div>
        </div>
        {message && <div className="mt-3 text-sm text-gray-700">{message}</div>}
      </div>
    </div>
  );
}
