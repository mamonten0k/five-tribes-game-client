import { FC, MouseEvent } from 'react';
import { Button } from '../../../common/ui';

type FindGameProps = {
  onFindGame: (e?: MouseEvent | Event) => void;
};

const FindGame: FC<FindGameProps> = ({ onFindGame }) => {
  return (
    <>
      <Button onClick={onFindGame} type='button'>
        Найти игру
      </Button>
    </>
  );
};

export { FindGame };
