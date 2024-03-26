import { User } from '@/api/user/userModel';

export const users: User[] = [
  {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    avatar: '42',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '$2b$10$ub12x8eFUNyPRxRGdYipgeusZ22n2Db8r9tGPVV5iNM9/ctzEdOVa',
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@example.com',
    avatar: '21',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '$2b$10$ub12x8eFUNyPRxRGdYipgeusZ22n2Db8r9tGPVV5iNM9/ctzEdOVa',
  },
];

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    return users;
  },

  findByIdAsync: async (id: string): Promise<User | null> => {
    return users.find((user) => user.id === id) || null;
  },
  findByEmail: async (email: string): Promise<User | null> => {
    return users.find((user) => user.email === email) || null;
  },
  create: async (email: string, password: string): Promise<User | null> => {
    // create logic in db
    console.log(email, password);
    return users[0] || null;
  },
  update: async (id: string, name: string, avatar: string): Promise<User> => {
    console.log(name, avatar);
    return users[0] || null;
  },
};
