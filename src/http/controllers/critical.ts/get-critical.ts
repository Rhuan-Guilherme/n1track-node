import { makeGetCritical } from '@/use-cases/factory/get-critical-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getCritical(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const critical = makeGetCritical();
    const response = await critical.execute();
    return reply.status(201).send(response);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
