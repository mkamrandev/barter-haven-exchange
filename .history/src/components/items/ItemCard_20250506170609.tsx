import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye } from 'react-icons/fa';

interface ItemCardProps {
  item: {
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
  };
}

const ItemCard = ({ item }: ItemCardProps) => {
  // Backend URL - adjust this based on your Laravel configuration
  const API_BASE_URL = 'http://127.0.0.1:8000';
  
  const getImageUrl = () => {
    try {
      const parsedImages = JSON.parse(item.images);
      
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        let imageUrl = parsedImages[0];
        
        // If the URL is already absolute (starts with http), use it as is
        if (imageUrl.startsWith('http')) {
          return imageUrl;
        }
        
        // If it's a relative path, prefix it with the API base URL
        // Remove leading slash if it exists
        if (imageUrl.startsWith('/')) {
          imageUrl = imageUrl.substring(1);
        }
        
        return `${API_BASE_URL}/${imageUrl}`;
      }
      
      return 'https://via.placeholder.com/300';
    } catch (e) {
      console.error('Error parsing image URL:', e, item.images);
      
      // Try a direct approach - check if the image string contains a URL
      if (typeof item.images === 'string' && item.images.includes('storage/uploads')) {
        // Extract path from the string using regex
        const match = item.images.match(/storage\/uploads\/[^"\\]+/);
        if (match) {
          return `${API_BASE_URL}/${match[0]}`;
        }
      }
      
      return 'https://via.placeholder.com/300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={getImageUrl()} 
          alt={item.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.error('Failed to load image:', getImageUrl());
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
          }}
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
              src={`${API_BASE_URL}/storage/${item.user.profile_picture}`} 
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
  );
};

export default ItemCard;