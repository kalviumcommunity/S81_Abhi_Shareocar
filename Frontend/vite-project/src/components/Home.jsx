import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");
  const handleFindRides = () => navigate("/find-rides");
  const handleOfferRide = () => navigate("/offer-ride");

  return (
    
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex flex-col items-center px-4 pt-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Login Button */}
      <div className="absolute top-8 right-8">
        <motion.button
          onClick={handleLoginClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition"
        >
          Login
        </motion.button>
      </div>

      {/* Header */}
      <motion.header
        className="text-center mt-24 mb-14"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-700 tracking-tight">
          Welcome to ShareOCar
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Safe, smart carpooling and parcel sharing all in one smooth experience.
        </p>
      </motion.header>

      {/* Cards Section */}
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl px-4">
        {/* Find Ride Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between text-center transition"
        >
          <h2 className="text-2xl font-bold text-amber-700 mb-4">
            Looking for a Ride?
          </h2>
          <p className="text-gray-600 mb-6">
            Easily connect with verified drivers heading your way. Save money, time, and the planet.
          </p>
          <motion.button
            onClick={handleFindRides}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition"
          >
            Find a Ride
          </motion.button>
        </motion.div>

        {/* Offer Ride Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between text-center transition"
        >
          <h2 className="text-2xl font-bold text-amber-700 mb-4">
            Offering a Ride or Courier?
          </h2>
          <p className="text-gray-600 mb-6">
            Help others travel or deliver parcels while earning and optimizing your trips.
          </p>
          <motion.button
            onClick={handleOfferRide}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition"
          >
            Offer a Ride
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-20 mb-6 text-center text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} <span className="font-medium">ShareOCar</span>. All rights reserved.
      </motion.footer>
    </motion.div>

    

  );
};

export default Home;
