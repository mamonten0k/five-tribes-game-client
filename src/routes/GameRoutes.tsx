import { Route, Routes } from 'react-router-dom';
import { GamePage } from '../modules/game';
import { GameProvider } from '../modules/game/ui-providers';

const GameRoutes = () => (
  <Routes>
    <Route element={<GamePage />}>
      <Route path=':gameId' element={<GameProvider />} />
    </Route>
  </Routes>
);

export { GameRoutes };
