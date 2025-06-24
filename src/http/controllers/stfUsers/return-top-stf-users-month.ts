import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeReturnTopStfUserMonth } from '@/use-cases/factory/return-top-stf-users-factory-month';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function returnTopStfUsersMonth(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const findusers = makeReturnTopStfUserMonth();
    const users = await findusers.execute();
    return reply.status(200).send(users);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
