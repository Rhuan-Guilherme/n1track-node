import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeRestoreTicket } from '@/use-cases/factory/restore-ticket-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function restoreTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const getTicketsUseCase = makeRestoreTicket();
    await getTicketsUseCase.execute(id);
    return reply
      .status(200)
      .send({ message: 'Chamado restaurado com sucesso!' });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
