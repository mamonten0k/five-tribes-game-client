import { Navigate, Outlet } from 'react-router-dom';
import { useGetStatusQuery } from '../utils/api/auth.api';

// import * as tokenAPI from '../utils/services/token.service';

function PrivateRoute() {
  const { isError } = useGetStatusQuery();

  if (isError) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export { PrivateRoute };
