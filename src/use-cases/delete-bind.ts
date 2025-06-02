import { BindRepositoryInterface } from '@/repositories/binds-repository-interface';

interface deleteBindRequest {
  id: string;
}

export class DeleteBindUseCase {
  constructor(private bindRepository: BindRepositoryInterface) {}

  async execute({ id }: deleteBindRequest): Promise<void> {
    await this.bindRepository.delete(id);
  }
}
