import { Prisma, Critical } from '@prisma/client';
import { CriticalRepositoryInterface } from '../critical-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaCriticalRepostiory implements CriticalRepositoryInterface {
  async create(data: Prisma.CriticalCreateInput): Promise<Critical> {
    await prisma.critical.deleteMany();

    const critical = await prisma.critical.create({
      data,
    });

    return critical;
  }
  async getCritical(): Promise<Critical | null> {
    const critical = await prisma.critical.findFirst();

    return critical;
  }

  async delete(id: string): Promise<void> {
    await prisma.critical.delete({
      where: {
        id,
      },
    });
  }
}
