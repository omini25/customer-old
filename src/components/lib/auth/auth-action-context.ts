import { createContext } from 'react';
import { User } from './types';

type EmailLoginCredential = {
  email: string;
  password: string;
};

type SocialLoginCredential = {
  provider: 'google' | 'facebook';
  token: string;
};

type LoginCredential = EmailLoginCredential | SocialLoginCredential;

export function isSocialLoginCredential(
  credential: LoginCredential
): credential is SocialLoginCredential {
  return (credential as SocialLoginCredential).token !== undefined;
}

export type TAuthAction = {
  /**
   * Login with email and password or social login token
   * @param credential
   * @returns The user if login is successful else it returns null
   */
  login: (
    credential: LoginCredential,
    loginOptions?: {
      onSuccess: (user?: User) => void;
      onError: (error?: Error) => void;
    }
  ) => Promise<User | undefined>;
  /**
   * Logout the user
   */
  logout: () => Promise<void>;
};

export default createContext<TAuthAction>({
  login: async () => {
    throw new Error('Not implemented');
  },
  logout: async () => {
    throw new Error('Not implemented');
  },
});
