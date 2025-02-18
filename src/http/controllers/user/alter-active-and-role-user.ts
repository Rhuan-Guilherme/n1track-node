import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makealterActiveAndRoleUseCase } from '@/use-cases/factory/alter-active-and-role-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function AlterActiveAndRole(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createSchema = z.object({
    id: z.string().uuid(),
    is_active: z.boolean(),
    role: z.enum(['ADMIN', 'SUPER', 'USER']),
  });

  const { id, is_active, role } = createSchema.parse(request.body);

  try {
    const authenticate = makealterActiveAndRoleUseCase();
    const { user } = await authenticate.execute({ id, is_active, role });

    reply.status(200).send({ user: { ...user, password: undefined } });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
