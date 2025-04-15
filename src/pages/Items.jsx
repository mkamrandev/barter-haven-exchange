
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/slices/itemsSlice';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import Layout from '../components/layout/Layout';
import { FaFilter } from 'react-icons/fa';
import ItemsFilter from '../components/items/ItemsFilter';
import ItemsGrid from '../components/items/ItemsGrid';

const Items = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { items, otherUsersItems, isLoading } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.categories);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

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
    // Log what we're working with
    console.log('Items from store:', items);
    console.log('Other users items from store:', otherUsersItems);
    
    // Set initial items for display - using either otherUsersItems or items
    const displayItems = otherUsersItems && otherUsersItems.length > 0 ? otherUsersItems : items;
    console.log('Display items before filtering:', displayItems);
    
    if (displayItems && displayItems.length > 0) {
      let filtered = [...displayItems];
      
      if (searchQuery) {
        filtered = filtered.filter(
          item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(item => item.category_id.toString() === selectedCategory);
      }
      
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
      
      console.log('Filtered items after processing:', filtered);
      setFilteredItems(filtered);
    } else {
      console.log('No items available for filtering');
      setFilteredItems([]);
    }
  }, [items, otherUsersItems, searchQuery, selectedCategory, sortOption]);

  const handleSearch = (e) => {
    e.preventDefault();
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

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortOption('latest');
    navigate('/items');
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

  console.log('Total items available:', otherUsersItems?.length);
  console.log('Filtered items:', filteredItems?.length);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Available Items</h1>
            
            <button 
              className="md:hidden bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700 flex items-center"
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              <FaFilter className="mr-2" /> Filter Options
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className={`lg:block ${isFilterVisible ? 'block' : 'hidden'} lg:col-span-1`}>
              <ItemsFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                selectedCategory={selectedCategory}
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                sortOption={sortOption}
                handleSortChange={handleSortChange}
              />
            </div>
            
            <div className="lg:col-span-3">
              <ItemsGrid
                items={filteredItems}
                isLoading={isLoading}
                handleReset={handleReset}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Items;
