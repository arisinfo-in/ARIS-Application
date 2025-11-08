import { FIREBASE_FUNCTIONS } from '../utils/firebaseFunctions';

interface SpeechAnalysisResult {
  transcript: string;
  confidence: number;
  keywords: string[];
  sentiment: {
    score: number; // -1 to 1
    label: 'positive' | 'negative' | 'neutral';
  };
  fluency: {
    speakingRate: number; // words per minute
    pauseCount: number;
    averagePauseLength: number;
    fillerWords: string[];
  };
  technicalAccuracy: {
    score: number; // 0-10
    technicalTerms: string[];
    missingKeywords: string[];
  };
}

interface VideoAnalysisResult {
  confidence: {
    score: number; // 0-10
    indicators: string[];
  };
  posture: {
    score: number; // 0-10
    feedback: string[];
  };
  eyeContact: {
    score: number; // 0-10
    percentage: number;
  };
  facialExpressions: {
    engagement: number; // 0-10
    professionalism: number; // 0-10
  };
}

export interface InterviewAnalysisResult {
  speech: SpeechAnalysisResult;
  video: VideoAnalysisResult;
  overallScore: number;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

class SpeechAnalysisService {
  private expectedKeywords: { [key: string]: string[] } = {
    'data analysis': ['data', 'analysis', 'insights', 'trends', 'patterns', 'visualization'],
    'excel': ['excel', 'pivot', 'vlookup', 'formulas', 'charts', 'functions'],
    'sql': ['sql', 'query', 'database', 'join', 'select', 'where', 'group by'],
    'python': ['python', 'pandas', 'numpy', 'dataframe', 'analysis', 'visualization'],
    'statistics': ['mean', 'median', 'mode', 'correlation', 'regression', 'hypothesis'],
    'machine learning': ['ml', 'algorithm', 'model', 'prediction', 'classification', 'clustering'],
    'communication': ['stakeholder', 'presentation', 'insights', 'business', 'decision', 'impact']
  };

  async analyzeSpeech(audioBlob: Blob, question: string, difficulty: string): Promise<SpeechAnalysisResult> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Starting speech analysis using Netlify Function...');
      }
      
      // Convert audio to base64 for transmission
      const audioData = await this.blobToBase64(audioBlob);
      
      const response = await fetch(FIREBASE_FUNCTIONS.speechAnalysis, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audioData,
          question,
          difficulty,
          module: 'general'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Speech analysis function error');
      }

      const data = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.log('Speech analysis completed:', data);
      }
      
      // Convert the response to match our interface
      return {
        transcript: data.transcription,
        confidence: data.confidence || 0.85,
        keywords: this.extractKeywords(data.transcription, question),
        sentiment: this.analyzeSentiment(data.transcription),
        fluency: this.analyzeFluency(data.transcription),
        technicalAccuracy: this.analyzeTechnicalAccuracy(data.transcription, question, difficulty)
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error analyzing speech:', error);
      }
      throw new Error('Failed to analyze speech');
    }
  }

  async analyzeSpeechFromTranscript(transcript: string, question: string, difficulty: string): Promise<SpeechAnalysisResult> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Analyzing speech from transcript...');
      }
      
      // Use the transcript directly for analysis
      return {
        transcript: transcript,
        confidence: 0.90, // Higher confidence since it's from Web Speech API
        keywords: this.extractKeywords(transcript, question),
        sentiment: this.analyzeSentiment(transcript),
        fluency: this.analyzeFluency(transcript),
        technicalAccuracy: this.analyzeTechnicalAccuracy(transcript, question, difficulty)
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error analyzing speech from transcript:', error);
      }
      throw new Error('Failed to analyze speech from transcript');
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private async speechToText(): Promise<string> {
    return new Promise((resolve) => {
      // Check if Web Speech API is available
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        // Fallback to simulated transcript if Web Speech API not available
        const simulatedTranscripts = [
          "I have experience working with data analysis using Excel and SQL. I've created dashboards and reports that helped stakeholders make informed decisions. I'm particularly interested in using Python for more advanced analytics and machine learning applications.",
          "In my previous role, I analyzed customer data to identify trends and patterns. I used pivot tables in Excel and wrote SQL queries to extract insights. The analysis led to a 15% increase in customer retention by identifying at-risk customers early.",
          "I'm passionate about data analysis because I love finding insights that drive business value. I have experience with Excel, SQL, and Python, and I'm always learning new tools and techniques to improve my analytical capabilities."
        ];
        
        setTimeout(() => {
          resolve(simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)]);
        }, 1000);
        return;
      }

      // Use Web Speech API for real-time transcription
      const SpeechRecognition = (window as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition || (window as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      let finalTranscript = '';
      let isProcessing = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        if (isProcessing) return; // Prevent duplicate processing
        isProcessing = true;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript.trim();
            if (transcript && !finalTranscript.includes(transcript)) {
              finalTranscript += (finalTranscript ? ' ' : '') + transcript;
            }
          }
        }
        isProcessing = false;
      };

      recognition.onend = () => {
        resolve(finalTranscript.trim() || 'No speech detected');
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Speech recognition error:', event.error);
        }
        // Fallback to simulated transcript on error
        const simulatedTranscripts = [
          "I have experience working with data analysis using Excel and SQL. I've created dashboards and reports that helped stakeholders make informed decisions.",
          "In my previous role, I analyzed customer data to identify trends and patterns using various analytical tools.",
          "I'm passionate about data analysis and have experience with multiple tools and techniques."
        ];
        resolve(simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)]);
      };

      // Start recognition
      recognition.start();
      
      // Stop recognition after 30 seconds to prevent hanging
      setTimeout(() => {
        if (recognition.state === 'started') {
          recognition.stop();
        }
      }, 30000);
    });
  }

  private extractKeywords(text: string, question?: string): string[] {
    const words = text.toLowerCase().split(/\s+/);
    const allKeywords = Object.values(this.expectedKeywords).flat();
    
    // Get question-specific keywords if question is provided
    const questionKeywords = question ? this.getQuestionKeywords(question, 'medium') : [];
    const relevantKeywords = questionKeywords.length > 0 ? questionKeywords : allKeywords;
    
    const foundKeywords = words.filter(word => 
      relevantKeywords.some(keyword => 
        word.includes(keyword.toLowerCase()) || 
        keyword.toLowerCase().includes(word) ||
        this.isSimilarWord(word, keyword.toLowerCase())
      )
    );
    
    return [...new Set(foundKeywords)]; // Remove duplicates
  }

  private isSimilarWord(word: string, keyword: string): boolean {
    // Check for common variations and abbreviations
    const variations: { [key: string]: string[] } = {
      'data': ['dataset', 'datasets', 'dataframe', 'dataframes'],
      'analysis': ['analyze', 'analyzing', 'analytics', 'analytical'],
      'excel': ['spreadsheet', 'workbook', 'xlsx'],
      'sql': ['database', 'query', 'queries', 'mysql', 'postgresql'],
      'python': ['pandas', 'numpy', 'jupyter', 'anaconda'],
      'dashboard': ['dashboards', 'visualization', 'visualizations'],
      'statistics': ['statistical', 'stats', 'stat'],
      'machine learning': ['ml', 'ai', 'artificial intelligence', 'algorithms'],
      'pivot': ['pivots', 'pivoting', 'pivot table', 'pivot tables'],
      'vlookup': ['lookup', 'lookups', 'vlookups']
    };

    for (const [key, variants] of Object.entries(variations)) {
      if (keyword.includes(key) && variants.some(variant => word.includes(variant))) {
        return true;
      }
      if (word.includes(key) && variants.some(variant => keyword.includes(variant))) {
        return true;
      }
    }

    return false;
  }

  private analyzeSentiment(text: string): { score: number; label: 'positive' | 'negative' | 'neutral' } {
    const positiveWords = ['excellent', 'great', 'successful', 'improved', 'increased', 'effective', 'passionate', 'love', 'excited'];
    const negativeWords = ['difficult', 'challenging', 'problem', 'issue', 'failed', 'decreased', 'poor', 'struggled'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    
    const score = (positiveCount - negativeCount) / Math.max(words.length, 1);
    
    if (score > 0.1) return { score, label: 'positive' };
    if (score < -0.1) return { score, label: 'negative' };
    return { score, label: 'neutral' };
  }

  private analyzeFluency(text: string): {
    speakingRate: number;
    pauseCount: number;
    averagePauseLength: number;
    fillerWords: string[];
  } {
    const words = text.split(/\s+/);
    const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'well', 'actually'];
    const foundFillers = words.filter(word => fillerWords.includes(word.toLowerCase()));
    
    // Simulate fluency analysis
    const speakingRate = words.length * 0.8; // Simulate words per minute
    const pauseCount = Math.floor(words.length / 20); // Simulate pauses
    const averagePauseLength = 1.5; // Simulate average pause length in seconds
    
    return {
      speakingRate,
      pauseCount,
      averagePauseLength,
      fillerWords: foundFillers
    };
  }

  private analyzeTechnicalAccuracy(
    transcript: string, 
    question: string, 
    difficulty: string
  ): {
    score: number;
    technicalTerms: string[];
    missingKeywords: string[];
  } {
    const questionKeywords = this.getQuestionKeywords(question, difficulty);
    const transcriptWords = transcript.toLowerCase().split(/\s+/);
    
    const technicalTerms = transcriptWords.filter(word => 
      questionKeywords.some(keyword => word.includes(keyword) || keyword.includes(word))
    );
    
    const missingKeywords = questionKeywords.filter(keyword =>
      !transcriptWords.some(word => word.includes(keyword) || keyword.includes(word))
    );
    
    const score = Math.min(10, (technicalTerms.length / questionKeywords.length) * 10);
    
    return {
      score: Math.round(score * 10) / 10,
      technicalTerms: [...new Set(technicalTerms)],
      missingKeywords
    };
  }

  private getQuestionKeywords(question: string, difficulty: string): string[] {
    const questionLower = question.toLowerCase();
    const keywords: string[] = [];
    
    // Add general data analysis keywords
    if (questionLower.includes('data') || questionLower.includes('analysis')) {
      keywords.push(...this.expectedKeywords['data analysis']);
    }
    
    // Add specific tool keywords based on question content
    Object.keys(this.expectedKeywords).forEach(category => {
      if (questionLower.includes(category)) {
        keywords.push(...this.expectedKeywords[category]);
      }
    });
    
    // Add difficulty-specific keywords
    if (difficulty === 'hard') {
      keywords.push('algorithm', 'model', 'prediction', 'optimization', 'scalability');
    } else if (difficulty === 'medium') {
      keywords.push('dashboard', 'visualization', 'insights', 'trends', 'patterns');
    }
    
    return [...new Set(keywords)];
  }

  async analyzeVideo(): Promise<VideoAnalysisResult> {
    // Simulate video analysis
    // In a real implementation, you would use:
    // 1. MediaPipe for pose detection
    // 2. TensorFlow.js for facial recognition
    // 3. OpenCV.js for image processing
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          confidence: {
            score: 7.5,
            indicators: ['Good posture', 'Maintained eye contact', 'Professional appearance']
          },
          posture: {
            score: 8.0,
            feedback: ['Sitting upright', 'Shoulders back', 'Good body language']
          },
          eyeContact: {
            score: 7.0,
            percentage: 75
          },
          facialExpressions: {
            engagement: 8.5,
            professionalism: 8.0
          }
        });
      }, 2000);
    });
  }

  async generateComprehensiveFeedback(
    speechResult: SpeechAnalysisResult,
    videoResult: VideoAnalysisResult,
    question: string,
    difficulty: string
  ): Promise<InterviewAnalysisResult> {
    const overallScore = this.calculateOverallScore(speechResult, videoResult);
    const strengths = this.identifyStrengths(speechResult, videoResult);
    const improvements = this.identifyImprovements(speechResult, videoResult);
    const recommendations = this.generateRecommendations(speechResult, videoResult, question, difficulty);

    return {
      speech: speechResult,
      video: videoResult,
      overallScore,
      strengths,
      improvements,
      recommendations
    };
  }

  private calculateOverallScore(speech: SpeechAnalysisResult, video: VideoAnalysisResult): number {
    const speechScore = (speech.technicalAccuracy.score + speech.fluency.speakingRate / 10) / 2;
    const videoScore = (video.confidence.score + video.posture.score + video.eyeContact.score) / 3;
    return Math.round(((speechScore + videoScore) / 2) * 10) / 10;
  }

  private identifyStrengths(speech: SpeechAnalysisResult, video: VideoAnalysisResult): string[] {
    const strengths: string[] = [];
    
    if (speech.technicalAccuracy.score >= 7) {
      strengths.push('Strong technical knowledge and terminology');
    }
    if (speech.fluency.speakingRate >= 120) {
      strengths.push('Good speaking pace and fluency');
    }
    if (speech.sentiment.score > 0.2) {
      strengths.push('Positive and enthusiastic tone');
    }
    if (video.posture.score >= 7) {
      strengths.push('Professional posture and body language');
    }
    if (video.eyeContact.percentage >= 70) {
      strengths.push('Good eye contact and engagement');
    }
    
    return strengths;
  }

  private identifyImprovements(speech: SpeechAnalysisResult, video: VideoAnalysisResult): string[] {
    const improvements: string[] = [];
    
    if (speech.technicalAccuracy.score < 6) {
      improvements.push('Include more technical terms and specific examples');
    }
    if (speech.fluency.fillerWords.length > 3) {
      improvements.push('Reduce filler words (um, uh, like) for better clarity');
    }
    if (speech.fluency.speakingRate < 100) {
      improvements.push('Speak at a slightly faster pace to maintain engagement');
    }
    if (video.eyeContact.percentage < 60) {
      improvements.push('Maintain more consistent eye contact with the camera');
    }
    if (video.confidence.score < 6) {
      improvements.push('Project more confidence through body language');
    }
    
    return improvements;
  }

  private generateRecommendations(
    speech: SpeechAnalysisResult,
    video: VideoAnalysisResult,
    question: string,
    difficulty: string
  ): string[] {
    const recommendations: string[] = [];
    
    // Technical recommendations
    if (speech.technicalAccuracy.missingKeywords.length > 0) {
      recommendations.push(`Consider mentioning: ${speech.technicalAccuracy.missingKeywords.slice(0, 3).join(', ')}`);
    }
    
    // Communication recommendations
    if (speech.fluency.pauseCount > 5) {
      recommendations.push('Practice speaking with fewer pauses for smoother delivery');
    }
    
    // Presentation recommendations
    if (video.facialExpressions.engagement < 7) {
      recommendations.push('Show more enthusiasm and engagement in your facial expressions');
    }
    
    // General recommendations based on difficulty
    if (difficulty === 'hard') {
      recommendations.push('Prepare more complex examples and case studies');
    } else if (difficulty === 'easy') {
      recommendations.push('Focus on clear, simple explanations with concrete examples');
    }
    
    return recommendations;
  }
}

export const speechAnalysisService = new SpeechAnalysisService();
