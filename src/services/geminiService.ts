import { unifiedAIService } from './unifiedAIService';

// Helper to get current user ID (for use outside React components)
let currentUserId: string | null = null;

// Function to set current user ID (called from AuthContext)
export const setCurrentUserId = (userId: string | null) => {
  currentUserId = userId;
};

class GeminiService {
  async generateResponse(
    prompt: string, 
    module: string, 
    conversationHistory: Array<{ content: string; isUser: boolean }> = [],
    allowFallback: boolean = false
  ): Promise<string> {
    // Use unified AI service which handles user API keys
    // allowFallback: true for ARIS Bot, false for AI Tutors/Tests/Study Plans
    return await unifiedAIService.generateResponse(
      currentUserId,
      prompt,
      module,
      conversationHistory,
      false, // isDynamicTest
      allowFallback
    );
  }

  async generateDynamicTest(systemPrompt: string): Promise<string> {
    // Use unified AI service for dynamic test generation
    // Pass empty conversation history and use systemPrompt as the prompt
    // Tests require user API key (no fallback)
    return await unifiedAIService.generateResponse(
      currentUserId,
      systemPrompt,
      'general',
      [],
      true, // isDynamicTest = true
      false // allowFallback = false (require user API key)
    );
  }
}

export const geminiService = new GeminiService();
