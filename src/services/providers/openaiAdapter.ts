import { APIRequestConfig } from '../../types/apiKey';

export class OpenAIAdapter {
  async generateResponse(apiKey: string, model: string, config: APIRequestConfig): Promise<string> {
    const { prompt, conversationHistory = [], systemPrompt, temperature = 1, maxTokens = 4096 } = config;
    
    // Build messages array
    const messages: any[] = [];
    
    // Add system prompt if provided
    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt
      });
    }
    
    // Add conversation history
    conversationHistory.forEach(msg => {
      messages.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content
      });
    });
    
    // Add current prompt
    messages.push({
      role: 'user',
      content: prompt
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = {};
      }
      
      if (response.status === 429 || errorData.error?.code === 'rate_limit_exceeded') {
        const retryAfter = errorData.headers?.['retry-after'] || '30 seconds';
        throw new Error(`API_RATE_LIMIT: Rate limit exceeded. Please try again in ${retryAfter} or upgrade your API plan.`);
      }
      
      throw new Error(errorData.error?.message || `API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from AI');
    }

    return data.choices[0].message.content;
  }
}

