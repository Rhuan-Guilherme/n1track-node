import { PrismaCriticalRepostiory } from '@/repositories/prisma-repository/prisma-critical-repository';
import { CreateCriticalUseCase } from '../create-critical';

export function makeCreateCritical() {
  const criticalRepository = new PrismaCriticalRepostiory();
  const createCriticalUseCase = new CreateCriticalUseCase(criticalRepository);

  return createCriticalUseCase;
}
