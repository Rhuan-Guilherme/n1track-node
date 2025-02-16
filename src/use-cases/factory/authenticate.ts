import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticate() {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
