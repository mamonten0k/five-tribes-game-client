import { useState } from 'react';
import { useFindGameMutation } from '../../../../utils/api/game.api';
import { Error } from '../../../../utils/types';
import { Navigate } from 'react-router-dom';

import { ErrorMessage } from '../../../common/ui';
import { FindGame } from '../../ui/FindGame/FindGame';
import { FindGameWrapper } from '../../ui/FindGameWrapper/FindGameWrapper';

const FindGameProvider = () => {
  const [findGame, { data, isLoading }] = useFindGameMutation();
  const [error, setError] = useState<Error | null>();

  const onFindGame = async () => {
    try {
      await findGame().unwrap();
    } catch (e) {
      setError(e as Error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <Navigate to={`/game?gameId=${data.gameId}`} />;
  }

  return (
    <FindGameWrapper>
      <FindGame onFindGame={onFindGame} />
      {error && <ErrorMessage message={error.data.message} />}
    </FindGameWrapper>
  );
};

export { FindGameProvider };
