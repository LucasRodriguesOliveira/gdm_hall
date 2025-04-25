import {
  Container,
  Show,
} from '@chakra-ui/react';
import Nav from '../components/nav/nav';
import ContactContainer from '../components/contact/contact-container';
import AddContactActions from '../components/contact/add-contact-actions';
import { contacts } from './mock';

export default function Home() {

  return (
    <Container w={'full'} p={0}>
      <Nav />
      <Container p={4}>
        <Show when={contacts.length > 0}>
          <AddContactActions />
        </Show>
        <ContactContainer />
      </Container>
    </Container>
  );
}
