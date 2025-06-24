import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { topStfusersUseCase } from '../return-top-stf-users';

export function makeReturnTopStfUser() {
  const stfUserRepository = new PrismaStfUsersRepository();
  const topStfUsers = new topStfusersUseCase(stfUserRepository);

  return topStfUsers;
}
