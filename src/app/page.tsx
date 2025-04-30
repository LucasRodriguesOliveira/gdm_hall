import { Container } from '@chakra-ui/react';
import Nav from '../components/nav/nav';
import ContactContainer from '../components/contact/contact-container';
import AddContactActions from '../components/contact/add-contact-actions';

export default function Home() {
  return (
    <Container w={'full'} p={0}>
      <Nav />
      <Container p={4}>
        <AddContactActions />
        <ContactContainer />
      </Container>
    </Container>
  );
}
