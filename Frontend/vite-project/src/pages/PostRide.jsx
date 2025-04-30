// src/pages/PostRide.jsx
import React from 'react';
import RideForm from '../components/RideForm';
import RideList from '../components/RideList';
import SOSButton from '../components/SOSButton';

const PostRide = ({ onRideSubmit, rides, onSOSPress }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-white p-8">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Post a Ride</h1>

        {/* Ride Form for posting a new ride */}
        <RideForm onRideSubmit={onRideSubmit} />

        <div className="mt-8">
          <h2 className="text-2xl text-center text-gray-800 mb-4">Available Rides</h2>
          {/* Display the list of rides */}
          <RideList rides={rides} />
        </div>

        {/* SOS Button */}
        <div className="mt-8 text-center">
          <SOSButton onSOSPress={onSOSPress} />
        </div>
      </div>
    </div>
  );
};

export default PostRide;
