
import React from 'react';
import ItemCard from './ItemCard';

interface Item {
  id: number;
  title: string;
  description: string;
  images: string;
  category?: {
    name: string;
  };
  price_estimate: string;
  location: string;
  user?: {
    username: string;
    profile_picture?: string;
  };
}

interface ItemsGridProps {
  items: Item[];
  isLoading: boolean;
  handleReset: () => void;
}

const ItemsGrid = ({ items, isLoading, handleReset }: ItemsGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsGrid;
