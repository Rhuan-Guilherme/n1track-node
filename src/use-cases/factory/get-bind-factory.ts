import { PrismaBindsRepostiory } from '@/repositories/prisma-repository/prisma-binds-repository';
import { GetBindsUseCase } from '../get-binds';

export function makeGetBind() {
  const BindlRepository = new PrismaBindsRepostiory();
  const getBindlUseCase = new GetBindsUseCase(BindlRepository);

  return getBindlUseCase;
}
