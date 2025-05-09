import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-200 flex items-center justify-center px-4 py-10">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-xl"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
          🚨 Emergency Alert
        </h2>

        <p className="text-lg text-red-700 text-center mb-6 leading-relaxed">
          You've activated an emergency alert. Please remain calm — help is on the way.
        </p>

        <div className="bg-red-100 border border-red-300 text-red-800 rounded-xl p-4 mb-6 text-center shadow-sm">
          <p className="text-base font-medium mb-2">
            If you're in immediate danger, dial your local emergency number now.
          </p>
          <p className="text-sm text-gray-600">
            For further help, use the support options below.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <Link to="/contact-support" className="w-full sm:w-auto">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition duration-300">
              Contact Support
            </button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md transition duration-300">
              Go Back Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Emergency;
