import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

import { UserSchema } from '../user/userModel';

extendZodWithOpenApi(z);

export const AuthSchema = z.object({
  user: UserSchema,
  token: z.string(),
});

// Input Validation for 'POST auth/login' endpoint
export const GetAuthSchema = z.object({
  body: z.object({ email: commonValidations.email, password: commonValidations.password }),
});
