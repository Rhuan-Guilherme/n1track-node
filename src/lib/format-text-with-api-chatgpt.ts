import axios from 'axios';
import { env } from 'process';

export async function formatEmailApi(emailText: string) {
  const maxOriginalLength = 3000;
  const original =
    emailText.length > maxOriginalLength
      ? emailText.slice(0, maxOriginalLength) + '... [Texto truncado]'
      : emailText;

  const prompt = `
      Você é um assistente que transforma mensagens informais em registros formais para abertura de chamados na equipe de helpdesk do STF.
      
      **Objetivo:** Estruturar as informações do texto fornecido no seguinte modelo:
      
      ---
      Prezados, Sr(a). [Nome do Usuário] informa que [descrição do problema].
      
      Nome: [Nome do Usuário]  
      Login: [inferido do e-mail, se possível]  
      Ramal: [se houver telefone]  
      Local: [inferido do texto, se possível]  
      Patrimônio: [se houver número de patrimônio]  
      ---
      
      Caso alguma informação esteja ausente, deixe em branco. Abaixo está o texto original:
      
      ---
      ${original}
      ---
      `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 700,
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${env.API_CHATGTP_SECRET}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return (
      response.data.choices?.[0]?.message?.content ?? '[Sem resposta da IA]'
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Erro ao chamar a API da OpenAI:',
      error.response?.data || error.message
    );
    return '[Erro ao processar o e-mail]';
  }
}
