import { makeUpdateTicket } from '@/use-cases/factory/update-ticket-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateTicket(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const ticketSchema = z.object({
    name: z.string().optional(),
    login: z.string().optional(),
    ramal: z.string().optional(),
    local: z.string().optional(),
    patrimono: z.string().optional(),
    informacao: z.string().optional(),
    chamado: z.string().optional(),
    destinatario: z.string().optional(),
    area: z.string().optional(),
    type: z
      .enum(['CHAMADO', 'REITERACAO', 'TRANSFERENCIA', 'QUEDA'])
      .optional(),
    vip: z.boolean().optional(),
  });

  const data = ticketSchema.parse(request.body);

  const { id } = request.params as { id: string };

  try {
    const updateTicketsUseCase = makeUpdateTicket();
    const ticket = await updateTicketsUseCase.execute({
      ...data,
      id,
    });

    return reply
      .status(204)
      .send({ message: 'Atualizado com sucesso!', ticket });
  } catch (error) {
    reply.status(400).send({ error });
  }
}
