import { Prisma, StfUsers } from '@prisma/client';
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

  async updateUser(
    id: string,
    user: Prisma.StfUsersUpdateInput
  ): Promise<StfUsers> {
    const userProps = await prisma.stfUsers.update({
      where: {
        id,
      },
      data: user,
    });

    return userProps;
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

  async allTicketsStfUsers(): Promise<
    { login: string; name: string; area: string; count: number }[]
  > {
    try {
      const result = await prisma.$queryRaw<
        Array<{ login: string; name: string; area: string; count: number }>
      >`
       SELECT 
        s.login, 
        s.name, 
        s.area,
        CAST(COUNT(t.id) AS INTEGER) AS count
      FROM stfusers s
      LEFT JOIN tickets t ON t.login = s.login
      GROUP BY s.login, s.name, s.area
      HAVING COUNT(t.id) > 0
      ORDER BY count DESC
      LIMIT 10
    `;

      const parsedResult = result.map((r) => ({
        ...r,
        count: Number(r.count),
      }));

      return parsedResult;
    } catch (error) {
      console.error('Erro na query raw:', error);
      throw error;
    }
  }
}
