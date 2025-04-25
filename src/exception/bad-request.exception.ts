import { HttpStatus } from '@/constants/http.status';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(message: string | string[], status?: number) {
    super(
      Array.isArray(message) ? JSON.stringify(message) : message,
      status ?? HttpStatus.BAD_REQUEST
    );

    this.name = BadRequestException.name;
  }
}
