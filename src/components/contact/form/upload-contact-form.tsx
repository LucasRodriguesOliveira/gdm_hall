'use client';

import { Box, FileUpload, Icon, useFileUpload } from '@chakra-ui/react';
import { useEffect } from 'react';
import { LuUpload } from 'react-icons/lu';

const KByte = 1024;
const MByte = 1024 * KByte;
const maxSize = 5 * MByte;

interface UploadContactFormProps {
  onUpload: (files: File[]) => void;
}

export default function UploadContactForm({ onUpload }: UploadContactFormProps) {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: maxSize,
    accept: ['text/csv']
  });

  useEffect(() => {
    onUpload(fileUpload.acceptedFiles);
  }, [fileUpload, onUpload]);

  return (
    <FileUpload.RootProvider
      maxW={'xl'}
      alignItems={'stretch'}
      value={fileUpload}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone cursor={'pointer'} _hover={{ shadow: 'sm' }}>
        <Icon size={'md'} color={'fg.muted'}>
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color={'fg.muted'}>.csv up to 5MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.List />
    </FileUpload.RootProvider>
  );
}
