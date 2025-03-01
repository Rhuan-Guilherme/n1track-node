import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeCreateTicket } from '@/use-cases/factory/create-ticket-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const ticketSchema = z.object({
    name: z.string().optional().default(''),
    login: z.string().optional().default(''),
    ramal: z.string().optional().default(''),
    local: z.string().optional().default(''),
    patrimono: z.string().optional().default(''),
    chamado: z.string().optional().default(''),
    destinatario: z.string().optional().default(''),
    area: z.string().optional().default(''),
    type: z.enum(['CHAMADO', 'REITERACAO', 'TRANSFERENCIA', 'QUEDA']),
    vip: z.boolean(),
  });

  const {
    vip,
    area,
    chamado,
    destinatario,
    local,
    login,
    name,
    patrimono,
    ramal,
    type,
  } = ticketSchema.parse(request.body);

  try {
    const createTicket = makeCreateTicket();
    const { ticket } = await createTicket.execute({
      area,
      chamado,
      destinatario,
      type,
      local,
      login,
      name,
      patrimono,
      ramal,
      userId: request.user.sub,
      vip,
    });
    console.log(ticket);

    return reply.status(201).send({ ticket });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
