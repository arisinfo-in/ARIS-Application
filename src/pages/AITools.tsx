import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Zap, Brain, Cpu, Database, BarChart3, FileText, Image, Code, ExternalLink, Star, DollarSign } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const AITools: React.FC = () => {
  const navigate = useNavigate();

  const aiTools = [
    {
      id: 'ai-data-analyst',
      name: 'Data Analyst AI Tools',
      icon: Bot,
      color: 'from-orange-400 to-orange-500',
      description: 'Specialized AI tools designed specifically for data analysts',
      tools: [
        {
          name: 'Decide',
          description: 'One shot data problems that chatGPT can\'t handle',
          pricing: 'Free',
          rating: 4.8,
          category: 'Data Analysis',
          url: 'https://www.trydecide.co/'
        },
        {
          name: 'Julius AI',
          description: 'AI-powered data analysis and visualization platform',
          pricing: 'Free - $20/month',
          rating: 4.7,
          category: 'Data Visualization',
          url: 'https://julius.ai/'
        },
        {
          name: 'Formula Bot',
          description: 'Connect your data. Ask anything. Get insights 10x faster',
          pricing: 'Free - $20/month',
          rating: 4.6,
          category: 'Data Processing',
          url: 'https://www.formulabot.com/'
        },
        {
          name: 'Powerdrill AI',
          description: 'AI-powered data drilling and analysis platform',
          pricing: 'Free - Custom',
          rating: 4.5,
          category: 'Data Mining',
          url: 'https://powerdrill.ai/'
        }
      ]
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis & Visualization',
      icon: BarChart3,
      color: 'from-orange-400 to-orange-500',
      description: 'AI-powered tools for data analysis, visualization, and insights',
      tools: [
        {
          name: 'Tableau AI',
          description: 'Advanced analytics with natural language queries',
          pricing: 'Free - $70/month',
          rating: 4.8,
          category: 'Visualization',
          url: 'https://www.tableau.com/products/tableau-ai'
        },
        {
          name: 'Power BI Copilot',
          description: 'AI assistant for data modeling and insights',
          pricing: '$10/month',
          rating: 4.6,
          category: 'Business Intelligence',
          url: 'https://powerbi.microsoft.com/en-us/copilot/'
        },
        {
          name: 'DataRobot',
          description: 'Automated machine learning platform',
          pricing: 'Custom pricing',
          rating: 4.7,
          category: 'AutoML',
          url: 'https://www.datarobot.com/'
        },
        {
          name: 'Jupyter AI',
          description: 'AI-powered code generation for data science',
          pricing: 'Free',
          rating: 4.5,
          category: 'Development',
          url: 'https://github.com/jupyterlab/jupyter-ai'
        }
      ]
    },
    {
      id: 'nlp-text',
      name: 'NLP & Text Analysis',
      icon: FileText,
      color: 'from-orange-400 to-orange-500',
      description: 'Natural language processing and text analytics tools',
      tools: [
        {
          name: 'OpenAI GPT-4',
          description: 'Advanced language model for text analysis',
          pricing: '$20/month',
          rating: 4.9,
          category: 'Language Model',
          url: 'https://openai.com/gpt-4'
        },
        {
          name: 'Hugging Face',
          description: 'Open-source NLP models and datasets',
          pricing: 'Free - $9/month',
          rating: 4.8,
          category: 'Model Hub',
          url: 'https://huggingface.co/'
        },
        {
          name: 'MonkeyLearn',
          description: 'Text analysis and classification platform',
          pricing: '$299/month',
          rating: 4.4,
          category: 'Text Analytics',
          url: 'https://monkeylearn.com/'
        },
        {
          name: 'Lexalytics',
          description: 'Sentiment analysis and text mining',
          pricing: 'Custom pricing',
          rating: 4.3,
          category: 'Sentiment Analysis',
          url: 'https://www.lexalytics.com/'
        }
      ]
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision',
      icon: Image,
      color: 'from-orange-400 to-orange-500',
      description: 'Image and video analysis tools powered by AI',
      tools: [
        {
          name: 'Google Vision API',
          description: 'Image recognition and analysis',
          pricing: '$1.50 per 1K images',
          rating: 4.7,
          category: 'Image Analysis',
          url: 'https://cloud.google.com/vision'
        },
        {
          name: 'Amazon Rekognition',
          description: 'Video and image analysis service',
          pricing: '$1.00 per 1K images',
          rating: 4.5,
          category: 'Video Analysis',
          url: 'https://aws.amazon.com/rekognition/'
        },
        {
          name: 'OpenCV',
          description: 'Open-source computer vision library',
          pricing: 'Free',
          rating: 4.6,
          category: 'Development',
          url: 'https://opencv.org/'
        },
        {
          name: 'Clarifai',
          description: 'Visual recognition and search platform',
          pricing: '$5/month',
          rating: 4.4,
          category: 'Visual Search',
          url: 'https://www.clarifai.com/'
        }
      ]
    },
    {
      id: 'automation',
      name: 'Process Automation',
      icon: Zap,
      color: 'from-orange-400 to-orange-500',
      description: 'AI tools for automating data workflows and processes',
      tools: [
        {
          name: 'UiPath',
          description: 'Robotic process automation platform',
          pricing: '$420/month',
          rating: 4.5,
          category: 'RPA',
          url: 'https://www.uipath.com/'
        },
        {
          name: 'Zapier AI',
          description: 'AI-powered workflow automation',
          pricing: '$20/month',
          rating: 4.6,
          category: 'Workflow',
          url: 'https://zapier.com/ai'
        },
        {
          name: 'Microsoft Power Automate',
          description: 'Low-code automation platform',
          pricing: '$15/month',
          rating: 4.4,
          category: 'Low-Code',
          url: 'https://powerautomate.microsoft.com/'
        },
        {
          name: 'Automation Anywhere',
          description: 'Intelligent automation platform',
          pricing: 'Custom pricing',
          rating: 4.3,
          category: 'Enterprise RPA',
          url: 'https://www.automationanywhere.com/'
        }
      ]
    },
    {
      id: 'data-preparation',
      name: 'Data Preparation',
      icon: Database,
      color: 'from-orange-400 to-orange-500',
      description: 'AI tools for data cleaning, transformation, and preparation',
      tools: [
        {
          name: 'Trifacta',
          description: 'Data wrangling and preparation platform',
          pricing: '$40/month',
          rating: 4.6,
          category: 'Data Wrangling',
          url: 'https://www.trifacta.com/'
        },
        {
          name: 'Alteryx',
          description: 'Self-service data analytics platform',
          pricing: '$5,195/year',
          rating: 4.5,
          category: 'Analytics Platform',
          url: 'https://www.alteryx.com/'
        },
        {
          name: 'Dataiku',
          description: 'Collaborative data science platform',
          pricing: 'Free - Custom',
          rating: 4.7,
          category: 'Data Science',
          url: 'https://www.dataiku.com/'
        },
        {
          name: 'Pandas AI',
          description: 'AI-powered data manipulation library',
          pricing: 'Free',
          category: 'Python Library',
          url: 'https://github.com/gventuri/pandas-ai'
        }
      ]
    },
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics',
      icon: Brain,
      color: 'from-orange-400 to-orange-500',
      description: 'Machine learning and predictive modeling tools',
      tools: [
        {
          name: 'H2O.ai',
          description: 'Open-source machine learning platform',
          pricing: 'Free - Custom',
          rating: 4.6,
          category: 'ML Platform',
          url: 'https://h2o.ai/'
        },
        {
          name: 'RapidMiner',
          description: 'Data science and machine learning platform',
          pricing: '$2,500/year',
          rating: 4.4,
          category: 'Data Science',
          url: 'https://rapidminer.com/'
        },
        {
          name: 'KNIME',
          description: 'Open-source data analytics platform',
          pricing: 'Free - $1,500/month',
          rating: 4.5,
          category: 'Analytics Platform',
          url: 'https://www.knime.com/'
        },
        {
          name: 'Azure Machine Learning',
          description: 'Cloud-based ML platform',
          pricing: '$1/hour',
          rating: 4.7,
          category: 'Cloud ML',
          url: 'https://azure.microsoft.com/en-us/products/machine-learning'
        }
      ]
    },
    {
      id: 'conversational-ai',
      name: 'Conversational AI',
      icon: Bot,
      color: 'from-orange-400 to-orange-500',
      description: 'Chatbots, virtual assistants, and conversational interfaces',
      tools: [
        {
          name: 'ChatGPT API',
          description: 'OpenAI\'s conversational AI API',
          pricing: '$0.002 per 1K tokens',
          rating: 4.9,
          category: 'Conversational AI',
          url: 'https://platform.openai.com/docs/api-reference'
        },
        {
          name: 'Dialogflow',
          description: 'Google\'s conversational AI platform',
          pricing: 'Free - $0.002/request',
          rating: 4.6,
          category: 'Chatbot Platform',
          url: 'https://cloud.google.com/dialogflow'
        },
        {
          name: 'Microsoft Bot Framework',
          description: 'Build and deploy intelligent bots',
          pricing: 'Free - $0.50/1K messages',
          rating: 4.4,
          category: 'Bot Development',
          url: 'https://dev.botframework.com/'
        },
        {
          name: 'Rasa',
          description: 'Open-source conversational AI',
          pricing: 'Free - $2,000/month',
          rating: 4.5,
          category: 'Open Source',
          url: 'https://rasa.com/'
        }
      ]
    },
    {
      id: 'code-generation',
      name: 'Code Generation',
      icon: Code,
      color: 'from-orange-400 to-orange-500',
      description: 'AI tools for automated code generation and assistance',
      tools: [
        {
          name: 'GitHub Copilot',
          description: 'AI pair programmer for code generation',
          pricing: '$10/month',
          rating: 4.7,
          category: 'Code Assistant',
          url: 'https://github.com/features/copilot'
        },
        {
          name: 'Tabnine',
          description: 'AI code completion and generation',
          pricing: 'Free - $20/month',
          rating: 4.5,
          category: 'Code Completion',
          url: 'https://www.tabnine.com/'
        },
        {
          name: 'Amazon CodeWhisperer',
          description: 'AI-powered code suggestions',
          pricing: 'Free - $19/month',
          rating: 4.3,
          category: 'Code Suggestions',
          url: 'https://aws.amazon.com/codewhisperer/'
        },
        {
          name: 'Replit Ghostwriter',
          description: 'AI code generation in the browser',
          pricing: '$20/month',
          rating: 4.4,
          category: 'Online IDE',
          url: 'https://replit.com/ghostwriter'
        }
      ]
    }
  ];

  const totalTools = aiTools.reduce((sum, category) => sum + category.tools.length, 0);
  const averageRating = (aiTools.reduce((sum, category) => 
    sum + category.tools.reduce((catSum, tool) => catSum + tool.rating, 0), 0
  ) / totalTools).toFixed(1);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">AI Tools for Data Analysts</h1>
            <p className="text-gray-200">Essential AI tools and platforms to enhance your data analysis workflow</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Bot className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">{aiTools.length}</h3>
              <p className="text-secondary-contrast text-xs">Categories</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Zap className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">{totalTools}</h3>
              <p className="text-secondary-contrast text-xs">Total Tools</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Star className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">{averageRating}</h3>
              <p className="text-secondary-contrast text-xs">Avg Rating</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <DollarSign className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">Free+</h3>
              <p className="text-secondary-contrast text-xs">Pricing Options</p>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* AI Tools Categories */}
      <div className="space-y-8">
        {aiTools.map((category) => {
          const IconComponent = category.icon;
          return (
            <NeumorphicCard key={category.id} padding="lg" className="hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-100">{category.name}</h2>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.tools.map((tool, index) => (
                  <NeumorphicCard key={index} padding="md" hoverable className="h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-100 flex-1">{tool.name}</h3>
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{tool.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-200 text-sm mb-3 flex-grow">{tool.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-300">{tool.pricing}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-gray-300">{tool.category}</span>
                      </div>
                    </div>

                    <NeumorphicButton
                      variant="secondary"
                      className="w-full mt-auto"
                      onClick={() => {
                        window.open(tool.url, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Learn More
                    </NeumorphicButton>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-12">
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-200 mb-6">
            Explore these AI tools to enhance your data analysis capabilities and stay ahead in the field.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/news/job-kit')}
            >
              <Bot className="w-4 h-4 mr-2" />
              Explore Job Kit
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={() => navigate('/news/free-certificates')}
            >
              <Star className="w-4 h-4 mr-2" />
              Get Certified
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(AITools);
