// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthForm from './pages/AuthForm';
import PostRide from './pages/PostRide'; // Import PostRide
import Home from './pages/Home'; // Import Home
import './App.css';
import './index.css';
import ParcelForm from './components/ParcelForm';

function App() {
  const [rides, setRides] = useState([]);

  const handleRideSubmit = (newRide) => {
    setRides([...rides, newRide]);
  };

  const handleSOS = () => {
    alert('SOS alert sent! Help is on the way!');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Page */}
        <Route path="/auth" element={<AuthForm />} />

        {/* Post a Ride Page */}
        <Route
          path="/post-ride"
          element={<PostRide onRideSubmit={handleRideSubmit} rides={rides} onSOSPress={handleSOS} />}
        />

        <Route path="/parcel" element={<Parcel/>} /> 


        {/* Home Page */}
        <Route path="/home" element={<Home />} />
        
        {/* Default Route (Redirect to Home page) */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
