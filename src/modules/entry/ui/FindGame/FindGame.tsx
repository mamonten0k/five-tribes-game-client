import { FC, MouseEvent } from 'react';

import styles from '../../index.module.scss';

type FindGameProps = {
  onFindGame: (e: MouseEvent) => void;
};

const FindGame: FC<FindGameProps> = ({ onFindGame }) => {
  return (
    <>
      <button type='button' onClick={onFindGame}>
        Найти игру
      </button>
    </>
  );
};

export { FindGame };
