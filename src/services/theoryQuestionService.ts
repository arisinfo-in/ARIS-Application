import { FIREBASE_FUNCTIONS } from '../utils/firebaseFunctions';

export interface TheoryQuestion {
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  topics?: string[];
}

class TheoryQuestionService {
  async generateTheoryQuestion(
    difficulty: 'easy' | 'medium' | 'hard',
    previousQuestions?: string[],
    focusArea?: string
  ): Promise<TheoryQuestion> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Generating theory question using Groq API...');
      }

      const response = await fetch(FIREBASE_FUNCTIONS.generateTheoryQuestion, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          difficulty,
          previousQuestions: previousQuestions || [],
          focusArea: focusArea || 'general'
        })
      });

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Firebase function failed, using fallback');
        }
        return this.getFallbackQuestion(difficulty);
      }

      const data = await response.json();
      const parsed = this.parseResponse(data.response || data);

      if (parsed) {
        return parsed;
      }

      return this.getFallbackQuestion(difficulty);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating theory question:', error);
      }
      return this.getFallbackQuestion(difficulty);
    }
  }

  private parseResponse(response: any): TheoryQuestion | null {
    try {
      let jsonStr = typeof response === 'string' ? response : JSON.stringify(response);
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      // Try to find JSON object
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        return {
          question: parsed.question || parsed.text || 'Tell me about your experience with data analysis.',
          difficulty: parsed.difficulty || 'medium',
          category: parsed.category,
          topics: Array.isArray(parsed.topics) ? parsed.topics : []
        };
      }

      // If response is just a string, use it as the question
      if (typeof response === 'string' && response.trim().length > 20) {
        return {
          question: response.trim(),
          difficulty: 'medium',
          category: 'general'
        };
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing AI response:', error);
      }
    }

    return null;
  }

  private getFallbackQuestion(difficulty: 'easy' | 'medium' | 'hard'): TheoryQuestion {
    const fallbackQuestions = {
      easy: [
        "Tell me about yourself and why you want to become a data analyst.",
        "What is your experience with Excel?",
        "How do you handle missing data in a dataset?",
        "What is the difference between mean and median?",
        "Can you explain what a pivot table is?",
        "What tools have you used for data analysis?",
        "How do you ensure data quality?"
      ],
      medium: [
        "Describe a data analysis project you worked on and its impact.",
        "How would you approach cleaning a messy dataset?",
        "Explain the difference between correlation and causation.",
        "How do you ensure data quality in your analysis?",
        "What tools do you use for data visualization and why?",
        "How do you handle large datasets?",
        "Explain how you would present findings to non-technical stakeholders."
      ],
      hard: [
        "Design a data pipeline for real-time customer analytics.",
        "How would you detect and handle outliers in a large dataset?",
        "Explain a complex SQL query you've written and its purpose.",
        "How do you approach A/B testing for a new feature?",
        "Describe a time when your analysis led to a significant business decision.",
        "How would you optimize a slow-running query?",
        "Explain your approach to handling imbalanced datasets in machine learning."
      ]
    };

    const questions = fallbackQuestions[difficulty];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

    return {
      question: randomQuestion,
      difficulty,
      category: 'general'
    };
  }
}

export const theoryQuestionService = new TheoryQuestionService();

