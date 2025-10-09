
class GeminiService {
  private baseUrl: string;

  constructor() {
    // Use Netlify Functions for API calls
    this.baseUrl = '/.netlify/functions';
  }

  private async makeApiCall(prompt: string, isDynamicTest: boolean = false): Promise<string> {
    const endpoint = isDynamicTest ? '/generate-test' : '/ai-tutor';
    const keyType = isDynamicTest ? 'Practice Test' : 'AI Tutor';
    
    console.log(`Using ${keyType} Netlify Function`);
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          module: 'general', // This will be overridden by the calling method
          conversationHistory: []
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `${keyType} function error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error('No response generated from AI function');
      }

      console.log(`${keyType} function call successful`);
      return data.response;
      
    } catch (error) {
      console.error(`Error with ${keyType} function:`, error);
      throw error;
    }
  }

  async generateResponse(prompt: string, module: string, conversationHistory: Array<{ content: string; isUser: boolean }> = []): Promise<string> {
    try {
      console.log(`Generating response for module: ${module}`);
      console.log(`Conversation history: ${conversationHistory.length} messages`);
      
      // Try Netlify Function first
      try {
        const response = await fetch(`${this.baseUrl}/ai-tutor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt,
            module,
            conversationHistory
          })
        });

        if (response.ok) {
          const data = await response.json();
          return data.response;
        } else {
          console.log('Netlify function not available, falling back to direct API call');
        }
      } catch (functionError) {
        console.log('Netlify function error, falling back to direct API call:', functionError);
      }

      // Fallback to direct API call
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
      const conversationContext = this.buildConversationContext(conversationHistory);
      const systemPrompt = this.getSystemPrompt(module);
      const fullPrompt = `${systemPrompt}\n\n${conversationContext}User: ${prompt}`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{
            role: "user",
            content: fullPrompt
          }],
          temperature: 1,
          max_completion_tokens: 4096,
          top_p: 1,
          reasoning_effort: "medium",
          stream: false,
          stop: null
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);
        
        if (errorData.error?.code === 429) {
          const retryAfter = errorData.error?.details?.[0]?.retryDelay || '30 seconds';
          throw new Error(`API quota exceeded. Please try again in ${retryAfter} or upgrade your API plan.`);
        }
        
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated from AI');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  private buildConversationContext(conversationHistory: Array<{ content: string; isUser: boolean }>): string {
    if (!conversationHistory || conversationHistory.length === 0) {
      return '';
    }

    // Only include the last 10 messages to avoid token limits
    const recentMessages = conversationHistory.slice(-10);
    
    const context = recentMessages.map(msg => {
      const role = msg.isUser ? 'User' : 'Assistant';
      return `${role}: ${msg.content}`;
    }).join('\n');

    return `Conversation History:\n${context}\n\n`;
  }

  async generateDynamicTest(systemPrompt: string): Promise<string> {
    try {
      console.log('Generating dynamic test...');
      
      // Try Netlify Function first
      try {
        const response = await fetch(`${this.baseUrl}/generate-test`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            module: 'general',
            difficulty: 'intermediate',
            questionCount: 5,
            topics: []
          })
        });

        if (response.ok) {
          const data = await response.json();
          return JSON.stringify(data.questions);
        } else {
          console.log('Netlify function not available, falling back to direct API call');
        }
      } catch (functionError) {
        console.log('Netlify function error, falling back to direct API call:', functionError);
      }

      // Fallback to direct API call
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [{
            role: "user",
            content: systemPrompt
          }],
          temperature: 1,
          max_completion_tokens: 4096,
          top_p: 1,
          reasoning_effort: "medium",
          stream: false,
          stop: null
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText);
        
        if (errorData.error?.code === 429) {
          const retryAfter = errorData.error?.details?.[0]?.retryDelay || '30 seconds';
          throw new Error(`API quota exceeded. Please try again in ${retryAfter} or upgrade your API plan.`);
        }
        
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated from AI');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating dynamic test:', error);
      throw new Error('Failed to generate dynamic test questions');
    }
  }

  private getSystemPrompt(module: string): string {
    const modulePrompts = {
      excel: `You are EXCLUSIVELY a Microsoft Excel expert tutor. You ONLY provide Excel-specific knowledge and solutions.

STRICT RULES:
- ONLY answer questions about Microsoft Excel
- If asked about other tools (Power BI, Python, SQL, etc.), politely redirect to Excel alternatives
- Focus ONLY on Excel formulas, functions, features, and techniques
- Provide Excel-specific examples with actual cell references (A1, B2, etc.)

EXPERTISE AREAS (Excel ONLY):
- Excel formulas: VLOOKUP, INDEX-MATCH, SUMIFS, COUNTIFS, IF statements
- Excel functions: Pivot tables, charts, conditional formatting
- Excel features: Power Query, data validation, macros (VBA)
- Excel data analysis: sorting, filtering, data tables

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for formulas and functions
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** Excel solutions
- Real Excel formulas with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate Excel solutions`,

      powerbi: `You are EXCLUSIVELY a Microsoft Power BI expert tutor. You ONLY provide Power BI-specific knowledge and solutions.

STRICT RULES:
- ONLY answer questions about Microsoft Power BI
- If asked about other tools (Excel, Python, SQL, etc.), politely redirect to Power BI alternatives
- Focus ONLY on Power BI features, DAX, and data visualization
- Provide Power BI-specific examples with actual table/column names

EXPERTISE AREAS (Power BI ONLY):
- DAX formulas: CALCULATE, FILTER, RELATED, SUMX, AVERAGEX
- Power BI features: Data modeling, relationships, measures
- Power Query: Data transformation, M language
- Visualizations: Charts, tables, custom visuals
- Power BI Service: Sharing, workspaces, gateways

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for DAX formulas and functions
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** Power BI solutions
- Real DAX formulas with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate Power BI solutions`,

      sql: `You are EXCLUSIVELY a SQL and Database expert tutor. You ONLY provide SQL-specific knowledge and solutions.

STRICT RULES:
- ONLY answer questions about SQL and databases
- If asked about other tools (Excel, Python, Power BI, etc.), politely redirect to SQL alternatives
- Focus ONLY on SQL queries, database design, and SQL-specific features
- Provide SQL-specific examples with actual table/column names

EXPERTISE AREAS (SQL ONLY):
- SQL queries: SELECT, JOIN, WHERE, GROUP BY, HAVING, ORDER BY
- SQL functions: COUNT, SUM, AVG, MAX, MIN, CASE statements
- Database design: Tables, relationships, normalization
- Advanced SQL: CTEs, window functions, stored procedures
- Database management: Indexing, performance, security

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for SQL queries and functions
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** SQL solutions
- Real SQL queries with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate SQL solutions`,

      python: `You are EXCLUSIVELY a Python expert tutor. You ONLY provide Python-specific knowledge and solutions.

STRICT RULES:
- ONLY answer questions about Python programming
- If asked about other tools (Excel, SQL, Power BI, etc.), politely redirect to Python alternatives
- Focus ONLY on Python code, libraries, and programming concepts
- Provide Python-specific examples with actual code snippets

EXPERTISE AREAS (Python ONLY):
- Python fundamentals: Variables, loops, functions, classes
- Data libraries: pandas, numpy, matplotlib, seaborn
- Python syntax: List comprehensions, lambda functions, decorators
- Python packages: scikit-learn, requests, beautifulsoup
- Python best practices: PEP 8, error handling, testing

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for Python code and functions
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** Python solutions
- Real Python code with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate Python solutions`,

      statistics: `You are EXCLUSIVELY a Statistics expert tutor. You ONLY provide statistical knowledge and solutions.

STRICT RULES:
- ONLY answer questions about statistics and statistical methods
- If asked about other tools (Excel, Python, SQL, etc.), politely redirect to statistical alternatives
- Focus ONLY on statistical concepts, formulas, and methods
- Provide statistical examples with actual calculations and formulas

EXPERTISE AREAS (Statistics ONLY):
- Descriptive statistics: Mean, median, mode, standard deviation, variance
- Inferential statistics: Hypothesis testing, confidence intervals, p-values
- Probability: Distributions, sampling, probability theory
- Regression: Linear regression, correlation, R-squared
- Statistical tests: t-tests, ANOVA, chi-square tests

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for formulas and calculations
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** statistical solutions
- Real formulas with proper statistical notation
- **Highlighted key concepts** and important terms
- Focus on immediate statistical solutions`,

      ml: `You are EXCLUSIVELY a Machine Learning expert tutor. You ONLY provide ML-specific knowledge and solutions.

STRICT RULES:
- ONLY answer questions about machine learning and AI
- If asked about other tools (Excel, SQL, Power BI, etc.), politely redirect to ML alternatives
- Focus ONLY on ML algorithms, models, and AI concepts
- Provide ML-specific examples with actual code and algorithms

EXPERTISE AREAS (ML ONLY):
- Supervised learning: Regression, classification, decision trees
- Unsupervised learning: Clustering, dimensionality reduction, PCA
- Deep learning: Neural networks, CNNs, RNNs, transformers
- ML algorithms: Random forest, SVM, k-means, gradient boosting
- ML libraries: scikit-learn, TensorFlow, PyTorch, Keras

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for ML code and algorithms
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** ML solutions
- Real ML code with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate ML solutions`,

      prompt: `You are EXCLUSIVELY a Prompt Engineering expert tutor. You ONLY provide prompt engineering knowledge and solutions.

STRICT RULES:
- ONLY answer questions about prompt engineering and AI interaction
- If asked about other tools (Excel, Python, SQL, etc.), politely redirect to prompt engineering alternatives
- Focus ONLY on prompt design, AI interaction, and prompt optimization
- Provide prompt-specific examples with actual prompt templates

EXPERTISE AREAS (Prompt Engineering ONLY):
- Prompt design: Clear instructions, context setting, role definition
- Prompt techniques: Few-shot learning, chain-of-thought, role-based prompting
- Prompt optimization: Iterative refinement, A/B testing, prompt templates
- AI interaction: Model capabilities, token limits, response formatting
- Advanced prompting: Meta-prompts, prompt chaining, few-shot examples

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for prompt templates and examples
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** prompt solutions
- Real prompt templates with proper structure
- **Highlighted key concepts** and important terms
- Focus on immediate prompt engineering solutions`,

      advanced: `You are EXCLUSIVELY an Advanced AI expert tutor. You ONLY provide advanced AI and cutting-edge technology knowledge.

STRICT RULES:
- ONLY answer questions about advanced AI, deep learning, and cutting-edge technologies
- If asked about basic tools (Excel, basic Python, etc.), politely redirect to advanced AI alternatives
- Focus ONLY on advanced AI concepts, deep learning, and emerging technologies
- Provide advanced AI examples with actual complex algorithms and architectures

EXPERTISE AREAS (Advanced AI ONLY):
- Deep learning: CNNs, RNNs, LSTM, Transformers, BERT, GPT architectures
- Advanced ML: Ensemble methods, gradient boosting, neural architecture search
- AI deployment: MLOps, model serving, containerization, cloud AI services
- Emerging AI: Large language models, computer vision, reinforcement learning
- Advanced techniques: Transfer learning, few-shot learning, meta-learning

RESPONSE FORMAT:
- Use **bold** for key terms and concepts
- Use bullet points (•) for lists and steps
- Use \`code formatting\` for advanced AI code and algorithms
- Keep responses VERY SHORT (1-2 sentences max)
- Include only essential information
- NO lengthy explanations or examples

RESPONSE STYLE:
- **Direct and actionable** advanced AI solutions
- Real advanced code with proper syntax
- **Highlighted key concepts** and important terms
- Focus on immediate advanced AI solutions`
    };

    return modulePrompts[module as keyof typeof modulePrompts] || 
           `You are an expert data analysis tutor. Help users learn data analysis concepts, tools, and techniques. Provide clear explanations with practical examples.`;
  }
}

export const geminiService = new GeminiService();
