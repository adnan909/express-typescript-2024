import { User } from '@/api/user/userModel';

export const users: User[] = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    age: 42,
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '$2b$10$ub12x8eFUNyPRxRGdYipgeusZ22n2Db8r9tGPVV5iNM9/ctzEdOVa',
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    age: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '$2b$10$ub12x8eFUNyPRxRGdYipgeusZ22n2Db8r9tGPVV5iNM9/ctzEdOVa',
  },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return users;
  },

  findByIdAsync: async (id: number): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return users.find((user) => user.email === email) || null;
  },
};
