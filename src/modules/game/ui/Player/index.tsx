import { FC, ReactNode } from 'react';
import { PlayerContainer, PlayerHelmet, PlayerInfo } from './specs';

type PlayerExtensions = {
  Container: typeof PlayerContainer;
  Helmet: typeof PlayerHelmet;
  Info: typeof PlayerInfo;
};

type PlayerProps = { children: ReactNode };

export const Player: FC<PlayerProps> & PlayerExtensions = ({ children }) => {
  return <>{children}</>;
};

Player.Container = PlayerContainer;
Player.Helmet = PlayerHelmet;
Player.Info = PlayerInfo;

Player.defaultProps = {
  children: null,
};
