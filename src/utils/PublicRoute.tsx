
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AuthState {
  isAuthenticated: boolean;
}

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);
  
  // If user is already authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
