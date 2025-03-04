import { StfUsers } from '@prisma/client';
import { StfUsersRepositoryInterface } from '../stfusers-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaStfUsersRepository implements StfUsersRepositoryInterface {
  async findUsers(params: string): Promise<StfUsers[]> {
    const users = await prisma.stfUsers.findMany({
      where: {
        OR: [{ login: { contains: params } }],
      },
      orderBy: {
        login: 'asc',
      },
      take: 10,
    });

    return users;
  }

  async alterVip(id: string): Promise<void> {
    await prisma.stfUsers.update({
      where: {
        id,
      },
      data: {
        vip: true,
      },
    });
  }

  async removeVip(id: string): Promise<void> {
    await prisma.stfUsers.update({
      where: {
        id,
      },
      data: {
        vip: false,
      },
    });
  }
}
