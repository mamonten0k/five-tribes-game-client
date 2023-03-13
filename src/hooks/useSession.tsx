import { useQuery } from 'react-query';
import { dbService, tokenService } from '../utils';

const postSession = async () => {
  const token = tokenService.getToken()!;
  const response = await dbService.validateSession({ token });

  if (response.rejected) {
    tokenService.removeToken();
  }

  return response;
};

export default function useSession() {
  return useQuery(['private-check'], () => postSession());
}
