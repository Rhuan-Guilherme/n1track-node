import { makeCreateBindl } from '@/use-cases/factory/create-bind-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createBind(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const { description, title } = createSchema.parse(request.body);

  try {
    const critical = makeCreateBindl();
    const response = await critical.execute({ description, title });
    return reply.status(201).send(response);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
