import { Prisma, Bind } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { BindRepositoryInterface } from '../binds-repository-interface';

export class PrismaBindsRepostiory implements BindRepositoryInterface {
  async create(data: Prisma.BindCreateInput): Promise<Bind> {
    const bind = await prisma.bind.create({
      data,
    });

    return bind;
  }

  async getBinds(query?: string): Promise<Bind[] | null> {
    let binds;
    if (query) {
      binds = await prisma.bind.findMany({
        where: {
          OR: [{ title: { contains: query, mode: 'insensitive' } }],
        },
        orderBy: {
          title: 'asc',
        },
        take: 10,
      });
    } else {
      binds = await prisma.bind.findMany();
    }

    return binds;
  }

  async delete(id: string): Promise<void> {
    await prisma.bind.delete({
      where: {
        id,
      },
    });
  }
}
