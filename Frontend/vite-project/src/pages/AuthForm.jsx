// src/components/AuthForm.jsx
import { useState } from "react";


const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Call backend login API
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 bg-gray-200 rounded font-semibold italic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-200 rounded font-semibold italic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-300 py-2 rounded-full font-semibold italic hover:bg-gray-400"
          >
            Sign in
          </button>
        </form>

        <div className="text-center my-4 font-bold italic">OR</div>

        <div className="flex flex-col gap-3">
          <button className="w-full bg-gray-300 py-2 rounded-full font-semibold italic hover:bg-gray-400">
            Email
          </button>
          <button className="w-full bg-gray-300 py-2 rounded-full font-semibold italic hover:bg-gray-400">
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
