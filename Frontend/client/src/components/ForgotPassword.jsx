import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call (replace with real API integration)
    try {
      setTimeout(() => {
        setLoading(false);
        setMessage("📧 Password reset email sent. Please check your inbox.");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage("❌ Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-orange-600 text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-orange-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-orange-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          {message && (
            <div className="text-sm text-center font-medium text-orange-600 bg-orange-100 border border-orange-200 rounded-md p-3">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-orange-500 hover:underline font-medium text-sm">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
