import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white/90 backdrop-blur shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-brand">ShareOCar</Link>
        <div className="flex items-center gap-4">
          <Link to="/rides" className="text-brand hover:underline">Find Rides</Link>
          <Link to="/post-ride" className="text-brand hover:underline">Post Ride</Link>
          <Link to="/parcel" className="text-brand hover:underline">Send Parcel</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-brand hover:underline">Dashboard</Link>
              {user.role === 'admin' && (<Link to="/admin" className="text-brand hover:underline">Admin</Link>)}
              <button onClick={logout} className="bg-brand text-white px-3 py-1 rounded hover:bg-brand-dark">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-brand hover:underline">Login</Link>
              <Link to="/signup" className="text-brand hover:underline">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
