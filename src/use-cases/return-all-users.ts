import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';

export class ReturnAllUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.returnAllUsers();

    return users;
  }
}
