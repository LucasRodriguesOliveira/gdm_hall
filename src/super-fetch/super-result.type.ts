export type SuperResult<T> = {
  original: Response;
  ok: boolean;
  data: T;
};
