import { useState } from 'react';
import { api } from '../lib/api';

export default function SOSButton() {
  const [sending, setSending] = useState(false);
  const triggerSOS = async () => {
    try {
      setSending(true);
      let coords = {};
      if (navigator.geolocation) {
        await new Promise((resolve) => navigator.geolocation.getCurrentPosition((pos) => {
          coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          resolve();
        }, () => resolve()));
      }
      await api.post('/sos', coords);
      alert('SOS alert sent');
    } catch (e) {
      alert('Failed to send SOS');
    } finally {
      setSending(false);
    }
  };
  return (
    <button onClick={triggerSOS} disabled={sending} className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-3 rounded-full shadow-lg">
      {sending ? 'Sending...' : 'SOS'}
    </button>
  );
}
