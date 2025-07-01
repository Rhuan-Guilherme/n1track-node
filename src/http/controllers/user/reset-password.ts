import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const resetSchema = z.object({
    email: z.string().email('Insira um e-mail válido!'),
    code: z.string(),
    newPassword: z.string(),
  });

  const { email, code, newPassword } = resetSchema.parse(request.body);

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user)
    return reply.status(404).send({ error: 'Usuário não encontrado!!' });

  try {
    const resetCode = await prisma.passowrdResetCode.findFirst({
      where: {
        userId: user.id,
        code,
        expiresAt: { gt: new Date() },
        verified: false,
      },
    });

    if (!resetCode)
      return reply.status(400).send({ error: 'Código inválido ou expirado!' });

    const passwordHashed = await hash(newPassword, 6);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHashed },
    });

    return reply.status(200).send({
      message: 'Senha redefinida com sucesso.',
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Erro ao processar solicitação, tente novamente mais tarde!',
      error,
    });
  }
}
