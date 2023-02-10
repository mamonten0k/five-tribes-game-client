import { FC } from 'react';

interface GameProps {
  gameId: string | null;
}

const Game: FC<GameProps> = ({ gameId }) => {
  return (
    <>
      ИГРА-<strong>{gameId && gameId}</strong>
    </>
  );
};

export { Game };
