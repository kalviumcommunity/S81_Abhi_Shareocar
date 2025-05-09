import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-200 px-4 py-12">
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <svg
            className="w-20 h-20 text-red-600 mx-auto mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h2 className="text-4xl font-extrabold text-red-600 mb-4">
            Payment Failed
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Oops! Something went wrong with your payment. Please try again later.
          </p>

          <Link
            to="/payment"
            className="inline-block bg-red-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Retry Payment
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
