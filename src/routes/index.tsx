import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

import { LoginPage } from '../modules/login';
import { RegisterPage } from '../modules/register';
import { EntryPage } from '../modules/entry';

function DefaultRouter() {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute />}>
        <Route index element={<Navigate to='/entry' />} />
        <Route path='entry' element={<EntryPage />} />
      </Route>
      <Route path='login/' element={<LoginPage />} />
      <Route path='register/' element={<RegisterPage />} />
    </Routes>
  );
}

export { DefaultRouter };
