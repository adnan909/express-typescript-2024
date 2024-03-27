import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  avatar: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

// Input Validation for 'POST users/' endpoint
export const PostUserSchema = z.object({
  body: z.object({ email: commonValidations.email, password: commonValidations.password }),
});

// Input Validation for 'POST users/' endpoint
export const PatchUserSchema = z.object({
  body: z.object({ name: commonValidations.name }),
  file: commonValidations.avatar,
});
