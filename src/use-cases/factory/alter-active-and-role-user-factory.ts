import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { AlterActiveAndRoleUseCase } from '../alter-active-and-role-user';

export function makealterActiveAndRoleUseCase() {
  const userRepository = new PrismaUserRepository();
  const alterActiveAndRoleUseCase = new AlterActiveAndRoleUseCase(
    userRepository
  );

  return alterActiveAndRoleUseCase;
}
