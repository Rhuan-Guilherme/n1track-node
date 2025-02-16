export class CredentialsInvalidError extends Error {
  constructor() {
    super('Usuário ou senha inválidos.');
  }
}
