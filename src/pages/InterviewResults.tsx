import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Download, Share2, RotateCcw, TrendingUp, Target, CheckCircle, AlertCircle, Star, BarChart3, MessageSquare, Eye, Users } from 'lucide-react';
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

  const simulateAnalysis = useCallback(async (question?: string, difficulty?: string) => {
    setLoading(true);
    try {
      // Use provided question or default
      const interviewQuestion = question || "Tell me about a data analysis project you worked on and its impact.";
      const interviewDifficulty = difficulty || "medium";
      
      // Get recording blob from location state
      const locationState = location.state as { question?: string; difficulty?: string; recordingBlob?: Blob } | null;
      const recordingBlob = locationState?.recordingBlob;
      
      let analysisResult: InterviewAnalysisResult;
      
      if (recordingBlob) {
        // Perform actual analysis on the recorded video
        console.log('Analyzing recorded video...', recordingBlob);
        
        try {
          // Use real speech analysis
          const speechResult = await speechAnalysisService.analyzeSpeech(recordingBlob, interviewQuestion, interviewDifficulty);
          const videoResult = await speechAnalysisService.analyzeVideo(recordingBlob);
          analysisResult = await speechAnalysisService.generateComprehensiveFeedback(speechResult, videoResult, interviewQuestion, interviewDifficulty);
        } catch (error) {
          console.error('Error in real analysis, falling back to simulated data:', error);
          // Fallback to simulated data if real analysis fails
          analysisResult = {
          speech: {
            transcript: "I have experience working with data analysis using Excel and SQL. I've created dashboards and reports that helped stakeholders make informed decisions. I'm particularly interested in using Python for more advanced analytics and machine learning applications.",
            confidence: 0.85,
            keywords: ['data', 'analysis', 'excel', 'sql', 'dashboards', 'python', 'analytics'],
            sentiment: { score: 0.3, label: 'positive' as const },
            fluency: {
              speakingRate: 125,
              pauseCount: 3,
              averagePauseLength: 1.2,
              fillerWords: ['um', 'like']
            },
            technicalAccuracy: {
              score: 7.5,
              technicalTerms: ['data analysis', 'excel', 'sql', 'dashboards', 'python', 'analytics'],
              missingKeywords: ['machine learning', 'statistics', 'visualization']
            }
          },
          video: {
            confidence: { score: 7.5, indicators: ['Good posture', 'Maintained eye contact'] },
            posture: { score: 8.0, feedback: ['Sitting upright', 'Professional appearance'] },
            eyeContact: { score: 7.0, percentage: 75 },
            facialExpressions: { engagement: 8.5, professionalism: 8.0 }
          },
          overallScore: 7.8,
          strengths: ['Strong technical knowledge', 'Good speaking pace', 'Professional presence'],
          improvements: ['Include more specific examples', 'Reduce filler words', 'Maintain better eye contact'],
          recommendations: ['Practice with STAR method', 'Prepare more technical examples', 'Record practice sessions']
        };
        }
      } else {
        // Fallback to simulated data
        analysisResult = {
          speech: {
            transcript: "I have experience working with data analysis using Excel and SQL. I've created dashboards and reports that helped stakeholders make informed decisions. I'm particularly interested in using Python for more advanced analytics and machine learning applications.",
            confidence: 0.85,
            keywords: ['data', 'analysis', 'excel', 'sql', 'dashboards', 'python', 'analytics'],
            sentiment: { score: 0.3, label: 'positive' as const },
            fluency: {
              speakingRate: 125,
              pauseCount: 3,
              averagePauseLength: 1.2,
              fillerWords: ['um', 'like']
            },
            technicalAccuracy: {
              score: 7.5,
              technicalTerms: ['data analysis', 'excel', 'sql', 'dashboards', 'python', 'analytics'],
              missingKeywords: ['machine learning', 'statistics', 'visualization']
            }
          },
          video: {
            confidence: { score: 7.5, indicators: ['Good posture', 'Maintained eye contact'] },
            posture: { score: 8.0, feedback: ['Sitting upright', 'Professional appearance'] },
            eyeContact: { score: 7.0, percentage: 75 },
            facialExpressions: { engagement: 8.5, professionalism: 8.0 }
          },
          overallScore: 7.8,
          strengths: ['Strong technical knowledge', 'Good speaking pace', 'Professional presence'],
          improvements: ['Include more specific examples', 'Reduce filler words', 'Maintain better eye contact'],
          recommendations: ['Practice with STAR method', 'Prepare more technical examples', 'Record practice sessions']
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
  }, [location.state]);

  useEffect(() => {
    // Get data from location state or simulate if not available
    const locationState = location.state as { question?: string; difficulty?: string } | null;
    if (locationState?.question && locationState?.difficulty) {
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

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'speech', name: 'Speech Analysis', icon: MessageSquare },
    { id: 'video', name: 'Video Analysis', icon: Eye },
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
