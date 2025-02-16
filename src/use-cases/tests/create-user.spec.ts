import { beforeAll, describe, expect, test } from 'vitest';
import { CreateUserUseCase } from '../create-user';
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository';
import { ValidateInputsError } from '../exceptions/validate-inputs-error';
import { compare } from 'bcryptjs';

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

  test('A senha deve ser criptograda.', async () => {
    const { user } = await sup.execute({
      name: 'John Doe',
      email: 'john.doe@example.coma',
      password: 'password123',
    });

    const isPasswordIsHashed = await compare('password123', user.password);

    expect(user.name).toEqual('John Doe');
    expect(isPasswordIsHashed).toBe(true);
  });

  test('Não deve ser possível criar um novo usuário com nome vazio.', async () => {
    await expect(() =>
      sup.execute({
        name: '',
        email: 'john.doe@example.com',
        password: 'password123',
      })
    ).rejects.toBeInstanceOf(ValidateInputsError);
  });

  test('Não deve ser possível criar um novo usuário com email inválido.', async () => {
    await expect(() =>
      sup.execute({
        name: 'John Doe',
        email: 'johndoe-com',
        password: 'password123',
      })
    ).rejects.toBeInstanceOf(ValidateInputsError);
  });

  test('Não deve ser possível criar um novo usuário com senha inválida.', async () => {
    await expect(() =>
      sup.execute({
        name: '',
        email: 'john.doe@example.com',
        password: '',
      })
    ).rejects.toBeInstanceOf(ValidateInputsError);
  });
});
