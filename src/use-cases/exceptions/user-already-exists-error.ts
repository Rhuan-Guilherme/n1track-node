export class UserAlreadyExists extends Error {
  constructor() {
    super('Usuário ja cadastrado.');
  }
}
