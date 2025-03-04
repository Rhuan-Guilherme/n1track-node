import { PrismaStfUsersRepository } from '@/repositories/prisma-repository/prisma-stfusers-repository';
import { RemoveStfuserVipUseCase } from '../remove-stfuser-vip';

export function makeRemoveStfuserVip() {
  const stfUsersRepository = new PrismaStfUsersRepository();
  const RemoveVip = new RemoveStfuserVipUseCase(stfUsersRepository);

  return RemoveVip;
}
