import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';

export class RemoveStfuserVipUseCase {
  constructor(private stfUsersRepository: StfUsersRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.stfUsersRepository.removeVip(id);
  }
}
