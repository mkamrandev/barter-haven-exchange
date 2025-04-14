
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchItemById } from '../redux/slices/itemsSlice';
import Layout from '../components/layout/Layout';
import { FaHeart, FaExchangeAlt, FaMapMarkerAlt, FaUser, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, isLoading } = useSelector((state) => state.items);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isAuthenticated && id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id, isAuthenticated]);

  useEffect(() => {
    if (item && item.images) {
      try {
        const parsedImages = JSON.parse(item.images);
        setImages(parsedImages);
      } catch (error) {
        console.error('Error parsing images:', error);
        setImages([]);
      }
    }
  }, [item]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const handleOffer = () => {
    navigate(`/offer/${id}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view item details.</p>
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
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : !item ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Item not found</h3>
              <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or might have been removed.</p>
              <Link 
                to="/items" 
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Items
              </Link>
            </div>
          ) : (
            <>
              {/* Back Button */}
              <Link 
                to="/items" 
                className="inline-flex items-center mb-6 text-teal-600 hover:text-teal-800"
              >
                <FaArrowLeft className="mr-2" /> Back to Items
              </Link>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  {/* Image Gallery */}
                  <div className="md:w-1/2">
                    {images && images.length > 0 ? (
                      <Slider {...sliderSettings}>
                        {images.map((image, index) => (
                          <div key={index} className="focus:outline-none">
                            <img 
                              src={image} 
                              alt={`${item.title} - Image ${index + 1}`} 
                              className="w-full h-96 object-cover"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <div className="bg-gray-200 h-96 flex items-center justify-center text-gray-500">
                        No images available
                      </div>
                    )}
                  </div>

                  {/* Item Information */}
                  <div className="md:w-1/2 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{item.title}</h1>
                        <div className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-4">
                          {item.category?.name}
                        </div>
                      </div>
                      <button 
                        className="text-red-500 hover:text-red-600 p-2"
                        aria-label="Add to wishlist"
                      >
                        <FaHeart size={24} />
                      </button>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">Estimated Value</h2>
                      <div className="text-2xl font-bold text-teal-600">${item.price_estimate}</div>
                    </div>

                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 mb-6">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-600 mr-2" />
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-600 mr-2" />
                        <span className="text-gray-700">
                          Listed on {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Owner Information */}
                    <div className="border-t border-gray-200 pt-6 mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Item Owner</h2>
                      <div className="flex items-center">
                        {item.user?.profile_picture ? (
                          <img 
                            src={`http://127.0.0.1:8000/storage/${item.user.profile_picture}`} 
                            alt={item.user.username} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                            <FaUser className="text-gray-500" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-800">{item.user?.username}</h3>
                          <p className="text-gray-600 text-sm">
                            {item.user?.first_name} {item.user?.last_name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Trade Button */}
                    {user && item.user && user.id !== item.user.id && (
                      <button 
                        onClick={handleOffer}
                        className="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-blue-600 flex items-center justify-center transition-colors"
                      >
                        <FaExchangeAlt className="mr-2" /> Make Trade Offer
                      </button>
                    )}
                    
                    {user && item.user && user.id === item.user.id && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-700">
                        This is your item. You cannot make offers on your own items.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
