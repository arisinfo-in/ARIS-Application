import { APIRequestConfig } from '../../types/apiKey';

export class GroqAdapter {
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

    // Build request body with model-specific parameters
    const requestBody: any = {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      top_p: 1,
      stream: false
    };

    // Only include reasoning_effort for models that support it
    // Models like llama-3.3-70b-versatile and some newer models support this
    const modelsWithReasoning = [
      'llama-3.3-70b-versatile',
      'llama-3.1-70b-versatile',
      'openai/gpt-oss-120b'
    ];
    if (modelsWithReasoning.includes(model)) {
      requestBody.reasoning_effort = 'medium';
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = {};
      }
      
      if (response.status === 429 || errorData.error?.code === 429) {
        const retryAfter = errorData.error?.details?.[0]?.retryDelay || errorData.retryAfter || '30 seconds';
        throw new Error(`API_RATE_LIMIT: Rate limit exceeded. Please try again in ${retryAfter} or upgrade your API plan.`);
      }
      
      // Provide detailed error message from API
      const errorMessage = errorData.error?.message || errorData.message || `API error: ${response.status} ${response.statusText}`;
      throw new Error(`GROQ_API_ERROR: ${errorMessage}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from AI');
    }

    return data.choices[0].message.content;
  }
}

