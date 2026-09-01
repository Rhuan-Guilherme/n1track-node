import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/resend';
import { env } from '@/env';
import { hash } from 'bcryptjs';
import { randomInt } from 'node:crypto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const successMessage =
  'Se o e-mail estiver cadastrado, você receberá um código de recuperação.';

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const emailSchema = z.object({
    email: z.string().email('Insira um e-mail válido!'),
  });

  const { email } = emailSchema.parse(request.body);
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) return reply.status(200).send({ message: successMessage });

  const code = randomInt(100000, 1000000).toString();
  const codeHash = await hash(code, 10);
  const resetUrl = new URL('/reset-password', env.FRONTEND_URL);
  resetUrl.searchParams.set('email', user.email);
  let resetCodeId: string | undefined;

  try {
    const resetCode = await prisma.$transaction(async (transaction) => {
      await transaction.passowrdResetCode.deleteMany({
        where: { userId: user.id },
      });

      return transaction.passowrdResetCode.create({
        data: {
          userId: user.id,
          code: codeHash,
          expiresAt: new Date(Date.now() + 1000 * 60 * 10),
        },
      });
    });
    resetCodeId = resetCode.is;

    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: user.email,
      subject: 'Código para redefinir sua senha no N1Track',
      text: `Acesse ${resetUrl.toString()} para redefinir sua senha. Seu código é ${code} e expira em 10 minutos.`,
      html: `<div style="font-family:Arial,sans-serif;color:#18181b;max-width:560px"><h2>Redefinição de senha</h2><p>Recebemos uma solicitação para redefinir sua senha no N1Track.</p><p><a href="${resetUrl.toString()}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:8px">Redefinir minha senha</a></p><p>Na página, informe o código abaixo:</p><p style="font-size:32px;font-weight:700;letter-spacing:8px;margin:24px 0">${code}</p><p>O código e o link expiram em 10 minutos e só podem ser usados uma vez.</p><p>Se você não solicitou a troca, ignore este e-mail.</p></div>`,
    });

    if (error) throw new Error(`Resend: ${error.message}`);

    return reply.status(200).send({ message: successMessage });
  } catch (error) {
    if (resetCodeId) {
      await prisma.passowrdResetCode
        .delete({ where: { is: resetCodeId } })
        .catch(() => undefined);
    }

    request.log.error({ err: error }, 'Failed to send password reset email');
    return reply.status(500).send({
      message: 'Erro ao processar solicitação, tente novamente mais tarde!',
    });
  }
}
