import { useMutation } from 'react-query';
import { errorActions } from '../../../store/error/error.slice';

import { dbService, tokenService, UserParams } from '../../../utils';
import { store } from '../../../store';

const postCreateSession = async (params: UserParams) => {
  const response = await dbService.createSession(params);

  if (response.rejected) {
    store.dispatch(errorActions.reset({ errorMsg: response.error_message }));
  } else {
    tokenService.setToken(response.token);
    tokenService.setUser(params.username);
    store.dispatch(errorActions.flush());
  }
};

export default function useCreateSession() {
  return useMutation((params: UserParams) => postCreateSession(params));
}
