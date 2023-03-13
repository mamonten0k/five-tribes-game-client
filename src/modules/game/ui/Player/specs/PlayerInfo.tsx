import { FC } from 'react';

import styles from '../../../index.module.scss';

type PlayerInfoProps = {
  coinsAmt: number;
};

export const PlayerInfo: FC<PlayerInfoProps> = ({ coinsAmt }) => {
  return (
    <div className={styles.info}>
      <span>
        <strong>{coinsAmt}</strong>
      </span>
    </div>
  );
};
