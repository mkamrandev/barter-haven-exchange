
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slices/itemsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import Layout from '../components/layout/Layout';
import { FaSearch, FaSort, FaSortAmountDown, FaSortAmountUp, FaFilter, FaHeart, FaEye } from 'react-icons/fa';

const Items = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { items, isLoading } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.categories);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Get search query from URL if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchItems());
      dispatch(fetchCategories());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (items) {
      let filtered = [...items];
      
      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter(
          item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(item => item.category_id.toString() === selectedCategory);
      }
      
      // Sort items
      switch (sortOption) {
        case 'latest':
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        case 'price_high':
          filtered.sort((a, b) => parseFloat(b.price_estimate) - parseFloat(a.price_estimate));
          break;
        case 'price_low':
          filtered.sort((a, b) => parseFloat(a.price_estimate) - parseFloat(b.price_estimate));
          break;
        default:
          break;
      }
      
      setFilteredItems(filtered);
    }
  }, [items, searchQuery, selectedCategory, sortOption]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query
    if (searchQuery.trim()) {
      navigate(`/items?search=${searchQuery}`);
    } else {
      navigate('/items');
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view available items for trade.</p>
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
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Available Items</h1>
            
            {/* Mobile filter toggle */}
            <button 
              className="md:hidden bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700 flex items-center"
              onClick={toggleFilterVisibility}
            >
              <FaFilter className="mr-2" /> Filter Options
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:block ${isFilterVisible ? 'block' : 'hidden'} lg:col-span-1`}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
                
                {/* Search Filter */}
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-2">Search</h3>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-500"
                      >
                        <FaSearch />
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-2">Category</h3>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="">All Categories</option>
                    {categories && categories.map(category => (
                      <option key={category.id} value={category.id.toString()}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sort Options */}
                <div>
                  <h3 className="text-gray-700 font-medium mb-2">Sort By</h3>
                  <div className="space-y-2">
                    <button 
                      className={`w-full py-2 px-3 rounded-lg flex items-center justify-between ${sortOption === 'latest' ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleSortChange('latest')}
                    >
                      <span>Latest First</span>
                      {sortOption === 'latest' && <FaSortAmountDown />}
                    </button>
                    <button 
                      className={`w-full py-2 px-3 rounded-lg flex items-center justify-between ${sortOption === 'oldest' ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleSortChange('oldest')}
                    >
                      <span>Oldest First</span>
                      {sortOption === 'oldest' && <FaSortAmountUp />}
                    </button>
                    <button 
                      className={`w-full py-2 px-3 rounded-lg flex items-center justify-between ${sortOption === 'price_high' ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleSortChange('price_high')}
                    >
                      <span>Price: High to Low</span>
                      {sortOption === 'price_high' && <FaSort />}
                    </button>
                    <button 
                      className={`w-full py-2 px-3 rounded-lg flex items-center justify-between ${sortOption === 'price_low' ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleSortChange('price_low')}
                    >
                      <span>Price: Low to High</span>
                      {sortOption === 'price_low' && <FaSort />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Items Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-60">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                </div>
              ) : filteredItems && filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={JSON.parse(item.images)[0]} 
                          alt={item.title} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {item.category?.name}
                        </div>
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
                  <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('');
                      setSortOption('latest');
                      navigate('/items');
                    }}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Items;
