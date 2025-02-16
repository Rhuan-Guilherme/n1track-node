import { User, Prisma } from '@prisma/client';
import { UserRepositoryInterface } from '../user-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository implements UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null> {
    const user = prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  create(data: Prisma.UserCreateInput): Promise<User> {
    const user = prisma.user.create({
      data,
    });

    return user;
  }
}
