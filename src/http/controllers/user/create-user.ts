import { UserAlreadyExists } from '@/use-cases/exceptions/user-already-exists-error';
import { makeCreateUser } from '@/use-cases/factory/create-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    name: z.string().min(2, 'O nome do usuário deve ser maior'),
    email: z.string().email('O e-mail informado é inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  const { email, name, password } = createSchema.parse(request.body);

  try {
    const createUser = makeCreateUser();
    await createUser.execute({ email, name, password });
    reply.status(201).send({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      reply.status(400).send({ error: error.message });
    }
  }
}
