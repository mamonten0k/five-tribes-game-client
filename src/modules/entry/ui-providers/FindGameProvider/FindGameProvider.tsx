import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { selectGameLoadingState } from '../../../../store/game/game.selectors';
import { gameActions } from '../../../../store/game/game.slice';
import { useFindGameMutation } from '../../../../utils/api/game.api';
import { Error } from '../../../../utils/types';

import { ErrorMessage, Spinner } from '../../../common/ui';
import { FindGame } from '../../ui/FindGame/FindGame';

const FindGameProvider = () => {
  // const isLoading = useSelector((state: RootState) => selectGameLoadingState(state));
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(gameActions.initiateConnection());
  // }, []);
  // const [findExistingGame]
  const [findGame, { data, isLoading }] = useFindGameMutation();
  const [error, setError] = useState<Error | null>();

  const onFindGame = async () => {
    try {
      await findGame().unwrap();
    } catch (e) {
      console.log(e);
      setError(e as Error);
    }
  };

  if (isLoading) {
    return <Spinner message='Поиск игры...' />;
  }

  return (
    <>
      {data && data.game_id}
      <FindGame onFindGame={onFindGame} />
      {error && <ErrorMessage message={error.data.message} />}
    </>
  );
};

export { FindGameProvider };
