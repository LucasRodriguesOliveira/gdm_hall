'use server';

import { instanceToPlain } from 'class-transformer';
import { Inputs } from '../../components/auth/login.schema';
import { HttpStatus } from '../../constants/http.status';
import { BadRequestException } from '../../exception/bad-request.exception';
import { HttpException } from '../../exception/http.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';
import { NotFoundException } from '../../exception/not-found.exception';
import { UnauthorizedException } from '../../exception/unauthorized.exception';
import { User } from '../../model/user.interface';
import { SuperError } from '../../super-fetch/super-error.type';
import { Result } from '../../types/result';
import { cookies as NextCookies } from 'next/headers';
import { USER_AUTH_TOKEN } from '../../constants/cookies.token';
import { sp } from '../api';

type LoginResult = {
  user: User | null;
};

type ApiResponse = {
  token: string;
  user: User;
};

export const loginAction = async (
  credentials: Inputs
): Promise<Result<LoginResult, HttpException>> => {
  const response = await sp.post<Inputs, ApiResponse>({
    path: '/auth/login',
    data: credentials,
  });

  if (!response.ok) {
    const result: Result<LoginResult, HttpException> = {
      value: {
        user: null,
      },
      error: undefined,
    };

    const { statusCode, message }: SuperError = await response.original.json();

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        result.error = new BadRequestException(message);
        break;
      case HttpStatus.NOT_FOUND:
        result.error = new NotFoundException(message);
        break;
      case HttpStatus.UNAUTHORIZED:
        result.error = new UnauthorizedException(message);
        break;
      default:
        result.error = new InternalServerErrorException(message);
    }

    return instanceToPlain(result);
  }

  const { token, user }: ApiResponse = response.data;

  (await NextCookies()).set(USER_AUTH_TOKEN.description!, token, {
    httpOnly: true,
  });

  return {
    value: {
      user,
    },
  };
};
