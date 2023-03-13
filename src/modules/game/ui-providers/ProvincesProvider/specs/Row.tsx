import { FC, ReactNode } from 'react';

import styles from '../../../index.module.scss';

type RowProps = { children: ReactNode };

export const Row: FC<RowProps> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};
