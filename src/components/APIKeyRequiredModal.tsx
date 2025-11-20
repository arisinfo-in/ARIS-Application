import React, { useEffect } from 'react';
import { Key, AlertCircle, ArrowRight, Zap } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';

interface APIKeyRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAPISettings: () => void;
  featureName?: string;
}

const APIKeyRequiredModal: React.FC<APIKeyRequiredModalProps> = ({
  isOpen,
  onClose,
  onOpenAPISettings,
  featureName = 'this feature'
}) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoToSettings = () => {
    onClose();
    // Small delay to ensure modal closes smoothly
    setTimeout(() => {
      onOpenAPISettings();
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="animate-scaleIn w-full max-w-md">
        <NeumorphicCard className="w-full" variant="dark" padding="lg">
          {/* Animated Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Key className="text-orange-500 animate-pulse" size={28} />
                <Zap className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" size={16} />
              </div>
              <h2 className="text-2xl font-bold text-gray-100">API Key Required</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-orange-500 transition-colors p-1 rounded-lg hover:bg-gray-700"
            >
              <AlertCircle size={24} />
            </button>
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <AlertCircle className="text-orange-500" size={24} />
              </div>
              <div className="flex-1">
                <p className="text-gray-100 text-lg font-semibold mb-2">
                  Bring Your Own API Key
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  To use <span className="text-orange-400 font-medium">{featureName}</span>, you need to add your own API key. 
                  This allows you to use your preferred AI provider (Groq, Gemini, or OpenAI) and manage your own usage.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <NeumorphicButton
              variant="accent"
              onClick={handleGoToSettings}
              className="w-full group"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Go to API Settings</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </div>
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={onClose}
              className="w-full"
            >
              Maybe Later
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default APIKeyRequiredModal;

