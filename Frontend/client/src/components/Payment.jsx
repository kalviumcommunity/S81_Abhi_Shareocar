import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Payment = () => {
  const [gateway, setGateway] = useState(""); // Selected payment method
  const [paymentData, setPaymentData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setPaymentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment via", gateway, ":", paymentData);
    alert(`Payment successful via ${gateway}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          Choose Payment Method
        </h2>

        {/* Payment Method Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {["Rupay", "UPI", "Card", "GPay"].map((method) => (
            <button
              key={method}
              type="button"
              className={`border rounded-xl py-3 px-6 text-lg font-medium transition duration-300 ease-in-out transform ${
                gateway === method
                  ? "bg-orange-600 text-white"
                  : "border-orange-400 text-orange-600 hover:bg-orange-100"
              }`}
              onClick={() => setGateway(method)}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Conditional Form */}
        {gateway && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {gateway === "Card" || gateway === "Rupay" ? (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={paymentData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                />

                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  maxLength="16"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                />

                <div className="flex gap-6">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiry}
                    onChange={handleChange}
                    required
                    className="w-1/2 px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    maxLength="4"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    required
                    className="w-1/2 px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
                  />
                </div>
              </>
            ) : gateway === "UPI" ? (
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID"
                value={paymentData.upiId}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
              />
            ) : gateway === "GPay" ? (
              <p className="text-center text-orange-600 font-medium">
                Redirecting to GPay app...
              </p>
            ) : null}

            {gateway !== "GPay" && (
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-semibold transition duration-300 transform hover:scale-105"
              >
                Pay Now
              </button>
            )}
          </form>
        )}

        <div className="text-center mt-8">
          <Link to="/" className="text-orange-600 hover:underline font-medium">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Payment;
