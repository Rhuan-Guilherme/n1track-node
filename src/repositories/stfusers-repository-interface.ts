import { StfUsers } from '@prisma/client';

export interface StfUsersRepositoryInterface {
  findUsers(params: string): Promise<StfUsers[]>;
}
