import { create } from 'zustand';
import { Contact } from '../model/contact.interface';
import { ContactResult, MutateContact } from '../context/contact.context';
import { io, Socket } from 'socket.io-client';

interface ContactState {
  contacts: Contact[];
  total: number;
  pageSize: number;
  page: number;
  socket: Socket;
  setPage: (page: number) => void;
  mutate: MutateContact;
  add: (contact: Contact) => void;
  init: (result: ContactResult, mutate: MutateContact) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  contacts: [],
  total: 0,
  pageSize: 10,
  page: 1,
  socket: io('http://localhost:80'),
  setPage: (page) => set(() => ({ page })),
  mutate: async () => ({}),
  add: (contact) =>
    set((state) => {
      const newContacts = state.contacts.concat(contact);
      state.mutate({
        value: {
          items: newContacts,
          page: state.page,
          pageSize: state.pageSize,
          total: newContacts.length,
        },
      });
      return { contacts: newContacts };
    }),
  init: (result, mutate) =>
    set(() => ({
      contacts: result.items ?? [],
      total: result.total ?? 0,
      mutate,
    })),
}));
