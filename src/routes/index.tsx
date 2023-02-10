import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import { LoginPage } from '../modules/login';
import { RegisterPage } from '../modules/register';
import { HomePage } from '../modules/home';
import { GameRoutes } from './GameRoutes';

function DefaultRouter() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route index element={<Navigate to='home' />} />
        <Route path='home' element={<HomePage />} />
        <Route path='game/*' element={<GameRoutes />} />
      </Route>
      <Route path='login/' element={<LoginPage />} />
      <Route path='register/' element={<RegisterPage />} />
    </Routes>
  );
}

export { DefaultRouter };
