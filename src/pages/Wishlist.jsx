
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import { FaHeart, FaTrash, FaExchangeAlt } from 'react-icons/fa';

const Wishlist = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // This would come from an API call in a real application
  const wishlistItems = [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view your wishlist.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <FaHeart className="text-red-500 mr-3" /> My Wishlist
            </h1>

            {wishlistItems.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                      <div className="sm:w-32 sm:h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                          </div>
                          <div className="text-teal-600 font-medium mt-2 sm:mt-0">${item.price_estimate}</div>
                        </div>
                        <p className="text-gray-700 text-sm mt-3">{item.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link 
                            to={`/items/${item.id}`}
                            className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded flex items-center"
                          >
                            <FaExchangeAlt className="mr-1" /> Make Offer
                          </Link>
                          <button 
                            className="bg-white border border-red-500 text-red-500 hover:bg-red-50 text-sm font-medium px-3 py-1 rounded flex items-center"
                          >
                            <FaTrash className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <FaHeart className="text-red-500" size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">
                  Browse items and add them to your wishlist to keep track of things you're interested in trading for.
                </p>
                <Link 
                  to="/items" 
                  className="inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Browse Items
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
