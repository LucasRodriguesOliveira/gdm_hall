'use server';

import { instanceToPlain } from 'class-transformer';
import { HttpException } from '../../exception/http.exception';
import { Contact } from '../../model/contact.interface';
import { Result } from '../../types/result';
import { sp } from '../api';
import { getToken } from '../token';
import { SuperError } from '../../super-fetch/super-error.type';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';

type ContactResult = {
  items: Contact[];
  page: number;
  pageSize: number;
  total: number;
};

interface ListContactProps {
  page: number;
  pageSize: number;
}

export const listContactAction = async ({
  page,
  pageSize,
}: ListContactProps): Promise<Result<ContactResult, HttpException>> => {
  let token: string;

  try {
    token = await getToken();
  } catch (error) {
    return instanceToPlain({ error });
  }

  const response = await sp.get<ContactResult>({
    path: '/contact',
    token,
    query: {
      page: `${page}`,
      pageSize: `${pageSize}`
    }
  });

  if (!response.ok) {
    const result: Result<ContactResult, HttpException> = {
      error: undefined,
    };

    const { message }: SuperError = await response.original.json();

    result.error = new InternalServerErrorException(message);

    return instanceToPlain(result);
  }

  return {
    value: response.data,
  };
};
