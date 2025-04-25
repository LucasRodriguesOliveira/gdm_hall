import { createContext } from 'react';
import { KeyedMutator } from 'swr';
import { Result } from '../types/result';
import { HttpException } from '../exception/http.exception';
import { Contact } from '../model/contact.interface';

export type ContactResult = {
  items: Contact[];
  page: number;
  pageSize: number;
  total: number;
};

export type MutateContact = KeyedMutator<Result<ContactResult, HttpException>>

interface ContactContextProps {
  setMutate: (
    mutate: MutateContact,
  ) => void;
  mutate: MutateContact | null,
}

export const ContactContext = createContext<ContactContextProps>({
  setMutate: () => {},
  mutate: null,
});
