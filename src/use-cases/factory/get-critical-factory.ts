import { PrismaCriticalRepostiory } from '@/repositories/prisma-repository/prisma-critical-repository';
import { GetCriticalUseCase } from '../get-critical';

export function makeGetCritical() {
  const criticalRepository = new PrismaCriticalRepostiory();
  const getCriticalUseCase = new GetCriticalUseCase(criticalRepository);

  return getCriticalUseCase;
}
