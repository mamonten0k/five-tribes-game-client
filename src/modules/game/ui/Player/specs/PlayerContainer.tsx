import { FC, ReactNode } from 'react';

import styles from '../../../index.module.scss';

type PlayerContainerProps = { styled?: string; children: ReactNode };

export const PlayerContainer: FC<PlayerContainerProps> = ({ styled, children }) => {
  return <section className={`${styles.player} ${styled}`}>{children}</section>;
};

PlayerContainer.defaultProps = {
  styled: '',
};
