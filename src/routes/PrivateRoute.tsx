import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../modules/common/ui';

function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner message='Загрузка...' />;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to='/login' />;
}

export { PrivateRoute };
