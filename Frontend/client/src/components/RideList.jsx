import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RideList = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
    const sampleRides = [
      {
        id: 1,
        driver: "ABHI",
        from: "Vijayawada",
        to: "Chennai",
        date: "2025-05-12",
        time: "09:00 AM",
        seatsAvailable: 3,
        price: "₹400",
      },
      {
        id: 2,
        driver: "Vinay",
        from: "Delhi",
        to: "Agra",
        date: "2025-05-13",
        time: "07:30 AM",
        seatsAvailable: 2,
        price: "₹350",
      },
    ];
    setRides(sampleRides);
  }, []);

  const handleBookRide = (ride) => {
    // Navigate to payment page and pass ride data via state
    navigate("/payment", { state: { ride } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-6">
      <h2 className="text-4xl font-extrabold text-orange-700 mb-8 text-center">
        Available Rides
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {rides.map((ride) => (
          <motion.div
            key={ride.id}
            className="bg-white rounded-2xl shadow-lg p-8 border border-orange-200 hover:shadow-xl transition duration-300 ease-in-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * ride.id, duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-orange-600 mb-4">
              {ride.from} → {ride.to}
            </h3>
            <p className="text-gray-700 mb-2">Driver: <strong>{ride.driver}</strong></p>
            <p className="text-gray-700 mb-2">Date: {ride.date}</p>
            <p className="text-gray-700 mb-2">Time: {ride.time}</p>
            <p className="text-gray-700 mb-2">Seats Available: {ride.seatsAvailable}</p>
            <p className="text-orange-600 font-bold text-lg mt-2">{ride.price}</p>

            {/* Book Ride triggers navigation to Payment */}
            <button
              className="mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition duration-300 ease-in-out transform hover:scale-105 w-full"
              onClick={() => handleBookRide(ride)}
            >
              Book Ride
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RideList;
