'use client';

import { FC, ReactNode, useState } from 'react';
import { ContactContext, MutateContact } from '../context/contact.context';

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: FC<ContactProviderProps> = ({ children }) => {
  const [mutate, setMutate] = useState<MutateContact | null>(null);

  return (
    <ContactContext.Provider value={{ setMutate, mutate }}>
      {children}
    </ContactContext.Provider>
  );
};
