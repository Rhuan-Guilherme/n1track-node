import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeStatusCloseTicket } from '@/use-cases/factory/status-close-ticket-spec';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function statusCloseTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const getTicketsUseCase = makeStatusCloseTicket();
    await getTicketsUseCase.execute(id);
    return reply
      .status(200)
      .send({ message: 'Chamado finalizado com sucesso!' });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
