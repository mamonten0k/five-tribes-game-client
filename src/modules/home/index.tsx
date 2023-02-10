import { PageLayout } from '../../layouts';

import { ExistingGamesProvider, FindGameProvider } from './ui-providers';

import styles from './index.module.scss';

const HomePage = () => {
  return (
    <PageLayout styled={styles.page}>
      <ExistingGamesProvider />
      <FindGameProvider />
    </PageLayout>
  );
};

export { HomePage };
