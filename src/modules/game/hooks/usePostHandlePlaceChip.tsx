import { useMutation } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';

import {
  dbService,
  HandlePlaceChipParams,
  tokenService,
  UsePostHandleBetParams,
  waitFor,
} from '../../../utils';
import { store } from '../../../store';
import { gameActions } from '../../../store/game/game.slice';

type HandleBetParams = {
  gameId: string;
  provinceId: string;
  chipId: number;
};

const postHandlePlaceChip = async (params: HandleBetParams) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.handlePlaceChip({ ...params, token });

  if (response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  } else {
    store.dispatch(errorActions.flush());
    store.dispatch(gameActions.placeChip({ ...params }));

    if (
      'notification_message' in response &&
      response.notification_message === 'Конец хода, все фишки успешно перемещены'
    ) {
      store.dispatch(gameActions.refreshSecondStage());
      store.dispatch(gameActions.disableActive());
    }
  }
};

export default function usePostHandlePlaceChip() {
  return useMutation(['game-state'], (params: HandleBetParams) => postHandlePlaceChip(params));
}
