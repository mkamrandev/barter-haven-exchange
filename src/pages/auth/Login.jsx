
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../../redux/slices/authSlice';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const LoginSchema = Yup.object().shape({
  login: Yup.string().required('Email or username is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your Barter Haven account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error.message || 'Login failed. Please try again.'}</p>
            </div>
          )}

          <Formik
            initialValues={{ login: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                      <FaEnvelope />
                    </div>
                    <Field
                      type="text"
                      name="login"
                      id="login"
                      className="pl-10 block w-full shadow-sm rounded-md border-gray-300 focus:ring-teal-500 focus:border-teal-500 transition-colors py-3 border"
                      placeholder="Enter your email or username"
                    />
                  </div>
                  <ErrorMessage name="login" component="div" className="mt-1 text-red-600 text-sm" />
                </div>

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
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                  >
                    {isLoading ? (
                      <span>Signing in...</span>
                    ) : (
                      <>
                        <FaSignInAlt className="mr-2" /> Sign In
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-teal-600 hover:text-teal-800 font-medium transition-colors">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
