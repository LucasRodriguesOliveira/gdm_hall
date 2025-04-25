export class HttpException {
  public name: string;

  constructor(
    public readonly message: string,
    public readonly status: number
  ) {
    this.name = HttpException.name;
  }
}
