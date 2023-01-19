import { FC } from 'react';

type FindGameProps = {
  onFindGame: () => void;
};

const FindGame: FC<FindGameProps> = ({ onFindGame }) => {
  return <button type='button' onClick={onFindGame}></button>;
};

export { FindGame };
