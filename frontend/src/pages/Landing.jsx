import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-brand-light/50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-brand">
          Ride together. Ship smarter.
        </motion.h1>
        <p className="mt-4 text-gray-600">ShareOCar helps you find rides and send parcels with trusted drivers.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/rides" className="bg-brand text-white px-5 py-3 rounded hover:bg-brand-dark">Find Rides</Link>
          <Link to="/post-ride" className="bg-brand-light text-brand-dark px-5 py-3 rounded hover:brightness-95">Post a Ride</Link>
        </div>
      </div>
    </div>
  );
}
