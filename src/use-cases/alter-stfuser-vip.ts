import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';

export class AlterStfuserUseCase {
  constructor(private stfUsersRepository: StfUsersRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.stfUsersRepository.alterVip(id);
  }
}
