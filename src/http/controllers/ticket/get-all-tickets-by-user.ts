import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeGetAllTicketsByUser } from '@/use-cases/factory/get-all-tickets-by-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getAllTicketsByUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const queryGetTickets = request.query;

    const getTicketsSchema = z.object({
      isDeleted: z.coerce.boolean().optional(),
      vip: z.coerce.boolean().optional(),
      open: z.coerce.boolean().optional(),
      close: z.coerce.boolean().optional(),
    });

    const { isDeleted, vip, open, close } =
      getTicketsSchema.parse(queryGetTickets);

    const getTicketsUseCase = makeGetAllTicketsByUser();
    const tickets = await getTicketsUseCase.execute(
      request.user.sub,
      isDeleted,
      vip,
      open,
      close
    );
    return reply.status(200).send({ tickets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
