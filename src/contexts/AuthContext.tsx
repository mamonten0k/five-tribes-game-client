import { createContext, FC, ReactNode, useState } from 'react';
import { User } from '../utils/types';

type AuthContextType = {
  user?: User;
  updateUser: (data: User) => void;
};

type AuthProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  updateUser: () => undefined,
});

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ user, updateUser: setUser }}>{children}</AuthContext.Provider>
  );
};
