import { BindRepositoryInterface } from '@/repositories/binds-repository-interface';
import { Bind } from '@prisma/client';

interface getBindsResponse {
  binds: Bind[] | null;
}

export class GetBindsUseCase {
  constructor(private bindRepository: BindRepositoryInterface) {}

  async execute(): Promise<getBindsResponse> {
    const binds = await this.bindRepository.getBinds();

    return {
      binds,
    };
  }
}
