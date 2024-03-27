import { z } from 'zod';

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
  email: z.string({ required_error: 'Email is required' }),
  password: z.string({ required_error: 'Password is required' }),
  name: z.string({ required_error: 'Name is required' }).min(3, 'Name must containe atleast 3 letters'),
  avatar: z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().regex(/^image\/(png|jpeg|gif)$/),
    size: z.number().min(0),
  }),
  // ... other common validations
};
