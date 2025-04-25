import { cookies as NextCookies } from 'next/headers';
import { USER_AUTH_TOKEN } from '@/constants/cookies.token';
import { UnauthorizedException } from '@/exception/unauthorized.exception';

export const getToken = async (): Promise<string> => {
  const token = (await NextCookies()).get(USER_AUTH_TOKEN.description!)?.value;

  if (!token) {
    throw new UnauthorizedException('Usuário não autenticado!');
  }

  return token;
}

export const clearToken = async (): Promise<void> => {
  (await NextCookies()).delete(USER_AUTH_TOKEN.description!);
}
