import {
  Button,
  CloseButton,
  Dialog,
  Heading,
  HStack,
  Icon,
  Portal,
  Presence,
  Progress,
  ProgressCircle,
  Show,
} from '@chakra-ui/react';
import { BaseSyntheticEvent, ReactNode, RefObject } from 'react';
import { IconType } from 'react-icons';

interface ContactModalHeaderProps {
  Icon: IconType;
  text: string;
}

interface ContactModalLoadingProps {
  isLoading: boolean;
  type: 'circle' | 'progress';
  progress: number | null;
  label?: string;
  color?: 'green' | 'orange' | 'gray' | 'blue';
}

interface ContactModalProps {
  children: ReactNode;
  motionPreset:
    | 'slide-in-right'
    | 'slide-in-bottom'
    | 'slide-in-top'
    | 'scale'
    | 'slide-in-left'
    | 'none';
  ref?: RefObject<HTMLDivElement | null>;
  Header: ContactModalHeaderProps;
  Form: ReactNode;
  SaveButton: ReactNode;
  loadingOptions: ContactModalLoadingProps;
  handleSubmit?: (e?: BaseSyntheticEvent) => Promise<void>;
  open: boolean;
  onOpen: (isOpen: boolean) => void;
}

export default function ContactModal({
  children,
  motionPreset,
  ref,
  Header,
  Form,
  SaveButton,
  loadingOptions,
  handleSubmit,
  open,
  onOpen,
}: ContactModalProps) {
  return (
    <Dialog.Root
      motionPreset={motionPreset}
      closeOnInteractOutside={!loadingOptions.isLoading}
      open={open}
      onOpenChange={(e) => onOpen(e.open)}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content ref={ref}>
            <form onSubmit={handleSubmit}>
              <Dialog.CloseTrigger top={0} insetEnd={-12} asChild>
                <CloseButton
                  size={'sm'}
                  colorPalette={'gray'}
                  rounded={'full'}
                  variant={'subtle'}
                  disabled={loadingOptions.isLoading}
                />
              </Dialog.CloseTrigger>
              <Dialog.Header>
                <Dialog.Title>
                  <HStack color={'green'}>
                    <Icon size={'lg'}>
                      <Header.Icon />
                    </Icon>
                    <Heading size={'2xl'}>{Header.text}</Heading>
                  </HStack>
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Presence
                  present={!loadingOptions.isLoading}
                  animationName={{
                    _open: 'slide-from-bottom, fade-in',
                    _closed: 'slide-to-bottom, fade-out',
                  }}
                  animationDuration="moderate"
                >
                  {Form}
                </Presence>
                <Presence
                  present={loadingOptions.isLoading}
                  animationName={{
                    _open: 'slide-from-bottom, fade-in',
                    _closed: 'slide-to-bottom, fade-out',
                  }}
                  animationDuration="moderate"
                >
                  <Show when={loadingOptions.type === 'progress'}>
                    <Progress.Root
                      maxW={'lg'}
                      variant={'subtle'}
                      colorPalette={loadingOptions?.color ?? 'green'}
                      value={loadingOptions.progress}
                    >
                      <Progress.Label>{loadingOptions.label}</Progress.Label>
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                  </Show>
                  <Show when={loadingOptions.type === 'circle'}>
                    <ProgressCircle.Root
                      maxW={'lg'}
                      colorPalette={'green'}
                      value={loadingOptions.progress}
                    >
                      <ProgressCircle.Circle>
                        <ProgressCircle.Track />
                        <ProgressCircle.Range />
                      </ProgressCircle.Circle>
                    </ProgressCircle.Root>
                  </Show>
                </Presence>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant={'outline'}
                    colorPalette={'gray'}
                    disabled={loadingOptions.isLoading}
                  >
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                {SaveButton}
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
