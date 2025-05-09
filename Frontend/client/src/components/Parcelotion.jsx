import { useState } from "react";
import { motion } from "framer-motion";

const Parcelotion = () => {
  const [parcelData, setParcelData] = useState({
    sender: "",
    receiver: "",
    from: "",
    to: "",
    date: "",
    time: "",
    weight: "",
    price: "",
  });

  const handleChange = (e) => {
    setParcelData({ ...parcelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Parcel Sent:", parcelData);
    alert("Parcel request submitted!");
    // TODO: Send parcelData to backend API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-200 flex items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          Send a Parcel
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="sender"
            placeholder="Sender Name"
            value={parcelData.sender}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
          />

          <input
            type="text"
            name="receiver"
            placeholder="Receiver Name"
            value={parcelData.receiver}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
          />

          <div className="flex gap-6">
            <input
              type="text"
              name="from"
              placeholder="Pickup Location"
              value={parcelData.from}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
            <input
              type="text"
              name="to"
              placeholder="Drop Location"
              value={parcelData.to}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
          </div>

          <div className="flex gap-6">
            <input
              type="date"
              name="date"
              value={parcelData.date}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
            <input
              type="time"
              name="time"
              value={parcelData.time}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
            />
          </div>

          <input
            type="text"
            name="weight"
            placeholder="Parcel Weight (kg)"
            value={parcelData.weight}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
          />

          <input
            type="text"
            name="price"
            placeholder="Delivery Price (₹)"
            value={parcelData.price}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 border border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition duration-300"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition duration-300 hover:scale-105"
          >
            Send Parcel
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Parcelotion;
