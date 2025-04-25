'use server';

import { instanceToPlain } from 'class-transformer';
import { User } from '../../model/user.interface';
import { getToken } from '../token';
import { Result } from '../../types/result';
import { HttpException } from '../../exception/http.exception';
import { sp } from '../api';
import { SuperError } from '../../super-fetch/super-error.type';
import { HttpStatus } from '../../constants/http.status';
import { UnauthorizedException } from '../../exception/unauthorized.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';

export const getUserAction = async (): Promise<Result<User, HttpException>> => {
  let token: string;

  try {
    token = await getToken();
  } catch (error) {
    return instanceToPlain({ error });
  }

  const response = await sp.get<User>({ path: '/user/me', token });

  if (!response.ok) {
    const result: Result<User, HttpException> = {
      error: undefined,
    };

    const { statusCode, message }: SuperError = await response.original.json();

    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        result.error = new UnauthorizedException(message);
        break;
      default:
        result.error = new InternalServerErrorException(
          Array.isArray(message) ? message.join() : message
        );
    }

    return instanceToPlain(result);
  }

  return {
    value: response.data,
  };
};
