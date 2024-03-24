import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { env } from '@/common/utils/envConfig';
import { logger } from '@/server';

export const authService = {
  // authenticates user with email and password
  authenticate: async (
    email: string,
    password: string
  ): Promise<ServiceResponse<{ user: User | null; token: string } | null>> => {
    try {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new ServiceResponse(ResponseStatus.Failed, 'Invalid password', null, StatusCodes.UNAUTHORIZED);
      }

      const { JWT_SECRET } = env;
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || JWT_SECRET, { expiresIn: '1h' });

      return new ServiceResponse<{ user: User | null; token: string }>(
        ResponseStatus.Success,
        'User authenticated successfully',
        { user, token },
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding user with email ${email}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
