
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categoriesSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/layout/Layout';
import { FaUpload, FaTimesCircle } from 'react-icons/fa';

const AddItemSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  category_id: Yup.string()
    .required('Category is required'),
  location: Yup.string()
    .required('Location is required'),
  price_estimate: Yup.number()
    .required('Estimated value is required')
    .positive('Estimated value must be positive'),
  images: Yup.array()
    .min(1, 'At least one image is required')
    .required('At least one image is required'),
});

const AddItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isAuthenticated]);

  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Add new files to existing ones
      const newImageFiles = [...imageFiles, ...files];
      setImageFiles(newImageFiles);
      setFieldValue('images', newImageFiles);
      
      // Create previews for new files
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImage = (index, setFieldValue) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
    setFieldValue('images', newImageFiles);
    
    const newPreviews = [...imagePreviews];
    URL.revokeObjectURL(newPreviews[index]); // Revoke the URL to prevent memory leaks
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // This would need to be replaced with an actual API call
    console.log('Submitting new item:', values);
    
    // For now, just show a success message and redirect
    alert('Item added successfully! It will be available after approval.');
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-8">Please login to add items.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6">
                <h1 className="text-2xl font-bold text-white">Add New Item for Trade</h1>
                <p className="text-white/80 mt-1">
                  Complete the form below to list your item. It will be available for trading after approval.
                </p>
              </div>
              
              <Formik
                initialValues={{
                  title: '',
                  description: '',
                  category_id: '',
                  location: '',
                  price_estimate: '',
                  images: [],
                }}
                validationSchema={AddItemSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="p-6">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Item Title *
                        </label>
                        <Field
                          type="text"
                          name="title"
                          id="title"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          placeholder="Enter the title of your item"
                        />
                        <ErrorMessage name="title" component="div" className="mt-1 text-red-600 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          rows={5}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          placeholder="Provide a detailed description of your item"
                        />
                        <ErrorMessage name="description" component="div" className="mt-1 text-red-600 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <Field
                          as="select"
                          name="category_id"
                          id="category_id"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                        >
                          <option value="">Select a category</option>
                          {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="category_id" component="div" className="mt-1 text-red-600 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <Field
                          type="text"
                          name="location"
                          id="location"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          placeholder="Enter your city or location"
                        />
                        <ErrorMessage name="location" component="div" className="mt-1 text-red-600 text-sm" />
                      </div>

                      <div>
                        <label htmlFor="price_estimate" className="block text-sm font-medium text-gray-700 mb-1">
                          Estimated Value ($) *
                        </label>
                        <Field
                          type="number"
                          name="price_estimate"
                          id="price_estimate"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm py-3 px-4 border"
                          placeholder="Enter estimated value in dollars"
                          min="0"
                          step="0.01"
                        />
                        <ErrorMessage name="price_estimate" component="div" className="mt-1 text-red-600 text-sm" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Item Images *
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                                <span>Upload images</span>
                                <input 
                                  id="file-upload" 
                                  name="file-upload" 
                                  type="file"
                                  className="sr-only"
                                  onChange={e => handleImageChange(e, setFieldValue)}
                                  accept="image/*"
                                  multiple
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                        <ErrorMessage name="images" component="div" className="mt-1 text-red-600 text-sm" />

                        {/* Image Previews */}
                        {imagePreviews.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={preview} 
                                  alt={`Preview ${index}`} 
                                  className="h-24 w-full object-cover rounded-md"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-70 hover:opacity-100"
                                  onClick={() => removeImage(index, setFieldValue)}
                                >
                                  <FaTimesCircle />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-gray-200 pt-6 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-teal-500 to-blue-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        {isSubmitting ? 'Submitting...' : 'Add Item for Trade'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddItem;
