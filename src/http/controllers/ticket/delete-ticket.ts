import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeDeleteTicket } from '@/use-cases/factory/delete-ticket';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function deleteTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const getTicketsUseCase = makeDeleteTicket();
    await getTicketsUseCase.execute(id);
    return reply.status(200).send({ message: 'Chamado excluido com sucesso!' });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
