import { useMutation } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';

import { dbService, tokenService, UsePostHandleBetParams, waitFor } from '../../../utils';
import { store } from '../../../store';

const postHandleBet = async (params: UsePostHandleBetParams) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.handleBet({ ...params, token });

  if (response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  }

  await waitFor(3000);
};

export default function usePostHandleBet() {
  return useMutation(['game-state'], (params: UsePostHandleBetParams) => postHandleBet(params));
}
