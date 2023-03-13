import { FC, ReactNode } from 'react';

import styles from '../../index.module.scss';

interface ExistingGamesProps {
  children: ReactNode[] | undefined | null;
}

const ExistingGames: FC<ExistingGamesProps> = ({ children }) => {
  return (
    <ul className={styles.list}>
      {children &&
        children.map((game) => (
          <li key={Math.random()} className={styles.game}>
            {game}
          </li>
        ))}
    </ul>
  );
};

export { ExistingGames };
