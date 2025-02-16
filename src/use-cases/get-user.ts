import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

interface GetUserRequest {
  id: string;
}

interface GetUserResponse {
  user: User;
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
