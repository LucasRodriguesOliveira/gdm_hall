'use server';

import { cookies as NextCookies } from 'next/headers';
import { USER_AUTH_TOKEN } from '../../constants/cookies.token';

export const logoutAction = async (): Promise<void> => {
  (await NextCookies()).delete(USER_AUTH_TOKEN.description!);
}
