import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { GetAllUsersUseCase } from '../get-all-users';

export function makeGetAllUsers() {
  const userRepository = new PrismaUserRepository();
  const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

  return getAllUsersUseCase;
}
