
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaExchangeAlt, FaSearch, FaHeart } from 'react-icons/fa';
import { User, LogOut } from 'lucide-react';
import { logoutUser } from '../../redux/slices/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
        </div>
        
        {/* Main navigation bar */}
        <div className="py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FaExchangeAlt className="text-2xl text-teal-600 mr-2" />
            <span className="text-xl font-bold text-teal-600">Barter Haven</span>
          </Link>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-md mx-4">
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
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="text-gray-700 hover:text-teal-600">
              <FaHeart size={20} />
            </Link>
            
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <User className="text-gray-700 hover:text-teal-600 cursor-pointer" size={22} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border rounded-md shadow-md min-w-[180px] z-50">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center w-full p-2 hover:bg-gray-100">
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center w-full p-2 hover:bg-gray-100">
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout} className="flex items-center w-full p-2 hover:bg-gray-100 text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center w-full p-2 hover:bg-gray-100">
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register" className="flex items-center w-full p-2 hover:bg-gray-100">
                        <span>Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
