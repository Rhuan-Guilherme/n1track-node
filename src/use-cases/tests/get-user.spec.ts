import { beforeAll, describe, expect, test } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { GetUserUseCase } from '../get-user';

let repository: InMemoryUserRepository;
let sup: GetUserUseCase;

describe('Teste para obter dados de um usuário.', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new GetUserUseCase(repository);
  });

  test('Deve ser possível obter dados do usuário pelo ID fornecido.', async () => {
    const userCreate = await repository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const { user } = await sup.execute({ id: userCreate.id });

    expect(user.name).toEqual('John Doe');
    expect(user.id).toEqual(userCreate.id);
    expect(user.email).toEqual('john.doe@example.com');
  });
});
