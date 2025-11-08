import { Request, Response } from 'express';


export async function generateTheoryQuestion(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { difficulty, previousQuestions = [], focusArea = 'general' } = req.body;

    if (!difficulty) {
      res.status(400).json({ error: 'Missing required field: difficulty' });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Create prompt for theory question generation
    const prompt = createTheoryQuestionPrompt(difficulty, previousQuestions, focusArea);

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content: `You are an expert data analyst interview coach. Generate realistic interview questions that assess candidates' knowledge, experience, and problem-solving abilities. Return questions in JSON format.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_completion_tokens: 1024,
        top_p: 1,
        reasoning_effort: "medium",
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API Error:', errorText);
      
      if (response.status === 429) {
        res.status(429).json({ 
          error: 'API quota exceeded. Please try again later.' 
        });
        return;
      }
      
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

    const aiResponse = data.choices[0].message.content;

    res.status(200).json({ 
      response: aiResponse,
      difficulty,
      focusArea,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in generate-theory-question function:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function createTheoryQuestionPrompt(difficulty: string, previousQuestions: string[], focusArea: string): string {
  const difficultyGuidelines: Record<string, { description: string; examples: string }> = {
    easy: {
      description: 'Basic concepts, fundamental knowledge, general questions about experience',
      examples: 'Questions about Excel basics, basic statistics, general experience, tool familiarity'
    },
    medium: {
      description: 'Practical scenarios, tool knowledge, problem-solving approaches, real-world applications',
      examples: 'Questions about data cleaning, analysis projects, data quality, visualization tools'
    },
    hard: {
      description: 'Complex problems, advanced concepts, system design, optimization, strategic thinking',
      examples: 'Questions about data pipelines, advanced SQL, A/B testing, machine learning, business impact'
    }
  };

  const guidelines = difficultyGuidelines[difficulty.toLowerCase()] || difficultyGuidelines.medium;

  const prompt = `Generate a single data analyst interview question.

DIFFICULTY LEVEL: ${difficulty.toUpperCase()}
${guidelines.description}

FOCUS AREA: ${focusArea}

GUIDELINES:
- Make it realistic and commonly asked in real interviews
- Should assess ${difficulty} level knowledge
- Focus on: ${guidelines.examples}
- Be specific and actionable (not vague)
- Should allow for a 2-5 minute verbal response

${previousQuestions.length > 0 ? `PREVIOUS QUESTIONS (avoid similar topics):\n${previousQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nEnsure the new question covers different topics.` : ''}

RESPONSE FORMAT (JSON):
{
  "question": "The interview question text",
  "difficulty": "${difficulty}",
  "category": "communication|technical|analytical|behavioral",
  "topics": ["topic1", "topic2"]
}

IMPORTANT: Return ONLY valid JSON, no markdown or code blocks. Just return the JSON object.`;

  return prompt;
}

