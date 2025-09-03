import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function ProtectedRoute() {
  const { isAuthenticated } = useUser();

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectedRoute;
