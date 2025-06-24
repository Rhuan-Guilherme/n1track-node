import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { topStfusersMonthUseCase } from '../return-top-stf-users-month';

export function makeReturnTopStfUserMonth() {
  const stfUserRepository = new PrismaStfUsersRepository();
  const topStfUsersMonth = new topStfusersMonthUseCase(stfUserRepository);

  return topStfUsersMonth;
}
