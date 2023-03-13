import { useMutation, useQuery } from 'react-query';
import { notificationActions } from '../../../store/notification/notification.slice';
import { gameActions } from '../../../store/game/game.slice';

import { dbService, ExitGameParams, tokenService, waitFor } from '../../../utils';
import { store } from '../../../store';

const getGameUpdatedGameField = async (params: ExitGameParams) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.getGameData({ ...params, token });

  if (response) {
    store.dispatch(notificationActions.flush());
    store.dispatch(gameActions.updateGameField({ gameField: response['batch-5'] }));
    store.dispatch(gameActions.updateTurnsOrder({ turnsOrder: response['batch-2'] }));
    store.dispatch(gameActions.updateOwnedProvinces({ ownedProvinces: response['batch-7'] || [] }));
    store.dispatch(
      gameActions.updateGameChips({
        gameChips: [...response['batch-6'], ...(response['batch-9'] || [])],
      }),
    );
  }

  await waitFor(500);
};

export default function useGetUpdatedGameField() {
  return useMutation(['existing-games'], (params: ExitGameParams) =>
    getGameUpdatedGameField(params),
  );
}
