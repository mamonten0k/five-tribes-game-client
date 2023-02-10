/* eslint-disable camelcase */
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { gameActions } from '../../../../store/game/game.slice';
import { useExitGameMutation } from '../../../../utils/api/game.api';

import { Button } from '../../../common/ui';
import { ExisitngGameBulletin } from '../../ui/ExisitngGameBulletin/ExisitngGameBulletin';

import styles from '../../index.module.scss';

interface ExistingGameBulletinProviderProps {
  id: string;
  rival: string;
  timestamp: string;
}

const ExistingGameBulletinProvider: FC<ExistingGameBulletinProviderProps> = ({
  id,
  rival,
  timestamp,
}) => {
  const dispatch = useDispatch();
  const [exitGame] = useExitGameMutation();

  const handleClick = () => {
    dispatch(gameActions.initiateGame({ id, rival, timestamp }));
  };

  const handleExit = async () => {
    try {
      await exitGame({ game_id: id }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ExisitngGameBulletin id={id} rival={rival} timestamp={timestamp} onClick={handleClick} />
      <Button onClick={handleExit} styled={styles['button-exit']}>
        Выйти из игры
      </Button>
    </>
  );
};

export { ExistingGameBulletinProvider };
