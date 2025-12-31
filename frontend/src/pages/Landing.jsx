import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-linear-to-b from-brand-light/30 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-brand">Ride together. Ship smarter.</motion.h1>
        <p className="mt-4 text-gray-600">ShareOCar helps you find rides and send parcels with trusted drivers.</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/rides" className="bg-brand text-white px-5 py-3 rounded hover:bg-brand-dark">Find a Ride</Link>
          <Link to="/post-ride" className="bg-white border border-brand text-brand px-5 py-3 rounded hover:bg-brand-light/60">Post a Ride</Link>
          <Link to="/courier" className="bg-white border border-brand text-brand px-5 py-3 rounded hover:bg-brand-light/60">Courier</Link>
        </div>
      </div>
    </div>
  );
}
