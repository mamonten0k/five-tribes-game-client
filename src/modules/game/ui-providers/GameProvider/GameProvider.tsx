import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { selectGameLoadingState } from '../../../../store/game/game.selectors';
import { gameActions } from '../../../../store/game/game.slice';

import { Spinner } from '../../../common/ui';

import { useSearchParams } from 'react-router-dom';

import { Game } from '../../ui/Game/Game';

const GameProvider = () => {
  const [searchParams] = useSearchParams();

  const isLoading = useSelector((state: RootState) => selectGameLoadingState(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameActions.initiateConnection());
  }, []);

  if (isLoading) return <Spinner message='Ждем загрузки противника...' />;
  return <Game gameId={searchParams.get('gameId')} />;
};

export { GameProvider };
