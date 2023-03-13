import { FC, ReactNode } from 'react';
import { RivalProvider, UserProvider } from './variations';

type PlayerProviderExtensions = {
  User: typeof UserProvider;
  Rival: typeof RivalProvider;
};

type PlayerProviderProps = { children?: ReactNode };

export const PlayerProvider: FC<PlayerProviderProps> & PlayerProviderExtensions = ({
  children,
}) => {
  return <>{children}</>;
};

PlayerProvider.User = UserProvider;
PlayerProvider.Rival = RivalProvider;

PlayerProvider.defaultProps = {
  children: null,
};
