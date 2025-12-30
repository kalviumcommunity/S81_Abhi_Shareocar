import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.user);
    } catch (e) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-semibold text-brand">Login</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full border p-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" className="w-full border p-2" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full" disabled={loading}>{loading? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
}
