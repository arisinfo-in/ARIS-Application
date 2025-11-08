import { Request, Response } from 'express';


export async function generatePracticalQuestion(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { 
      prompt, 
      module, 
      difficulty
    } = req.body;

    if (!prompt || !module) {
      res.status(400).json({ error: 'Missing required fields: prompt and module' });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
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
      module,
      difficulty,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in generate-practical-question function:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

