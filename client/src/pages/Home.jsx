// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-white">
      <div className="text-center py-16 px-8 sm:px-16 md:px-24">
        <h1 className="text-4xl font-extrabold leading-tight tracking-wide mb-4">
          Welcome to ShareOCar 🚗
        </h1>
        <p className="text-lg md:text-xl font-semibold mb-6">
          Find or offer rides easily and safely!
        </p>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link to="/post-ride">
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200">
              Post a Ride
            </button>
          </Link>
          <Link to="/auth">
            <button className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all duration-200">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
