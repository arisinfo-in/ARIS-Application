import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, XCircle, Loader, Trash2, Eye, EyeOff } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { useAPIKey } from '../contexts/APIKeyContext';
import { apiKeyService } from '../services/apiKeyService';
import { APIProvider, PROVIDER_MODELS, DEFAULT_MODELS } from '../types/apiKey';

interface APISettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APISettingsModal: React.FC<APISettingsModalProps> = ({ isOpen, onClose }) => {
  const { userAPIKeys, activeKey, refreshKeys, saveAPIKey, deleteAPIKey } = useAPIKey();
  const [selectedProvider, setSelectedProvider] = useState<APIProvider>('groq');
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);
  const [existingKey, setExistingKey] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Load existing key for selected provider
      const existing = userAPIKeys.find(k => k.provider === selectedProvider && k.isActive);
      if (existing) {
        setExistingKey(existing.id || null);
        setSelectedModel(existing.model);
        setApiKey('••••••••••••••••'); // Masked
      } else {
        setExistingKey(null);
        setApiKey('');
        setSelectedModel(DEFAULT_MODELS[selectedProvider]);
      }
      setValidationResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedProvider, userAPIKeys]);

  useEffect(() => {
    if (!selectedModel && PROVIDER_MODELS[selectedProvider]) {
      setSelectedModel(DEFAULT_MODELS[selectedProvider]);
    }
  }, [selectedProvider, selectedModel]);

  const handleProviderChange = (provider: APIProvider) => {
    setSelectedProvider(provider);
    setValidationResult(null);
    setApiKey('');
    setSelectedModel(DEFAULT_MODELS[provider]);
  };

  const handleValidate = async () => {
    if (!apiKey || apiKey === '••••••••••••••••') {
      setValidationResult({ isValid: false, message: 'Please enter an API key' });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    try {
      const result = await apiKeyService.validateAPIKey(selectedProvider, apiKey, selectedModel);
      
      if (result.isValid) {
        setValidationResult({ isValid: true, message: 'API key is valid!' });
        if (result.model) {
          setSelectedModel(result.model);
        }
      } else {
        setValidationResult({ isValid: false, message: result.error || 'Invalid API key' });
      }
    } catch (error: any) {
      setValidationResult({ isValid: false, message: error.message || 'Validation failed' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey || apiKey === '••••••••••••••••') {
      setValidationResult({ isValid: false, message: 'Please enter an API key' });
      return;
    }

    if (!validationResult?.isValid) {
      setValidationResult({ isValid: false, message: 'Please validate your API key first' });
      return;
    }

    setIsSaving(true);

    try {
      await saveAPIKey(selectedProvider, apiKey, selectedModel);
      setValidationResult({ isValid: true, message: 'API key saved successfully!' });
      await refreshKeys();
      
      // Reset form after a delay
      setTimeout(() => {
        setApiKey('');
        setValidationResult(null);
        setIsSaving(false);
      }, 1500);
    } catch (error: any) {
      setValidationResult({ isValid: false, message: error.message || 'Failed to save API key' });
      setIsSaving(false);
    }
  };

  const handleDelete = async (keyId: string) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      try {
        await deleteAPIKey(keyId);
        await refreshKeys();
        if (existingKey === keyId) {
          setExistingKey(null);
          setApiKey('');
          setSelectedModel(DEFAULT_MODELS[selectedProvider]);
        }
      } catch (error) {
        console.error('Error deleting API key:', error);
      }
    }
  };

  if (!isOpen) return null;

  const providers: APIProvider[] = ['groq', 'gemini', 'openai'];
  const providerLabels: Record<APIProvider, string> = {
    groq: 'Groq',
    gemini: 'Google Gemini',
    openai: 'OpenAI'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <NeumorphicCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" variant="dark" padding="lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Key className="text-orange-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-100">API Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Active Key Status */}
        {activeKey && (
          <NeumorphicCard className="mb-6" variant="pressed" padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active API Key</p>
                <p className="text-gray-100 font-medium">
                  {providerLabels[activeKey.provider]} - {activeKey.model}
                </p>
                {activeKey.usageCount !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">
                    Used {activeKey.usageCount} times
                  </p>
                )}
              </div>
              <CheckCircle className="text-green-500" size={20} />
            </div>
          </NeumorphicCard>
        )}

        {/* Provider Tabs */}
        <div className="flex gap-2 mb-6">
          {providers.map((provider) => {
            const isActive = selectedProvider === provider;
            const hasKey = userAPIKeys.some(k => k.provider === provider && k.isActive);
            
            return (
              <button
                key={provider}
                onClick={() => handleProviderChange(provider)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  {providerLabels[provider]}
                  {hasKey && <CheckCircle size={16} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Model Selection - First Step */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setValidationResult(null); // Clear validation when model changes
            }}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            {PROVIDER_MODELS[selectedProvider].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Select the model you want to use for AI features
          </p>
        </div>

        {/* API Key Input - Second Step */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => {
                if (e.target.value !== '••••••••••••••••') {
                  setApiKey(e.target.value);
                  setValidationResult(null);
                }
              }}
              placeholder={`Enter your ${providerLabels[selectedProvider]} API key for ${selectedModel}`}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 pr-12"
            />
            <button
              type="button"
              onClick={() => {
                if (apiKey === '••••••••••••••••') {
                  setApiKey('');
                }
                setShowKey(!showKey);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored securely and only used for your requests
          </p>
        </div>

        {/* Validation Result */}
        {validationResult && (
          <NeumorphicCard
            className={`mb-4 ${validationResult.isValid ? 'bg-green-900 bg-opacity-30' : 'bg-red-900 bg-opacity-30'}`}
            variant="pressed"
            padding="md"
          >
            <div className="flex items-center gap-2">
              {validationResult.isValid ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-red-500" size={20} />
              )}
              <p className={`text-sm ${validationResult.isValid ? 'text-green-300' : 'text-red-300'}`}>
                {validationResult.message}
              </p>
            </div>
          </NeumorphicCard>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <NeumorphicButton
            variant="secondary"
            onClick={handleValidate}
            disabled={isValidating || !apiKey || apiKey === '••••••••••••••••'}
            className="flex-1"
          >
            {isValidating ? (
              <>
                <Loader className="animate-spin" size={16} />
                Validating...
              </>
            ) : (
              'Validate Key'
            )}
          </NeumorphicButton>
          <NeumorphicButton
            variant="accent"
            onClick={handleSave}
            disabled={isSaving || !validationResult?.isValid}
            className="flex-1"
          >
            {isSaving ? (
              <>
                <Loader className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              'Save Key'
            )}
          </NeumorphicButton>
        </div>

        {/* Existing Keys List */}
        {userAPIKeys.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Your API Keys</h3>
            <div className="space-y-2">
              {userAPIKeys.map((key) => (
                <NeumorphicCard key={key.id} variant="pressed" padding="md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-100 font-medium">
                        {providerLabels[key.provider]} - {key.model}
                      </p>
                      <p className="text-xs text-gray-400">
                        {key.isActive ? 'Active' : 'Inactive'} • 
                        Used {key.usageCount || 0} times
                        {key.lastUsed && ` • Last used: ${new Date(key.lastUsed).toLocaleDateString()}`}
                      </p>
                    </div>
                    <button
                      onClick={() => key.id && handleDelete(key.id)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <NeumorphicCard className="mt-6" variant="pressed" padding="md">
          <p className="text-sm text-gray-400">
            <strong className="text-gray-300">Note:</strong> Your API keys are stored securely in Firestore. 
            They will be used for AI Tutors, Practice Tests, and Study Plans. The ARIS bot will continue 
            using the default API key.
          </p>
        </NeumorphicCard>
      </NeumorphicCard>
    </div>
  );
};

export default APISettingsModal;

