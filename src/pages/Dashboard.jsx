
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserItems } from '../redux/slices/itemsSlice';
import Layout from '../components/layout/Layout';
import { FaPlus, FaBox, FaExchangeAlt, FaHeart, FaUser, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userItems, isLoading } = useSelector((state) => state.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserItems());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view your dashboard.</p>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Group items by approval status
  const pendingItems = userItems.filter(item => item.is_Approved === 'pending');
  const approvedItems = userItems.filter(item => item.is_Approved === 'approved');
  const rejectedItems = userItems.filter(item => item.is_Approved === 'rejected');

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                {user?.profile_picture ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${user.profile_picture}`} 
                    alt={user.username} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                    <FaUser className="text-gray-500" size={24} />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user?.username}'s Dashboard</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <Link
                to="/add-item"
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add New Item
              </Link>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <FaBox className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Total Items</p>
                <h2 className="text-2xl font-bold text-gray-800">{userItems.length}</h2>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <FaExchangeAlt className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Active Trades</p>
                <h2 className="text-2xl font-bold text-gray-800">0</h2>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="rounded-full bg-red-100 p-3 mr-4">
                <FaHeart className="text-red-500" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Wishlist Items</p>
                <h2 className="text-2xl font-bold text-gray-800">0</h2>
              </div>
            </div>
          </div>

          {/* Items Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="border-b">
              <nav className="flex">
                <button className="px-6 py-4 border-b-2 border-teal-500 text-teal-600 font-medium">
                  My Items
                </button>
              </nav>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : userItems.length === 0 ? (
              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No items yet</h3>
                <p className="text-gray-600 mb-6">You haven't added any items for trading yet.</p>
                <Link 
                  to="/add-item" 
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center"
                >
                  <FaPlus className="mr-2" /> Add Your First Item
                </Link>
              </div>
            ) : (
              <div className="p-6">
                {/* Pending Items */}
                {pendingItems.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaClock className="text-yellow-500 mr-2" /> Pending Approval
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pendingItems.map((item) => (
                        <div key={item.id} className="border border-yellow-200 bg-yellow-50 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img 
                              src={JSON.parse(item.images)[0]} 
                              alt={item.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Pending
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                              <span className="text-sm text-gray-500">{item.location}</span>
                            </div>
                          </div>
                          <div className="border-t border-yellow-200 bg-yellow-100 p-3 flex justify-between">
                            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                              <FaEdit className="mr-1" /> Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 flex items-center text-sm">
                              <FaTrash className="mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Approved Items */}
                {approvedItems.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" /> Approved Items
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {approvedItems.map((item) => (
                        <div key={item.id} className="border border-green-200 bg-green-50 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img 
                              src={JSON.parse(item.images)[0]} 
                              alt={item.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Approved
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                              <span className="text-sm text-gray-500">{item.location}</span>
                            </div>
                          </div>
                          <div className="border-t border-green-200 bg-green-100 p-3 flex justify-between">
                            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                              <FaEdit className="mr-1" /> Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 flex items-center text-sm">
                              <FaTrash className="mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rejected Items */}
                {rejectedItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaTimesCircle className="text-red-500 mr-2" /> Rejected Items
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rejectedItems.map((item) => (
                        <div key={item.id} className="border border-red-200 bg-red-50 rounded-lg overflow-hidden">
                          <div className="relative">
                            <img 
                              src={JSON.parse(item.images)[0]} 
                              alt={item.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              Rejected
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                              <span className="text-sm text-gray-500">{item.location}</span>
                            </div>
                          </div>
                          <div className="border-t border-red-200 bg-red-100 p-3 flex justify-between">
                            <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                              <FaEdit className="mr-1" /> Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 flex items-center text-sm">
                              <FaTrash className="mr-1" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
