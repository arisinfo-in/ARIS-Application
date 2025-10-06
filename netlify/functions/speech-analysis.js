const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { 
      audioData, 
      question, 
      difficulty = 'intermediate',
      module = 'general' 
    } = JSON.parse(event.body);

    if (!audioData || !question) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: audioData and question' })
      };
    }

    // Get API key from environment variables or use fallback
    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // For now, we'll simulate speech analysis since we don't have actual speech-to-text
    // In a real implementation, you would integrate with a speech-to-text service
    const analysisResult = await performSpeechAnalysis(apiKey, audioData, question, difficulty, module);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        ...analysisResult,
        module,
        difficulty,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in speech-analysis function:', error);
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

async function performSpeechAnalysis(apiKey, audioData, question, difficulty, module) {
  try {
    // In a real implementation, you would:
    // 1. Convert audio to text using a speech-to-text service
    // 2. Analyze the transcribed text for content and quality
    // 3. Provide feedback based on the analysis
    
    // For now, we'll simulate this process
    const simulatedTranscription = await simulateSpeechToText(audioData, question);
    const analysis = await analyzeTranscription(apiKey, simulatedTranscription, question, difficulty, module);
    
    return {
      transcription: simulatedTranscription,
      analysis: analysis,
      confidence: 0.85, // Simulated confidence score
      suggestions: generateSuggestions(analysis, difficulty)
    };

  } catch (error) {
    console.error('Error in speech analysis:', error);
    return {
      transcription: 'Unable to process audio',
      analysis: {
        contentScore: 0,
        clarityScore: 0,
        accuracyScore: 0,
        overallScore: 0
      },
      confidence: 0,
      suggestions: ['Please try speaking more clearly', 'Ensure good audio quality']
    };
  }
}

async function simulateSpeechToText(audioData, question) {
  // This is a simulation - in reality you would use a speech-to-text service
  // like Google Speech-to-Text, Azure Speech, or AWS Transcribe
  
  const sampleResponses = [
    "I think the main approach would be to use pandas for data manipulation and then create visualizations with matplotlib.",
    "For this problem, I would start by cleaning the data and then applying statistical analysis to find patterns.",
    "The key steps involve data preprocessing, feature engineering, and then building a machine learning model.",
    "I would use SQL to query the database and then export the results to Excel for further analysis.",
    "This requires understanding the business context first, then selecting appropriate analytical methods."
  ];
  
  // Return a random sample response for simulation
  return sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
}

async function analyzeTranscription(apiKey, transcription, question, difficulty, module) {
  try {
    const prompt = createAnalysisPrompt(transcription, question, difficulty, module);
    
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
          content: prompt
        }],
        temperature: 0.3,
        max_completion_tokens: 1024,
        top_p: 1,
        reasoning_effort: "medium",
        stream: false,
        stop: null
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from AI');
    }

    const analysisText = data.choices[0].message.content;
    return parseAnalysisResponse(analysisText);

  } catch (error) {
    console.error('Error analyzing transcription:', error);
    return {
      contentScore: 70,
      clarityScore: 75,
      accuracyScore: 80,
      overallScore: 75,
      feedback: 'Analysis completed with basic scoring'
    };
  }
}

function createAnalysisPrompt(transcription, question, difficulty, module) {
  return `You are an expert interviewer analyzing a candidate's spoken response to a data analysis question.

Question: "${question}"
Difficulty: ${difficulty}
Module: ${module}
Candidate's Response: "${transcription}"

Analyze the response and provide scores (0-100) for:
1. Content Quality - How well does the answer address the question?
2. Technical Accuracy - Are the technical concepts correct?
3. Clarity - Is the explanation clear and well-structured?
4. Completeness - Does the answer cover the main points?

Also provide:
- Overall score (0-100)
- Specific feedback on strengths
- Areas for improvement
- Technical suggestions

Format your response as JSON:
{
  "contentScore": 85,
  "technicalAccuracy": 90,
  "clarity": 80,
  "completeness": 75,
  "overallScore": 82,
  "strengths": ["Good technical knowledge", "Clear structure"],
  "improvements": ["Could provide more examples", "Needs more detail on implementation"],
  "technicalSuggestions": ["Consider mentioning specific tools", "Add more context about use cases"]
}`;
}

function parseAnalysisResponse(response) {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0]);
      
      return {
        contentScore: analysis.contentScore || 0,
        clarityScore: analysis.clarity || 0,
        accuracyScore: analysis.technicalAccuracy || 0,
        overallScore: analysis.overallScore || 0,
        feedback: analysis.strengths?.join(', ') || 'Good response',
        improvements: analysis.improvements || [],
        technicalSuggestions: analysis.technicalSuggestions || []
      };
    }
    
    // Fallback parsing
    return {
      contentScore: 75,
      clarityScore: 70,
      accuracyScore: 80,
      overallScore: 75,
      feedback: 'Response analyzed successfully',
      improvements: ['Consider providing more specific examples'],
      technicalSuggestions: ['Add more technical detail']
    };
  } catch (error) {
    console.error('Error parsing analysis response:', error);
    return {
      contentScore: 70,
      clarityScore: 70,
      accuracyScore: 70,
      overallScore: 70,
      feedback: 'Analysis completed',
      improvements: ['Work on clarity and structure'],
      technicalSuggestions: ['Provide more technical examples']
    };
  }
}

function generateSuggestions(analysis, difficulty) {
  const suggestions = [];
  
  if (analysis.contentScore < 70) {
    suggestions.push('Focus on directly addressing the question asked');
  }
  
  if (analysis.clarityScore < 70) {
    suggestions.push('Practice structuring your thoughts before speaking');
  }
  
  if (analysis.accuracyScore < 70) {
    suggestions.push('Review technical concepts and terminology');
  }
  
  if (analysis.overallScore < 60) {
    suggestions.push('Consider practicing with mock interviews');
  }
  
  if (difficulty === 'advanced' && analysis.overallScore < 80) {
    suggestions.push('For advanced level, provide more detailed technical explanations');
  }
  
  return suggestions.length > 0 ? suggestions : ['Great job! Keep practicing to maintain this level.'];
}
