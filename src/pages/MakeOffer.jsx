
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemById } from '../redux/slices/itemsSlice';
import { fetchUserItems } from '../redux/slices/itemsSlice';
import Layout from '../components/layout/Layout';
import { FaExchangeAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';

const MakeOffer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, userItems, isLoading } = useSelector((state) => state.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && id) {
      dispatch(fetchItemById(id));
      dispatch(fetchUserItems());
    }
  }, [dispatch, id, isAuthenticated]);

  const handleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleSubmitOffer = () => {
    // This would need to be replaced with an actual API call
    console.log('Offering items with IDs:', selectedItems);
    console.log('For item with ID:', id);

    // For now, just show a success message and redirect
    alert('Your offer has been submitted successfully!');
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to make trade offers.</p>
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

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to={`/items/${id}`} 
            className="inline-flex items-center mb-6 text-teal-600 hover:text-teal-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Item
          </Link>

          <h1 className="text-3xl font-bold text-gray-800 mb-8">Make a Trade Offer</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Item They Want */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Item You Want</h2>
                  {item ? (
                    <div className="flex">
                      <div className="w-24 h-24 flex-shrink-0 mr-4">
                        <img 
                          src={item.images ? JSON.parse(item.images)[0] : ''} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.description.substring(0, 100)}...</p>
                        <div className="flex items-center justify-between">
                          <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                          <span className="text-sm text-gray-500">{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      Item not found
                    </div>
                  )}
                </div>
              </div>

              {/* Your Offer */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Offer Summary</h2>
                  
                  <div className="mb-4">
                    <div className="text-gray-700 mb-2">
                      <span className="font-medium">Selected Items:</span> {selectedItems.length}
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-12 h-1 bg-gray-200 rounded-full flex-grow mr-2"></div>
                      <FaExchangeAlt className="text-teal-500" />
                      <div className="w-12 h-1 bg-gray-200 rounded-full flex-grow ml-2"></div>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmitOffer}
                    disabled={selectedItems.length === 0}
                    className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      selectedItems.length > 0 
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <FaCheck className="mr-2" /> Submit Offer
                  </button>
                  
                  {selectedItems.length === 0 && (
                    <div className="mt-3 text-sm text-center text-gray-500">
                      Select at least one item to make an offer
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Your Items */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Items</h2>
            
            {userItems && userItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userItems.map((userItem) => (
                  <div 
                    key={userItem.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border-2 ${
                      selectedItems.includes(userItem.id) ? 'border-teal-500' : 'border-transparent'
                    }`}
                    onClick={() => handleItemSelection(userItem.id)}
                  >
                    <div className="relative">
                      <img 
                        src={JSON.parse(userItem.images)[0]} 
                        alt={userItem.title} 
                        className="w-full h-48 object-cover"
                      />
                      {selectedItems.includes(userItem.id) && (
                        <div className="absolute inset-0 bg-teal-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-teal-500 text-white rounded-full p-2">
                            <FaCheck size={20} />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {userItem.category?.name}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800">{userItem.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{userItem.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-teal-600 font-medium">${userItem.price_estimate}</span>
                        <span className="text-sm text-gray-500">{userItem.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                <p className="text-gray-600 mb-6">You need to add items before you can make offers.</p>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Add Items
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MakeOffer;
