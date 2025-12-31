import { useState } from 'react';
import { api } from '../lib/api.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone || !form.password) return setError('All fields are required');
    try {
      setLoading(true);
      const { data } = await api.post('/auth/signup', form);
      // Auto login after signup for a smooth experience
      login(data.token, data.user);
      navigate('/rides');
    } catch (e) {
      setError(e.response?.data?.message || 'Signup failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-brand">Create Account</h2>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border p-2 rounded" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full disabled:opacity-50" disabled={loading}>{loading? 'Creating...' : 'Create Account'}</button>
      </form>
    </div>
  );
}
