import { firestoreOperations } from '../firebase/firestore';
import { APIProvider, UserAPIKey, APIKeyValidationResult, DEFAULT_MODELS } from '../types/apiKey';

class APIKeyService {
  /**
   * Validate an API key by making a test call
   */
  async validateAPIKey(provider: APIProvider, apiKey: string, model?: string): Promise<APIKeyValidationResult> {
    try {
      const testModel = model || DEFAULT_MODELS[provider];
      
      // Make a minimal test call based on provider
      switch (provider) {
        case 'gemini':
          return await this.validateGeminiKey(apiKey, testModel);
        case 'groq':
          return await this.validateGroqKey(apiKey, testModel);
        case 'openai':
          return await this.validateOpenAIKey(apiKey, testModel);
        default:
          return { isValid: false, error: 'Unknown provider' };
      }
    } catch (error: any) {
      return {
        isValid: false,
        error: error.message || 'Failed to validate API key'
      };
    }
  }

  private async validateGeminiKey(apiKey: string, model: string): Promise<APIKeyValidationResult> {
    // Try v1 endpoint first for newer models, fallback to v1beta for older models
    const endpoints = [
      `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent`,
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    ];

    let lastError: string | null = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${endpoint}?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: 'test'
              }]
            }]
          })
        });

        if (response.ok) {
          return { isValid: true, model };
        }

        // Parse error response
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `API error: ${response.status} ${response.statusText}`;
        
        // If 404 (model not found), try next endpoint
        if (response.status === 404 && endpoint !== endpoints[endpoints.length - 1]) {
          lastError = `Model "${model}" not found. Trying alternative endpoint...`;
          continue;
        }

        // For other errors, return detailed error message
        return {
          isValid: false,
          error: errorMessage
        };
      } catch (error: any) {
        // Network or parsing errors - try next endpoint if available
        if (endpoint !== endpoints[endpoints.length - 1]) {
          lastError = error.message || 'Validation failed';
          continue;
        }
        // Last endpoint failed
        return { 
          isValid: false, 
          error: error.message || lastError || 'Validation failed. Please check your API key and model name.' 
        };
      }
    }

    // If all endpoints failed
    return { 
      isValid: false, 
      error: lastError || `Model "${model}" not found or not accessible. Please verify the model name is correct.` 
    };
  }

  private async validateGroqKey(apiKey: string, model: string): Promise<APIKeyValidationResult> {
    try {
      // Build request body with model-specific parameters
      const requestBody: any = {
        model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5
      };

      // Only include reasoning_effort for models that support it
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
        
        // Handle rate limiting
        if (response.status === 429 || errorData.error?.code === 429) {
          const retryAfter = errorData.error?.details?.[0]?.retryDelay || errorData.retryAfter || '30 seconds';
          return {
            isValid: false,
            error: `Rate limit exceeded. Please try again in ${retryAfter} or upgrade your API plan.`
          };
        }
        
        // Handle model not found errors
        if (response.status === 404 || errorData.error?.message?.toLowerCase().includes('model')) {
          return {
            isValid: false,
            error: `Model "${model}" not found or not available. Please verify the model name is correct.`
          };
        }
        
        // Provide detailed error message
        const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        return {
          isValid: false,
          error: errorMessage
        };
      }

      return { isValid: true, model };
    } catch (error: any) {
      return { 
        isValid: false, 
        error: error.message || 'Validation failed. Please check your API key and model name.' 
      };
    }
  }

  private async validateOpenAIKey(apiKey: string, model: string): Promise<APIKeyValidationResult> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          isValid: false,
          error: errorData.error?.message || 'Invalid API key'
        };
      }

      // Check if model is available
      const data = await response.json();
      const modelAvailable = data.data?.some((m: any) => m.id === model);
      
      // Handle deprecated models
      if (!modelAvailable) {
        // Check for deprecated model mappings
        const deprecatedModels: Record<string, string> = {
          'gpt-3.5-turbo-16k': 'gpt-3.5-turbo',  // Deprecated, use gpt-3.5-turbo
          'gpt-4-turbo': 'gpt-4-turbo-preview'   // May need version suffix
        };
        
        if (deprecatedModels[model]) {
          const alternative = deprecatedModels[model];
          const alternativeAvailable = data.data?.some((m: any) => m.id === alternative || m.id.startsWith(alternative));
          
          if (alternativeAvailable) {
            return {
              isValid: false,
              error: `Model "${model}" is deprecated. Please use "${alternative}" instead.`,
              model: alternative
            };
          }
        }
        
        return {
          isValid: false,
          error: `Model "${model}" not found or not available in your account. Please verify the model name.`
        };
      }
      
      return {
        isValid: true,
        model: model
      };
    } catch (error: any) {
      return { isValid: false, error: error.message || 'Validation failed' };
    }
  }

  /**
   * Save or update user API key
   * 
   * SECURITY NOTE: The userId parameter should always match the authenticated user's ID.
   * Firestore security rules enforce this on the server side.
   * 
   * ENCRYPTION NOTE: API keys are currently stored in plain text. For production,
   * consider encrypting keys at rest using Firebase Admin SDK encryption or
   * a service like Google Cloud KMS.
   */
  async saveUserAPIKey(
    userId: string,
    provider: APIProvider,
    apiKey: string,
    model: string
  ): Promise<string> {
    // Validate inputs
    if (!userId || !provider || !apiKey || !model) {
      throw new Error('Missing required parameters for saving API key');
    }

    // First, deactivate all existing keys for this provider
    const existingKeys = await firestoreOperations.getAllUserAPIKeys(userId);
    const providerKeys = existingKeys.filter(k => k.provider === provider);
    
    for (const key of providerKeys) {
      if (key.id) {
        try {
          await firestoreOperations.updateUserAPIKey(key.id, { isActive: false });
        } catch (error: any) {
          console.error(`Failed to deactivate existing key ${key.id}:`, error);
          // Continue with saving new key even if deactivation fails
        }
      }
    }

    // Save new key
    // Note: Firestore security rules will validate that userId matches authenticated user
    return await firestoreOperations.saveUserAPIKey({
      userId,
      provider,
      apiKey, // TODO: Encrypt in production using Firebase Admin SDK or KMS
      model,
      isActive: true,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });
  }

  /**
   * Get active API key for user and provider
   */
  async getUserAPIKey(userId: string, provider: APIProvider): Promise<UserAPIKey | null> {
    return await firestoreOperations.getUserAPIKey(userId, provider);
  }

  /**
   * Get all API keys for user
   */
  async getAllUserAPIKeys(userId: string): Promise<UserAPIKey[]> {
    return await firestoreOperations.getAllUserAPIKeys(userId);
  }

  /**
   * Delete API key
   */
  async deleteUserAPIKey(keyId: string): Promise<void> {
    await firestoreOperations.deleteUserAPIKey(keyId);
  }

  /**
   * Update API key usage
   * 
   * This method tracks how many times a user's API key has been used.
   * Errors are logged but re-thrown for the caller to handle appropriately.
   */
  async incrementUsage(keyId: string): Promise<void> {
    if (!keyId) {
      console.warn('Attempted to increment usage for invalid key ID');
      return;
    }

    try {
      await firestoreOperations.incrementAPIKeyUsage(keyId);
    } catch (error: any) {
      // Log error and re-throw - caller should handle gracefully
      console.error(`Failed to increment usage for key ${keyId}:`, error);
      throw error;
    }
  }
}

export const apiKeyService = new APIKeyService();

