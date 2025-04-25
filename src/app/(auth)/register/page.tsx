import { Card } from '@chakra-ui/react';
import RegisterForm from '../../../components/auth/register.form';

export default function RegisterPage() {
  return (
    <Card.Root maxW={'lg'} minW={'sm'} position={'relative'}>
      <Card.Header>
        <Card.Title>Register</Card.Title>
      </Card.Header>
      <RegisterForm />
    </Card.Root>
  );
}
