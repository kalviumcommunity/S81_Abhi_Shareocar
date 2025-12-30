import { useState } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/auth/signup/send-otp', form);
      nav('/verify-otp', { state: { email: form.email, phone: form.phone, form } });
    } catch (e) {
      alert('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-semibold text-brand">Signup</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full border p-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
        <input className="w-full border p-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="w-full border p-2" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
        <input type="password" className="w-full border p-2" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full" disabled={loading}>{loading? 'Loading...' : 'Send OTP'}</button>
      </form>
    </div>
  );
}
