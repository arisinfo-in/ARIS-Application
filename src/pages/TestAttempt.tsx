import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { firestoreOperations, Test, TestAttempt as TestAttemptType } from '../firebase/firestore';

const TestAttempt: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const loadTest = useCallback(async () => {
    if (!testId) return;
    
    setLoading(true);
    try {
      const testData = await firestoreOperations.getTest(testId);
      if (testData) {
        setTest(testData);
        setAnswers(new Array(testData.questions.length).fill(-1));
        setStartTime(new Date());
      } else {
        navigate('/tests');
      }
    } catch (error) {
      console.error('Error loading test:', error);
      navigate('/tests');
    } finally {
      setLoading(false);
    }
  }, [testId, navigate]);

  const calculateScore = useCallback((): number => {
    if (!test) return 0;
    
    let correct = 0;
    test.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / test.questions.length) * 100);
  }, [test, answers]);

  const handleSubmit = useCallback(async () => {
    if (!test || !user || submitting) return;

    setSubmitting(true);
    try {
      const score = calculateScore();
      const attempt: Omit<TestAttemptType, 'id'> = {
        testId: test.id,
        userId: user.uid,
        answers,
        score,
        startedAt: startTime!.toISOString(),
        finishedAt: new Date().toISOString()
      };

      await firestoreOperations.createTestAttempt(attempt);
      navigate(`/tests/${test.id}/results?score=${score}&total=${test.questions.length}`);
    } catch (error) {
      console.error('Error submitting test:', error);
    } finally {
      setSubmitting(false);
    }
  }, [test, user, submitting, answers, startTime, navigate, calculateScore]);

  useEffect(() => {
    if (testId) {
      loadTest();
    }
  }, [testId, loadTest]);

  useEffect(() => {
    if (test && startTime) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
        const totalTime = test.questions.length * 90; // 90 seconds per question
        const remaining = Math.max(0, totalTime - elapsed);
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          handleSubmit();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [test, startTime, handleSubmit]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < test!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-6">
        <NeumorphicCard padding="lg" className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Test Not Found</h2>
          <p className="text-gray-200 mb-6">The requested test could not be found.</p>
          <NeumorphicButton onClick={() => navigate('/tests')}>
            Back to Tests
          </NeumorphicButton>
        </NeumorphicCard>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-aris-gradient p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <NeumorphicCard padding="md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <NeumorphicButton
                  variant="ghost"
                  onClick={() => navigate('/tests')}
                  icon={ArrowLeft}
                  size="sm"
                >
                  Back
                </NeumorphicButton>
                <div>
                  <h1 className="text-2xl font-bold text-gray-100">{test.title}</h1>
                  <p className="text-base text-gray-200">Question {currentQuestion + 1} of {test.questions.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-base">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </NeumorphicCard>
        </div>

        {/* Question */}
        <NeumorphicCard padding="md" className="mb-4">
          <h2 className="text-xl font-bold text-gray-100 mb-4">{currentQ.question}</h2>
          
          <div className="space-y-2">
            {currentQ.options.map((option, index) => (
              <NeumorphicCard
                key={index}
                variant={answers[currentQuestion] === index ? "pressed" : "default"}
                padding="sm"
                className={`cursor-pointer transition-all duration-200 ${
                  answers[currentQuestion] === index 
                    ? 'bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
              >
                <div className="flex items-center gap-3">
                  {answers[currentQuestion] === index ? (
                    <CheckCircle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-base text-gray-100">{option}</span>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <NeumorphicButton
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            icon={ArrowLeft}
            size="sm"
          >
            Previous
          </NeumorphicButton>

          <div className="flex flex-wrap gap-2 justify-center max-w-md">
            {test.questions.map((_, index) => (
              <NeumorphicButton
                key={index}
                variant={index === currentQuestion ? "accent" : answers[index] !== -1 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="min-w-[32px] h-8"
              >
                {index + 1}
              </NeumorphicButton>
            ))}
          </div>

          {currentQuestion === test.questions.length - 1 ? (
            <NeumorphicButton
              variant="accent"
              onClick={handleSubmit}
              disabled={submitting}
              size="sm"
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </NeumorphicButton>
          ) : (
            <NeumorphicButton
              variant="accent"
              onClick={handleNext}
              icon={ArrowRight}
              size="sm"
            >
              Next
            </NeumorphicButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAttempt;
