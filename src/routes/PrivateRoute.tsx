import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading</div>;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to='/login' />;
}

export { PrivateRoute };
