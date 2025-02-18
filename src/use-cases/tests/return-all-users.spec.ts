import { beforeAll, describe, expect, test } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { GetAllUsersUseCase } from '../get-all-users';

let repository: InMemoryUserRepository;
let sup: GetAllUsersUseCase;

describe('Teste para retorno de usuários em lista', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new GetAllUsersUseCase(repository);
  });

  test('Deve ser possível obter dados de todos os usuários cadastrados no sistema.', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    await repository.create({
      name: 'John Doe2',
      email: 'john.do2e@example.com',
      password: 'password123',
    });
    await repository.create({
      name: 'John Doe3',
      email: 'john.doe3@example.com',
      password: 'password123',
    });

    const users = await sup.execute();

    expect(users.length).toEqual(3);
    expect(users[0].email).toEqual('john.doe@example.com');
  });
});
