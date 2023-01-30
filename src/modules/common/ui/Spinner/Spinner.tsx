import { FC } from 'react';

import styles from '../index.module.scss';
import giraffeGif from '../../../../assets/img/giraffe.gif';

interface SpinnerProps {
  message: string;
}

const Spinner: FC<SpinnerProps> = ({ message }) => {
  return (
    <div className={styles.loading}>
      <img src={giraffeGif} alt='loading...' />
      <span>{message}</span>
    </div>
  );
};

export { Spinner };
