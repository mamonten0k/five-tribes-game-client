import { FC } from 'react';

import styles from '../index.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div className={styles.error}>{message}</div>;
};

export { ErrorMessage };
