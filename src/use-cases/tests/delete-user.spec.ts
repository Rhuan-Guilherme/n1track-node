import { beforeAll, describe, expect, test } from 'vitest';
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { DeleteUserUseCase } from '../delete-user';

let repository: InMemoryUserRepository;
let sup: DeleteUserUseCase;

describe('Teste deleção de usuários.', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new DeleteUserUseCase(repository);
  });

  test('Deve ser possível excluir o perfil de um usuário do sistema permanentemente.', async () => {
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
    const userCreate = await repository.create({
      name: 'John Doe3',
      email: 'john.doe3@example.com',
      password: 'password123',
    });

    await sup.execute(userCreate.id);

    console.log(repository.user);

    expect(repository.user.length).toEqual(2);
    expect(repository.user[2]).toBe(undefined);
  });
});
