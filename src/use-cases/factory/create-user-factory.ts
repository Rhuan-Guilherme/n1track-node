import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { CreateUserUseCase } from '../create-user';

export function makeCreateUser() {
  const userRepository = new PrismaUserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
