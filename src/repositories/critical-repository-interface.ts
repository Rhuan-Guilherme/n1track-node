import { Critical, Prisma } from '@prisma/client';

export interface CriticalRepositoryInterface {
  create(data: Prisma.CriticalCreateInput): Promise<Critical>;
  getCritical(): Promise<Critical | null>;
  delete(id: string): Promise<void>;
}
