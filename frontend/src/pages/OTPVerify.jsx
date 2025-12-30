import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function OTPVerify() {
  const { state } = useLocation();
  const nav = useNavigate();
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!state?.email || !state?.phone) return alert('Missing signup context');
    try {
      setLoading(true);
      await api.post('/auth/signup/verify-otp', { email: state.email, phone: state.phone, code });
      const { data } = await api.post('/auth/signup/complete', state.form);
      login(data.token, data.user);
      nav('/');
    } catch (e) {
      alert('Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-semibold text-brand">Verify OTP</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <input className="w-full border p-2" placeholder="Enter 6-digit OTP" value={code} onChange={(e)=>setCode(e.target.value)} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full" disabled={loading}>{loading? 'Verifying...' : 'Verify & Create Account'}</button>
      </form>
    </div>
  );
}
