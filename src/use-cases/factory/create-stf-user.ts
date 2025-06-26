import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { CreateStfUserUseCase } from '../create-stf-user';

export function makeCreateStfuser() {
  const stfUserRepository = new PrismaStfUsersRepository();
  const createStfUser = new CreateStfUserUseCase(stfUserRepository);

  return createStfUser;
}
