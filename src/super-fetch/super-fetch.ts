import { clearToken } from '../actions/token';
import { HttpStatus } from '../constants/http.status';
import { SuperResult } from './super-result.type';

const baseHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

interface SuperFetchProps<T> {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  data?: T;
  query?: URLSearchParams;
  token?: string;
}

export async function SuperFetch<T, U>({
  path,
  method,
  data,
  query,
  token,
}: SuperFetchProps<U>): Promise<SuperResult<T>> {
  let headers: HeadersInit = Object.assign({}, baseHeaders);

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  let url = path;

  if (query) {
    url = `${url}?${query}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    Object.assign(options, { body: JSON.stringify(data) });
  }

  const response = await fetch(url, options);

  const clone = response.clone();

  if (response.status === HttpStatus.UNAUTHORIZED) {
    await clearToken();
  }

  return {
    original: response,
    data: await clone.json(),
    ok: response.ok,
  };
}

interface SuperFetchFormDataProps {
  path: string;
  data: FormData;
  token?: string;
}

export async function SuperFetchFormData<T>({
  path,
  data,
  token,
}: SuperFetchFormDataProps): Promise<SuperResult<T>> {
  let headers: HeadersInit = {};

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const options: RequestInit = {
    method: 'POST',
    headers,
    body: data,
  };

  const response = await fetch(path, options);

  const clone = response.clone();

  return {
    original: response,
    data: await clone.json(),
    ok: response.ok,
  };
}
