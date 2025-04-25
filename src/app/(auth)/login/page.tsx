import { Card } from '@chakra-ui/react';
import LoginForm from '../../../components/auth/login.form';

export default function LoginPage() {
  return (
    <Card.Root maxW={'lg'} minW={'sm'} position={'relative'}>
      <Card.Header>
        <Card.Title>Login</Card.Title>
      </Card.Header>
      <LoginForm />
    </Card.Root>
  );
}
