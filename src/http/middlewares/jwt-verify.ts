import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function JWTVerify(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    const user = await prisma.user.findFirst({
      where: {
        id: request.user.sub,
      },
    });

    if (user?.is_active === false) {
      return reply.status(401).send({ message: 'not authorized' });
    }
  } catch (error) {
    return reply.status(401).send({ message: 'not authorized', error: error });
  }
}
