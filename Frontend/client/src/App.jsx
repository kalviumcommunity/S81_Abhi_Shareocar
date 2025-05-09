// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import RideList from "./components/RideList";
import OfferRide from "./components/OfferRide";
import ForgotPassword from "./components/ForgotPassword";
import Emergency from "./components/emergency";
import ContactSupport from "./components/ContactSupport";
import Payment from "./components/Payment";
import Parcelotion from "./components/Parcelotion";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ride-list" element={<RideList />} />
        <Route path="/offer-ride" element={<OfferRide />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/parcelotion" element={<Parcelotion />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFailed />} />
      </Routes>
    </Router>
  );
};

export default App;
