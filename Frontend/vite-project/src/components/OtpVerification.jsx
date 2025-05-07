import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/verify-otp", { email, otp });
      setStatus("✅ OTP verified successfully!");
      setTimeout(() => navigate("/reset-password"), 2000);
    } catch (error) {
      setStatus("❌ Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-100 px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-orange-700">Verify OTP</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter the OTP sent to your registered email address.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="e.g., rohit@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            OTP Code
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full transition duration-300 shadow-md"
        >
          Verify OTP
        </motion.button>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700 font-medium">
            {status}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default OtpVerification;
