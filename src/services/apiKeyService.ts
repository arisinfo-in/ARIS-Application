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
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          isValid: false,
          error: errorData.error?.message || 'Invalid API key'
        };
      }

      return { isValid: true, model };
    } catch (error: any) {
      return { isValid: false, error: error.message || 'Validation failed' };
    }
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
        
        // Provide detailed error message
        const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        return {
          isValid: false,
          error: errorMessage
        };
      }

      return { isValid: true, model };
    } catch (error: any) {
      return { isValid: false, error: error.message || 'Validation failed' };
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
      
      return {
        isValid: true,
        model: modelAvailable ? model : 'gpt-3.5-turbo' // Fallback to available model
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

