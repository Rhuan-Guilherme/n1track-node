import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeAllTicketMetrics } from '@/use-cases/factory/all-tickets-metrics-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllTicketsMetrics(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getTicketsUseCase = makeAllTicketMetrics();
    const metrics = await getTicketsUseCase.execute();

    return reply.status(200).send(metrics);
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
