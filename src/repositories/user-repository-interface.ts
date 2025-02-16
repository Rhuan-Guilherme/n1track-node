import { Prisma, User } from '@prisma/client';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
