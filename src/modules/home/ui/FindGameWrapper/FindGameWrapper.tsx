import { FC, ReactNode } from 'react';

import styles from '../../index.module.scss';

interface FindGameWrapperProps {
  children: ReactNode | ReactNode[];
}

const FindGameWrapper: FC<FindGameWrapperProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export { FindGameWrapper };
