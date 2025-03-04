import { FastifyReply, FastifyRequest } from 'fastify';
import { formatTextApi } from '@/lib/format-text-api-chatgtp-simples';

interface formatEmailRequest {
  text: string;
}

export async function formatText(request: FastifyRequest, reply: FastifyReply) {
  const { text } = (await request.body) as formatEmailRequest;

  const response = await formatTextApi(text);

  if (response) {
    reply
      .status(200)
      .send({ message: 'Texto formatado com sucesso', response });
  } else {
    reply.status(500).send({ message: 'Erro ao formatar o texto' });
  }
}
