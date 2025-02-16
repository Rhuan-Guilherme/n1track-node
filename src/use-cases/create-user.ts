import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';
import { UserAlreadyExists } from './exceptions/user-already-exists-error';
import { hash } from 'bcryptjs';
import { ValidateInputsError } from './exceptions/validate-inputs-error';
import { testEmailRegex } from '@/lib/verify-email-rejex';

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
    if (email.length < 2 || name.length < 2 || password.length < 2) {
      throw new ValidateInputsError(
        'Email, nome e senha devem ter pelo menos 2 caracteres.'
      );
    }

    const testEmail = testEmailRegex(email);

    if (testEmail === false) {
      throw new ValidateInputsError('O e-mail não é válido.');
    }

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
