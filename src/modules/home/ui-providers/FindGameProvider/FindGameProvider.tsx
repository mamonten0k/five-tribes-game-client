import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { gameActions } from '../../../../store/game/game.slice';
import { errorActions } from '../../../../store/error/error.slice';
import { selectError } from '../../../../store/error/error.selectors';
import { selectGameId } from '../../../../store/game/game.selectors';
import usePostFindGame from '../../hooks/usePostFindGame';

import { ErrorMessage } from '../../../common/ui';

import { FindGame } from '../../ui/FindGame/FindGame';
import { FindGameWrapper } from '../../ui/FindGameWrapper/FindGameWrapper';

const FindGameProvider = () => {
  const dispatch = useDispatch();

  const findGame = usePostFindGame();
  const error = useSelector(selectError);

  const gameId = useSelector(selectGameId);

  const onFindGame = async () => {
    findGame.mutate();
  };

  useEffect(() => {
    dispatch(errorActions.flush());
    dispatch(gameActions.resetStore());
    dispatch(gameActions.resetGameState());
  }, []);

  if (findGame.isLoading) {
    return <div>Loading...</div>;
  }

  if (findGame.isSuccess && gameId) {
    return <Navigate to={`/game/${gameId}`} />;
  }

  return (
    <FindGameWrapper>
      <FindGame onFindGame={onFindGame} />
      {error && <ErrorMessage message={error} />}
    </FindGameWrapper>
  );
};

export { FindGameProvider };
