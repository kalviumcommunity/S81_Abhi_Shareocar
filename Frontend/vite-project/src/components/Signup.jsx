import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Make sure axios is imported

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // ✅ Added to handle success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!name || !email || !password || !confirmPassword) {
      setError("⚠️ Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/user/signup", {
        name,
        email,
        password,
      });

      if (data.success) {
        setStatus("✅ OTP sent to your email!");
        setTimeout(() => navigate("/verify-otp"), 2000);
      } else {
        setError("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "❌ Server error. Please try again.";
      setError(message);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col items-center justify-center px-4 sm:px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.header
        className="text-center mb-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700">
          Create Your ShareOCar Account
        </h1>
        <p className="mt-3 text-base text-gray-600 max-w-md mx-auto">
          Find or offer rides, share your route, or deliver parcels — safely and easily.
        </p>
      </motion.header>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {error && (
          <p className="text-sm text-center text-red-600 font-medium bg-red-100 px-4 py-2 rounded-md">
            {error}
          </p>
        )}

        {status && (
          <p className="text-sm text-center text-green-600 font-medium bg-green-100 px-4 py-2 rounded-md">
            {status}
          </p>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="e.g., Rohit Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="e.g., rohit@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full transition duration-300 shadow-md"
        >
          Sign Up
        </motion.button>
      </motion.form>

      {/* Footer */}
      <motion.footer
        className="mt-6 text-sm text-gray-600 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Already have an account?{" "}
        <button
          className="text-orange-600 hover:underline font-medium"
          onClick={() => navigate("/login")}
        >
          Log in here
        </button>
      </motion.footer>
    </motion.div>
  );
};

export default Signup;
