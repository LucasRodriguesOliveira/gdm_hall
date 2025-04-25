'use server';

import { instanceToPlain } from 'class-transformer';
import { HttpException } from '../../exception/http.exception';
import { Result } from '../../types/result';
import { getToken } from '../token';
import { sp } from '../api';
import { SuperError } from '../../super-fetch/super-error.type';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';

interface UploadContactsActionProps {
  file: File;
}

export const uploadContactsAction = async ({
  file,
}: UploadContactsActionProps): Promise<Result<void, HttpException>> => {
  let token: string;

  try {
    token = await getToken();
  } catch (error) {
    return instanceToPlain({ error });
  }

  const response = await sp.sendFile<void>({
    file,
    path: '/contact/integration',
    token,
  });

  if (!response.ok) {
    const result: Result<void, HttpException> = {
      error: undefined,
    };

    const { message }: SuperError = await response.original.json();

    result.error = new InternalServerErrorException(message);

    return instanceToPlain(result);
  }

  return {};
};
