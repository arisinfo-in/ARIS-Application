import { geminiService } from './geminiService';

interface DynamicTestRequest {
  title: string;
  module: string;
  topics: string;
  difficulty: string;
  questionCount: number;
}

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}


export const dynamicTestService = {
  async generateTestQuestions(request: DynamicTestRequest): Promise<GeneratedQuestion[]> {
    const systemPrompt = this.createSystemPrompt(request);
    
    try {
      // Use the existing geminiService which is already working
      const aiResponse = await geminiService.generateDynamicTest(systemPrompt);
      return this.parseGeminiResponse(aiResponse);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating dynamic test:', error);
      }
      throw new Error('Failed to generate test questions');
    }
  },

  createSystemPrompt(request: DynamicTestRequest): string {
    if (process.env.NODE_ENV === 'development') {
      console.log('Creating system prompt with difficulty:', request.difficulty);
    }
    return `You are an expert ${request.module} tutor. Generate ${request.questionCount} multiple-choice questions for a test titled "${request.title}".

REQUIREMENTS:
- Module: ${request.module}
- Difficulty Level: ${request.difficulty}
- Topics to Cover: ${request.topics}
- Question Count: ${request.questionCount}

RESPONSE FORMAT (JSON):
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of the correct answer"
    }
  ]
}

GUIDELINES:
- Make questions practical and relevant to the specified topics
- Ensure correct answer is clearly the best option
- Provide detailed explanations
- Match the difficulty level specified:
  * BEGINNER: Basic concepts, simple questions, fundamental knowledge
  * INTERMEDIATE: Moderate complexity, some advanced concepts, practical applications
  * ADVANCED: Complex scenarios, expert-level knowledge, advanced techniques
- Cover the topics mentioned by the user
- Use real-world scenarios when possible
- Ensure all questions are factually accurate
- Make options plausible but only one correct answer
- Keep explanations educational and helpful`;
  },

  parseGeminiResponse(response: string): GeneratedQuestion[] {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response format: questions array not found');
      }
      
      // Validate each question has required fields
      const validatedQuestions = parsed.questions.map((q: GeneratedQuestion, index: number) => {
        if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Invalid question format at index ${index}`);
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Invalid correctAnswer at index ${index}`);
        }
        if (!q.explanation) {
          throw new Error(`Missing explanation at index ${index}`);
        }
        
        // Randomize the order of options
        const randomized = this.randomizeOptions(q.options.map((opt: string) => opt.trim()), q.correctAnswer);
        
        return {
          question: q.question.trim(),
          options: randomized.options,
          correctAnswer: randomized.correctAnswer,
          explanation: q.explanation.trim()
        };
      });
      
      return validatedQuestions;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing Gemini response:', error);
      }
      throw new Error('Invalid response format from AI');
    }
  },

  randomizeOptions(options: string[], correctAnswerIndex: number): { options: string[]; correctAnswer: number } {
    // Create an array of indices to shuffle
    const indices = [0, 1, 2, 3];
    
    // Fisher-Yates shuffle algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // Create new options array with shuffled order
    const shuffledOptions = indices.map(index => options[index]);
    
    // Find the new position of the correct answer
    const newCorrectAnswerIndex = indices.indexOf(correctAnswerIndex);
    
    return {
      options: shuffledOptions,
      correctAnswer: newCorrectAnswerIndex
    };
  }
};
