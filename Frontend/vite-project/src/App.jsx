import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import OtpVerification from './components/OtpVerification';
import OfferRide from './components/OfferRide';
import FindRide from './components/FindRide';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import OTPVerify from './components/ForgotPassword';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/find-rides" element={<FindRide />} />
          <Route path="/offer-ride" element={<OfferRide />} />
          

        </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;