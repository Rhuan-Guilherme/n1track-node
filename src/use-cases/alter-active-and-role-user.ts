import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

interface AlterActiveAndRoleRequest {
  id: string;
  is_active: boolean;
  role: 'ADMIN' | 'SUPER' | 'USER';
}

interface AlterActiveAndRoleResponse {
  user: User;
}

export class AlterActiveAndRoleUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    id,
    is_active,
    role,
  }: AlterActiveAndRoleRequest): Promise<AlterActiveAndRoleResponse> {
    const user = await this.userRepository.alterActiveAndRole(
      id,
      is_active,
      role
    );

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
