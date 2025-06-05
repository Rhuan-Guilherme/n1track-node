import { makeGetBind } from '@/use-cases/factory/get-bind-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getBinds(request: FastifyRequest, reply: FastifyReply) {
  const { query } = request.query as { query?: string };

  try {
    const getBind = makeGetBind();
    const binds = await getBind.execute({ query });
    return reply.status(201).send(binds);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
