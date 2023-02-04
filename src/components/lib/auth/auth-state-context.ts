import { createContext } from 'react';
import { User } from './types';

export type TAuthState = {
  user?: User;
  isLoggingIn: boolean;
  error?: Error | null;
};

const AuthStateContext = createContext<TAuthState>({
  isLoggingIn: false,
});

export default AuthStateContext;
