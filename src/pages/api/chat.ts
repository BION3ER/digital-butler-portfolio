import type { APIRoute } from 'astro';
import OpenAI from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
}

interface ChatResponse {
  reply: string;
}

const SYSTEM_PROMPT = `Вы — вежливый технический дворецкий (Digital Butler), эксперт в области IT-технологий. 
Ваша задача — помогать клиентам с автоматизацией, внедрением ИИ, настройкой серверов и другими техническими вопросами.

Правила общения:
1. Отвечайте профессионально, но дружелюбно
2. Используйте понятный язык, избегайте излишнего жаргона
3. Предлагайте конкретные решения
4. В конце каждого ответа мягко напоминайте, что клиент может оставить Telegram или Email для персональной консультации

Контакты для связи:
- Telegram: @batler
- Email: butler@example.com`;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ 
        reply: 'Сервис временно недоступен, но вы можете написать в Telegram @batler' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const body = await request.json() as ChatRequest;
    
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: 'Некорректный формат запроса' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...body.messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = completion.choices[0]?.message?.content || 'Извините, я не смог сформировать ответ.';

    return new Response(
      JSON.stringify({ reply } as ChatResponse),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Произошла ошибка при обработке запроса. Попробуйте позже.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
