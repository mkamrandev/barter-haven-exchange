
import React from 'react';
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaSort } from 'react-icons/fa';

interface ItemsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Array<{ id: number; name: string }>;
  sortOption: string;
  handleSortChange: (option: string) => void;
}

const ItemsFilter = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  selectedCategory,
  handleCategoryChange,
  categories,
  sortOption,
  handleSortChange
}: ItemsFilterProps) => {
  return (
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
  );
};

export default ItemsFilter;
