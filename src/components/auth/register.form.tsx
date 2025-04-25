'use client';

import {
  Box,
  Button,
  Card,
  Center,
  Field,
  Fieldset,
  Input,
  Presence,
  Spinner,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { PasswordInput } from '../ui/password-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { toaster } from '../ui/toaster';
import { formSchema, Inputs } from './register.schema';
import { useAuth } from '../../hooks/use-auth.hook';
import { useRouter } from 'next/navigation';
import { HttpStatus } from '../../constants/http.status';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(formSchema) });

  const { isLoading, register: registerUser } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    async (data) => {
      const result = await registerUser(data);

      if (result?.value?.user && !result?.error) {
        toaster.success({
          title: 'Success',
          description: 'Successfully registered in!',
        });

        return router.push('/');
      }

      const { message, status } = result.error!;

      if ([HttpStatus.BAD_REQUEST].includes(status)) {
        toaster.warning({
          title: 'Invalid Credentials',
          description: 'Email and/or password invalid',
        });
        return;
      }

      toaster.error({
        title: 'Oops!',
        description: 'Something went wrong',
      });
      console.log(
        "Usually this should not occurr, so here's some additional information:",
        { message, status }
      );
    },
    [registerUser, router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Body>
        <Fieldset.Root disabled={isLoading}>
          <Stack gap={4} w={'full'}>
            <Field.Root invalid={!!errors.name} required>
              <Field.Label>
                Name
                <Field.RequiredIndicator />
              </Field.Label>
              <Input {...register('name', { required: true })} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.email} required>
              <Field.Label>
                Email
                <Field.RequiredIndicator />
              </Field.Label>
              <Input type="email" {...register('email', { required: true })} />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.password} required>
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput
                {...register('password', { required: true, minLength: 3 })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
            <Text textAlign={'center'} color={'fg.muted'} fontSize={'sm'}>
              Already have an account?{' '}
              <ChakraLink asChild color={'teal'} fontWeight={'bold'}>
                <NextLink href={'/login'}>Login</NextLink>
              </ChakraLink>{' '}
              instead.
            </Text>
          </Stack>
        </Fieldset.Root>
      </Card.Body>
      <Card.Footer justifyContent={'flex-end'}>
        <Button variant={'solid'} type="submit" disabled={isLoading}>
          Register
        </Button>
      </Card.Footer>
      <Presence
        present={isLoading}
        animationName={{
          _open: 'fade-in',
          _closed: 'fade-out',
        }}
        animationDuration="moderate"
      >
        <Box pos={'absolute'} inset={0} bg={'bg/70'}>
          <Center h={'full'}>
            <Spinner color={'green.300'} />
          </Center>
        </Box>
      </Presence>
    </form>
  );
}
