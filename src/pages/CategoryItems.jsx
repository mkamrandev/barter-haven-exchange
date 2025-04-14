
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById } from '../redux/slices/categoriesSlice';
import { fetchItems } from '../redux/slices/itemsSlice';
import Layout from '../components/layout/Layout';
import { FaHeart, FaEye, FaArrowLeft } from 'react-icons/fa';

const CategoryItems = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { category, isLoading: categoryLoading } = useSelector((state) => state.categories);
  const { items, isLoading: itemsLoading } = useSelector((state) => state.items);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && id) {
      dispatch(fetchCategoryById(id));
      dispatch(fetchItems());
    }
  }, [dispatch, id, isAuthenticated]);

  useEffect(() => {
    if (items && id) {
      // Filter items by category id and approved status
      const filtered = items.filter(
        item => item.category_id.toString() === id.toString() && item.is_Approved === 'approved'
      );
      setFilteredItems(filtered);
    }
  }, [items, id]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view category items.</p>
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

  const isLoading = categoryLoading || itemsLoading;

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center mb-6 text-teal-600 hover:text-teal-800"
          >
            <FaArrowLeft className="mr-2" /> Back to Home
          </Link>

          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : category ? (
            <>
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg p-8 mb-8">
                <h1 className="text-3xl font-bold mb-3">{category.name}</h1>
                <p className="text-white/90 text-lg">{category.description}</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">Items in this Category</h2>

              {filteredItems && filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={JSON.parse(item.images)[0]} 
                          alt={item.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <button 
                            className="bg-white/80 hover:bg-white text-red-500 p-2 rounded-full transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <FaHeart />
                          </button>
                          <Link 
                            to={`/items/${item.id}`}
                            className="bg-white/80 hover:bg-white text-blue-500 p-2 rounded-full transition-colors"
                            aria-label="View item"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                            <span className="ml-2 text-xs text-gray-500">(Estimated Value)</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.location}</span>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-gray-50 border-t flex justify-between items-center">
                        <div className="flex items-center text-sm">
                          {item.user?.profile_picture ? (
                            <img 
                              src={`http://127.0.0.1:8000/storage/${item.user.profile_picture}`} 
                              alt={item.user.username} 
                              className="w-6 h-6 rounded-full mr-2 object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                          )}
                          <span className="text-gray-700 truncate max-w-[100px]">{item.user?.username}</span>
                        </div>
                        <Link 
                          to={`/items/${item.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                  <p className="text-gray-600">There are currently no items available in this category.</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Category not found</h3>
              <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or might have been removed.</p>
              <Link 
                to="/" 
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryItems;
