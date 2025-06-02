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

  async getBinds(): Promise<Bind[] | null> {
    const binds = await prisma.bind.findMany();

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
