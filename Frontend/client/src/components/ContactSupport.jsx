import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request submitted:", formData);
    alert("Your support request has been submitted. We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex items-center justify-center px-4 py-10">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-orange-600 mb-4 text-center">
          Contact Support
        </h2>

        <p className="text-md text-orange-800 mb-8 text-center leading-relaxed">
          Need help? Fill out the form below and our support team will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-orange-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-orange-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-orange-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
              placeholder="Describe your issue or question..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300"
          >
            Submit Request
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-orange-600 hover:underline font-medium text-sm">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSupport;
