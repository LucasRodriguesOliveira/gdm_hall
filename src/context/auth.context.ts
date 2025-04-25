import { createContext } from 'react';
import { User } from '../model/user.interface';
import { Inputs as LoginInputs } from '../components/auth/login.schema';
import { Result } from '../types/result';
import { HttpException } from '../exception/http.exception';
import { Inputs as RegisterInputs } from '../components/auth/register.schema';

type AuthResult = {
  user: User | null;
};

export interface Auth {
  user: User | null;
  login: (credentials: LoginInputs) => Promise<Result<AuthResult, HttpException>>;
  register: (data: RegisterInputs) => Promise<Result<AuthResult, HttpException>>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<Auth>({
  user: null,
  login: async () => ({}),
  register: async () => ({}),
  logout: async () => {},
  isLoading: false,
});

