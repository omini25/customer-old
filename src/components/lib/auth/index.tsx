import AuthStateContext, { TAuthState } from './auth-state-context';
import AuthActionContext, { isSocialLoginCredential, TAuthAction } from './auth-action-context';
import { FC, useEffect, useState } from 'react';
import { User } from './types';
import { loginWithEmail, loginWithSocials } from 'lib/requests/auth';
import { getUserInfo } from 'lib/requests';

type AuthProviderProps = {
  /**
   * This is only provided for mocking reasons.
   * Do not use in production.
   */
  value?: TAuthAction & TAuthState;
};

const AuthProvider: FC<AuthProviderProps> = ({ value, children }) => {
  const [user, setUser] = useState<User | undefined>(value?.user);
  const [isLoggingIn, setIsLoggingIn] = useState(value?.isLoggingIn || false);
  const [error, setError] = useState<Error | null | undefined>(value?.error);

  useEffect(() => {
    setIsLoggingIn(true);
    if (localStorage.getItem('token'))
      getUserInfo()
        .then((userData) => {
          const user: User = {
            id: userData.ID,
            fullName: userData.fullname,
            address: userData.address,
            addressOpt: userData.address_opt,
            country: userData.country,
            customerPath: userData.customer_path,
            dateCreated: userData.date_created,
            dateModified: userData.data_modified,
            dateOfBirth: userData.date_of_birth,
            email: userData.email,
            gender: userData.gender,
            localState: userData.local_state,
            phoneNumber: userData.phone_number,
            status: userData.status,
          };
          setUser(user);
        })
        .finally(() => {
          setIsLoggingIn(false);
        });
    else setIsLoggingIn(false);
  }, []);

  const loginFn: TAuthAction['login'] = async (credential, opts) => {
    setIsLoggingIn(true);
    let token: string;
    try {
      if (isSocialLoginCredential(credential)) {
        token = await loginWithSocials(credential.provider, credential.token);
      } else {
        token = await loginWithEmail(credential.email, credential.password);
      }

      localStorage.setItem('token', token);
      const userData = await getUserInfo();
      const user: User = {
        id: userData.ID,
        fullName: userData.fullname,
        address: userData.address,
        addressOpt: userData.address_opt,
        country: userData.country,
        customerPath: userData.customer_path,
        dateCreated: userData.date_created,
        dateModified: userData.data_modified,
        dateOfBirth: userData.date_of_birth,
        email: userData.email,
        gender: userData.gender,
        localState: userData.local_state,
        phoneNumber: userData.phone_number,
        status: userData.status,
      };
      setUser(user);
      setIsLoggingIn(false);
      opts?.onSuccess(user);
      return user;
    } catch (err: any) {
      const error =
        process.env.NODE_ENV == 'development'
          ? err
          : new Error('Login failed. Check your details.');
      setError(error);
      setIsLoggingIn(false);
      if (opts?.onError) opts.onError(error);
      else throw error;
    }
  };
  const logout: TAuthAction['logout'] = async () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  return (
    <AuthActionContext.Provider
      value={{ login: value?.login || loginFn, logout: value?.logout || logout }}
    >
      <AuthStateContext.Provider value={{ user, isLoggingIn, error }}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export { useAuth } from './hooks';

export default AuthProvider;
