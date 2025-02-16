import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { GetUserUseCase } from '../get-user';

export function makeGetUser() {
  const userRepository = new PrismaUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  return getUserUseCase;
}
