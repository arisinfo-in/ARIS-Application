import { geminiService } from './geminiService';
import { InterviewAnalysisResult } from './speechAnalysisService';

interface DetailedFeedback {
  overallScore: number;
  categoryScores: {
    technicalKnowledge: number;
    communication: number;
    confidence: number;
    professionalism: number;
  };
  detailedAnalysis: {
    strengths: string[];
    improvements: string[];
    specificRecommendations: string[];
  };
  nextSteps: string[];
  practiceSuggestions: string[];
}

class InterviewFeedbackService {
  async generateDetailedFeedback(
    analysisResult: InterviewAnalysisResult,
    question: string,
    difficulty: string
  ): Promise<DetailedFeedback> {
    try {
      const prompt = this.createFeedbackPrompt(analysisResult, question, difficulty);
      const aiResponse = await geminiService.generateResponse(prompt, 'advanced');
      
      // Parse AI response and combine with analysis data
      const parsedFeedback = this.parseAIResponse(aiResponse);
      
      return {
        overallScore: analysisResult.overallScore,
        categoryScores: this.calculateCategoryScores(analysisResult),
        detailedAnalysis: {
          strengths: [...analysisResult.strengths, ...parsedFeedback.strengths],
          improvements: [...analysisResult.improvements, ...parsedFeedback.improvements],
          specificRecommendations: [...analysisResult.recommendations, ...parsedFeedback.recommendations]
        },
        nextSteps: parsedFeedback.nextSteps,
        practiceSuggestions: parsedFeedback.practiceSuggestions
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating detailed feedback:', error);
      }
      return this.getFallbackFeedback(analysisResult);
    }
  }

  private createFeedbackPrompt(
    analysisResult: InterviewAnalysisResult,
    question: string,
    difficulty: string
  ): string {
    return `
You are an expert data analyst interview coach. Analyze this mock interview performance and provide comprehensive feedback.

INTERVIEW DETAILS:
- Question: "${question}"
- Difficulty Level: ${difficulty}
- Overall Score: ${analysisResult.overallScore}/10

SPEECH ANALYSIS:
- Transcript: "${analysisResult.speech.transcript}"
- Technical Accuracy: ${analysisResult.speech.technicalAccuracy.score}/10
- Speaking Rate: ${analysisResult.speech.fluency.speakingRate} words/min
- Sentiment: ${analysisResult.speech.sentiment.label} (${analysisResult.speech.sentiment.score})
- Technical Terms Used: ${analysisResult.speech.technicalAccuracy.technicalTerms.join(', ')}
- Missing Keywords: ${analysisResult.speech.technicalAccuracy.missingKeywords.join(', ')}
- Filler Words: ${analysisResult.speech.fluency.fillerWords.join(', ')}

VIDEO ANALYSIS:
- Confidence Score: ${analysisResult.video.confidence.score}/10
- Posture Score: ${analysisResult.video.posture.score}/10
- Eye Contact: ${analysisResult.video.eyeContact.percentage}%
- Engagement: ${analysisResult.video.facialExpressions.engagement}/10
- Professionalism: ${analysisResult.video.facialExpressions.professionalism}/10

Please provide detailed feedback in the following JSON format:
{
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific area to improve 1", "specific area to improve 2"],
  "recommendations": ["specific recommendation 1", "specific recommendation 2"],
  "nextSteps": ["immediate action 1", "immediate action 2"],
  "practiceSuggestions": ["practice tip 1", "practice tip 2"]
}

Focus on:
1. Technical accuracy and knowledge demonstration
2. Communication clarity and structure
3. Confidence and professional presence
4. Specific, actionable advice for improvement
5. Industry-relevant examples and terminology
`;
  }

  private parseAIResponse(response: string): {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
    nextSteps: string[];
    practiceSuggestions: string[];
  } {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          strengths: parsed.strengths || [],
          improvements: parsed.improvements || [],
          recommendations: parsed.recommendations || [],
          nextSteps: parsed.nextSteps || [],
          practiceSuggestions: parsed.practiceSuggestions || []
        };
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing AI response:', error);
      }
    }

    // Fallback parsing
    return {
      strengths: this.extractListFromText(response, 'strengths'),
      improvements: this.extractListFromText(response, 'improvements'),
      recommendations: this.extractListFromText(response, 'recommendations'),
      nextSteps: this.extractListFromText(response, 'next steps'),
      practiceSuggestions: this.extractListFromText(response, 'practice')
    };
  }

  private extractListFromText(text: string, keyword: string): string[] {
    const lines = text.split('\n');
    const relevantLines = lines.filter(line => 
      line.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return relevantLines
      .map(line => line.replace(/^[-•*]\s*/, '').trim())
      .filter(line => line.length > 0)
      .slice(0, 5); // Limit to 5 items
  }

  private calculateCategoryScores(analysisResult: InterviewAnalysisResult) {
    return {
      technicalKnowledge: Math.round(analysisResult.speech.technicalAccuracy.score * 10) / 10,
      communication: Math.round(((analysisResult.speech.fluency.speakingRate / 150) * 10 + 
        (analysisResult.speech.sentiment.score + 1) * 5) / 2 * 10) / 10,
      confidence: Math.round(analysisResult.video.confidence.score * 10) / 10,
      professionalism: Math.round((analysisResult.video.posture.score + 
        analysisResult.video.facialExpressions.professionalism) / 2 * 10) / 10
    };
  }

  private getFallbackFeedback(analysisResult: InterviewAnalysisResult): DetailedFeedback {
    return {
      overallScore: analysisResult.overallScore,
      categoryScores: this.calculateCategoryScores(analysisResult),
      detailedAnalysis: {
        strengths: analysisResult.strengths,
        improvements: analysisResult.improvements,
        specificRecommendations: analysisResult.recommendations
      },
      nextSteps: [
        'Practice answering common data analyst questions',
        'Record yourself speaking to improve confidence',
        'Study technical concepts relevant to your target role'
      ],
      practiceSuggestions: [
        'Use the STAR method (Situation, Task, Action, Result) for behavioral questions',
        'Include specific metrics and numbers in your examples',
        'Practice explaining technical concepts to non-technical audiences'
      ]
    };
  }

  async generateInterviewReport(
    analysisResult: InterviewAnalysisResult,
    question: string,
    difficulty: string,
    timestamp: string
  ) {
    const detailedFeedback = await this.generateDetailedFeedback(analysisResult, question, difficulty);
    
    return {
      id: `interview_${Date.now()}`,
      timestamp,
      question,
      difficulty,
      scores: {
        overall: detailedFeedback.overallScore,
        categories: detailedFeedback.categoryScores
      },
      analysis: detailedFeedback.detailedAnalysis,
      nextSteps: detailedFeedback.nextSteps,
      practiceSuggestions: detailedFeedback.practiceSuggestions,
      rawData: analysisResult
    };
  }

  getScoreInterpretation(score: number): string {
    if (score >= 9) return 'Excellent - Interview ready!';
    if (score >= 8) return 'Very Good - Minor improvements needed';
    if (score >= 7) return 'Good - Some areas need work';
    if (score >= 6) return 'Fair - Significant improvement needed';
    if (score >= 5) return 'Below Average - Consider more practice';
    return 'Needs Improvement - Focus on fundamentals';
  }

  getCategoryInterpretation(category: string, score: number): string {
    const interpretations = {
      technicalKnowledge: {
        high: 'Strong technical foundation and terminology',
        medium: 'Good technical knowledge with room for improvement',
        low: 'Focus on strengthening technical concepts and examples'
      },
      communication: {
        high: 'Clear, engaging communication style',
        medium: 'Good communication with some areas to refine',
        low: 'Work on clarity, pace, and structure'
      },
      confidence: {
        high: 'Confident and professional presence',
        medium: 'Good confidence with room for growth',
        low: 'Build confidence through practice and preparation'
      },
      professionalism: {
        high: 'Excellent professional demeanor',
        medium: 'Good professionalism with minor improvements needed',
        low: 'Focus on professional presentation and body language'
      }
    };

    const level = score >= 8 ? 'high' : score >= 6 ? 'medium' : 'low';
    return interpretations[category as keyof typeof interpretations]?.[level] || 'Keep practicing!';
  }
}

export const interviewFeedbackService = new InterviewFeedbackService();
