import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeGetAllTicketsByUser } from '@/use-cases/factory/get-all-tickets-by-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllTicketsByUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getTicketsUseCase = makeGetAllTicketsByUser();
    const tickets = await getTicketsUseCase.execute(request.user.sub);
    return reply.status(201).send({ tickets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
