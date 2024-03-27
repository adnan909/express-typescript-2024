import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';

import { AuthSchema, GetAuthSchema } from '@/api/auth/authModel';
import { authService } from '@/api/auth/authService';
import { UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const authRegistry = new OpenAPIRegistry();

authRegistry.register('User', UserSchema);
authRegistry.register('Auth', AuthSchema);

export const authRouter: Router = (() => {
  const router = express.Router();

  authRegistry.registerPath({
    method: 'post',
    path: '/auth/login',
    tags: ['Auth'],
    request: {
      body: {
        description: 'login with email and password',
        content: {
          'application/json': {
            schema: GetAuthSchema.shape.body,
            example: {
              email: 'some@email.com',
              password: 'somepassword',
            },
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(AuthSchema, 'Success'),
  });

  router.post('/login', validateRequest(GetAuthSchema), async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await authService.authenticate(email, password);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
