import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../modules/common/ui';
import { useGetStatusQuery } from '../utils/api/auth.api';

import * as tokenAPI from '../utils/services/token.service';

function PrivateRoute() {
  const { isLoading, isError } = useGetStatusQuery();

  if (isLoading) {
    return <Spinner message='Загрузка...' />;
  }

  if (isError && !tokenAPI.getToken()) {
    // Непонятная вещь, rtk Query делает 2 запроса через useGetStatusQuery, один из них перед назначением токена. По моему, это из-за useEffect
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export { PrivateRoute };
