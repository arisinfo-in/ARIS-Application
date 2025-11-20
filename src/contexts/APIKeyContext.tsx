import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { apiKeyService } from '../services/apiKeyService';
import { UserAPIKey, APIProvider } from '../types/apiKey';

interface APIKeyContextType {
  userAPIKeys: UserAPIKey[];
  activeKey: UserAPIKey | null;
  loading: boolean;
  refreshKeys: () => Promise<void>;
  saveAPIKey: (provider: APIProvider, apiKey: string, model: string) => Promise<void>;
  deleteAPIKey: (keyId: string) => Promise<void>;
}

const APIKeyContext = createContext<APIKeyContextType | undefined>(undefined);

export const useAPIKey = () => {
  const context = useContext(APIKeyContext);
  if (context === undefined) {
    throw new Error('useAPIKey must be used within an APIKeyProvider');
  }
  return context;
};

interface APIKeyProviderProps {
  children: ReactNode;
}

export const APIKeyProvider: React.FC<APIKeyProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [userAPIKeys, setUserAPIKeys] = useState<UserAPIKey[]>([]);
  const [activeKey, setActiveKey] = useState<UserAPIKey | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshKeys = useCallback(async () => {
    if (!user) {
      setUserAPIKeys([]);
      setActiveKey(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const keys = await apiKeyService.getAllUserAPIKeys(user.uid);
      setUserAPIKeys(keys);
      
      // Find active key (prefer groq, then gemini, then openai)
      const active = keys.find(k => k.isActive && k.provider === 'groq') ||
                     keys.find(k => k.isActive && k.provider === 'gemini') ||
                     keys.find(k => k.isActive && k.provider === 'openai') ||
                     null;
      setActiveKey(active);
    } catch (error: any) {
      console.error('Error loading API keys:', error);
      // If it's an index error, show a helpful message
      if (error?.code === 'failed-precondition' || error?.message?.includes('index')) {
        console.warn('Firestore index may not be ready yet. Please wait a few minutes and try again.');
      }
      setUserAPIKeys([]);
      setActiveKey(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const saveAPIKey = async (provider: APIProvider, apiKey: string, model: string) => {
    if (!user) {
      throw new Error('User must be logged in');
    }

    // Validate inputs
    if (!provider || !apiKey || !model) {
      throw new Error('Provider, API key, and model are required');
    }

    // Firestore security rules will ensure userId matches authenticated user
    await apiKeyService.saveUserAPIKey(user.uid, provider, apiKey, model);
    await refreshKeys();
  };

  const deleteAPIKey = async (keyId: string) => {
    await apiKeyService.deleteUserAPIKey(keyId);
    await refreshKeys();
  };

  useEffect(() => {
    refreshKeys();
  }, [refreshKeys]);

  const value: APIKeyContextType = {
    userAPIKeys,
    activeKey,
    loading,
    refreshKeys,
    saveAPIKey,
    deleteAPIKey
  };

  return (
    <APIKeyContext.Provider value={value}>
      {children}
    </APIKeyContext.Provider>
  );
};

