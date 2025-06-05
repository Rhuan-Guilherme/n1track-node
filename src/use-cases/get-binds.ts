import { BindRepositoryInterface } from '@/repositories/binds-repository-interface';
import { Bind } from '@prisma/client';

interface getBindsRequest {
  query?: string;
}

interface getBindsResponse {
  binds: Bind[] | null;
}

export class GetBindsUseCase {
  constructor(private bindRepository: BindRepositoryInterface) {}

  async execute({ query }: getBindsRequest): Promise<getBindsResponse> {
    const binds = await this.bindRepository.getBinds(query);

    return {
      binds,
    };
  }
}
