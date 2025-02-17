import { FastifyReply, FastifyRequest } from 'fastify';

export function RoleVerify(roleUser: 'ADMIN' | 'USER' | 'SUPER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleUser) {
      return reply.status(403).send({ message: 'not authorized' });
    }
  };
}
