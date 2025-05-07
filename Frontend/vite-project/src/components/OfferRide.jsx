import React, { useState } from "react";
import { motion } from "framer-motion";

const OfferRide = () => {
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    seats: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Ride Offered:", formData);

    alert("✅ Ride offered successfully!");
    setFormData({
      name: "",
      pickup: "",
      drop: "",
      date: "",
      time: "",
      seats: "",
      price: "",
    });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-orange-700">Offer a Ride</h1>
          <p className="text-sm text-gray-600 mt-2">
            Fill in the details below to offer your ride or courier service.
          </p>
        </div>

        {[
          { name: "name", label: "Your Name", placeholder: "e.g., Rohit" },
          { name: "pickup", label: "Pickup Location", placeholder: "e.g., Delhi" },
          { name: "drop", label: "Drop Location", placeholder: "e.g., Jaipur" },
          { name: "date", label: "Travel Date", type: "date" },
          { name: "time", label: "Departure Time", type: "time" },
          {
            name: "seats",
            label: "Available Seats",
            type: "number",
            placeholder: "e.g., 3",
          },
          {
            name: "price",
            label: "Price per Seat (INR)",
            type: "number",
            placeholder: "e.g., 200",
          },
        ].map(({ name, label, type = "text", placeholder }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <input
              id={name}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        ))}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full transition duration-300 shadow-md"
        >
          Offer Ride
        </motion.button>
      </form>
    </motion.div>
  );
};

export default OfferRide;
