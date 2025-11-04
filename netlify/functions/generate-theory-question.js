const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { difficulty, previousQuestions = [], focusArea = 'general' } = JSON.parse(event.body);

    if (!difficulty) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required field: difficulty' })
      };
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
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
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ 
            error: 'API quota exceeded. Please try again later.' 
          })
        };
      }
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `API error: ${response.status} ${response.statusText}` 
        })
      };
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'No response generated from AI' })
      };
    }

    const aiResponse = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response: aiResponse,
        difficulty,
        focusArea,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in generate-theory-question function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

function createTheoryQuestionPrompt(difficulty, previousQuestions, focusArea) {
  const difficultyGuidelines = {
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

  let prompt = `Generate a single data analyst interview question.

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

