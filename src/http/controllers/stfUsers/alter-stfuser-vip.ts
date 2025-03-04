import { makeAlterStfuserVip } from '@/use-cases/factory/alter-stfuser-vip-factory';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function alterStfusersVip(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = request.params as { id: string };

  try {
    const alterVips = makeAlterStfuserVip();
    await alterVips.execute(id);
    return reply
      .status(200)
      .send({ message: 'Usuário adicionado a lista de VIPs!' });
  } catch (error) {
    reply.status(400).send({ error });
  }
}
