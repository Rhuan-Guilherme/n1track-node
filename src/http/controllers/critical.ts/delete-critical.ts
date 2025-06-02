import { makeDeleteCritical } from '@/use-cases/factory/delete-critical-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteCritical(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = createSchema.parse(request.params);

  try {
    const critical = makeDeleteCritical();
    await critical.execute({ id });
    return reply.status(200).send();
  } catch (error) {
    reply.status(400).send({ error });
  }
}
