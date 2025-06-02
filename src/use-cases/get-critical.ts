import { CriticalRepositoryInterface } from '@/repositories/critical-repository-interface';
import { Critical } from '@prisma/client';

interface getCriticalResponse {
  critical: Critical | null;
}

export class GetCriticalUseCase {
  constructor(private criticalRepository: CriticalRepositoryInterface) {}

  async execute(): Promise<getCriticalResponse> {
    const critical = await this.criticalRepository.getCritical();

    return {
      critical,
    };
  }
}
