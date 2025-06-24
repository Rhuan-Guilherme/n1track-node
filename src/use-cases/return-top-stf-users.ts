import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';

export class topStfusersUseCase {
  constructor(private stfUserRepository: StfUsersRepositoryInterface) {}

  async execute() {
    const users = await this.stfUserRepository.allTicketsStfUsers();

    return users;
  }
}
