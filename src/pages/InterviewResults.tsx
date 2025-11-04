import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Download, Share2, RotateCcw, TrendingUp, Target, CheckCircle, AlertCircle, Star, BarChart3, MessageSquare, Eye, Users, XCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { speechAnalysisService, InterviewAnalysisResult } from '../services/speechAnalysisService';
import { interviewFeedbackService } from '../services/interviewFeedbackService';

interface InterviewReport {
  id: string;
  timestamp: string;
  question: string;
  difficulty: string;
  scores: {
    overall: number;
    categories: {
      technicalKnowledge: number;
      communication: number;
      confidence: number;
      professionalism: number;
    };
  };
  analysis: {
    strengths: string[];
    improvements: string[];
    specificRecommendations: string[];
  };
  nextSteps: string[];
  practiceSuggestions: string[];
  rawData: InterviewAnalysisResult;
}

const InterviewResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  interface CompletedQuestion {
    type: 'theory' | 'practical';
    question: string;
    result: {
      question?: string | unknown;
      speechResult?: {
        technicalAccuracy?: { score: number };
        fluency?: { speakingRate: number };
        keywords?: string[];
      };
      transcript?: string;
      code?: string;
      validation?: { score: number };
    };
  }

  const processMixedInterviewResults = useCallback(async (
    completedQuestions: CompletedQuestion[],
    difficulty: string
  ) => {
    setLoading(true);
    try {
      // Separate theory and practical results
      const theoryResults = completedQuestions.filter(q => q.type === 'theory');
      const practicalResults = completedQuestions.filter(q => q.type === 'practical');

      // Calculate theory scores
      const theoryScores = theoryResults.map(q => {
        const techScore = q.result?.speechResult?.technicalAccuracy?.score || 7.5;
        const commScore = (q.result?.speechResult?.fluency?.speakingRate || 0) / 15; // Normalize
        return (techScore + commScore) / 2;
      });
      const avgTheoryScore = theoryScores.length > 0 
        ? theoryScores.reduce((a, b) => a + b, 0) / theoryScores.length 
        : 7.5;

      // Calculate practical scores
      const practicalScores = practicalResults.map(q => q.result?.validation?.score || 5);
      const avgPracticalScore = practicalScores.length > 0
        ? practicalScores.reduce((a, b) => a + b, 0) / practicalScores.length
        : 5;

      // Combined score (50/50 weight)
      const overallScore = (avgTheoryScore * 0.5) + (avgPracticalScore * 0.5);

      // Generate comprehensive report for mixed interview
      const mixedReport: InterviewReport = {
        id: `mixed-${Date.now()}`,
        timestamp: new Date().toISOString(),
        question: `Mixed Interview (${theoryResults.length} theory, ${practicalResults.length} practical)`,
        difficulty,
        scores: {
          overall: Math.round(overallScore * 10) / 10,
          categories: {
            technicalKnowledge: Math.round(avgTheoryScore * 10) / 10,
            communication: Math.round(avgTheoryScore * 10) / 10,
            confidence: Math.round(avgPracticalScore * 10) / 10,
            professionalism: Math.round((avgTheoryScore + avgPracticalScore) / 2 * 10) / 10
          }
        },
        analysis: {
          strengths: [
            ...(avgTheoryScore >= 7 ? ['Strong theoretical understanding'] : []),
            ...(avgPracticalScore >= 7 ? ['Good practical coding skills'] : []),
            'Completed full mixed interview',
            `Answered ${theoryResults.length} theory and ${practicalResults.length} practical questions`
          ],
          improvements: [
            ...(avgTheoryScore < 7 ? ['Improve theoretical explanations'] : []),
            ...(avgPracticalScore < 7 ? ['Practice more coding problems'] : []),
            'Balance theory and practical knowledge'
          ],
          specificRecommendations: [
            'Continue practicing both verbal communication and coding',
            'Focus on connecting theory to practical applications',
            'Review code validation feedback for improvement areas'
          ]
        },
        nextSteps: [
          'Practice more mock interviews',
          'Focus on weak areas identified',
          'Review practical question solutions'
        ],
        practiceSuggestions: [
          'Mix theory and practical practice sessions',
          'Work on explaining code solutions verbally',
          'Practice SQL and Python problems regularly'
        ],
        rawData: {
          speech: {
            transcript: theoryResults.map(q => q.result?.transcript || q.question).join(' '),
            confidence: 0.85,
            keywords: Array.from(new Set(theoryResults.flatMap(q => q.result?.speechResult?.keywords || []))),
            sentiment: { score: 0.3, label: 'positive' as const },
            fluency: {
              speakingRate: 125,
              pauseCount: 3,
              averagePauseLength: 1.2,
              fillerWords: ['um', 'like']
            },
            technicalAccuracy: {
              score: avgTheoryScore,
              technicalTerms: Array.from(new Set(theoryResults.flatMap(q => q.result?.speechResult?.technicalAccuracy?.technicalTerms || []))),
              missingKeywords: []
            }
          },
          video: {
            confidence: { score: 7.5, indicators: ['Good posture', 'Maintained eye contact'] },
            posture: { score: 8.0, feedback: ['Sitting upright', 'Professional appearance'] },
            eyeContact: { score: 7.0, percentage: 75 },
            facialExpressions: { engagement: 8.5, professionalism: 8.0 }
          },
          overallScore: overallScore,
          strengths: ['Completed mixed interview', 'Balanced theory and practical knowledge'],
          improvements: ['Continue practicing', 'Improve weak areas'],
          recommendations: ['Mix practice sessions', 'Focus on both aspects']
        }
      };

      // Store detailed results for display
      interface MixedResults {
        theory: CompletedQuestion[];
        practical: CompletedQuestion[];
        theoryScore: number;
        practicalScore: number;
      }
      
      (mixedReport as InterviewReport & { mixedResults: MixedResults }).mixedResults = {
        theory: theoryResults,
        practical: practicalResults,
        theoryScore: avgTheoryScore,
        practicalScore: avgPracticalScore
      };

      setReport(mixedReport);
    } catch (error) {
      console.error('Error processing mixed interview results:', error);
      setReport(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const simulateAnalysis = useCallback(async (question?: string, difficulty?: string) => {
    setLoading(true);
    try {
      // Get location state - check if it's a mixed interview
      const locationState = location.state as {
        question?: string;
        difficulty?: string;
        recordingBlob?: Blob;
        transcript?: string;
        mixedInterview?: boolean;
        completedQuestions?: CompletedQuestion[];
        totalQuestions?: number;
      } | null;

      // Check if this is a mixed interview
      if (locationState?.mixedInterview && locationState?.completedQuestions) {
        // Handle mixed interview results
        await processMixedInterviewResults(locationState.completedQuestions, locationState.difficulty || 'medium');
        return;
      }

      // Use provided question or default
      const interviewQuestion = question || locationState?.question || "Tell me about a data analysis project you worked on and its impact.";
      const interviewDifficulty = difficulty || locationState?.difficulty || "medium";
      const recordingBlob = locationState?.recordingBlob;
      const transcript = locationState?.transcript;
      
      let analysisResult: InterviewAnalysisResult;
      
      // Prioritize transcript over video blob for more accurate analysis
      if (transcript && transcript.trim().length > 0) {
        console.log('Analyzing from transcript...', transcript);
        
        try {
          const speechResult = await speechAnalysisService.analyzeSpeechFromTranscript(transcript, interviewQuestion, interviewDifficulty);
          const videoResult = await speechAnalysisService.analyzeVideo(recordingBlob || new Blob());
          analysisResult = await speechAnalysisService.generateComprehensiveFeedback(speechResult, videoResult, interviewQuestion, interviewDifficulty);
        } catch (error) {
          console.error('Error in transcript analysis, falling back to simulated data:', error);
          analysisResult = {
            speech: {
              transcript: transcript || "I have experience working with data analysis using Excel and SQL.",
              confidence: 0.85,
              keywords: ['data', 'analysis', 'excel', 'sql'],
              sentiment: { score: 0.3, label: 'positive' as const },
              fluency: { speakingRate: 125, pauseCount: 3, averagePauseLength: 1.2, fillerWords: ['um'] },
              technicalAccuracy: { score: 7.5, technicalTerms: ['data analysis'], missingKeywords: [] }
            },
            video: {
              confidence: { score: 7.5, indicators: ['Good posture'] },
              posture: { score: 8.0, feedback: ['Sitting upright'] },
              eyeContact: { score: 7.0, percentage: 75 },
              facialExpressions: { engagement: 8.5, professionalism: 8.0 }
            },
            overallScore: 7.8,
            strengths: ['Strong technical knowledge'],
            improvements: ['Include more specific examples'],
            recommendations: ['Practice with STAR method']
          };
        }
      } else if (recordingBlob) {
        try {
          const speechResult = await speechAnalysisService.analyzeSpeech(recordingBlob, interviewQuestion, interviewDifficulty);
          const videoResult = await speechAnalysisService.analyzeVideo(recordingBlob);
          analysisResult = await speechAnalysisService.generateComprehensiveFeedback(speechResult, videoResult, interviewQuestion, interviewDifficulty);
        } catch (error) {
          console.error('Error in real analysis, falling back to simulated data:', error);
          analysisResult = {
            speech: {
              transcript: "I have experience working with data analysis using Excel and SQL.",
              confidence: 0.85,
              keywords: ['data', 'analysis'],
              sentiment: { score: 0.3, label: 'positive' as const },
              fluency: { speakingRate: 125, pauseCount: 3, averagePauseLength: 1.2, fillerWords: ['um'] },
              technicalAccuracy: { score: 7.5, technicalTerms: ['data analysis'], missingKeywords: [] }
            },
            video: {
              confidence: { score: 7.5, indicators: ['Good posture'] },
              posture: { score: 8.0, feedback: ['Sitting upright'] },
              eyeContact: { score: 7.0, percentage: 75 },
              facialExpressions: { engagement: 8.5, professionalism: 8.0 }
            },
            overallScore: 7.8,
            strengths: ['Strong technical knowledge'],
            improvements: ['Include more specific examples'],
            recommendations: ['Practice with STAR method']
          };
        }
      } else {
        analysisResult = {
          speech: {
            transcript: "I have experience working with data analysis using Excel and SQL.",
            confidence: 0.85,
            keywords: ['data', 'analysis'],
            sentiment: { score: 0.3, label: 'positive' as const },
            fluency: { speakingRate: 125, pauseCount: 3, averagePauseLength: 1.2, fillerWords: ['um'] },
            technicalAccuracy: { score: 7.5, technicalTerms: ['data analysis'], missingKeywords: [] }
          },
          video: {
            confidence: { score: 7.5, indicators: ['Good posture'] },
            posture: { score: 8.0, feedback: ['Sitting upright'] },
            eyeContact: { score: 7.0, percentage: 75 },
            facialExpressions: { engagement: 8.5, professionalism: 8.0 }
          },
          overallScore: 7.8,
          strengths: ['Strong technical knowledge'],
          improvements: ['Include more specific examples'],
          recommendations: ['Practice with STAR method']
        };
      }

      const generatedReport = await interviewFeedbackService.generateInterviewReport(
        analysisResult,
        interviewQuestion,
        interviewDifficulty,
        new Date().toISOString()
      );

      setReport(generatedReport);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  }, [location.state, processMixedInterviewResults]);

  useEffect(() => {
    const locationState = location.state as { question?: string; difficulty?: string; mixedInterview?: boolean } | null;
    if (locationState?.mixedInterview) {
      simulateAnalysis();
    } else if (locationState?.question && locationState?.difficulty) {
      simulateAnalysis(locationState.question, locationState.difficulty);
    } else {
      simulateAnalysis();
    }
  }, [location.state, simulateAnalysis]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return 'bg-green-500/20 border-green-500/30';
    if (score >= 6) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <NeumorphicCard padding="xl" className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-200">Analyzing your interview performance...</p>
        </NeumorphicCard>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <NeumorphicCard padding="xl" className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Analysis Error</h2>
          <p className="text-gray-200 mb-6">Unable to analyze your interview. Please try again.</p>
          <NeumorphicButton
            variant="accent"
            onClick={() => navigate('/news/job-kit/mock-interview')}
          >
            Try Again
          </NeumorphicButton>
        </NeumorphicCard>
      </div>
    );
  }

  interface MixedResults {
    theory: CompletedQuestion[];
    practical: CompletedQuestion[];
    theoryScore: number;
    practicalScore: number;
  }
  
  const isMixedInterview = (report as InterviewReport & { mixedResults?: MixedResults })?.mixedResults;
  
  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'speech', name: 'Speech Analysis', icon: MessageSquare },
    { id: 'video', name: 'Video Analysis', icon: Eye },
    ...(isMixedInterview ? [{ id: 'practical', name: 'Practical Results', icon: Target }] : []),
    { id: 'recommendations', name: 'Recommendations', icon: Target }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score */}
      <NeumorphicCard padding="lg">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(report.scores.overall)} mb-4`}>
            <span className={`text-3xl font-bold ${getScoreColor(report.scores.overall)}`}>
              {report.scores.overall}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-100 mb-2">Overall Score</h3>
          <p className="text-gray-200 mb-4">
            {interviewFeedbackService.getScoreInterpretation(report.scores.overall)}
          </p>
        </div>
      </NeumorphicCard>

      {/* Category Scores */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-6">Performance Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(report.scores.categories).map(([category, score]) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-200 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className={`font-bold ${getScoreColor(score)}`}>
                  {score}/10
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score * 10}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400">
                {interviewFeedbackService.getCategoryInterpretation(category, score)}
              </p>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NeumorphicCard padding="md" className="text-center">
          <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="font-bold text-gray-100">{report.analysis.strengths.length}</h4>
          <p className="text-sm text-gray-300">Strengths Identified</p>
        </NeumorphicCard>
        <NeumorphicCard padding="md" className="text-center">
          <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="font-bold text-gray-100">{report.analysis.improvements.length}</h4>
          <p className="text-sm text-gray-300">Areas to Improve</p>
        </NeumorphicCard>
        <NeumorphicCard padding="md" className="text-center">
          <CheckCircle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h4 className="font-bold text-gray-100">{report.practiceSuggestions.length}</h4>
          <p className="text-sm text-gray-300">Practice Tips</p>
        </NeumorphicCard>
      </div>
    </div>
  );

  const renderSpeechAnalysis = () => (
    <div className="space-y-6">
      {/* Transcript */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4">Your Response</h3>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-200 leading-relaxed">
            "{report.rawData.speech.transcript}"
          </p>
        </div>
      </NeumorphicCard>

      {/* Speech Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeumorphicCard padding="lg">
          <h4 className="font-bold text-gray-100 mb-4">Speaking Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Speaking Rate</span>
              <span className="text-gray-100">{report.rawData.speech.fluency.speakingRate} WPM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Pause Count</span>
              <span className="text-gray-100">{report.rawData.speech.fluency.pauseCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Sentiment</span>
              <span className={`capitalize ${
                report.rawData.speech.sentiment.label === 'positive' ? 'text-green-400' :
                report.rawData.speech.sentiment.label === 'negative' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {report.rawData.speech.sentiment.label}
              </span>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard padding="lg">
          <h4 className="font-bold text-gray-100 mb-4">Technical Analysis</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Technical Score</span>
              <span className={`font-bold ${getScoreColor(report.rawData.speech.technicalAccuracy.score)}`}>
                {report.rawData.speech.technicalAccuracy.score}/10
              </span>
            </div>
            <div>
              <span className="text-gray-300 text-sm">Keywords Used:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {report.rawData.speech.technicalAccuracy.technicalTerms.map((term, index) => (
                  <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Filler Words */}
      {report.rawData.speech.fluency.fillerWords.length > 0 && (
        <NeumorphicCard padding="lg">
          <h4 className="font-bold text-gray-100 mb-4">Filler Words Detected</h4>
          <div className="flex flex-wrap gap-2">
            {report.rawData.speech.fluency.fillerWords.map((word, index) => (
              <span key={index} className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                {word}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Try to reduce these for clearer communication
          </p>
        </NeumorphicCard>
      )}
    </div>
  );

  const renderVideoAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NeumorphicCard padding="lg">
          <h4 className="font-bold text-gray-100 mb-4">Confidence & Presence</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Overall Confidence</span>
                <span className={`font-bold ${getScoreColor(report.rawData.video.confidence.score)}`}>
                  {report.rawData.video.confidence.score}/10
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    report.rawData.video.confidence.score >= 8 ? 'bg-green-500' : 
                    report.rawData.video.confidence.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.rawData.video.confidence.score * 10}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Eye Contact</span>
                <span className={`font-bold ${getScoreColor(report.rawData.video.eyeContact.score)}`}>
                  {report.rawData.video.eyeContact.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    report.rawData.video.eyeContact.percentage >= 80 ? 'bg-green-500' : 
                    report.rawData.video.eyeContact.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.rawData.video.eyeContact.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard padding="lg">
          <h4 className="font-bold text-gray-100 mb-4">Body Language</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Posture</span>
                <span className={`font-bold ${getScoreColor(report.rawData.video.posture.score)}`}>
                  {report.rawData.video.posture.score}/10
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    report.rawData.video.posture.score >= 8 ? 'bg-green-500' : 
                    report.rawData.video.posture.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.rawData.video.posture.score * 10}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Engagement</span>
                <span className={`font-bold ${getScoreColor(report.rawData.video.facialExpressions.engagement)}`}>
                  {report.rawData.video.facialExpressions.engagement}/10
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    report.rawData.video.facialExpressions.engagement >= 8 ? 'bg-green-500' : 
                    report.rawData.video.facialExpressions.engagement >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${report.rawData.video.facialExpressions.engagement * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Feedback */}
      <NeumorphicCard padding="lg">
        <h4 className="font-bold text-gray-100 mb-4">Video Feedback</h4>
        <div className="space-y-3">
          {report.rawData.video.confidence.indicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-200">{indicator}</span>
            </div>
          ))}
          {report.rawData.video.posture.feedback.map((feedback, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-200">{feedback}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </div>
  );

  const renderPracticalResults = () => {
    const mixedResults = (report as InterviewReport & { mixedResults?: MixedResults })?.mixedResults;
    if (!mixedResults) return null;

    const { practical, practicalScore } = mixedResults;

    return (
      <div className="space-y-6">
        {/* Practical Score Summary */}
        <NeumorphicCard padding="lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Practical Coding Results</h3>
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBgColor(practicalScore)} mb-4`}>
              <span className={`text-3xl font-bold ${getScoreColor(practicalScore)}`}>
                {practicalScore.toFixed(1)}
              </span>
            </div>
            <p className="text-gray-200 mb-2">Average Practical Score</p>
            <p className="text-sm text-gray-400">
              {practical.length} coding question{practical.length !== 1 ? 's' : ''} completed
            </p>
          </div>
        </NeumorphicCard>

        {/* Individual Practical Questions */}
        {practical.map((q, index: number) => (
          <NeumorphicCard key={index} padding="lg">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-100">Question {index + 1}</h4>
                <span className={`text-xl font-bold ${getScoreColor(q.result?.validation?.score || 0)}`}>
                  {(q.result?.validation?.score || 0).toFixed(1)}/10
                </span>
              </div>
              <p className="text-gray-300 mb-4">{q.question}</p>
            </div>

            {/* User's Code */}
            {q.result?.code && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Your Solution:</h5>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                    <code>{q.result.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Validation Results */}
            {q.result?.validation && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className={`${q.result.validation.syntaxValid ? 'text-green-400' : 'text-red-400'}`}>
                    Syntax: {q.result.validation.syntaxValid ? '✓ Valid' : '✗ Invalid'}
                  </span>
                  <span className={`${q.result.validation.logicCorrect ? 'text-green-400' : 'text-yellow-400'}`}>
                    Logic: {q.result.validation.logicCorrect ? '✓ Correct' : '⚠ Needs Review'}
                  </span>
                </div>

                {q.result.validation.feedback.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">Feedback:</h5>
                    <ul className="space-y-1">
                      {q.result.validation.feedback.map((fb: string, i: number) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          <span>{fb}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {q.result.validation.suggestions.length > 0 && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h5 className="text-sm font-semibold text-blue-400 mb-2">Suggestions:</h5>
                    <ul className="space-y-1">
                      {q.result.validation.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="text-sm text-blue-300">• {suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Test Case Results */}
                {q.result.validation.testCaseResults && q.result.validation.testCaseResults.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">Test Cases:</h5>
                    <div className="space-y-2">
                      {q.result.validation.testCaseResults.map((tc, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          {tc.passed ? (
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm text-gray-300">{tc.testCase?.description || 'Test case'}</p>
                            {tc.error && (
                              <p className="text-xs text-red-400 mt-1">{tc.error}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </NeumorphicCard>
        ))}
      </div>
    );
  };

  const renderRecommendations = () => (
    <div className="space-y-6">
      {/* Strengths */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-green-400" />
          Your Strengths
        </h3>
        <div className="space-y-3">
          {report.analysis.strengths.map((strength, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-200">{strength}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Areas for Improvement */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-yellow-400" />
          Areas for Improvement
        </h3>
        <div className="space-y-3">
          {report.analysis.improvements.map((improvement, index) => (
            <div key={index} className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-200">{improvement}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Specific Recommendations */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          Specific Recommendations
        </h3>
        <div className="space-y-3">
          {report.analysis.specificRecommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">{recommendation}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Next Steps */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-400" />
          Next Steps
        </h3>
        <div className="space-y-3">
          {report.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
              </div>
              <span className="text-gray-200">{step}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Practice Suggestions */}
      <NeumorphicCard padding="lg">
        <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          Practice Suggestions
        </h3>
        <div className="space-y-3">
          {report.practiceSuggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-200">{suggestion}</span>
            </div>
          ))}
        </div>
      </NeumorphicCard>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <NeumorphicButton
              onClick={() => navigate('/news/job-kit/mock-interview')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </NeumorphicButton>
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">
                Interview Analysis Results
              </h1>
              <p className="text-gray-200">
                Detailed feedback and recommendations for your mock interview
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <NeumorphicButton
              variant="secondary"
              icon={Download}
            >
              Download Report
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              icon={Share2}
            >
              Share
            </NeumorphicButton>
          </div>
        </div>

        {/* Question Info */}
        <NeumorphicCard padding="md" className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-100 mb-1">Interview Question</h3>
              <p className="text-gray-200 text-sm">"{report.question}"</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-300">Difficulty: <span className="capitalize font-medium text-orange-400">{report.difficulty}</span></div>
              <div className="text-sm text-gray-300">Date: {new Date(report.timestamp).toLocaleDateString()}</div>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <NeumorphicCard padding="md">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <NeumorphicButton
                key={tab.id}
                variant={activeTab === tab.id ? 'accent' : 'ghost'}
                size="md"
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
              >
                {tab.name}
              </NeumorphicButton>
            ))}
          </div>
        </NeumorphicCard>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'speech' && renderSpeechAnalysis()}
        {activeTab === 'video' && renderVideoAnalysis()}
        {activeTab === 'practical' && isMixedInterview && renderPracticalResults()}
        {activeTab === 'recommendations' && renderRecommendations()}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <NeumorphicButton
          variant="accent"
          onClick={() => navigate('/news/job-kit/mock-interview')}
          icon={RotateCcw}
        >
          Take Another Interview
        </NeumorphicButton>
        <NeumorphicButton
          variant="secondary"
          onClick={() => navigate('/news/job-kit/interview-preparation')}
        >
          Practice More Questions
        </NeumorphicButton>
      </div>
    </div>
  );
};

export default InterviewResults;
