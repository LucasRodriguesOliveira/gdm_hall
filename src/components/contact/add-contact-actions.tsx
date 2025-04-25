import {
  Badge,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown, LuUpload } from 'react-icons/lu';
import NewContactModal from './modal/new-contact-modal';
import UploadFileModal from './modal/upload-file-modal';

export default function AddContactActions() {
  return (
    <HStack justifyContent={'flex-end'} w={'full'} p={2}>
      <ButtonGroup colorPalette={'green'} attached>
        <NewContactModal>
          <Button rounded={'none'}>New contact</Button>
        </NewContactModal>
        <Menu.Root positioning={{ hideWhenDetached: false }}>
          <Menu.Trigger asChild>
            <IconButton variant={'outline'} rounded={'none'}>
              <LuChevronDown />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <UploadFileModal>
                  <Menu.Item
                    value="import"
                    cursor={'pointer'}
                    closeOnSelect={false}
                  >
                    <Icon>
                      <LuUpload />
                    </Icon>
                    <Text>Upload file</Text>
                    <Badge colorPalette={'green'}>csv</Badge>
                  </Menu.Item>
                </UploadFileModal>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </ButtonGroup>
    </HStack>
  );
}
