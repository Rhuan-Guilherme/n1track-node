import { CriticalRepositoryInterface } from '@/repositories/critical-repository-interface';
import { Critical } from '@prisma/client';

interface createCriticalRequest {
  title: string;
  description: string;
  link: string;
}

interface createCriticalResponse {
  critical: Critical;
}

export class CreateCriticalUseCase {
  constructor(private criticalRepository: CriticalRepositoryInterface) {}

  async execute({
    description,
    link,
    title,
  }: createCriticalRequest): Promise<createCriticalResponse> {
    const critical = await this.criticalRepository.create({
      description,
      link,
      title,
    });

    return {
      critical,
    };
  }
}
