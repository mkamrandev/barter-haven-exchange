
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaUserEdit, FaKey } from 'react-icons/fa';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    username: user?.username || '',
    email: user?.email || '',
    profile_picture: null,
  });
  
  // Preview for profile picture
  const [imagePreview, setImagePreview] = useState(
    user?.profile_picture ? `http://127.0.0.1:8000/storage/${user.profile_picture}` : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      profile_picture: file,
    });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would need to be replaced with an actual API call
    console.log('Submitting profile update:', formData);
    
    // For now, just show a success message and exit edit mode
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-t-lg p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt={user.username} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center">
                      <FaUser className="text-gray-400" size={40} />
                    </div>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.first_name} {user.last_name}</h1>
                  <p className="text-white/80 text-lg mb-3">@{user.username}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                      <FaEnvelope className="mr-1" /> {user.email}
                    </span>
                    {user.location && (
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                        <FaMapMarkerAlt className="mr-1" /> {user.location}
                      </span>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="md:ml-auto mt-4 md:mt-0 bg-white text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
                  >
                    <FaUserEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-b-lg shadow-md p-6">
              {isEditing ? (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                        required
                      />
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Picture
                      </label>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          {imagePreview ? (
                            <img 
                              src={imagePreview} 
                              alt="Profile preview" 
                              className="h-20 w-20 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                              <FaUser className="text-gray-500" size={30} />
                            </div>
                          )}
                        </div>
                        <div>
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                            <span>Change picture</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-teal-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                        <p className="mt-1 text-gray-900">{user.first_name} {user.last_name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Username</h3>
                        <p className="mt-1 text-gray-900">@{user.username}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                        <p className="mt-1 text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                        <p className="mt-1 text-gray-900">{new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FaKey className="mr-2" /> Change Password
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
