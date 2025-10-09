import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Bot, User, Loader, FileSpreadsheet, BarChart3, Database, Code, TrendingUp, Brain, MessageSquare, Zap, Plus, Lightbulb, ChevronRight } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { firestoreOperations, AIMessage } from '../firebase/firestore';
import { geminiService } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

const moduleInfo = {
  excel: { name: 'Microsoft Excel', icon: FileSpreadsheet, color: 'from-orange-400 to-orange-500' },
  powerbi: { name: 'Microsoft Power BI', icon: BarChart3, color: 'from-orange-400 to-orange-500' },
  sql: { name: 'SQL & Database', icon: Database, color: 'from-orange-400 to-orange-500' },
  python: { name: 'Python', icon: Code, color: 'from-orange-400 to-orange-500' },
  statistics: { name: 'Statistics', icon: TrendingUp, color: 'from-orange-400 to-orange-500' },
  ml: { name: 'Machine Learning', icon: Brain, color: 'from-orange-400 to-orange-500' },
  prompt: { name: 'Prompt Engineering', icon: MessageSquare, color: 'from-orange-400 to-orange-500' },
  advanced: { name: 'Advanced AI Tutor', icon: Zap, color: 'from-orange-400 to-orange-500' }
};

const AITutor: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const module = moduleInfo[moduleId as keyof typeof moduleInfo];

  // Question suggestions based on module and conversation context
  const getQuestionSuggestions = useCallback((moduleId: string, conversationLength: number) => {
    const suggestions: { [key: string]: string[] } = {
      excel: [
        "How do I create a pivot table?",
        "What are the most useful Excel formulas?",
        "How do I use VLOOKUP and HLOOKUP?",
        "Can you show me data validation techniques?",
        "How do I create charts and graphs?",
        "What are Excel shortcuts I should know?",
        "How do I clean and prepare data in Excel?",
        "Can you explain conditional formatting?"
      ],
      powerbi: [
        "How do I connect to data sources?",
        "What are the best practices for dashboard design?",
        "How do I create calculated columns and measures?",
        "Can you explain DAX formulas?",
        "How do I use filters and slicers?",
        "What are Power BI visualizations?",
        "How do I publish and share reports?",
        "Can you show me data modeling techniques?"
      ],
      sql: [
        "How do I write basic SELECT queries?",
        "What are JOINs and how do I use them?",
        "How do I filter data with WHERE clauses?",
        "Can you explain GROUP BY and aggregation?",
        "How do I create and modify tables?",
        "What are indexes and why are they important?",
        "How do I optimize query performance?",
        "Can you show me window functions?"
      ],
      python: [
        "How do I use pandas for data analysis?",
        "What are the essential Python libraries for data science?",
        "How do I clean and preprocess data?",
        "Can you show me data visualization with matplotlib?",
        "How do I work with CSV and Excel files?",
        "What are NumPy arrays and how do I use them?",
        "How do I handle missing data?",
        "Can you explain data types in pandas?"
      ],
      statistics: [
        "What are descriptive statistics?",
        "How do I calculate mean, median, and mode?",
        "Can you explain standard deviation and variance?",
        "What is hypothesis testing?",
        "How do I interpret p-values?",
        "What are confidence intervals?",
        "Can you explain correlation and regression?",
        "How do I choose the right statistical test?"
      ],
      ml: [
        "What is machine learning and how does it work?",
        "How do I prepare data for machine learning?",
        "What are supervised vs unsupervised learning?",
        "Can you explain different ML algorithms?",
        "How do I evaluate model performance?",
        "What is overfitting and how do I prevent it?",
        "How do I use scikit-learn for ML?",
        "Can you show me feature engineering techniques?"
      ],
      prompt: [
        "What is prompt engineering?",
        "How do I write effective prompts?",
        "What are few-shot learning techniques?",
        "How do I optimize AI responses?",
        "Can you explain prompt templates?",
        "What are chain-of-thought prompts?",
        "How do I handle different AI models?",
        "Can you show me advanced prompting strategies?"
      ],
      advanced: [
        "What are the latest AI developments?",
        "How do I work with large language models?",
        "What is transfer learning?",
        "Can you explain deep learning architectures?",
        "How do I deploy AI models?",
        "What are MLOps best practices?",
        "How do I handle AI ethics and bias?",
        "Can you show me advanced AI techniques?"
      ]
    };

    const moduleSuggestions = suggestions[moduleId] || suggestions.excel;
    
    // If user has been chatting, show more advanced suggestions
    if (conversationLength > 4) {
      return moduleSuggestions.slice(4); // Show more advanced questions
    }
    
    return moduleSuggestions.slice(0, 4); // Show basic questions
  }, []);

  // Update suggestions when conversation changes
  useEffect(() => {
    if (moduleId) {
      const suggestions = getQuestionSuggestions(moduleId, messages.length);
      setSuggestedQuestions(suggestions);
    }
  }, [moduleId, messages.length, getQuestionSuggestions]);

  const initializeSession = useCallback(async () => {
    if (!user || !moduleId) return;

    try {
      setInitializing(false); // Set to false immediately, don't block UI
      
      // Try to load existing session first
      const existingSession = await firestoreOperations.getLatestAISession(user.uid, moduleId);
      
      if (existingSession && existingSession.messages && existingSession.messages.length > 0) {
        // Load existing conversation
        setMessages(existingSession.messages);
        setSessionId(existingSession.id);
        console.log('Loaded existing session with', existingSession.messages.length, 'messages');
      } else {
        // Create new session with welcome message
        const welcomeMessage: AIMessage = {
          id: uuidv4(),
          content: `Welcome to the ${module?.name || 'AI'} tutor! I'm here to help you learn and master this topic. What would you like to know?`,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        
        setMessages([welcomeMessage]);
        
        // Create session asynchronously without blocking
        const newSessionId = await firestoreOperations.createAISession({
          userId: user.uid,
          module: moduleId,
          messages: [welcomeMessage],
          createdAt: new Date().toISOString()
        });
        
        setSessionId(newSessionId);
        console.log('Created new session');
      }
    } catch (error) {
      console.error('Error initializing session:', error);
      
      // Fallback: show welcome message even if session creation fails
      const welcomeMessage: AIMessage = {
        id: uuidv4(),
        content: `Welcome to the ${module?.name || 'AI'} tutor! I'm here to help you learn and master this topic. What would you like to know?`,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages([welcomeMessage]);
    }
  }, [user, moduleId, module]);

  useEffect(() => {
    if (user && moduleId) {
      initializeSession();
    }
  }, [user, moduleId, initializeSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const sendMessage = async () => {
    const messageText = inputValue.trim();
    
    if (!messageText || loading || !sessionId || !moduleId) {
      return;
    }

    const userMessage: AIMessage = {
      id: uuidv4(),
      content: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    // Update messages state and get the updated messages
    const updatedMessagesWithUser = [...messages, userMessage];
    setMessages(updatedMessagesWithUser);
    setInputValue('');
    setLoading(true);
    setShowSuggestions(false); // Hide suggestions when user sends a message

    try {
      // Get AI response from Gemini API with conversation history
      const aiResponse = await geminiService.generateResponse(messageText, moduleId, messages);
      
      const aiMessage: AIMessage = {
        id: uuidv4(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessagesWithUser, aiMessage];
      setMessages(finalMessages);

      // Update session in Firestore
      try {
        await firestoreOperations.updateAISession(sessionId, {
          messages: finalMessages
        });
      } catch (firestoreError) {
        console.error('Error updating Firestore session:', firestoreError);
        // Continue even if Firestore update fails
      }

      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message to user
      const errorMessage: AIMessage = {
        id: uuidv4(),
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString()
      };

      const finalMessages = [...updatedMessagesWithUser, errorMessage];
      setMessages(finalMessages);

      setLoading(false);
    }
  };


  const startNewConversation = async () => {
    if (!user || !moduleId) return;

    try {
      // Create new session
      const newSessionId = await firestoreOperations.createAISession({
        userId: user.uid,
        module: moduleId,
        messages: [],
        createdAt: new Date().toISOString()
      });

      // Reset messages with welcome message
      const welcomeMessage: AIMessage = {
        id: uuidv4(),
        content: `Welcome to the ${module?.name || 'AI'} tutor! I'm here to help you learn and master this topic. What would you like to know?`,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages([welcomeMessage]);
      setSessionId(newSessionId);
      setShowSuggestions(false); // Don't show suggestions by default
      
      // Update the new session with welcome message
      await firestoreOperations.updateAISession(newSessionId, {
        messages: [welcomeMessage]
      });

      console.log('Started new conversation');
    } catch (error) {
      console.error('Error starting new conversation:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  if (!module) {
    return (
      <div className="p-6">
        <NeumorphicCard padding="lg" className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Module Not Found</h2>
          <p className="text-gray-200">The requested AI tutor module could not be found.</p>
        </NeumorphicCard>
      </div>
    );
  }

  if (initializing) {
    return (
      <div className="h-full flex flex-col max-w-4xl mx-auto p-6">
        <div className="flex-1 flex items-center justify-center">
          <NeumorphicCard padding="lg" className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-200">Initializing AI Tutor...</p>
          </NeumorphicCard>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <NeumorphicCard padding="lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                <module.icon className="w-6 h-6 text-gray-100" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">{module.name}</h1>
                <p className="text-gray-200">AI-powered learning assistant</p>
              </div>
            </div>
            <NeumorphicButton
              variant="secondary"
              onClick={startNewConversation}
              icon={Plus}
              size="md"
            >
              New Conversation
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>

      {/* Messages */}
      <div className="flex-1 mb-6 overflow-hidden">
        <NeumorphicCard padding="md" variant="pressed" className="h-full">
          <div className="h-full overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gray-100" />
                  </div>
                )}
                
                <NeumorphicCard
                  padding="md"
                  variant={message.isUser ? 'default' : 'pressed'}
                  className={`max-w-[80%] ${message.isUser ? 'bg-gradient-to-br from-orange-100 to-orange-200' : ''}`}
                >
                  <div 
                    className="text-gray-100 leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-400 font-semibold">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="text-orange-300 italic">$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-gray-700 text-orange-300 px-2 py-1 rounded text-sm font-mono">$1</code>')
                        .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
                        .replace(/^• (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
                        .replace(/\n\n/g, '</p><p class="mt-3">')
                        .replace(/^(.*)$/gm, '<p>$1</p>')
                        .replace(/<p><li/g, '<ul class="list-none space-y-1 my-3"><li')
                        .replace(/<\/li><\/p>/g, '</li></ul>')
                        .replace(/<p><\/p>/g, '')
                    }}
                  />
                  <p className="text-xs text-gray-300 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </NeumorphicCard>

                {message.isUser && (
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-100" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-100" />
                </div>
                <NeumorphicCard padding="md" variant="pressed">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 animate-spin text-orange-500" />
                    <span className="text-gray-200">AI is thinking...</span>
                  </div>
                </NeumorphicCard>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </NeumorphicCard>
      </div>

      {/* Question Suggestions */}
      {showSuggestions && suggestedQuestions.length > 0 && (
        <div className="mb-6">
          <NeumorphicCard padding="lg">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-gray-100">Suggested Questions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((suggestion, index) => (
                <NeumorphicButton
                  key={index}
                  variant="ghost"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left justify-start p-4 h-auto"
                >
                  <div className="flex items-center gap-3 w-full">
                    <ChevronRight className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-200 text-sm leading-relaxed">
                      {suggestion}
                    </span>
                  </div>
                </NeumorphicButton>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-gray-200 text-sm transition-colors"
              >
                Hide suggestions
              </button>
            </div>
          </NeumorphicCard>
        </div>
      )}

      {/* Input */}
      <NeumorphicCard padding="md">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                // Auto-resize textarea
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Ask me anything about ${module.name}...`}
              className="w-full resize-none bg-transparent border-none outline-none text-gray-100 placeholder-gray-400 pr-12"
              rows={1}
              style={{
                minHeight: '40px',
                maxHeight: '120px',
                overflow: 'hidden'
              }}
              disabled={loading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {loading && (
                <Loader className="w-4 h-4 animate-spin text-orange-500" />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {!showSuggestions && suggestedQuestions.length > 0 && (
              <NeumorphicButton
                variant="secondary"
                size="md"
                onClick={() => setShowSuggestions(true)}
                icon={Lightbulb}
                title="Show suggested questions"
                disabled={loading}
              />
            )}
            <NeumorphicButton
              variant="accent"
              size="md"
              onClick={sendMessage}
              disabled={!inputValue.trim() || loading}
              icon={loading ? Loader : Send}
              className={loading ? 'opacity-50 cursor-not-allowed' : ''}
            />
          </div>
        </div>
        {inputValue.trim() && (
          <div className="mt-2 text-xs text-gray-400 text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        )}
      </NeumorphicCard>
    </div>
  );
};

export default AITutor;