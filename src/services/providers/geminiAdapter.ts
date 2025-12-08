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

    // Try v1 endpoint first for newer models, fallback to v1beta for older models
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    ];

    let lastError: Error | null = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          
          if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response generated from AI');
          }

          return data.candidates[0].content.parts[0].text;
        }

        // Parse error response
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting
        if (response.status === 429) {
          throw new Error(`API_RATE_LIMIT: Rate limit exceeded. Please try again later.`);
        }

        // If 404 (model not found), try next endpoint
        if (response.status === 404 && endpoint !== endpoints[endpoints.length - 1]) {
          continue;
        }

        // For other errors, throw with detailed message
        const errorMessage = errorData.error?.message || `API error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      } catch (error: any) {
        lastError = error;
        
        // If it's a 404 and not the last endpoint, try next one
        if (error.message?.includes('404') && endpoint !== endpoints[endpoints.length - 1]) {
          continue;
        }
        
        // If it's the last endpoint or a non-404 error, throw
        if (endpoint === endpoints[endpoints.length - 1] || !error.message?.includes('404')) {
          throw error;
        }
      }
    }

    // If all endpoints failed
    throw lastError || new Error(`Failed to generate response. Model "${model}" may not be accessible. Please verify the model name.`);
  }
}

