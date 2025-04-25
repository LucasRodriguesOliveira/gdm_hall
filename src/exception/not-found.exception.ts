import { HttpStatus } from '@/constants/http.status';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message: string, status?: number) {
    super(message, status ?? HttpStatus.NOT_FOUND);

    this.name = NotFoundException.name;
  }
}
