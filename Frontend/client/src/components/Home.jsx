import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import carImage from "../assets/car-image.jpg.webp"; // Assuming you have the car image in the 'assets' folder.

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex flex-col items-center justify-between px-6 py-8 relative">
      {/* Background Car Image */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <img
          src={carImage}
          alt="Car"
          className="object-cover w-full h-full opacity-30" // Adjust opacity for subtle effect
        />
      </div>

      {/* SOS Button at the Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/emergency">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            aria-label="SOS Emergency Button"
          >
            SOS
          </button>
        </Link>
      </div>

      {/* Login Button at the Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Link to="/login">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl shadow-md transform transition duration-300 hover:scale-105">
            Login
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 text-center z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-700 mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to ShareOCar
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-orange-800 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ride together. Save more. Connect with drivers and passengers for easy, affordable travel and parcel delivery.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 sm:gap-10 flex-wrap justify-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* View Ride List Button */}
          <Link to="/ride-list">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl shadow-md transition duration-300 w-full sm:w-auto">
              View Ride List
            </button>
          </Link>

          {/* Offer a Ride Button */}
          <Link to="/offer-ride">
            <button className="bg-white text-orange-600 border border-orange-500 px-8 py-4 rounded-xl shadow-md hover:bg-orange-100 transition duration-300 w-full sm:w-auto">
              Offer a Ride
            </button>
          </Link>

          {/* Send a Parcel Button */}
          <Link to="/parcelotion">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl shadow-md transition duration-300 w-full sm:w-auto">
              Send a Parcel
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
