import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new ResourceNotFoundError();
    }

    await this.userRepository.deleteUser(id);
  }
}
