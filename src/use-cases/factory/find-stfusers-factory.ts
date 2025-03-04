import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { FindStfuserUseCase } from '../find-stfusers';

export function makeFindStfusers() {
  const stfUsersRepository = new PrismaStfUsersRepository();
  const findStfuser = new FindStfuserUseCase(stfUsersRepository);

  return findStfuser;
}
