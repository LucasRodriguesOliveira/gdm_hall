import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(3, 'Name must have at least 3 characters length'),
  phone: z.string({ message: 'Phone is required' }),
  state: z.string({ message: 'State is required' }).array(),
});

export type Inputs = {
  name: string;
  phone: string;
  state: string[];
};

