import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';

export class FindStfuserUseCase {
  constructor(private stfUserRepository: StfUsersRepositoryInterface) {}

  async execute(params: string) {
    const users = this.stfUserRepository.findUsers(params);

    return users;
  }
}
