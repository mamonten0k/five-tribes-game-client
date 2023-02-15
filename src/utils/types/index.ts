export type UserParams = {
  username: string;
  password: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type User = {
  username: string;
};

export type AuthenticationResponse = {
  token: string;
};

export type FindGameResponse = {
  gameId: string;
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
