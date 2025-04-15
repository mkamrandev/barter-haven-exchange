
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaSignOutAlt, FaExchangeAlt, FaHome, FaPlus, FaHeart, FaTh } from 'react-icons/fa';
import { logoutUser } from '../../redux/slices/authSlice';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center">
            <FaExchangeAlt className="text-2xl mr-2" />
            <span className="text-xl font-bold">Barter Haven</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="flex items-center hover:text-teal-100 transition-colors">
              <FaHome className="mr-1" /> Home
            </Link>
            <Link to="/items" className="flex items-center hover:text-teal-100 transition-colors">
              <FaTh className="mr-1" /> Browse Items
            </Link>
            <Link to="/dashboard" className="flex items-center hover:text-teal-100 transition-colors">
              <FaUser className="mr-1" /> Dashboard
            </Link>
            <Link to="/add-item" className="flex items-center hover:text-teal-100 transition-colors">
              <FaPlus className="mr-1" /> Add Item
            </Link>
            <Link to="/wishlist" className="flex items-center hover:text-teal-100 transition-colors">
              <FaHeart className="mr-1" /> Wishlist
            </Link>
          </nav>
          
          {/* User Menu / Auth Buttons */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center hover:text-teal-100 transition-colors">
                  {user?.profile_picture ? (
                    <img 
                      src={`http://127.0.0.1:8000/storage/${user.profile_picture}`} 
                      alt={user.username} 
                      className="w-8 h-8 rounded-full mr-2 object-cover border-2 border-white"
                    />
                  ) : (
                    <FaUser className="mr-2" />
                  )}
                  <span className="hidden lg:inline">{user?.username || 'Profile'}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center hover:text-teal-100 transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-white text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white/10 transition-colors hidden sm:inline-block"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
