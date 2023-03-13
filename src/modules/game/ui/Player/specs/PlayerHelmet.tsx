import { FC } from 'react';

import styles from '../../../index.module.scss';

type PlayerHelmetProps = {
  name: string;
};

export const PlayerHelmet: FC<PlayerHelmetProps> = ({ name }) => {
  return (
    <header className={styles.helmet}>
      <span>
        <strong>{name}</strong>
      </span>
    </header>
  );
};
