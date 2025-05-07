import React, { useState } from "react";
import { motion } from "framer-motion";

const FindRide = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [rides, setRides] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const mockResults = [
      {
        id: 1,
        driver: "Abhi Vignesh",
        car: "Maruti Swift - DL01AB1234",
        time: "10:00 AM",
        price: "₹250",
      },
      {
        id: 2,
        driver: "Vinay",
        car: "Hyundai i20 - DL02CD5678",
        time: "12:30 PM",
        price: "₹300",
      },
    ];

    setRides(mockResults);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 px-4 py-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-extrabold text-orange-700 mb-10 tracking-tight">
        Find a Ride
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl space-y-6"
      >
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            placeholder="e.g., Delhi"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Drop Location</label>
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            placeholder="e.g., Chandigarh"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Date of Travel</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full shadow-md transition"
        >
          Search Rides
        </motion.button>
      </form>

      {/* Ride Results */}
      {rides.length > 0 && (
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Available Rides
          </h2>
          <ul className="space-y-5">
            {rides.map((ride) => (
              <motion.li
                key={ride.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
              >
                <div className="text-xl font-semibold text-orange-700">
                  {ride.driver}
                </div>
                <div className="text-gray-600">{ride.car}</div>
                <div className="flex justify-between items-center mt-3 text-sm text-gray-700">
                  <span className="bg-orange-50 px-3 py-1 rounded-full text-orange-600 font-medium">
                    {ride.time}
                  </span>
                  <span className="font-bold text-green-600">{ride.price}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default FindRide;
