'use server';

import { instanceToPlain } from 'class-transformer';
import { HttpException } from '../../exception/http.exception';
import { Contact } from '../../model/contact.interface';
import { Result } from '../../types/result';
import { sp } from '../api';
import { getToken } from '../token';
import { SuperError } from '../../super-fetch/super-error.type';
import { HttpStatus } from '../../constants/http.status';
import { BadRequestException } from '../../exception/bad-request.exception';
import { InternalServerErrorException } from '../../exception/internal-server-error.exception';

type CreateContactDto = {
  name: string;
  phone: string;
  state: string;
};

export const createContactAction = async (
  data: CreateContactDto
): Promise<Result<Contact, HttpException>> => {
  let token: string;

  try {
    token = await getToken();
  } catch (error) {
    return instanceToPlain({ error });
  }

  const response = await sp.post<CreateContactDto, Contact>({
    path: '/contact',
    data,
    token,
  });

  if (!response.ok) {
    const result: Result<Contact, HttpException> = {
      error: undefined,
    };

    const { statusCode, message }: SuperError = await response.original.json();

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        result.error = new BadRequestException(message);
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
