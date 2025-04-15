
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';

const useAxiosInterceptor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        // If token exists, add it to the headers
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        // Handle token expiration
        if (error.response && error.response.status === 401) {
          // Clear token and logout user
          localStorage.removeItem('token');
          dispatch(logoutUser());
        }
        
        return Promise.reject(error);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch]);

  return null;
};

export default useAxiosInterceptor;
