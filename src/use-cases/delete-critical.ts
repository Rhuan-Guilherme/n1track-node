import { CriticalRepositoryInterface } from '@/repositories/critical-repository-interface';

interface deleteCriticalRequest {
  id: string;
}

export class DeleteCriticalUseCase {
  constructor(private criticalRepository: CriticalRepositoryInterface) {}

  async execute({ id }: deleteCriticalRequest): Promise<void> {
    await this.criticalRepository.delete(id);
  }
}
