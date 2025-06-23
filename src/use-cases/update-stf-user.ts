import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';
import { StfUsers } from '@prisma/client';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

interface updateStfUserReqeust {
  id: string;
  login?: string;
  name?: string;
  cargo?: string;
  area?: string;
}

interface updateStfUserResponse {
  user: StfUsers;
}

export class updateStfUserUseCase {
  constructor(private stfUserRepository: StfUsersRepositoryInterface) {}

  async execute({
    id,
    area,
    cargo,
    login,
    name,
  }: updateStfUserReqeust): Promise<updateStfUserResponse> {
    const user = await this.stfUserRepository.updateUser(id, {
      area,
      cargo,
      login,
      name,
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
