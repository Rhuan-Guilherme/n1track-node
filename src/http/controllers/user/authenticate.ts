import { CredentialsInvalidError } from '@/use-cases/exceptions/credentials-invalid-error';
import { makeAuthenticate } from '@/use-cases/factory/authenticate';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createSchema = z.object({
    email: z.string().email('O e-mail informado é inválido'),
    password: z.string(),
  });

  const { email, password } = createSchema.parse(request.body);

  try {
    const authenticate = makeAuthenticate();
    const { user } = await authenticate.execute({ email, password });
    const token = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id } }
    );

    reply.status(200).send({ token: token });
  } catch (error) {
    if (error instanceof CredentialsInvalidError) {
      reply.status(400).send({ error: error.message });
    }
  }
}
