import { User, Prisma } from '@prisma/client';
import { UserRepositoryInterface } from '../user-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaUserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async alterActiveAndRole(
    id: string,
    is_active: boolean,
    role: 'ADMIN' | 'SUPER' | 'USER'
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        is_active,
        role,
      },
    });

    return user;
  }
}
