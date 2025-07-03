import { makeGetAllUsers } from '@/use-cases/factory/get-all-users';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const getUsers = makeGetAllUsers();
    const users = await getUsers.execute();
    reply.status(200).send({ users });
  } catch (error) {
    reply.status(500).send({ message: 'internal server error', error: error });
  }
}
