import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function OTPVerify() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!state?.email || !state?.phone || !state?.form) {
    return <div className="max-w-md mx-auto p-6 bg-white shadow mt-10 rounded-lg">Missing signup data</div>;
  }

  const onVerify = async (e) => {
    e.preventDefault();
    setError('');
    if (code.length !== 6) return setError('Enter the 6-digit code');
    try {
      setLoading(true);
      await api.post('/auth/signup/verify-otp', { email: state.email, phone: state.phone, code });
      const { data } = await api.post('/auth/signup/complete', state.form);
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (e) {
      setError(e.response?.data?.message || 'Verification failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow mt-10 rounded-lg border border-gray-100">
      <h2 className="text-2xl font-semibold text-brand">Verify your account</h2>
      <p className="text-gray-600 mt-1">Enter the OTP sent to {state.email} and {state.phone}</p>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      <form onSubmit={onVerify} className="mt-4 space-y-3">
        <input className="w-full border p-2 rounded tracking-widest text-center" placeholder="000000" value={code} onChange={(e)=>setCode(e.target.value)} maxLength={6} />
        <button className="bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded w-full disabled:opacity-50" disabled={loading}>{loading? 'Verifying...' : 'Verify'}</button>
      </form>
    </div>
  );
}
