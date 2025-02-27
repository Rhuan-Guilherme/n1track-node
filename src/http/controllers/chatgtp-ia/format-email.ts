import { FastifyReply, FastifyRequest } from 'fastify';
import { formatEmailApi } from '@/lib/format-text-with-api-chatgpt';

interface formatEmailRequest {
  text: string;
}

export async function formatEmail(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { text } = (await request.body) as formatEmailRequest;

  const response = await formatEmailApi(text);

  if (response) {
    reply
      .status(200)
      .send({ message: 'Texto formatado com sucesso', response });
  } else {
    reply.status(500).send({ message: 'Erro ao formatar o texto' });
  }
}
