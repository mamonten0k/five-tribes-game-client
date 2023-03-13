/* eslint-disable camelcase */
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { errorActions } from '../../../../store/error/error.slice';
import { gameActions } from '../../../../store/game/game.slice';
import usePostExitGame from '../../hooks/usePostExitGame';

import { Button } from '../../../common/ui';
import { ExisitngGameBulletin } from '../../ui/ExisitngGameBulletin/ExisitngGameBulletin';

import { GameGeneralInfo } from '../../../../utils/types';

import styles from '../../index.module.scss';

type ExistingGameBulletinProviderProps = GameGeneralInfo;

const ExistingGameBulletinProvider: FC<ExistingGameBulletinProviderProps> = ({
  gameId,
  rival,
  timestamp,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exitGame = usePostExitGame();

  const handleClick = () => {
    dispatch(gameActions.setGameId({ gameId, rival }));
    navigate(`/game/${gameId}`);
  };

  const handleExit = async () => {
    dispatch(errorActions.flush);
    exitGame.mutate({ gameId });
  };

  useEffect(() => {
    if (exitGame.isSuccess) {
      navigate('/');
    }
  }, [exitGame.isSuccess]);

  return (
    <>
      <ExisitngGameBulletin id={gameId} rival={rival} timestamp={timestamp} onClick={handleClick} />
      <Button onClick={handleExit} styled={styles['button-exit']}>
        Выйти из игры
      </Button>
    </>
  );
};

export { ExistingGameBulletinProvider };
