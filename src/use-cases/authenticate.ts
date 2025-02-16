import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { CredentialsInvalidError } from './exceptions/credentials-invalid-error';

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new CredentialsInvalidError();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new CredentialsInvalidError();
    }

    return {
      user,
    };
  }
}
