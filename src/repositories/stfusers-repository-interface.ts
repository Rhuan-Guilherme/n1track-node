import { Prisma, StfUsers } from '@prisma/client';

export interface StfUsersRepositoryInterface {
  create(data: Prisma.StfUsersCreateInput): Promise<StfUsers>;
  findUsers(params: string): Promise<StfUsers[]>;
  findByLogin(login: string): Promise<StfUsers | null>;
  updateUser(id: string, user: Prisma.StfUsersUpdateInput): Promise<StfUsers>;
  alterVip(id: string): Promise<void>;
  removeVip(id: string): Promise<void>;
  allTicketsStfUsers(): Promise<unknown>;
  allTicketsStfUsersMonth(): Promise<unknown>;
}
