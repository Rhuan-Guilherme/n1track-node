import { StfUsersRepositoryInterface } from '@/repositories/stfusers-repository-interface';
import { UserAlreadyExists } from './exceptions/user-already-exists-error';
import { StfUsers } from '@prisma/client';

interface CreateStfUserUseProps {
  login: string;
  name: string;
  cargo: string;
  area: string;
  vip?: boolean;
}

interface CreateStfUserUseResponse {
  stfUser: StfUsers;
}

export class CreateStfUserUseCase {
  constructor(private stfUserRepository: StfUsersRepositoryInterface) {}

  async execute({
    area,
    cargo,
    login,
    name,
    vip = false,
  }: CreateStfUserUseProps): Promise<CreateStfUserUseResponse> {
    const findUser = await this.stfUserRepository.findByLogin(login);

    if (findUser) {
      throw new UserAlreadyExists();
    }

    const stfUser = await this.stfUserRepository.create({
      area,
      cargo,
      login,
      name,
      telefone: '',
      vip,
    });

    return {
      stfUser,
    };
  }
}
