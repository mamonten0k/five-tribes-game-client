import { Navigate, Outlet } from 'react-router-dom';
import { useGetStatusQuery } from '../utils/api/auth.api';

function PrivateRoute() {
  const { isError } = useGetStatusQuery();

  if (isError) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export { PrivateRoute };
