import axios from 'axios';
import { env } from 'process';

export async function formatTextApi(text: string) {
  const sanitizedText = text.trim().slice(0, 2000); // Limita tamanho para evitar exceder tokens

  const prompt = `
Você é um assistente de comunicação formal.

Objetivo: reescreva o texto a seguir em um tom formal, como se fosse direcionado de um colaborador a uma equipe técnica. As frases devem:
- Iniciar com verbos no gerúndio (ex: "informando", "solicitando", "relatando").
- Usar sempre letra **minúscula** no início de cada frase.
- Manter **exatamente o mesmo sentido original**, apenas corrigindo gramática e formalizando o tom.
- Evitar adicionar ou remover qualquer informação.

Texto original:
"""
${sanitizedText}
"""
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${env.API_CHATGTP_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return (
      response.data.choices?.[0]?.message?.content?.trim() ?? '[Sem resposta]'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Erro na formatação do texto:',
      error.response?.data || error.message
    );
    return '[Erro ao processar o texto]';
  }
}
