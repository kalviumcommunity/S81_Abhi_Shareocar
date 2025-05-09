import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OfferRide = () => {
  const navigate = useNavigate();
  const [rideData, setRideData] = useState({
    driver: "",
    from: "",
    to: "",
    date: "",
    time: "",
    seatsAvailable: 1,
    price: "",
  });

  const handleChange = (e) => {
    setRideData({ ...rideData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRide = { id: Date.now(), ...rideData };

    // Save ride to localStorage
    const existingRides = JSON.parse(localStorage.getItem("rides") || "[]");
    localStorage.setItem("rides", JSON.stringify([...existingRides, newRide]));

    // Redirect to RideList
    navigate("/ride-list");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-200 px-6 py-12">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          Offer a Ride
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="driver"
            placeholder="Your Name"
            value={rideData.driver}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
          />

          <div className="flex gap-6">
            <input
              type="text"
              name="from"
              placeholder="From"
              value={rideData.from}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={rideData.to}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
          </div>

          <div className="flex gap-6">
            <input
              type="date"
              name="date"
              value={rideData.date}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
            <input
              type="time"
              name="time"
              value={rideData.time}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
          </div>

          <div className="flex gap-6">
            <input
              type="number"
              name="seatsAvailable"
              placeholder="Seats"
              min="1"
              value={rideData.seatsAvailable}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (₹)"
              value={rideData.price}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Publish Ride
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OfferRide;
