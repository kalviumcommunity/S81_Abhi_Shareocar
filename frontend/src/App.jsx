import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SOSButton from './components/SOSButton.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
// OTP flow removed for smooth signup/login
import RideList from './pages/RideList.jsx';
import RideDetail from './pages/RideDetail.jsx';
import PostRide from './pages/PostRide.jsx';
import Courier from './pages/Courier.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          { /* OTP flow removed */ }
          <Route path="/rides" element={<RideList />} />
          <Route path="/rides/:id" element={<RideDetail />} />
          <Route path="/post-ride" element={<ProtectedRoute><PostRide /></ProtectedRoute>} />
          <Route path="/courier" element={<ProtectedRoute><Courier /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <SOSButton />
      <Footer />
    </div>
  );
}
