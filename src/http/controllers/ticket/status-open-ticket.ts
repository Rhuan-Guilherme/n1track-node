import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeStatusOpenTicket } from '@/use-cases/factory/status-open-ticket-spec';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function statusOpenTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const getTicketsUseCase = makeStatusOpenTicket();
    await getTicketsUseCase.execute(id);
    return reply.status(200).send({ message: 'Chamado reaberto com sucesso!' });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
