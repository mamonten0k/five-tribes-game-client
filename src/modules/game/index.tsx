import { Outlet } from 'react-router-dom';
import { PageLayout } from '../../layouts';

import styles from './index.module.scss';

const GamePage = () => {
  return (
    <PageLayout styled={styles.page}>
      <Outlet />
    </PageLayout>
  );
};

export { GamePage };
