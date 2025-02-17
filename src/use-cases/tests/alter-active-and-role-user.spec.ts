import { beforeAll, describe, expect, test } from 'vitest';

import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { AlterActiveAndRoleUseCase } from '../alter-active-and-role-user';

let repository: InMemoryUserRepository;
let sup: AlterActiveAndRoleUseCase;

describe('Alteração de dados de um usuário.', () => {
  beforeAll(() => {
    repository = new InMemoryUserRepository();
    sup = new AlterActiveAndRoleUseCase(repository);
  });

  test('Deve ser possível alterar role e active de um usuário.', async () => {
    const userCreate = await repository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    const { user } = await sup.execute({
      id: userCreate.id,
      is_active: true,
      role: 'ADMIN',
    });

    expect(user.name).toEqual('John Doe');
    expect(user.email).toEqual('john.doe@example.com');
    expect(user.is_active).toBe(true);
    expect(user.role).toEqual('ADMIN');
  });
});
