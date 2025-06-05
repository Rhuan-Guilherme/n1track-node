import { Bind, Prisma } from '@prisma/client';

export interface BindRepositoryInterface {
  create(data: Prisma.BindCreateInput): Promise<Bind>;
  getBinds(query?: string): Promise<Bind[] | null>;
  delete(id: string): Promise<void>;
}
