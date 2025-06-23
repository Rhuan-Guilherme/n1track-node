import { makeUpdateStfUser } from '@/use-cases/factory/update-stf-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateStfusers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userProps = z.object({
    name: z.string().optional(),
    login: z.string().optional(),
    cargo: z.string().optional(),
    area: z.string().optional(),
  });

  const { area, cargo, login, name } = userProps.parse(request.body);
  const { id } = request.params as { id: string };

  try {
    const updateUseCase = makeUpdateStfUser();
    const user = await updateUseCase.execute({ area, cargo, id, login, name });
    return reply.status(200).send(user);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
