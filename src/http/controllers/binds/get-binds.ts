import { makeGetBind } from '@/use-cases/factory/get-bind-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getBinds(request: FastifyRequest, reply: FastifyReply) {
  try {
    const criticalUseCase = makeGetBind();
    const { binds } = await criticalUseCase.execute();
    return reply.status(201).send(binds);
  } catch (error) {
    reply.status(400).send({ error });
  }
}
