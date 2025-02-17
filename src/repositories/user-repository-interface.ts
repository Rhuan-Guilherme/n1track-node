import { Prisma, User } from '@prisma/client';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  alterActiveAndRole(
    id: string,
    is_active: boolean,
    role: 'ADMIN' | 'SUPER' | 'USER'
  ): Promise<User>;
}
