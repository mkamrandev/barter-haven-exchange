
import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <div className="mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</h1>
          <p className="mt-3 text-gray-600">The page you are looking for doesn't exist or has been moved.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
          >
            <FaHome className="mr-2" /> Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
