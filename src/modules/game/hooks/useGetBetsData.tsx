import { useQuery } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';

import { dbService, tokenService, GameId, waitFor } from '../../../utils';
import { store } from '../../../store';

const getBetOptions = async (params: GameId) => {
  const token = tokenService.getToken()!;
  const response: any = await dbService.getBetOptions({ ...params, token });

  if (response && 'rejected' in response && response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  } else {
    if (response) return response['batch-1'] || [];
  }

  await waitFor(4000);
};

export default function useGetBetOptions(params: GameId) {
  return useQuery(['bets-data'], () => getBetOptions(params));
}
