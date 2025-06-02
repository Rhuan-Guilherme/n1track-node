import { PrismaBindsRepostiory } from '@/repositories/prisma-repository/prisma-binds-repository';
import { DeleteBindUseCase } from '../delete-bind';

export function makeDeleteBind() {
  const BindlRepository = new PrismaBindsRepostiory();
  const deleteBindlUseCase = new DeleteBindUseCase(BindlRepository);

  return deleteBindlUseCase;
}
