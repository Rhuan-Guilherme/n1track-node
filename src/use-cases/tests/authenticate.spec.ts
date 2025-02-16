import { beforeAll, describe, expect, test } from 'vitest';

import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { AuthenticateUseCase } from '../authenticate';

let repository: InMemoryUserRepository;
let sup: AuthenticateUseCase;

describe('Teste para autenticação do usuário.', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new AuthenticateUseCase(repository);
  });

  test('Deve ser possível autenticar um usuário.', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const { user } = await sup.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.name).toEqual('John Doe');
    expect(user.email).toEqual('john.doe@example.com');
  });
});
