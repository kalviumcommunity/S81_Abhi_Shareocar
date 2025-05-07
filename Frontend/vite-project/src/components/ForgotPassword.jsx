import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/user/forgot-password", { email });
      setStatus("✅ OTP sent to your email if it exists in our records.");
    } catch (error) {
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <div>
          <h2 className="text-3xl font-extrabold text-orange-700 mb-1">Forgot Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email, and we’ll send you an OTP to reset your password.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
        >
          Send OTP
        </motion.button>

        {status && (
          <motion.p
            className={`text-sm mt-2 ${
              status.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {status}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default ForgotPassword;
