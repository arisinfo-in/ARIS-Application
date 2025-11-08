import { Request, Response } from 'express';


export async function generateTest(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { 
      module, 
      difficulty = 'intermediate', 
      questionCount = 5, 
      topics = [] 
    } = req.body;

    if (!module) {
      res.status(400).json({ error: 'Missing required field: module' });
      return;
    }

    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Create system prompt for test generation
    const systemPrompt = createTestSystemPrompt(module, difficulty, questionCount, topics);

    // Call Groq API
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
        temperature: 0.7,
        max_completion_tokens: 8192,
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
        res.status(429).json({ 
          error: `API quota exceeded. Please try again in ${retryAfter} or upgrade your API plan.` 
        });
        return;
      }
      
      console.error('Groq API Error:', errorText);
      res.status(response.status).json({ 
        error: `API error: ${response.status} ${response.statusText}` 
      });
      return;
    }

    const data = await response.json() as any;
    
    if (!data.choices || data.choices.length === 0) {
      res.status(500).json({ error: 'No response generated from AI' });
      return;
    }

    // Parse the AI response to extract questions
    const questions = parseTestResponse(data.choices[0].message.content);

    res.status(200).json({ 
      questions,
      module,
      difficulty,
      questionCount,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in generate-test function:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function createTestSystemPrompt(module: string, difficulty: string, questionCount: number, topics: string[]): string {
  const moduleInfo = getModuleInfo(module);
  const topicContext = topics.length > 0 ? `Focus on these specific topics: ${topics.join(', ')}` : '';
  
  return `You are an expert test generator for ${moduleInfo.name}. Create ${questionCount} multiple-choice questions at ${difficulty} difficulty level.

${topicContext}

For each question, provide:
1. A clear, well-written question
2. Four answer options (A, B, C, D)
3. The correct answer (1-4)
4. A detailed explanation

Format your response as a JSON array with this exact structure:
[
  {
    "id": "q1",
    "question": "Your question here?",
    "options": [
      "Option A",
      "Option B", 
      "Option C",
      "Option D"
    ],
    "correctAnswer": 1,
    "explanation": "Detailed explanation of why this is correct"
  }
]

Requirements:
- Questions should test practical ${moduleInfo.name} knowledge
- Difficulty: ${difficulty} (${getDifficultyDescription(difficulty)})
- Each question should be unique and valuable
- Explanations should be educational and clear
- Use proper ${moduleInfo.name} terminology
- Include real-world scenarios when possible

${moduleInfo.focusAreas}

Generate exactly ${questionCount} questions.`;
}

function getModuleInfo(module: string) {
  const modules: Record<string, { name: string; focusAreas: string }> = {
    excel: {
      name: 'Microsoft Excel',
      focusAreas: 'Focus on: Formulas, functions, pivot tables, data analysis, charts, conditional formatting, Power Query, VBA basics'
    },
    powerbi: {
      name: 'Microsoft Power BI',
      focusAreas: 'Focus on: DAX formulas, data modeling, relationships, measures, Power Query, visualizations, Power BI Service'
    },
    sql: {
      name: 'SQL and Databases',
      focusAreas: 'Focus on: SELECT queries, JOINs, WHERE clauses, GROUP BY, HAVING, ORDER BY, functions, database design'
    },
    python: {
      name: 'Python Programming',
      focusAreas: 'Focus on: Python syntax, data libraries (pandas, numpy), data visualization, data analysis, programming concepts'
    },
    statistics: {
      name: 'Statistics',
      focusAreas: 'Focus on: Descriptive statistics, inferential statistics, probability, hypothesis testing, regression analysis'
    },
    ml: {
      name: 'Machine Learning',
      focusAreas: 'Focus on: Supervised/unsupervised learning, algorithms, model evaluation, feature engineering, ML libraries'
    },
    prompt: {
      name: 'Prompt Engineering',
      focusAreas: 'Focus on: Prompt design, AI interaction, prompt optimization, few-shot learning, chain-of-thought'
    },
    advanced: {
      name: 'Advanced AI',
      focusAreas: 'Focus on: Deep learning, neural networks, transformers, MLOps, advanced AI techniques'
    }
  };

  return modules[module] || {
    name: 'Data Analysis',
    focusAreas: 'Focus on: General data analysis concepts, tools, and techniques'
  };
}

function getDifficultyDescription(difficulty: string): string {
  const descriptions: Record<string, string> = {
    beginner: 'Basic concepts, simple applications, foundational knowledge',
    intermediate: 'Moderate complexity, practical applications, some advanced concepts',
    advanced: 'Complex scenarios, advanced techniques, expert-level knowledge'
  };
  return descriptions[difficulty] || descriptions.intermediate;
}

function parseTestResponse(response: string): any[] {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const questions = JSON.parse(jsonMatch[0]);
      
      // Validate and clean up questions
      return questions.map((q: any, index: number) => ({
        id: q.id || `q${index + 1}`,
        question: q.question || 'Question not available',
        options: Array.isArray(q.options) && q.options.length === 4 ? q.options : [
          'Option A', 'Option B', 'Option C', 'Option D'
        ],
        correctAnswer: (q.correctAnswer >= 1 && q.correctAnswer <= 4) ? q.correctAnswer : 1,
        explanation: q.explanation || 'Explanation not available'
      }));
    }
    
    // Fallback: create mock questions if parsing fails
    return createMockQuestions();
  } catch (error) {
    console.error('Error parsing test response:', error);
    return createMockQuestions();
  }
}

function createMockQuestions(): any[] {
  return [
    {
      id: 'q1',
      question: 'What is the primary purpose of data analysis?',
      options: [
        'To make data look pretty',
        'To extract insights and make informed decisions',
        'To store large amounts of data',
        'To create complex algorithms'
      ],
      correctAnswer: 2,
      explanation: 'Data analysis is primarily used to extract meaningful insights from data to support decision-making processes.'
    },
    {
      id: 'q2',
      question: 'Which of the following is NOT a step in the data analysis process?',
      options: [
        'Data collection',
        'Data cleaning',
        'Data visualization',
        'Data deletion'
      ],
      correctAnswer: 4,
      explanation: 'Data deletion is not a standard step in data analysis. The typical process includes collection, cleaning, analysis, and visualization.'
    }
  ];
}

