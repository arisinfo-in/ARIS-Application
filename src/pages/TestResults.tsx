import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, Test } from '../firebase/firestore';

const TestResults: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '0');
  const correct = Math.round((score / 100) * total);

  const loadTest = useCallback(async () => {
    if (!testId) return;
    
    setLoading(true);
    try {
      const testData = await firestoreOperations.getTest(testId);
      if (testData) {
        setTest(testData);
      }
    } catch (error) {
      console.error('Error loading test:', error);
    } finally {
      setLoading(false);
    }
  }, [testId]);

  useEffect(() => {
    if (testId) {
      loadTest();
    }
  }, [testId, loadTest]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-orange-400 to-orange-500';
    if (score >= 60) return 'from-orange-300 to-orange-400';
    return 'from-orange-200 to-orange-300';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! You have excellent knowledge in this area.';
    if (score >= 80) return 'Great job! You have a solid understanding of this topic.';
    if (score >= 60) return 'Good work! Consider reviewing some areas for improvement.';
    if (score >= 40) return 'Keep studying! You\'re making progress but need more practice.';
    return 'Don\'t give up! Review the material and try again.';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aris-gradient p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <NeumorphicCard padding="md" className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full mx-auto mb-3">
              <Trophy className="w-8 h-8 text-gray-100" />
            </div>
            <h1 className="text-2xl font-bold text-gray-100 mb-2">Test Complete!</h1>
            <p className="text-gray-200">{test?.title || 'Practice Test'}</p>
          </NeumorphicCard>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <NeumorphicCard padding="md" className="text-center">
            <div className={`w-12 h-12 bg-gradient-to-br ${getScoreColor(score)} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <span className="text-lg font-bold text-gray-100">{score}%</span>
            </div>
            <h3 className="text-lg font-bold text-gray-100 mb-2">Overall Score</h3>
            <p className="text-sm text-gray-200">{getScoreMessage(score)}</p>
          </NeumorphicCard>

          <NeumorphicCard padding="md" className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-gray-100" />
            </div>
            <h3 className="text-lg font-bold text-gray-100 mb-2">Correct</h3>
            <p className="text-2xl font-bold text-gray-100">{correct}</p>
            <p className="text-sm text-gray-200">out of {total}</p>
          </NeumorphicCard>

          <NeumorphicCard padding="md" className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <XCircle className="w-6 h-6 text-gray-100" />
            </div>
            <h3 className="text-lg font-bold text-gray-100 mb-2">Incorrect</h3>
            <p className="text-2xl font-bold text-gray-100">{total - correct}</p>
            <p className="text-sm text-gray-200">to review</p>
          </NeumorphicCard>
        </div>

        {/* Performance Breakdown */}
        <NeumorphicCard padding="md" className="mb-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Performance Breakdown</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Accuracy</span>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getScoreColor(score)} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <span className="font-bold text-gray-100 text-sm">{score}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-100">Completion</span>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full w-full"></div>
                </div>
                <span className="font-bold text-gray-100 text-sm">100%</span>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        {/* Recommendations */}
        <NeumorphicCard padding="md" className="mb-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Recommendations</h2>
          
          <div className="space-y-3">
            {score >= 80 ? (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1 text-sm">Excellent Performance!</h3>
                  <p className="text-green-700 text-sm">You have a strong understanding of this topic. Consider exploring more advanced concepts or helping others learn.</p>
                </div>
              </div>
            ) : score >= 60 ? (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Good Progress</h3>
                  <p className="text-yellow-700 text-sm">You're on the right track! Review the questions you missed and practice similar concepts to improve further.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                <XCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1 text-sm">Keep Learning</h3>
                  <p className="text-red-700 text-sm">Don't be discouraged! Review the study materials, use the AI tutor, and try the test again when you're ready.</p>
                </div>
              </div>
            )}
          </div>
        </NeumorphicCard>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <NeumorphicButton
            variant="accent"
            size="md"
            onClick={() => navigate('/tests')}
            icon={Home}
          >
            Back to Tests
          </NeumorphicButton>
          
          {testId && (
            <NeumorphicButton
              variant="secondary"
              size="md"
              onClick={() => navigate(`/tests/${testId}/attempt`)}
              icon={RotateCcw}
            >
              Retake Test
            </NeumorphicButton>
          )}
          
          <NeumorphicButton
            variant="ghost"
            size="md"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </NeumorphicButton>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
