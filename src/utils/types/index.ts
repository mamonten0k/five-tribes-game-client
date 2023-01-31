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

export type UserPresence = {
  id: number;
  statusMessage?: string;
  showOffline: boolean;
};

export type UserPeer = {
  id: string;
};

export type User = {
  username: string;
};

export type AuthenticationResponseParams = {
  token: string;
};

export type Error = {
  data: {
    message: string;
    statusCode: number;
  };
  statusCode: number;
};
