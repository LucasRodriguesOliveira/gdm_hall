'use client';

import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { User } from '../model/user.interface';
import { Inputs as LoginInputs } from '../components/auth/login.schema';
import { loginAction } from '../actions/auth/login.action';
import { logoutAction } from '../actions/auth/logout.action';
import { Inputs as RegisterInputs } from '../components/auth/register.schema';
import { registerAction } from '../actions/auth/register.action';
import { useLocalStorage } from 'usehooks-ts';
import { USER_TOKEN } from '../constants/localstorage.token';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage(
    USER_TOKEN.description!,
    { id: '', name: '', email: '', createdAt: new Date() }
  );
  const [user, setUser] = useState<User | null>(userLocalStorage);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userLocalStorage && userLocalStorage !== user) {
      setUser(userLocalStorage);
    }
  }, [userLocalStorage, user]);

  const login = useCallback(async (credentials: LoginInputs) => {
    setIsLoading(true);
    const result = await loginAction(credentials);
    setIsLoading(false);

    if (result?.value) {
      setUser(result.value.user);

      if (result.value.user) {
        setUserLocalStorage(result.value.user);
      }
    }

    return result;
  }, [setUserLocalStorage]);

  const register = useCallback(async (data: RegisterInputs) => {
    setIsLoading(true);
    const result = await registerAction(data);
    setIsLoading(false);

    if (result?.value) {
      setUser(result.value.user);
    }

    return result;
  }, []);

  const logout = useCallback(async () => {
    await logoutAction();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
