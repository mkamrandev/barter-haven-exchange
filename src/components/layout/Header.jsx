
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaSignOutAlt, FaExchangeAlt, FaBars, FaSearch } from 'react-icons/fa';
import { logoutUser } from '../../redux/slices/authSlice';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/items?search=${searchTerm}`);
    }
  };

  return (
    <header className="bg-white text-gray-700 shadow-md">
      <div className="container mx-auto px-4">
        {/* Top navigation bar */}
        <div className="py-2 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm">Download App</span>
            <span className="text-sm">Sell on Barter Haven</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-sm hover:text-teal-600 transition-colors">
                  Hi, {user?.username || 'User'}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm hover:text-teal-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-sm hover:text-teal-600 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-sm hover:text-teal-600 transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Main navigation bar */}
        <div className="py-4 flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center mb-4 md:mb-0">
            <FaExchangeAlt className="text-2xl text-teal-600 mr-2" />
            <span className="text-xl font-bold text-teal-600">Barter Haven</span>
          </Link>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-1/2 mb-4 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-500"
              >
                <FaSearch />
              </button>
            </div>
          </form>
          
          {/* Mobile menu button */}
          <button 
            className="text-gray-700 focus:outline-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FaBars size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        {showMobileMenu && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center hover:text-teal-600 transition-colors">
                    <FaUser className="mr-2" /> Profile
                  </Link>
                  <Link to="/dashboard" className="flex items-center hover:text-teal-600 transition-colors">
                    <FaUser className="mr-2" /> Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-left hover:text-teal-600 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center hover:text-teal-600 transition-colors">
                    <FaUser className="mr-2" /> Login
                  </Link>
                  <Link to="/register" className="flex items-center hover:text-teal-600 transition-colors">
                    <FaUser className="mr-2" /> Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
