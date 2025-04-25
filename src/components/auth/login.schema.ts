import { z } from 'zod';

export const formSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email('Must be a valid email'),
  password: z
    .string({ message: 'Password is required' })
    .min(3, 'Password must have more than 3 characters length'),
});

export type Inputs = {
  email: string;
  password: string;
};
