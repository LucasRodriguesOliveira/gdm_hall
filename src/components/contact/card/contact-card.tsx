import {
  Avatar,
  Badge,
  Card,
  defineStyle,
  Presence,
  VStack,
} from '@chakra-ui/react';
import { Contact } from '../../../model/contact.interface';

interface ContactCardProps {
  contact: Contact;
}

const cardCss = defineStyle({
  flexDirection: 'row',
  overflow: 'hidden',
  maxW: 'lg',
  minW: 'md',
  _hover: {
    shadow: 'xl',
    scale: 1.02,
    bg: {
      base: 'green.100',
      _dark: 'green.800',
    },
    outline: '2px dashed green',
  },
});

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <Presence
      present={true}
      animationName={{
        _open: 'slide-from-bottom, fade-in',
        _closed: 'slide-to-bottom, fade-out',
      }}
      animationDuration={'slow'}
    >
      <Card.Root
        variant={'elevated'}
        css={cardCss}
        transition={'all .3s ease-in'}
      >
        <VStack justifyContent={'center'} alignItems={'center'} p={4}>
          <Avatar.Root size={'xl'} colorPalette={'green'}>
            <Avatar.Fallback />
          </Avatar.Root>
        </VStack>
        <Card.Body>
          <Card.Title mb={2}>{contact.name}</Card.Title>
          <VStack alignItems={'flex-start'}>
            <Badge colorPalette={'green'}>{contact.state}</Badge>
            <Card.Description>{contact.phone}</Card.Description>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Presence>
  );
}
