import { useQuery } from 'react-query';
import { notificationActions } from '../../../store/notification/notification.slice';
import { gameActions } from '../../../store/game/game.slice';

import { dbService, ExitGameParams, tokenService, waitFor } from '../../../utils';
import { store } from '../../../store';

const getGameData = async (params: ExitGameParams) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.getGameData({ ...params, token });

  if (response.rejected) {
    store.dispatch(notificationActions.reset({ notificationMsg: response.error_message }));
  } else {
    store.dispatch(notificationActions.flush());

    if ('round' in (response['batch-0'][0] || []) && response['batch-0'][0].round === -1) {
      store.dispatch(gameActions.finishGame({ ...response['batch-0'][0] }));
      return;
    }

    store.dispatch(gameActions.updateGameState({ ...(response['batch-1'] || [])[0] }));
    store.dispatch(gameActions.updatePlayersCoins({ playersCoins: response['batch-3'] || [] }));
    store.dispatch(gameActions.updateGameField({ gameField: response['batch-5'] || [] }));
    store.dispatch(gameActions.updateTurnsOrder({ turnsOrder: response['batch-2'] || [] }));
    store.dispatch(gameActions.updateSelectedChips({ selectedChips: response['batch-9'] || [] }));
    store.dispatch(gameActions.updateOwnedProvinces({ ownedProvinces: response['batch-7'] || [] }));
    store.dispatch(
      gameActions.updateGameChips({
        gameChips: [...response['batch-6'], ...(response['batch-9'] || [])],
      }),
    );
  }

  await waitFor(500);
};

export default function useGetGameData(params: ExitGameParams) {
  return useQuery(['existing-games'], () => getGameData(params));
}
