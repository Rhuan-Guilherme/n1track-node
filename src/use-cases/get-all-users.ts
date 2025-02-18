import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.returnAllUsers();

    return users;
  }
}
