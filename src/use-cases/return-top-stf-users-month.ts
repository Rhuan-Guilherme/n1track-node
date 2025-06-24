import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';

export class topStfusersMonthUseCase {
  constructor(private stfUserRepository: StfUsersRepositoryInterface) {}

  async execute() {
    const users = await this.stfUserRepository.allTicketsStfUsersMonth();

    return users;
  }
}
