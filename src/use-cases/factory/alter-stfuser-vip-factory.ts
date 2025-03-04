import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { AlterStfuserUseCase } from '../alter-stfuser-vip';

export function makeAlterStfuserVip() {
  const stfUsersRepository = new PrismaStfUsersRepository();
  const alterVip = new AlterStfuserUseCase(stfUsersRepository);

  return alterVip;
}
