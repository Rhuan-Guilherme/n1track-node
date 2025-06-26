import { UserAlreadyExists } from '@/use-cases/exceptions/user-already-exists-error';
import { makeCreateStfuser } from '@/use-cases/factory/create-stf-user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createStfUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    login: z.string(),
    cargo: z.string(),
    area: z.string(),
    vip: z.boolean().optional(),
  });

  const { area, cargo, login, name, vip } = bodySchema.parse(request.body);

  try {
    const createStfUser = makeCreateStfuser();
    await createStfUser.execute({ area, cargo, login, name, vip });
    return reply
      .status(200)
      .send({ message: 'Usuário adicionado a lista com sucesso!' });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({
        message: 'O usuário informado já está cadastrado! Tente novamente.',
      });
    }
    reply.status(400).send({ error });
  }
}
