import { PrismaBindsRepostiory } from '@/repositories/prisma-repository/prisma-binds-repository';
import { CreateBindUseCase } from '../create-bind';

export function makeCreateBindl() {
  const BindlRepository = new PrismaBindsRepostiory();
  const createBindlUseCase = new CreateBindUseCase(BindlRepository);

  return createBindlUseCase;
}
