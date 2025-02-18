import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { DeleteUserUseCase } from '../delete-user';

export function makeDeleteUser() {
  const userRepository = new PrismaUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  return deleteUserUseCase;
}
