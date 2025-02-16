import { UserAlreadyExists } from '@/use-cases/exceptions/user-already-exists-error';
import { makeGetUser } from '@/use-cases/factory/get-user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUser = makeGetUser();
    const { user } = await getUser.execute({ id: request.user.sub });
    reply.status(200).send({ user: { ...user, password: undefined } });
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      reply.status(400).send({ error: error.message });
    }
  }
}
