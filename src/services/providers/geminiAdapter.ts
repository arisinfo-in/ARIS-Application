import { APIRequestConfig } from '../../types/apiKey';

export class GeminiAdapter {
  async generateResponse(apiKey: string, model: string, config: APIRequestConfig): Promise<string> {
    const { prompt, conversationHistory = [], systemPrompt } = config;
    
    // Build contents array for Gemini API
    const contents: any[] = [];
    
    // Add conversation history
    conversationHistory.forEach(msg => {
      contents.push({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    });
    
    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    // Build request body
    const requestBody: any = {
      contents
    };

    // Add system instruction if provided
    if (systemPrompt) {
      requestBody.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        throw new Error(`API_RATE_LIMIT: Rate limit exceeded. Please try again later.`);
      }
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from AI');
    }

    return data.candidates[0].content.parts[0].text;
  }
}

