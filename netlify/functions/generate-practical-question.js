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
    const { 
      prompt, 
      module, 
      difficulty, 
      theoryQuestion, 
      userTranscript, 
      technicalTerms = [] 
    } = JSON.parse(event.body);

    if (!prompt || !module) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: prompt and module' })
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

    // Create system prompt for practical question generation
    const systemPrompt = `You are an expert data analyst interview coach. Generate practical coding questions in JSON format based on candidate responses.

CRITICAL: You MUST return ONLY valid JSON. No markdown, no code blocks, just pure JSON.`;

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
            content: systemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_completion_tokens: 2048,
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
        module,
        difficulty,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in generate-practical-question function:', error);
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

