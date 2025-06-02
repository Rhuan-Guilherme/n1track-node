import { makeGetCritical } from '@/use-cases/factory/get-critical-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getCritical(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const criticalUseCase = makeGetCritical();
    const { critical } = await criticalUseCase.execute();
    return reply.status(201).send(critical);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
