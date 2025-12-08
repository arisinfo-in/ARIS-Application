// API Provider types
export type APIProvider = 'gemini' | 'groq' | 'openai';

// Model configurations for each provider
export const PROVIDER_MODELS: Record<APIProvider, string[]> = {
  gemini: [
    'gemini-pro',
    'gemini-pro-vision',
    'gemini-1.5-pro',
    'gemini-1.5-flash'
  ],
  groq: [
    'llama-3.3-70b-versatile',
    'llama-3.1-70b-versatile',
    'llama-3.1-8b-instant',
    'llama-3.2-11b-vision-preview',
    'llama-3.2-3b-instruct',
    'llama-3.2-1b-instruct',
    'mixtral-8x7b-32768',
    'mixtral-8x22b-instruct-v0.1',
    'gemma-7b-it',
    'gemma2-9b-it',
    'openai/gpt-oss-120b'
  ],
  openai: [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4-turbo-preview',
    'gpt-4o',
    'gpt-4o-mini',
    'gpt-3.5-turbo'
  ]
};

// Default models for each provider
export const DEFAULT_MODELS: Record<APIProvider, string> = {
  gemini: 'gemini-pro',
  groq: 'llama-3.1-70b-versatile',
  openai: 'gpt-4'
};

// User API Key interface
export interface UserAPIKey {
  id?: string;
  userId: string; // Must match authenticated user's UID (enforced by Firestore rules)
  provider: APIProvider;
  apiKey: string; // SECURITY: Currently stored in plain text. TODO: Encrypt in production using Firebase Admin SDK or KMS
  model: string;
  isActive: boolean;
  createdAt: string;
  lastUsed?: string;
  usageCount?: number; // Tracks number of API calls made with this key
}

// API Key validation result
export interface APIKeyValidationResult {
  isValid: boolean;
  error?: string;
  model?: string;
}

// API Request configuration
export interface APIRequestConfig {
  prompt: string;
  module?: string;
  conversationHistory?: Array<{ content: string; isUser: boolean }>;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

