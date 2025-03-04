import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeFindStfusers } from '@/use-cases/factory/find-stfusers-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function findStfusers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { params } = request.params as { params: string };

  try {
    const findusers = makeFindStfusers();
    const users = await findusers.execute(params);
    return reply.status(200).send({ users });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
