import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 px-6">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <svg
            className="w-16 h-16 text-orange-600 mx-auto mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-3xl font-extrabold text-orange-600 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-700 mb-6">Thank you for your payment. Your transaction was successful.</p>
          
          <Link
            to="/"
            className="bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-700 transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
