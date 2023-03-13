import { Outlet } from 'react-router-dom';
import { PageLayout } from '../../layouts';
import { TurnsProvider } from './ui-providers/TurnsProvider/TurnsProvider';
import { PlayerProvider } from './ui-providers/PlayerProvider/PlayerProvider';

import styles from './index.module.scss';

const GamePage = () => {
  return (
    <PageLayout styled={styles.page}>
      <TurnsProvider />
      <PlayerProvider.User />
      <Outlet />
      <PlayerProvider.Rival />
    </PageLayout>
  );
};

export { GamePage };
