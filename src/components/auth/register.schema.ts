import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(3, 'Name must contain at least 3 characters')
    .max(100, 'Name cannot be greater than 100 characters'),
  email: z
    .string({ message: 'Email is required' })
    .max(150, 'Email cannot be greater than 150 characters')
    .email('Must be a valid email'),
  password: z
    .string({ message: 'Password is required' })
    .max(150, 'Password cannot be greater than 150 characters')
    .min(3, 'Password must have more than 3 characters length'),
});

export type Inputs = {
  name: string;
  email: string;
  password: string;
};
