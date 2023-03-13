import { useQuery } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';
import { gameActions } from '../../../store/game/game.slice';

import { dbService, tokenService, GameId } from '../../../utils';
import { store } from '../../../store';

const getGameState = async (params: GameId) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.getCurrentTurnData({ ...params, token });

  if (response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  } else {
    store.dispatch(gameActions.updateGameState({ ...response['batch-0'][0] }));
  }
};

export default function useGetGameState(params: GameId) {
  return useQuery(['game-state'], () => getGameState(params));
}
