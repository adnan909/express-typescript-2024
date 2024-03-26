import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  email: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }),
  name: z.string({ required_error: 'Name is required' }),
  avatar: z.object({
    originalname: z.string(),
    mimetype: z.string(),
    size: z.number(),
    buffer: z.instanceof(Buffer),
  }),
  // ... other common validations
};
