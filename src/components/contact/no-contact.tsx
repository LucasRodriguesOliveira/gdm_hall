import {
  Badge,
  Button,
  ButtonGroup,
  EmptyState,
  VStack,
} from '@chakra-ui/react';
import { LuContact } from 'react-icons/lu';
import NewContactModal from './modal/new-contact-modal';
import UploadFileModal from './modal/upload-file-modal';

export default function NoContactFallback() {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <LuContact />
        </EmptyState.Indicator>
        <VStack textAlign={'center'}>
          <EmptyState.Title>No contact added</EmptyState.Title>
          <EmptyState.Description>
            Try adding a contact to start the list
          </EmptyState.Description>
        </VStack>
        <ButtonGroup colorPalette={'green'}>
          <NewContactModal>
            <Button>Create contact</Button>
          </NewContactModal>
          <UploadFileModal>
            <Button variant={'outline'}>
              Import from file <Badge>CSV</Badge>
            </Button>
          </UploadFileModal>
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
