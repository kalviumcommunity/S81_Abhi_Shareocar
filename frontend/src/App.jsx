import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SOSButton from './components/SOSButton';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OTPVerify from './pages/OTPVerify';
import Home from './pages/Home';
import RideList from './pages/RideList';
import RideDetail from './pages/RideDetail';
import PostRide from './pages/PostRide';
import ParcelForm from './pages/ParcelForm';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/rides" element={<RideList />} />
            <Route path="/rides/:id" element={<RideDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<OTPVerify />} />
            <Route path="/post-ride" element={<ProtectedRoute><PostRide /></ProtectedRoute>} />
            <Route path="/parcel" element={<ProtectedRoute><ParcelForm /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
        <SOSButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
