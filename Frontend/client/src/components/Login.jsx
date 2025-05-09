import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g. API call, validation)
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200 px-6 py-8">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>

        {/* Forgot Password Button */}
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-orange-600 hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
