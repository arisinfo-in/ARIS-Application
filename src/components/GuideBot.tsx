import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, ArrowRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { guideService, GuideResponse } from '../services/guideService';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  guideData?: GuideResponse;
}

const GuideBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm ARIS Bot. I can help you navigate the platform and learn about features. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        content: msg.content,
        isUser: msg.isUser
      }));

      const response = await guideService.getGuideResponse(query, conversationHistory);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.answer,
        isUser: false,
        timestamp: new Date(),
        guideData: response
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      let errorContent = 'Sorry, I encountered an error. Please try again.';
      
      // Check for rate limit error
      if (error?.message?.includes('API_RATE_LIMIT')) {
        const rateLimitMessage = error.message.replace('API_RATE_LIMIT: ', '');
        errorContent = `**Rate Limit Reached**\n\n${rateLimitMessage}\n\n**What to do:**\n• Wait a few minutes before trying again\n• The API has usage limits to ensure fair access for all users\n• You can continue browsing the platform in the meantime`;
      } else if (error?.message) {
        errorContent = `**Error**\n\n${error.message}\n\nPlease try again in a moment.`;
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Animated Bot Button in Navbar */}
      <div
        className="relative flex items-center cursor-pointer pr-1 mr-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        title="ARIS Bot - Get Help"
      >
        {/* Animated Bot Icon */}
        <div className="relative">
          {/* Pulse animation ring */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping"></div>
          )}
          
          {/* Bot icon with animations */}
          <div
            className={`relative transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${isClicked ? 'scale-95' : ''} ${
              isOpen ? 'rotate-12' : ''
            }`}
          >
            <div className="relative">
              {/* Glow effect on hover */}
              {isHovered && (
                <div className="absolute inset-0 bg-orange-400/30 blur-md rounded-full"></div>
              )}
              <Bot 
                size={24} 
                className={`text-orange-400 transition-all duration-300 ${
                  isHovered ? 'text-orange-300' : ''
                }`}
                style={{
                  animation: isOpen 
                    ? 'jump 0.6s ease-in-out infinite' 
                    : isHovered && !isOpen 
                      ? 'wave 1s ease-in-out infinite' 
                      : undefined
                }}
              />
            </div>
          </div>
          
          {/* Notification dot (optional - can show if there are unread messages) */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          )}
        </div>
        
        {/* CSS Animations */}
        <style>{`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
          }
          @keyframes jump {
            0%, 100% { 
              transform: translateY(0) scale(1);
            }
            50% { 
              transform: translateY(-8px) scale(1.1);
            }
          }
        `}</style>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[600px] z-50">
          <NeumorphicCard padding="none" className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot size={24} className="text-orange-400 animate-pulse" />
                  <div className="absolute inset-0 bg-orange-400/20 blur-sm rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-100">ARIS Bot</h3>
                  <p className="text-xs text-gray-300">Your guide to the platform</p>
                </div>
              </div>
              <NeumorphicButton
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </NeumorphicButton>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 ${
                      message.isUser
                        ? 'bg-orange-gradient text-gray-100'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {message.content.split('\n').map((line, idx) => {
                        // Remove all ** markdown characters
                        const cleanLine = line.replace(/\*\*/g, '');
                        
                        // Format markdown-style headings (article-style)
                        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                          return (
                            <h4 key={idx} className="font-semibold text-orange-400 text-base mt-3 mb-2 first:mt-0 tracking-tight">
                              {cleanLine.trim()}
                            </h4>
                          );
                        }
                        // Format bullet points (article-style)
                        if (cleanLine.trim().startsWith('•')) {
                          return (
                            <div key={idx} className="ml-4 text-gray-200 mb-1.5 leading-6">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>{cleanLine.replace('•', '').trim()}</span>
                            </div>
                          );
                        }
                        // Regular paragraph text (article-style)
                        if (cleanLine.trim()) {
                          return (
                            <p key={idx} className="text-gray-100 mb-2 leading-6">
                              {cleanLine}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                    
                    {/* Guide Data - Steps and Navigation */}
                    {message.guideData && (
                      <div className="mt-3 space-y-2">
                        {message.guideData.steps && message.guideData.steps.length > 0 && (
                          <div className="bg-gray-900/50 rounded-lg p-2">
                            <p className="text-xs font-semibold mb-1">Steps:</p>
                            <ol className="text-xs space-y-1 list-decimal list-inside">
                              {message.guideData.steps.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                        
                        {(message.guideData.externalLink || message.guideData.route) && (
                          <NeumorphicButton
                            variant="accent"
                            size="sm"
                            onClick={() => {
                              if (message.guideData?.externalLink) {
                                // Open external link in new tab
                                window.open(message.guideData.externalLink, '_blank', 'noopener,noreferrer');
                              } else if (message.guideData?.route) {
                                // Navigate internally
                                handleNavigate(message.guideData.route);
                              }
                            }}
                            className="w-full text-xs"
                          >
                            {message.guideData.externalLink 
                              ? `Visit ${message.guideData.feature?.name || 'Website'}`
                              : `Go to ${message.guideData.feature?.name || 'Dashboard'}`}
                            <ArrowRight size={14} className="ml-1" />
                          </NeumorphicButton>
                        )}

                        {/* Only show Related Features when steps are shown (i.e., for "how to" questions) */}
                        {message.guideData.steps && message.guideData.steps.length > 0 && message.guideData.relatedFeatures && message.guideData.relatedFeatures.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold mb-1">Related Features:</p>
                            <div className="flex flex-wrap gap-1">
                              {message.guideData.relatedFeatures.slice(0, 3).map((feature) => (
                                <button
                                  key={feature.id}
                                  onClick={() => handleNavigate(feature.route)}
                                  className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                                >
                                  {feature.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-xl p-3">
                    <Loader className="w-4 h-4 animate-spin text-orange-500" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-gray-700">
                <p className="text-xs text-gray-300 mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {guideService.getQuickActions().slice(0, 3).map((action) => (
                    <button
                      key={action.route}
                      onClick={() => handleQuickAction(action.route)}
                      className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition text-gray-200"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about any feature..."
                  className="flex-1 bg-gray-800 text-gray-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={loading}
                />
                <NeumorphicButton
                  variant="accent"
                  size="sm"
                  onClick={handleSend}
                  disabled={loading || !inputValue.trim()}
                >
                  <Send size={18} />
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicCard>
        </div>
      )}
    </>
  );
};

export default GuideBot;

