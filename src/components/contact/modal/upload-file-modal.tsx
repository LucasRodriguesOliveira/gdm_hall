'use client';

import { Button } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import ContactModal from './modal';
import { LuUpload } from 'react-icons/lu';
import UploadContactForm from '../form/upload-contact-form';
import { toaster } from '../../ui/toaster';
import { useContactStore } from '../../../store/contact.store';
import { SocketEvent } from '../../../constants/socket.events';
import { uploadContactsAction } from '../../../actions/contact/upload-contacts.action';

interface UploadFileModalProps {
  children: ReactNode;
}

type FileProcessStage = 'waiting' | 'upload' | 'process' | 'finished' | 'none';

type FileProgressStatus = {
  label: 'Connecting' | 'Uploading' | 'Processing';
  color: 'gray' | 'orange' | 'green' | 'blue';
};

export default function UploadFileModal({ children }: UploadFileModalProps) {
  const [file, setFile] = useState<File | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);
  const [fileStage, setFileStage] = useState<FileProcessStage>('none');
  const { socket } = useContactStore();
  const progressStatus: FileProgressStatus = useMemo(() => {
    if (fileStage === 'upload') {
      return {
        label: 'Uploading',
        color: 'orange',
      };
    }

    if (fileStage === 'process') {
      return {
        label: 'Processing',
        color: 'green',
      };
    }

    if (fileStage === 'finished') {
      return {
        label: 'Processing',
        color: 'blue'
      };
    }

    return {
      label: 'Connecting',
      color: 'gray',
    };
  }, [fileStage]);

  useEffect(() => {
    if (isLoading && fileStage === 'waiting') {
      setFileStage('upload');
    }

    socket.on(SocketEvent.UPLOAD_PROGRESS, (data) => {
      if (data?.progress > 0 && data?.progress < 1) {
        setFileStage('process');
        setLoadingProgress(data?.progress * 100);
      } else if (fileStage === 'process' && loadingProgress === 100) {
        setLoadingProgress(null);
      }
    });

    socket.on(SocketEvent.UPLOAD_FINISHED, () => {
      if (fileStage !== 'finished') {
        setFileStage('finished');
        setLoadingProgress(null);
      }
    });
  }, [isLoading, fileStage, socket, loadingProgress]);

  useEffect(() => {
    if (fileStage === 'finished') {
      setIsLoading(false);

      toaster.success({
        title: 'Success',
        description: 'Upload finished!',
      });

      setOpen(false);
    }
  }, [fileStage]);

  const handleUpload = useCallback((files: File[]) => {
    if (files.length) {
      setFile(files[0]);
      return;
    }

    setFile(null);
  }, []);

  const handleClick = useCallback(() => {
    if (file) {
      setIsLoading(true);
      setLoadingProgress(null);
      setFileStage('waiting');
      uploadContactsAction({ file }).then((result) => {
        if (result?.error) {
          toaster.error({
            title: 'Oops',
            description: result.error.message,
          });
          setIsLoading(false);
          setFileStage('none');
          setLoadingProgress(null);
        }
      });
    }
  }, [file]);

  return (
    <ContactModal
      open={open}
      onOpen={setOpen}
      motionPreset={'slide-in-right'}
      Form={<UploadContactForm onUpload={handleUpload} />}
      Header={{ Icon: LuUpload, text: 'Import contacts' }}
      SaveButton={
        <Button
          colorPalette={'green'}
          disabled={!file || isLoading}
          onClick={handleClick}
        >
          Upload
        </Button>
      }
      loadingOptions={{
        isLoading,
        progress: loadingProgress,
        type: 'progress',
        label: progressStatus.label,
        color: progressStatus.color,
      }}
    >
      {children}
    </ContactModal>
  );
}
