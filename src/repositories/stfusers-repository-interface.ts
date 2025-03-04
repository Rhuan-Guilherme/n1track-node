import { StfUsers } from '@prisma/client';

export interface StfUsersRepositoryInterface {
  findUsers(params: string): Promise<StfUsers[]>;
  alterVip(id: string): Promise<void>;
  removeVip(id: string): Promise<void>;
}
