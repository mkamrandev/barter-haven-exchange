
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { RootState, AppDispatch } from '../../redux/store';

interface LayoutProps {
  children: React.ReactNode;
}

interface AuthState {
  isAuthenticated: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCategories());
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
