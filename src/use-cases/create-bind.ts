import { BindRepositoryInterface } from '@/repositories/binds-repository-interface';
import { Bind } from '@prisma/client';

interface createBindRequest {
  title: string;
  description: string;
}

interface createBindResponse {
  bind: Bind;
}

export class CreateBindUseCase {
  constructor(private bindRepository: BindRepositoryInterface) {}

  async execute({
    description,
    title,
  }: createBindRequest): Promise<createBindResponse> {
    const bind = await this.bindRepository.create({
      description,
      title,
    });

    return {
      bind,
    };
  }
}
