import { prisma } from '@/lib/prisma';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import nodemailer from 'nodemailer';

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const emailSchema = z.object({
    email: z.string().email('Insira um e-mail válido!'),
  });

  const { email } = emailSchema.parse(request.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'rhuan23032004@gmail.com',
      pass: 'kcad kwmi hrxy wish',
    },
  });

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user)
    return reply.status(404).send({ error: 'Usuário não encontrado!' });

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos

  try {
    await prisma.passowrdResetCode.create({
      data: {
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 min
      },
    });

    const mailOptions = {
      from: 'rhuan23032004@gmail.com',
      to: user.email,
      subject: 'Redefinição de senha!',
      text: 'Seu código para a redefinição da senha é: ' + code,
    };

    const info = await transporter.sendMail(mailOptions);
    return reply.status(200).send({
      message: 'E-mail com o código para recuperação da senha enviado!',
      info,
    });
  } catch (error) {
    return reply.status(500).send({
      message: 'Erro ao processar solicitação, tente novamente mais tarde!',
      error,
    });
  }
}
