import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { updateStfUserUseCase } from '../update-stf-user';

export function makeUpdateStfUser() {
  const stfUserRepository = new PrismaStfUsersRepository();
  const updateStfUser = new updateStfUserUseCase(stfUserRepository);

  return updateStfUser;
}
