import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../modules/common/ui';
import useSession from '../hooks/useSession';

function PrivateRoute() {
  const { data, isLoading, isFetching, isFetchedAfterMount, isError, refetch } = useSession();

  if (isLoading && isFetching) {
    return <Spinner message='Подгружаем необходимую информацию' />;
  }

  if (!isFetchedAfterMount) {
    refetch();
    return <Spinner message='Подгружаем необходимую информацию' />;
  }

  if (data?.rejected || isError) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}

export { PrivateRoute };
