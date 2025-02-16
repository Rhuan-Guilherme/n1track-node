import { $Enums, Prisma, User } from '@prisma/client';
import { UserRepositoryInterface } from '../user-repository-interface';
import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';

export class InMemoryUserRepository implements UserRepositoryInterface {
  public user: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.user.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.user.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: await hash(data.password, 6),
      role: $Enums.Roles.USER,
      created_at: new Date(),
      is_active: false,
    };

    this.user.push(user);

    return user;
  }
}
