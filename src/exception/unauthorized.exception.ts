import { HttpStatus } from '@/constants/http.status';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(message: string, status?: number) {
    super(message, status ?? HttpStatus.UNAUTHORIZED);
    this.name = UnauthorizedException.name;
  }
}
