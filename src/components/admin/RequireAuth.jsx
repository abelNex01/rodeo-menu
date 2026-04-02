import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';

export default function RequireAuth({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
