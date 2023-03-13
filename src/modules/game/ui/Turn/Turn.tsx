import { memo, FC, ReactNode } from 'react';
import styles from '../../index.module.scss';

type TurnTypes = {
  children: ReactNode;
  isRival: boolean;
};

const Turn: FC<TurnTypes> = ({ children, isRival }) => {
  return <div className={`${styles.turn} ${isRival && styles.turn_rival}`}>{children}</div>;
};

export default memo(Turn);
