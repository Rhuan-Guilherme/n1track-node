import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makePerformaceTicket } from '@/use-cases/factory/get-performace-user';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getPerformaceUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getTicketsUseCase = makePerformaceTicket();
    const performace = await getTicketsUseCase.execute(request.user.sub);

    return reply.status(200).send(performace);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
