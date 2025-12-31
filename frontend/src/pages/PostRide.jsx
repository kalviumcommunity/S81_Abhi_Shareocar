import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PostRide() {
  const { user, refresh } = useAuth();
  const [status, setStatus] = useState('none');
  const [docs, setDocs] = useState({ idDocUrl: '', licenseUrl: '' });
  const [form, setForm] = useState({ source: '', destination: '', date: '', time: '', seatsAvailable: 1, pricePerSeat: 0, notes: '', vehicle: { model: '', plate: '', color: '' } });
  const [message, setMessage] = useState('');

  const getStatus = async () => {
    const { data } = await api.get('/auth/verify/status');
    setStatus(data.status);
  };
  useEffect(() => { getStatus(); }, []);

  const submitDocs = async () => {
    setMessage('');
    if (!docs.idDocUrl || !docs.licenseUrl) return setMessage('Provide both document URLs');
    await api.post('/auth/verify/upload-docs', docs);
    await refresh();
    await getStatus();
    setMessage('Documents submitted. Await verification.');
  };

  const create = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const { data } = await api.post('/rides', form);
      setMessage(`Ride posted from ${data.ride.source} to ${data.ride.destination}`);
      setForm({ source: '', destination: '', date: '', time: '', seatsAvailable: 1, pricePerSeat: 0, notes: '', vehicle: { model: '', plate: '', color: '' } });
    } catch (e) {
      setMessage(e.response?.data?.message || 'Failed to post ride');
    }
  };

  if (status !== 'verified') {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-brand">Driver Verification Required</h2>
        <p className="text-gray-600 mt-1">Upload your government ID and driving license URLs (cloud links) to request verification.</p>
        <div className="mt-4 space-y-3">
          <input className="w-full border p-2 rounded" placeholder="ID document URL" value={docs.idDocUrl} onChange={(e)=>setDocs({...docs,idDocUrl:e.target.value})} />
          <input className="w-full border p-2 rounded" placeholder="Driving license URL" value={docs.licenseUrl} onChange={(e)=>setDocs({...docs,licenseUrl:e.target.value})} />
          <button onClick={submitDocs} className="bg-brand text-white px-4 py-2 rounded">Submit for Verification</button>
        </div>
        <div className="mt-3 text-sm">Current status: <span className="font-medium">{status}</span></div>
        {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-brand">Post a Ride</h2>
      {message && <div className="mt-2 text-sm text-gray-700">{message}</div>}
      <form onSubmit={create} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="From" value={form.source} onChange={(e)=>setForm({...form,source:e.target.value})} />
        <input className="border p-2 rounded" placeholder="To" value={form.destination} onChange={(e)=>setForm({...form,destination:e.target.value})} />
        <input type="date" className="border p-2 rounded" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})} />
        <input type="time" className="border p-2 rounded" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})} />
        <input type="number" className="border p-2 rounded" placeholder="Seats" value={form.seatsAvailable} min={1} onChange={(e)=>setForm({...form,seatsAvailable:Number(e.target.value)})} />
        <input type="number" className="border p-2 rounded" placeholder="Price per seat" value={form.pricePerSeat} min={0} onChange={(e)=>setForm({...form,pricePerSeat:Number(e.target.value)})} />
        <input className="border p-2 rounded" placeholder="Vehicle model" value={form.vehicle.model} onChange={(e)=>setForm({...form,vehicle:{...form.vehicle,model:e.target.value}})} />
        <input className="border p-2 rounded" placeholder="Vehicle plate" value={form.vehicle.plate} onChange={(e)=>setForm({...form,vehicle:{...form.vehicle,plate:e.target.value}})} />
        <input className="border p-2 rounded" placeholder="Vehicle color" value={form.vehicle.color} onChange={(e)=>setForm({...form,vehicle:{...form.vehicle,color:e.target.value}})} />
        <textarea className="md:col-span-2 border p-2 rounded" placeholder="Notes for passengers" value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
        <div className="md:col-span-2">
          <button className="bg-brand text-white px-4 py-2 rounded">Post Ride</button>
        </div>
      </form>
    </div>
  );
}
