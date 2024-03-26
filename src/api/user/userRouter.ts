import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetUserSchema, PatchUserSchema, PostUserSchema, UserSchema } from '@/api/user/userModel';
import { userService } from '@/api/user/userService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const userRegistry = new OpenAPIRegistry();

userRegistry.register('User', UserSchema);

export const userRouter: Router = (() => {
  const router = express.Router();

  userRegistry.registerPath({
    method: 'get',
    path: '/users',
    tags: ['User'],
    responses: createApiResponse(z.array(UserSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await userService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  userRegistry.registerPath({
    method: 'get',
    path: '/users/{id}',
    tags: ['User'],
    request: { params: GetUserSchema.shape.params },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetUserSchema), async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await userService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  // register
  userRegistry.registerPath({
    method: 'post',
    path: '/users',
    tags: ['User'],
    request: {
      body: {
        description: 'register with email and password',
        content: {
          'application/json': {
            schema: PostUserSchema.shape.body,
            example: {
              email: 'some@email.com',
              password: 'somepassword',
            },
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.post('/', validateRequest(PostUserSchema), async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const serviceResponse = await userService.createUser(email, password);
    handleServiceResponse(serviceResponse, res);
  });
  // update profile
  userRegistry.registerPath({
    method: 'patch',
    path: '/users',
    tags: ['User'],
    request: {
      body: {
        description: 'login with email and password',
        content: {
          'application/json': {
            schema: PatchUserSchema.shape.body,
            // example: {
            //   name: 'some-name',
            //   // avatar: '',
            // },
          },
        },
        required: true,
      },
    },
    responses: createApiResponse(UserSchema, 'Success'),
  });

  router.patch('/', validateRequest(PatchUserSchema), async (req: Request, res: Response) => {
    const { name, avatar } = req.body;
    const serviceResponse = await userService.updateUser(name, avatar);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
