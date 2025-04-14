
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const PrivateRoute = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth as AuthState);
  
  // Check if user is authenticated, otherwise redirect to login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
