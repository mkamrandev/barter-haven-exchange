
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { fetchItems } from '../redux/slices/itemsSlice';
import Layout from '../components/layout/Layout';
import { FaArrowRight, FaExchangeAlt } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { categories, isLoading: categoriesLoading } = useSelector((state) => state.categories);
  const { items, isLoading: itemsLoading } = useSelector((state) => state.items);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories());
      dispatch(fetchItems());
    }
  }, [dispatch, isAuthenticated]);

  // Hero slider settings
  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  // Category carousel settings
  const categorySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Latest items settings
  const latestItemsSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Get latest 8 items for the latest items section
  const latestItems = items ? [...items].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }).slice(0, 8) : [];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Barter Haven</h1>
          <p className="text-gray-600 mb-8">Please login to access the barter trading platform.</p>
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
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <Slider {...heroSliderSettings}>
            <div className="focus:outline-none">
              <div className="relative h-80 sm:h-96 md:h-[500px] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843" 
                  alt="Barter Trading" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
                  <div className="text-white p-8 md:p-12 max-w-md">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Trade What You Have</h1>
                    <p className="text-lg mb-6">Exchange your unused items for things you actually need. No money required!</p>
                    <Link 
                      to="/items" 
                      className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
                    >
                      Start Trading <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="focus:outline-none">
              <div className="relative h-80 sm:h-96 md:h-[500px] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504893524553-b855bce32c67" 
                  alt="Sustainable Trading" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-transparent flex items-center">
                  <div className="text-white p-8 md:p-12 max-w-md">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Sustainable Trading</h1>
                    <p className="text-lg mb-6">Join our community and help reduce waste by giving items a second life.</p>
                    <Link 
                      to="/how-it-works" 
                      className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
                    >
                      How It Works <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="focus:outline-none">
              <div className="relative h-80 sm:h-96 md:h-[500px] rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
                  alt="Community Exchange" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
                  <div className="text-white p-8 md:p-12 max-w-md">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Community Exchange</h1>
                    <p className="text-lg mb-6">Connect with people in your area and exchange goods without using money.</p>
                    <Link 
                      to="/register" 
                      className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
                    >
                      Join Now <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
            <Link to="/categories" className="text-teal-600 hover:text-teal-800 transition-colors flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>

          {categoriesLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : categories && categories.length > 0 ? (
            <Slider {...categorySettings} className="category-slider">
              {categories.map((category) => (
                <div key={category.id} className="px-2">
                  <Link to={`/categories/${category.id}`} className="block">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 text-center">
                      <div className="w-20 h-20 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-3">
                        {/* Placeholder for category image */}
                        <span className="text-2xl text-teal-600">{category.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-medium text-gray-800 truncate">{category.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No categories available
            </div>
          )}
        </div>
      </section>

      {/* Latest Items Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Latest Items</h2>
            <Link to="/items" className="text-teal-600 hover:text-teal-800 transition-colors flex items-center">
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>

          {itemsLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : latestItems && latestItems.length > 0 ? (
            <Slider {...latestItemsSettings} className="latest-items-slider">
              {latestItems.map((item) => (
                <div key={item.id} className="px-3">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={JSON.parse(item.images)[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {item.category?.name}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800 truncate">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-teal-600 font-medium">${item.price_estimate}</span>
                        <Link 
                          to={`/items/${item.id}`} 
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center"
                        >
                          View <FaArrowRight className="ml-1" size={12} />
                        </Link>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-2 border-t flex items-center text-xs text-gray-500">
                      <FaExchangeAlt className="mr-1" /> Available for trade
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No items available
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Barter Haven Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
              <p className="text-white/80">Add items you no longer need to your inventory with photos and descriptions.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find What You Want</h3>
              <p className="text-white/80">Browse through items others have listed and find something you need.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make an Offer</h3>
              <p className="text-white/80">Propose a trade offering your items in exchange for theirs and finalize the deal.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/items" 
              className="inline-flex items-center bg-white text-teal-600 hover:bg-teal-50 py-3 px-8 rounded-full font-medium transition-colors"
            >
              Start Trading <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
