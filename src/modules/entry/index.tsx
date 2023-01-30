import { PageLayout } from '../../layouts';

import { FindGameProvider } from './ui-providers';

import styles from './index.module.scss';

const EntryPage = () => {
  return (
    <PageLayout styled={styles.page}>
      <FindGameProvider />
    </PageLayout>
  );
};

export { EntryPage };
