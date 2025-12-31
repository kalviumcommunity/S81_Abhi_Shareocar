import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Email and password required');
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
      navigate('/rides');
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-brand">Login</h2>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full disabled:opacity-50" disabled={loading}>{loading? 'Loading...' : 'Login'}</button>
      </form>
      <p className="text-sm text-gray-600 mt-4">No account? <Link to="/signup" className="text-brand hover:underline">Create one</Link></p>
    </div>
  );
}

