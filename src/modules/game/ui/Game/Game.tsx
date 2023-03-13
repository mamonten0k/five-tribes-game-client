import { FC } from 'react';

interface GameProps {
  gameId: string | null;
}

export const Game: FC<GameProps> = ({ gameId }) => {
  return (
    <>
      ИГРА-<strong>{gameId && gameId}</strong>
    </>
  );
};
