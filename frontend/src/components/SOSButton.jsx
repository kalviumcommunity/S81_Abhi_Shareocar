import { useState } from 'react';
import { api } from '../lib/api.js';

export default function SOSButton() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const getLocation = () => new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({ lat: null, lng: null });
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: null, lng: null })
    );
  });

  const send = async (type, contactPhone) => {
    setSending(true); setError('');
    const { lat, lng } = await getLocation();
    try {
      await api.post('/sos', { type, lat, lng, contactPhone });
      setOpen(false);
      alert('SOS sent');
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to send SOS');
    } finally { setSending(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-3 rounded-full shadow-lg"
      >SOS</button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Emergency SOS</h3>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div className="grid grid-cols-1 gap-3">
              <a href="tel:100" className="w-full text-center bg-red-500 text-white py-2 rounded-lg">Call Police</a>
              <a href="tel:102" className="w-full text-center bg-orange-500 text-white py-2 rounded-lg">Call Ambulance</a>
              <button disabled={sending} onClick={() => send('contact', prompt('Emergency contact number?'))} className="w-full bg-brand-dark text-white py-2 rounded-lg disabled:opacity-50">Share Live Location</button>
            </div>
            <button onClick={() => setOpen(false)} className="w-full border py-2 rounded-lg">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
