import axios from 'axios';
import { env } from 'process';

export async function formatEmailApi(emailText: string) {
  const prompt = `
  Transforme o texto abaixo em um padrão formal de registro de chamados para a equipe de helpdesk do STF. Extraia nome, e-mail, telefone e outras informações relevantes que possam ser inferidas do texto original. Caso alguma informação esteja ausente, deixe em branco. Formate conforme o seguinte modelo:

  **Modelo:**  
  Prezados, Sr(a). [Nome do Usuário] informa que [descrição do problema extraída do texto].  

  Nome: [Nome do Usuário]  
  Login: [Se possível, extraído do e-mail]  
  Ramal: [Se possível, extraído do telefone]  
  Local: [Se possível, extraído do texto]  
  Patrimônio: [Se possível, extraído do texto]  

  **Texto original:**  
  ${emailText}
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
