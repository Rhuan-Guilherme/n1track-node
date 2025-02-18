import { ResourceNotFoundError } from '@/use-cases/exceptions/resource-not-foud-error';
import { makeDeleteUser } from '@/use-cases/factory/delete-uset-factory';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userIdSchena = z.object({
    id: z.string().uuid(),
  });

  const { id } = userIdSchena.parse(request.params);

  try {
    const getUsers = makeDeleteUser();
    await getUsers.execute(id);
    reply.status(200).send({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ error: error.message });
    }
  }
}
