'use client';

import { Button } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import NewContactForm from '../form/new-contact-form';
import { LuContactRound } from 'react-icons/lu';
import ContactModal from './modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, Inputs } from '../form/new-contact.schema';
import { toaster } from '../../ui/toaster';
import { createContactAction } from '../../../actions/contact/create-contact.action';
import { useContactStore } from '../../../store/contact.store';

interface NewContactModalProps {
  children: ReactNode;
}

export default function NewContactModal({ children }: NewContactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addContact = useContactStore((state) => state.add);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    createContactAction({
      ...data,
      state: data.state[0],
    }).then((result) => {
      if (result?.value && !result?.error) {
        addContact(result.value);
        toaster.create({
          title: 'Success',
          description: `Contact [${result.value.name}] created successfully!`,
          type: 'success',
        });
        reset({ name: '', phone: '', state: [] });
        setIsLoading(false);
        setOpen(false);
        return;
      }

      toaster.error({
        title: 'Oops!',
        description: result.error?.message,
      });
    });
  };

  return (
    <ContactModal
      open={open}
      onOpen={setOpen}
      motionPreset={'slide-in-bottom'}
      ref={dialogRef}
      handleSubmit={handleSubmit(onSubmit)}
      Form={<NewContactForm {...{ dialogRef, register, errors, control }} />}
      Header={{ Icon: LuContactRound, text: 'New Contact' }}
      SaveButton={
        <Button colorPalette={'green'} disabled={isLoading} type="submit">
          Save
        </Button>
      }
      loadingOptions={{
        isLoading,
        progress: null,
        type: 'circle',
      }}
    >
      {children}
    </ContactModal>
  );
}
