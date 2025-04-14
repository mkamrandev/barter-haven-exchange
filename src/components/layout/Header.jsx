
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaSearch, FaUser, FaHeart, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from '../../redux/slices/authSlice';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      });
    setIsProfileDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/items?search=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Menu Icon */}
          <div className="flex items-center">
            <button 
              className="mr-3 text-xl hover:text-teal-200 transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <FaBars />
            </button>
            <Link to="/" className="text-2xl font-bold hover:text-teal-200 transition-colors">
              Barter Haven
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-teal-500"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="hover:text-teal-200 transition-colors" aria-label="Wishlist">
                  <FaHeart />
                </Link>
                <div className="relative">
                  <button 
                    className="flex items-center hover:text-teal-200 transition-colors"
                    onClick={toggleProfileDropdown}
                    aria-label="Profile"
                  >
                    {user?.profile_picture ? (
                      <img 
                        src={`http://127.0.0.1:8000/storage/${user.profile_picture}`} 
                        alt={user.username} 
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser />
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                      <div className="py-1 text-sm text-gray-700">
                        <Link 
                          to="/profile" 
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={closeMenus}
                        >
                          Profile
                        </Link>
                        <Link 
                          to="/dashboard" 
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                          onClick={closeMenus}
                        >
                          Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-teal-200 transition-colors flex items-center"
                  aria-label="Login"
                >
                  <FaSignInAlt className="mr-1" /> Login
                </Link>
                <Link 
                  to="/register" 
                  className="hover:text-teal-200 transition-colors flex items-center"
                  aria-label="Register"
                >
                  <FaUserPlus className="mr-1" /> Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-teal-500"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </form>
        </div>
      </div>

      {/* Categories Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMenus}
            aria-hidden="true"
          ></div>
          
          {/* Sidebar */}
          <div className="relative bg-white text-gray-800 w-64 max-w-xs shadow-xl overflow-auto">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-teal-600">Categories</h2>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-2">
                {isAuthenticated && categories?.map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/categories/${category.id}`}
                      className="block py-2 px-4 hover:bg-teal-50 hover:text-teal-600 rounded transition-colors"
                      onClick={closeMenus}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                {!isAuthenticated && (
                  <li className="py-2 px-4 text-gray-500">
                    Please login to view categories
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
