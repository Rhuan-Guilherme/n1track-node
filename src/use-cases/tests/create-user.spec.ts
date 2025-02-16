import { beforeAll, describe, expect, test } from 'vitest';
import { CreateUserUseCase } from '../create-user';
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';

let repository: InMemoryUserRepository;
let sup: CreateUserUseCase;

describe('Teste para a criação de um novo usuário.', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new CreateUserUseCase(repository);
  });

  test('Deve ser possível criar um novo usuário.', async () => {
    const { user } = await sup.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user.name).toEqual('John Doe');
    expect(user.email).toEqual('john.doe@example.com');
  });
});
