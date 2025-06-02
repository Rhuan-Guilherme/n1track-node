import { PrismaCriticalRepostiory } from '@/repositories/prisma-repository/prisma-critical-repository';
import { DeleteCriticalUseCase } from '../delete-critical';

export function makeDeleteCritical() {
  const criticalRepository = new PrismaCriticalRepostiory();
  const deleteCriticalUseCase = new DeleteCriticalUseCase(criticalRepository);

  return deleteCriticalUseCase;
}
