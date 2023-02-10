import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../index.module.scss';

interface BulletinGameData {
  id: string;
  rival: string;
  timestamp: string;
}

interface ExisitngGameBulletinProps extends BulletinGameData {
  onClick: (e: MouseEvent) => void;
}

const ExisitngGameBulletin: FC<ExisitngGameBulletinProps> = ({ id, rival, timestamp, onClick }) => {
  return (
    <Link to={`/game?gameId=${id}`} onClick={onClick} className={styles.bulletin}>
      <span className={styles.id}>{id.slice(0, 4)}</span>
      <span className={styles.rival}>{rival}</span>
      <span className={styles.timestamp}>{timestamp.slice(-8)}</span>
    </Link>
  );
};

export { ExisitngGameBulletin };
