import { makeRemoveStfuserVip } from '@/use-cases/factory/remove-stfuser-vip.factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function removeStfusersVip(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const removeVips = makeRemoveStfuserVip();
    await removeVips.execute(id);
    return reply
      .status(200)
      .send({ message: 'Usuário retirado da lista de VIPs!' });
  } catch (error) {
    reply.status(400).send({ error });
  }
}
