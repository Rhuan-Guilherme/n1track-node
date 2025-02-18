import { UserRepositoryInterface } from '@/repositories/user-repository-interface';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
