import { SuperFetch, SuperFetchFormData } from './super-fetch';
import { SuperResult } from './super-result.type';

type GetProps = {
  path: string;
  query?: Record<string, string>;
  token?: string;
};

type PostProps<T> = {
  path: string;
  data?: T;
  token?: string;
};

type PutProps<T> = {
  path: string;
  data?: T;
  token?: string;
};

type PatchProps<T> = {
  path: string;
  data?: T;
  token?: string;
};

type DeleteProps = {
  path: string;
  token?: string;
};

type FileProps = {
  path: string;
  token?: string;
  file: File;
};

export class SuperFetchProxy {
  constructor(private readonly baseURL: string) {}

  public async get<T>({
    path,
    query,
    token,
  }: GetProps): Promise<SuperResult<T>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: 'GET',
      query: query ? new URLSearchParams(query) : undefined,
      token,
    });
  }

  public async post<T, U>({
    path,
    data,
    token,
  }: PostProps<T>): Promise<SuperResult<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: 'POST',
      data,
      token,
    });
  }

  public async patch<T, U>({
    path,
    data,
    token,
  }: PatchProps<T>): Promise<SuperResult<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: 'PATCH',
      data,
      token,
    });
  }

  public async put<T, U>({
    path,
    data,
    token,
  }: PutProps<T>): Promise<SuperResult<U>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: 'PUT',
      data,
      token,
    });
  }

  public async delete<T>({
    path,
    token,
  }: DeleteProps): Promise<SuperResult<T>> {
    return SuperFetch({
      path: `${this.baseURL}${path}`,
      method: 'DELETE',
      token,
    });
  }

  public async sendFile<T>({
    file,
    path,
    token,
  }: FileProps): Promise<SuperResult<T>> {
    const data = new FormData();
    data.append('file', file);

    return SuperFetchFormData({ path: `${this.baseURL}${path}`, token, data });
  }
}
