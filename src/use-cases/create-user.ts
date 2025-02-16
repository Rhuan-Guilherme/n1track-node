import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';
import { UserAlreadyExists } from './exceptions/user-already-exists-error';
import { hash } from 'bcryptjs';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const findUser = await this.userRepository.findByEmail(email);

    if (findUser) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 6);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return {
      user,
    };
  }
}
