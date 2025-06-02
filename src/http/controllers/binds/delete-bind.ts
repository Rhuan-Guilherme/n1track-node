import { makeDeleteBind } from '@/use-cases/factory/delete-bind-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteBind(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = createSchema.parse(request.params);

  try {
    const critical = makeDeleteBind();
    await critical.execute({ id });
    return reply.status(200).send();
  } catch (error) {
    reply.status(400).send({ error });
  }
}
