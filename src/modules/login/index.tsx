import { PageLayout } from '../../layouts';
import { FormProvider } from './ui-providers';

import styles from './index.module.scss';

const LoginPage = () => {
  return (
    <PageLayout styled={styles.page}>
      <FormProvider />
    </PageLayout>
  );
};

export { LoginPage };
