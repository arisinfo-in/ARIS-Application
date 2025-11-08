import { Request, Response } from 'express';


export async function validateCode(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { 
      code, 
      question, 
      module, 
      requirements = [], 
      testCases = [],
      scenario = ''
    } = req.body;

    if (!code || !question || !module) {
      res.status(400).json({ error: 'Missing required fields: code, question, and module' });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Create validation prompt
    const validationPrompt = createValidationPrompt(code, question, module, requirements, testCases, scenario);

    // Call Groq API for code validation
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
            content: `You are an expert code reviewer for ${module} programming. Analyze code submissions and provide detailed feedback. Return responses in JSON format.`
          },
          {
            role: "user",
            content: validationPrompt
          }
        ],
        temperature: 0.3,
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
    const validation = parseValidationResponse(aiResponse, testCases);

    res.status(200).json({ 
      validation,
      module,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in validate-code function:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function createValidationPrompt(code: string, question: string, module: string, requirements: string[], testCases: any[], scenario: string): string {
  return `Analyze this ${module} code submission for a coding interview.

QUESTION:
"${question}"

SCENARIO:
"${scenario}"

REQUIREMENTS:
${requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

USER'S CODE:
\`\`\`${module}
${code}
\`\`\`

TEST CASES:
${testCases.map((tc, i) => `${i + 1}. ${tc.description} - Expected: ${tc.expectedOutput}`).join('\n')}

TASK:
Analyze the code and provide feedback in JSON format:
{
  "syntaxValid": true/false,
  "logicCorrect": true/false,
  "score": 0-10,
  "feedback": ["feedback point 1", "feedback point 2"],
  "testCaseResults": [
    {
      "description": "test case description",
      "passed": true/false,
      "actualOutput": "what the code produces",
      "error": "error if any"
    }
  ],
  "suggestions": ["suggestion 1", "suggestion 2"]
}

FOCUS ON:
1. Syntax correctness
2. Logic correctness against requirements
3. Test case results
4. Code quality and best practices
5. Specific improvements needed
${module.toLowerCase() === 'excel' ? '\n6. For Excel: Evaluate formulas, approach, and step-by-step reasoning' : ''}

Return ONLY valid JSON, no markdown or code blocks.`;
}

function parseValidationResponse(response: string, testCases: any[]): any {
  try {
    // Extract JSON from response
    let jsonStr = response.trim();
    
    // Remove markdown code blocks if present
    jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    
    // Try to find JSON object
    const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      
      // Ensure testCaseResults match testCases
      const testCaseResults = testCases.map((tc, index) => {
        const result = parsed.testCaseResults?.[index] || {};
        return {
          description: tc.description,
          passed: result.passed === true,
          actualOutput: result.actualOutput,
          error: result.error
        };
      });
      
      return {
        syntaxValid: parsed.syntaxValid !== false,
        logicCorrect: parsed.logicCorrect === true,
        score: Math.min(10, Math.max(0, parsed.score || 0)),
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : [parsed.feedback || 'Code analyzed'],
        testCaseResults,
        suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : []
      };
    }
  } catch (error) {
    console.error('Error parsing validation response:', error);
  }

  // Fallback response
  return {
    syntaxValid: true,
    logicCorrect: false,
    score: 5,
    feedback: ['Code analysis completed. Please review manually.'],
    testCaseResults: testCases.map((tc: any) => ({
      description: tc.description,
      passed: false,
      error: 'Could not validate automatically'
    })),
    suggestions: ['Review the code against requirements', 'Test manually if possible']
  };
}

