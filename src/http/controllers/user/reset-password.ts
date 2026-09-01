import { prisma } from '@/lib/prisma';
import { compare, hash } from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function resetPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const resetSchema = z.object({
    email: z.string().email('Insira um e-mail válido!'),
    code: z.string().trim().regex(/^\d{6}$/, 'O código deve ter 6 dígitos.'),
    newPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  });

  const { email, code, newPassword } = resetSchema.parse(request.body);
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user)
    return reply.status(404).send({ error: 'Usuário não encontrado!!' });

  try {
    const resetCode = await prisma.passowrdResetCode.findFirst({
      where: {
        userId: user.id,
        expiresAt: { gt: new Date() },
        verified: false,
      },
    });

    if (!resetCode || !(await compare(code, resetCode.code)))
      return reply.status(400).send({ error: 'Código inválido ou expirado!' });

    const passwordHashed = await hash(newPassword, 6);

    await prisma.$transaction(async (transaction) => {
      const consumed = await transaction.passowrdResetCode.updateMany({
        where: { is: resetCode.is, verified: false },
        data: { verified: true },
      });

      if (consumed.count !== 1) throw new Error('RESET_CODE_ALREADY_USED');

      await transaction.user.update({
        where: { id: user.id },
        data: { password: passwordHashed },
      });

      await transaction.passowrdResetCode.deleteMany({
        where: { userId: user.id },
      });
    });

    return reply.status(200).send({
      message: 'Senha redefinida com sucesso.',
    });
  } catch (error) {
    request.log.error({ err: error }, 'Failed to reset password');
    return reply.status(500).send({
      message: 'Erro ao processar solicitação, tente novamente mais tarde!',
    });
  }
}
