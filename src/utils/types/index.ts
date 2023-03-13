export type User = {
  username: string;
};

export type AuthenticationResponse = {
  token: string;
};

export type FindGameResponse = {
  gameId: string;
  rival: string;
  timestamp: string;
};

export type GetBetOptionsParams = {
  gameId: string;
  username: string | null;
};

export type TestCallParams = {
  rival: string;
};

export type BetType = {
  betId: number;
  betAmount: number;
};

export type PlayerCoins = {
  player: string;
  coinsAmount: number;
};

export type GetBetOptionsResponse = {
  playersCoins: Array<PlayerCoins>;
  betOptions: Array<BetType>;
};

export type ExitGameParams = {
  gameId: string;
};

export type GameGeneralInfo = {
  gameId: string;
  rival: string;
  timestamp: string;
};

export type FindExistingGamesResponse = {
  games: GameGeneralInfo[];
};

export type Error = {
  data: {
    message: string;
    statusCode: number;
  };
  statusCode: number;
};

export type GameId = {
  gameId: string;
};

type Param = {
  [key: string]: string;
};

export interface Response<T> {
  rejected: boolean;
  error_message: string;
  data: T;
}

export interface RequestConfig extends RequestInit {
  params: Param | undefined;
}

type ResponseParam = {
  [key: string]: Array<string>;
};

export type ResponseData = {
  RESULTS: Array<ResponseParam>;
};

export type RowResponseData = {
  RESULTS: Array<Array<ResponseParam>>;
};

export type UserParams = {
  username: string;
  password: string;
};

export type WithTokenParams = {
  token: string;
};

export type WithGameIdParams = WithTokenParams & {
  gameId: string;
};

export type HandleBetParams = WithGameIdParams & {
  betId: number;
};

export type UsePostHandleBetParams = {
  gameId: string;
  betId: number;
};

export type HandlePlaceChipParams = WithGameIdParams & {
  chipId: number;
  provinceId: string;
};
