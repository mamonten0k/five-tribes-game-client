import { useMutation } from 'react-query';

import { dbService, ExitGameParams, tokenService } from '../../../utils';

const postExitGame = async (params: ExitGameParams) => {
  const token = tokenService.getToken()!;
  await dbService.exitGame({ ...params, token });
};

export default function usePostExitGame() {
  return useMutation((params: ExitGameParams) => postExitGame(params));
}
