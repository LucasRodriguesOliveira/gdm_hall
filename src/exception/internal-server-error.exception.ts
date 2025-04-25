import { HttpStatus } from '@/constants/http.status';
import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  constructor(message: string, status?: number) {
    super(message, status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = InternalServerErrorException.name;
  }
}
