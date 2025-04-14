
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, clearError } from '../../redux/slices/authSlice';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaUpload } from 'react-icons/fa';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  profile_picture: Yup.mixed().required('Profile picture is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
    
    // If user is already authenticated, redirect to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleSubmit = (values) => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('profile_picture', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
            <p className="text-gray-600">Join Barter Haven and start trading</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error.message || 'Registration failed. Please try again.'}</p>
            </div>
          )}

          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirm_password: '',
              first_name: '',
              last_name: '',
              profile_picture: null,
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FaUser />
                      </div>
                      <Field
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                        placeholder="First name"
                      />
                    </div>
                    <ErrorMessage name="first_name" component="div" className="mt-1 text-red-600 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FaUser />
                      </div>
                      <Field
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                        placeholder="Last name"
                      />
                    </div>
                    <ErrorMessage name="last_name" component="div" className="mt-1 text-red-600 text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaUser />
                    </div>
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                      placeholder="Choose a username"
                    />
                  </div>
                  <ErrorMessage name="username" component="div" className="mt-1 text-red-600 text-sm" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaEnvelope />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                      placeholder="Enter your email"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FaLock />
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                        placeholder="Create a password"
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FaLock />
                      </div>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="confirm_password"
                        id="confirm_password"
                        className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                        placeholder="Confirm your password"
                      />
                    </div>
                    <ErrorMessage name="confirm_password" component="div" className="mt-1 text-red-600 text-sm" />
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-700">
                    Show password
                  </label>
                </div>

                <div>
                  <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Profile preview" 
                          className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                          <FaUser size={24} />
                        </div>
                      )}
                    </div>
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
                      <span className="flex items-center">
                        <FaUpload className="mr-2" /> Upload a file
                      </span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file"
                        className="sr-only"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <ErrorMessage name="profile_picture" component="div" className="mt-1 text-red-600 text-sm" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                  >
                    {isLoading ? (
                      <span>Creating account...</span>
                    ) : (
                      <>
                        <FaUserPlus className="mr-2" /> Create Account
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-teal-600 hover:text-teal-800 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
