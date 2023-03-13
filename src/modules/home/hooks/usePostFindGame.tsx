import { useMutation } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';

import { dbService, tokenService, waitFor } from '../../../utils';
import { store } from '../../../store';
import { gameActions } from '../../../store/game/game.slice';

const postFindGame = async () => {
  const token = tokenService.getToken()!;
  const response = await dbService.placeInQueue({ token });

  if (response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  } else {
    store.dispatch(errorActions.flush());
    await postFindStatus(4, token);
  }
};

const postFindStatus = async (retries: number, token: string): Promise<any> => {
  const response = await dbService.getStatusInQueue({ token });

  if (response.rejected && retries === 0) {
    await dbService.removeFromQueue({ token });
    return store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  }

  if (response.rejected) {
    await waitFor(5000);
    return postFindStatus(retries - 1, token);
  }

  return store.dispatch(gameActions.setGameId(response));
};

export default function usePostFindGame() {
  return useMutation(() => postFindGame());
}
