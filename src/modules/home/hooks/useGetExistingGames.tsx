import { useQuery } from 'react-query';
import { notificationActions } from '../../../store/notification/notification.slice';
import { gameActions } from '../../../store/game/game.slice';

import { dbService, GameGeneralInfo, tokenService, waitFor } from '../../../utils';
import { store } from '../../../store';

const getExistingGames = async (): Promise<GameGeneralInfo[] | undefined> => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.getExistingGames({ token });

  store.dispatch(gameActions.resetGameState());

  if (response.rejected) {
    store.dispatch(notificationActions.reset({ notificationMsg: response.error_message }));
  } else {
    store.dispatch(notificationActions.flush());
    return response['batch-0'];
  }

  await waitFor(500);
};

export default function useGetExistingGames() {
  return useQuery(['existing-games'], () => getExistingGames());
}
