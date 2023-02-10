import { useFindExistingGamesQuery } from '../../../../utils/api/game.api';
import { ExistingGameBulletinProvider } from '../ExistingGameBulletinProvider/ExistingGameBulletinProvider';

import { ExistingGames } from '../../ui/ExistingGames/ExistingGames';
import { Error } from '../../../../utils/types';

const ExistingGamesProvider = () => {
  const { data, error, isLoading, isFetching } = useFindExistingGamesQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{(error as Error).data.message}</div>;
  }

  return (
    <>
      <ExistingGames>
        {data && data.games.map((game) => <ExistingGameBulletinProvider key={game.id} {...game} />)}
      </ExistingGames>
    </>
  );
};

export { ExistingGamesProvider };
