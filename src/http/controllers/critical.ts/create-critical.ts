import { makeCreateCritical } from '@/use-cases/factory/create-critical-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createCritical(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createSchema = z.object({
    title: z.string(),
    description: z.string(),
    link: z.string(),
  });

  const { description, link, title } = createSchema.parse(request.body);

  try {
    const critical = makeCreateCritical();
    const response = await critical.execute({ description, link, title });
    return reply.status(201).send(response);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
