import { Prisma, StfUsers } from '@prisma/client';

export interface StfUsersRepositoryInterface {
  findUsers(params: string): Promise<StfUsers[]>;
  updateUser(id: string, user: Prisma.StfUsersUpdateInput): Promise<StfUsers>;
  alterVip(id: string): Promise<void>;
  removeVip(id: string): Promise<void>;
  allTicketsStfUsers(): Promise<unknown>;
}
