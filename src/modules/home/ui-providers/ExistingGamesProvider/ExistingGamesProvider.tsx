import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../../../store/notification/notification.slice';
import { selectNotification } from '../../../../store/notification/notification.selectors';
import useGetExistingGames from '../../hooks/useGetExistingGames';

import { ExistingGames } from '../../ui/ExistingGames/ExistingGames';
import { ExistingGameBulletinProvider } from '../ExistingGameBulletinProvider/ExistingGameBulletinProvider';

const ExistingGamesProvider = () => {
  const notificationMsg = useSelector(selectNotification);
  const { data, isLoading, isFetching } = useGetExistingGames();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (notificationMsg) {
    return <div>{notificationMsg}</div>;
  }

  return (
    <>
      <ExistingGames>
        {data && data.map((game) => <ExistingGameBulletinProvider key={game.gameId} {...game} />)}
      </ExistingGames>
    </>
  );
};

export { ExistingGamesProvider };
