import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import ProtectedRoute from '../components/ProtectedRoute';

function AdminContent() {
  const [alerts, setAlerts] = useState([]);
  const load = async () => { const { data } = await api.get('/sos'); setAlerts(data.alerts||[]); };
  useEffect(() => { load(); }, []);
  const resolve = async (id) => { await api.patch(`/sos/${id}/resolve`); await load(); };
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">SOS Alerts</h2>
      <div className="grid gap-3">
        {alerts.map(a => (
          <div key={a._id} className="bg-white shadow p-4 rounded">
            <div className="font-semibold">{a.user?.name} ({a.user?.email})</div>
            <div className="text-sm">Location: {a.location?.lat ?? '-'}, {a.location?.lng ?? '-'}</div>
            <div className="text-sm">Message: {a.message || '-'}</div>
            <div className="text-sm">Resolved: {String(a.resolved)}</div>
            {!a.resolved && (
              <button onClick={()=>resolve(a._id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Resolve</button>
            )}
          </div>
        ))}
        {alerts.length===0 && (<div className="text-gray-500">No alerts.</div>)}
      </div>
    </div>
  );
}

export default function AdminDashboard() { return (
  <ProtectedRoute roles={["admin"]}>
    <AdminContent />
  </ProtectedRoute>
); }
