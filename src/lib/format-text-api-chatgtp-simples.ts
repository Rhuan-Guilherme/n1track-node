import axios from 'axios';
import { env } from 'process';

export async function formatTextApi(text: string) {
  const prompt = `
  Você é um assistente que melhora textos e os deixa mais formais. Todas as frases devem começar com gerúndios como "informando", "solicitando" e assim por diante, e devem parecer como se estivessem sendo passadas de uma pessoa para outra equipe, informando algo. Não altere o sentido da frase, apenas a torne mais formal e ajuste a gramática. As frases devem começar com letra minúscula.

  Melhore bem o seguinte texto: "${text}". OBS: sempre com letra minuscula no começo da frase, e não mude o sentido da frase, apenas deixe mais formal e ajuste a gramatica.  
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${env.API_CHATGTP_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}
