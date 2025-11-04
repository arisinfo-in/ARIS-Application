import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, VideoOff, Mic, Play, Square, RotateCcw, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import QuestionTypeBadge from '../components/QuestionTypeBadge';
import PracticalQuestionView from '../components/PracticalQuestionView';
import { speechAnalysisService } from '../services/speechAnalysisService';
import { practicalQuestionService, PracticalQuestion } from '../services/practicalQuestionService';
import { codeValidationService, CodeValidationResult } from '../services/codeValidationService';
import { theoryQuestionService } from '../services/theoryQuestionService';

const MockInterview: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>('medium');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  // Mixed interview state
  const [currentQuestionType, setCurrentQuestionType] = useState<'theory' | 'practical' | null>(null);
  const [currentPracticalQuestion, setCurrentPracticalQuestion] = useState<PracticalQuestion | null>(null);
  // Removed unused userCode state - code is managed in PracticalQuestionView
  const [codeValidationResult, setCodeValidationResult] = useState<CodeValidationResult | null>(null);
  const [isGeneratingPractical, setIsGeneratingPractical] = useState(false);
  const [isGeneratingTheory, setIsGeneratingTheory] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  interface CompletedQuestion {
    type: 'theory' | 'practical';
    question: string;
    result: {
      question?: string | PracticalQuestion;
      speechResult?: unknown;
      transcript?: string;
      code?: string;
      validation?: CodeValidationResult;
    };
  }
  
  const [completedQuestions, setCompletedQuestions] = useState<CompletedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(2); // 1 theory + 1 practical
  // Removed unused selectedModule state - module is detected dynamically

  const interviewQuestions = {
    easy: [
      "Tell me about yourself and why you want to become a data analyst.",
      "What is your experience with Excel?",
      "How do you handle missing data in a dataset?",
      "What is the difference between mean and median?",
      "Can you explain what a pivot table is?"
    ],
    medium: [
      "Describe a data analysis project you worked on and its impact.",
      "How would you approach cleaning a messy dataset?",
      "Explain the difference between correlation and causation.",
      "How do you ensure data quality in your analysis?",
      "What tools do you use for data visualization and why?"
    ],
    hard: [
      "Design a data pipeline for real-time customer analytics.",
      "How would you detect and handle outliers in a large dataset?",
      "Explain a complex SQL query you've written and its purpose.",
      "How do you approach A/B testing for a new feature?",
      "Describe a time when your analysis led to a significant business decision."
    ]
  };

  const levels = [
    { id: 'easy', name: 'Easy', description: 'Basic concepts and general questions' },
    { id: 'medium', name: 'Medium', description: 'Practical scenarios and tool knowledge' },
    { id: 'hard', name: 'Hard', description: 'Complex problems and advanced concepts' }
  ];

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const requestPermissions = async () => {
    try {
      // Just check permissions without starting camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      // Stop the stream immediately after permission check
      stream.getTracks().forEach(track => track.stop());
      
      setHasPermission(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startRecording = async () => {
    try {
      // Always get a fresh stream when starting recording
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Start live transcription
      startLiveTranscription();

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        console.log('Recording completed:', blob);
        setRecordedBlob(blob);
        setRecordingComplete(true);
        // Stop camera after recording
        stopCamera();
        // Stop live transcription
        stopLiveTranscription();
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setRecordingComplete(false);
    setRecordedBlob(null);
    setIsAnalyzing(false);
    setLiveTranscript('');
    setIsTranscribing(false);
    finalTranscriptRef.current = '';
    chunksRef.current = [];
    // Stop camera when resetting
    stopCamera();
    // Stop live transcription
    stopLiveTranscription();
  };

  const startLiveTranscription = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = (window as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition || (window as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    finalTranscriptRef.current = '';

    recognition.onstart = () => {
      setIsTranscribing(true);
      setLiveTranscript('');
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Update both state and ref
      const fullTranscript = finalTranscriptRef.current + interimTranscript;
      setLiveTranscript(fullTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsTranscribing(false);
    };

    recognition.onend = () => {
      setIsTranscribing(false);
      // Ensure final transcript is preserved
      if (finalTranscriptRef.current.trim().length > 0) {
        setLiveTranscript(finalTranscriptRef.current.trim());
      }
    };

    recognition.start();
  };

  const stopLiveTranscription = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Recognition already stopped');
      }
      recognitionRef.current = null;
    }
    setIsTranscribing(false);
    // Ensure final transcript is preserved in state
    if (finalTranscriptRef.current.trim().length > 0 && !liveTranscript.trim()) {
      setLiveTranscript(finalTranscriptRef.current.trim());
    }
  };

  const analyzeTheoryResponse = async () => {
    if (!recordedBlob || !currentQuestion) return;

    setIsAnalyzing(true);
    try {
      // Ensure we have the final transcript (use ref if state is empty)
      const finalTranscript = liveTranscript.trim() || finalTranscriptRef.current.trim();
      
      if (!finalTranscript) {
        alert('No transcript available. Please record your answer.');
        setIsAnalyzing(false);
        return;
      }

      // Analyze the theory response
      const speechResult = await speechAnalysisService.analyzeSpeechFromTranscript(
        finalTranscript,
        currentQuestion,
        selectedLevel
      );

      // Store theory question result
      const theoryResult = {
        question: currentQuestion,
        speechResult,
        transcript: finalTranscript
      };

      setCompletedQuestions(prev => [...prev, {
        type: 'theory',
        question: currentQuestion,
        result: theoryResult
      }]);

      // Extract technical terms for practical question generation
      const technicalTerms = speechResult.technicalAccuracy.technicalTerms || [];
      
      // Determine module from question context
      const detectedModule = detectModuleFromQuestion(currentQuestion, technicalTerms);

      // Generate practical question based on theory response
      setIsGeneratingPractical(true);
      try {
        const practicalQuestion = await practicalQuestionService.generatePracticalQuestion(
          currentQuestion,
          finalTranscript,
          detectedModule,
          selectedLevel,
          technicalTerms
        );

        setCurrentPracticalQuestion(practicalQuestion);
        setCurrentQuestionType('practical');
        setCurrentQuestionIndex(prev => prev + 1);
      } catch (error) {
        console.error('Error generating practical question:', error);
        // Fallback: continue to next theory question or end interview
        proceedToNextQuestion();
      } finally {
        setIsGeneratingPractical(false);
        setIsAnalyzing(false);
        resetRecording();
      }
    } catch (error) {
      console.error('Error analyzing theory response:', error);
      setIsAnalyzing(false);
      // Show user-friendly error
      alert('Error analyzing your response. Please try again.');
    }
  };

  const detectModuleFromQuestion = (question: string, technicalTerms: string[]): string => {
    const questionLower = question.toLowerCase();
    const termsLower = technicalTerms.join(' ').toLowerCase();

    // Check for Excel first (more specific)
    if (questionLower.includes('excel') || termsLower.includes('excel') || 
        termsLower.includes('pivot') || termsLower.includes('vlookup') ||
        termsLower.includes('formula') || questionLower.includes('spreadsheet')) {
      return 'excel';
    }
    
    // Check for Python
    if (questionLower.includes('python') || termsLower.includes('python') || 
        termsLower.includes('pandas') || termsLower.includes('dataframe') ||
        termsLower.includes('numpy') || termsLower.includes('matplotlib')) {
      return 'python';
    }
    
    // Check for SQL
    if (questionLower.includes('sql') || termsLower.includes('sql') || 
        termsLower.includes('query') || termsLower.includes('database') ||
        termsLower.includes('join') || termsLower.includes('select')) {
      return 'sql';
    }
    
    // Try to detect from technical terms more carefully
    if (technicalTerms.length > 0) {
      const allTerms = technicalTerms.join(' ').toLowerCase();
      if (allTerms.includes('excel') || allTerms.includes('pivot')) return 'excel';
      if (allTerms.includes('python') || allTerms.includes('pandas')) return 'python';
      if (allTerms.includes('sql') || allTerms.includes('query')) return 'sql';
    }
    
    // Default based on question context - don't default to SQL blindly
    // If no clear indication, we'll let the API decide or use a balanced approach
    return 'sql'; // Final fallback - but this should rarely happen
  };

  const handleCodeSubmit = async (code: string) => {
    if (!currentPracticalQuestion) return;

    setIsValidatingCode(true);
    try {
      const validationResult = await codeValidationService.validateCode(
        code,
        currentPracticalQuestion,
        currentPracticalQuestion.module
      );

      setCodeValidationResult(validationResult);
      setUserCode(code);

      // Store practical question result
      setCompletedQuestions(prev => [...prev, {
        type: 'practical',
        question: currentPracticalQuestion.question,
        result: {
          question: currentPracticalQuestion,
          code,
          validation: validationResult
        }
      }]);

      setCurrentQuestionIndex(prev => prev + 1);

      // Check if interview is complete
      if (currentQuestionIndex + 1 >= totalQuestions) {
        // Interview complete - navigate to results
        finishInterview();
      } else {
        // Continue to next question (theory)
        proceedToNextQuestion();
      }
    } catch (error) {
      console.error('Error validating code:', error);
      alert('Error validating code. Please try again.');
    } finally {
      setIsValidatingCode(false);
    }
  };

  const proceedToNextQuestion = async () => {
    // Reset for next question
    setCurrentQuestionType('theory');
    setCurrentPracticalQuestion(null);
    setCodeValidationResult(null);
    setUserCode('');
    resetRecording();
    
    // Generate next theory question dynamically (avoiding previous questions)
    const previousQuestions = completedQuestions
      .filter(q => q.type === 'theory')
      .map(q => q.question);
    
    setIsGeneratingTheory(true);
    try {
      const theoryQuestion = await theoryQuestionService.generateTheoryQuestion(
        selectedLevel as 'easy' | 'medium' | 'hard',
        previousQuestions
      );
      setCurrentQuestion(theoryQuestion.question);
    } catch (error) {
      console.error('Error generating theory question:', error);
      // Fallback to hardcoded questions
      const questions = interviewQuestions[selectedLevel as keyof typeof interviewQuestions];
      const availableQuestions = questions.filter(q => !previousQuestions.includes(q));
      const randomQuestion = availableQuestions.length > 0
        ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        : questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(randomQuestion);
    } finally {
      setIsGeneratingTheory(false);
    }
  };

  const finishInterview = () => {
    // Navigate to results with all completed questions
    navigate('/news/job-kit/interview-results', {
      state: {
        completedQuestions,
        difficulty: selectedLevel,
        totalQuestions,
        mixedInterview: true
      }
    });
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startInterview = async () => {
    setShowQuestion(true);
    setCurrentQuestionType('theory');
    setCurrentQuestionIndex(0);
    setCompletedQuestions([]);
    setTotalQuestions(2); // 1 theory + 1 practical
    
    // Generate first theory question dynamically
    setIsGeneratingTheory(true);
    try {
      const theoryQuestion = await theoryQuestionService.generateTheoryQuestion(
        selectedLevel as 'easy' | 'medium' | 'hard'
      );
      setCurrentQuestion(theoryQuestion.question);
    } catch (error) {
      console.error('Error generating theory question:', error);
      // Fallback to hardcoded questions
      const questions = interviewQuestions[selectedLevel as keyof typeof interviewQuestions];
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      setCurrentQuestion(randomQuestion);
    } finally {
      setIsGeneratingTheory(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasPermission === null) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <NeumorphicCard padding="xl" className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-200">Requesting camera and microphone permissions...</p>
        </NeumorphicCard>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <NeumorphicCard padding="xl" className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Permission Required</h2>
          <p className="text-gray-200 mb-6">
            Please allow camera and microphone access to use the mock interview feature.
          </p>
          <NeumorphicButton
            variant="accent"
            onClick={requestPermissions}
          >
            Grant Permissions
          </NeumorphicButton>
        </NeumorphicCard>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news/job-kit/interview-preparation')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Mock Interview
            </h1>
            <p className="text-gray-200">
              Practice your data analyst interview skills with AI-powered feedback
            </p>
          </div>
        </div>
      </div>

      {!showQuestion ? (
        /* Level Selection */
        <div className="space-y-6">
          <NeumorphicCard padding="lg">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Select Interview Difficulty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {levels.map((level) => (
                <NeumorphicCard
                  key={level.id}
                  padding="lg"
                  className={`cursor-pointer transition-all ${
                    selectedLevel === level.id
                      ? 'ring-2 ring-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/20'
                      : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedLevel(level.id)}
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedLevel === level.id 
                          ? 'bg-orange-500 border-orange-500' 
                          : 'border-gray-400'
                      }`}>
                        {selectedLevel === level.id && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      selectedLevel === level.id ? 'text-orange-400' : 'text-gray-100'
                    }`}>
                      {level.name}
                    </h3>
                    <p className="text-gray-300 text-sm">{level.description}</p>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <NeumorphicButton
                variant="accent"
                size="lg"
                onClick={startInterview}
                className="px-8 py-3"
              >
                Start Mock Interview
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>
      ) : (
        /* Interview Interface */
        <>
          {/* Progress Indicator */}
          <div className="mb-6">
            <NeumorphicCard padding="lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">Interview Progress</h3>
                  <p className="text-sm text-gray-300">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </p>
                </div>
                <div className="w-48 bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </NeumorphicCard>
          </div>

          {/* Practical Question View */}
          {currentQuestionType === 'practical' && currentPracticalQuestion ? (
            <div className="space-y-6">
              {isGeneratingPractical ? (
                <NeumorphicCard padding="xl" className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-200">Generating practical question based on your response...</p>
                  <p className="text-sm text-gray-400 mt-2">This may take a few seconds</p>
                </NeumorphicCard>
              ) : (
                <>
                  <PracticalQuestionView
                    question={currentPracticalQuestion}
                    onSubmit={handleCodeSubmit}
                    isSubmitting={isValidatingCode}
                    onCancel={() => {
                      if (confirm('Are you sure you want to skip this practical question?')) {
                        proceedToNextQuestion();
                      }
                    }}
                  />
                  
                  {/* Validation Results */}
                  {codeValidationResult && (
                    <NeumorphicCard padding="lg">
                      <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                        {codeValidationResult.logicCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-yellow-400" />
                        )}
                        Validation Results
                      </h3>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Score:</span>
                          <span className={`text-2xl font-bold ${
                            codeValidationResult.score >= 7 ? 'text-green-400' :
                            codeValidationResult.score >= 5 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {codeValidationResult.score.toFixed(1)}/10
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>Syntax: {codeValidationResult.syntaxValid ? '✓ Valid' : '✗ Invalid'}</span>
                          <span>Logic: {codeValidationResult.logicCorrect ? '✓ Correct' : '⚠ Needs Review'}</span>
                        </div>
                      </div>

                      {codeValidationResult.feedback.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-300 mb-2">Feedback:</h4>
                          <ul className="space-y-1">
                            {codeValidationResult.feedback.map((fb, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-orange-400 mt-1">•</span>
                                <span>{fb}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {codeValidationResult.suggestions.length > 0 && (
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">Suggestions:</h4>
                          <ul className="space-y-1">
                            {codeValidationResult.suggestions.map((suggestion, i) => (
                              <li key={i} className="text-sm text-blue-300">• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-4">
                        <NeumorphicButton
                          variant="accent"
                          onClick={() => {
                            if (currentQuestionIndex + 1 >= totalQuestions) {
                              finishInterview();
                            } else {
                              proceedToNextQuestion();
                            }
                          }}
                          className="w-full"
                        >
                          {currentQuestionIndex + 1 >= totalQuestions ? 'Finish Interview' : 'Continue to Next Question'}
                        </NeumorphicButton>
                      </div>
                    </NeumorphicCard>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Theory Question View */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Question Panel */}
              <div>
                <NeumorphicCard padding="lg" className="h-full">
                  <div className="mb-4">
                    <QuestionTypeBadge type="theory" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-100 mb-6">Interview Question</h2>
                  {isGeneratingTheory ? (
                    <div className="bg-gray-800/50 rounded-lg p-6 mb-6 text-center">
                      <Loader className="w-8 h-8 animate-spin text-orange-400 mx-auto mb-4" />
                      <p className="text-gray-200">Generating personalized question...</p>
                    </div>
                  ) : (
                    <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                      <p className="text-gray-200 text-lg leading-relaxed">
                        {currentQuestion || 'Loading question...'}
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Difficulty: {levels.find(l => l.id === selectedLevel)?.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Take your time to think before answering</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>After this, you'll get a practical coding question</span>
                    </div>
                  </div>
                </NeumorphicCard>
              </div>

          {/* Video Recording Panel */}
          <div>
            <NeumorphicCard padding="lg" className="h-full">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Record Your Answer</h2>
              
              {/* Video Preview */}
              <div className="relative bg-gray-900 rounded-lg mb-6 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 object-cover"
                  style={{ display: streamRef.current ? 'block' : 'none' }}
                />
                {!streamRef.current && (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-800">
                    <div className="text-center">
                      <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">Camera will start when you begin recording</p>
                    </div>
                  </div>
                )}
                {isRecording && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    REC
                  </div>
                )}
                {isRecording && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                    {formatTime(recordingTime)}
                  </div>
                )}
              </div>

              {/* Live Transcript */}
              {(isRecording || isTranscribing) && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-100 mb-3 flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    Live Transcript
                    {isTranscribing && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 min-h-[100px] max-h-[200px] overflow-y-auto">
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {liveTranscript || (isTranscribing ? 'Listening...' : 'Starting transcription...')}
                    </p>
                  </div>
                </div>
              )}

              {/* Recording Controls */}
              <div className="space-y-4">
                {!isRecording && !recordingComplete && (
                  <NeumorphicButton
                    variant="accent"
                    onClick={startRecording}
                    className="w-full"
                    icon={Video}
                  >
                    Start Recording
                  </NeumorphicButton>
                )}

                {isRecording && (
                  <div className="flex gap-3">
                    <NeumorphicButton
                      variant="secondary"
                      onClick={pauseRecording}
                      className="flex-1"
                      icon={isPaused ? Play : VideoOff}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </NeumorphicButton>
                    <NeumorphicButton
                      variant="accent"
                      onClick={stopRecording}
                      className="flex-1"
                      icon={Square}
                    >
                      Stop Recording
                    </NeumorphicButton>
                  </div>
                )}

                {recordingComplete && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Recording completed successfully!</span>
                    </div>
                    <div className="flex gap-3">
                      <NeumorphicButton
                        variant="secondary"
                        onClick={resetRecording}
                        className="flex-1"
                        icon={RotateCcw}
                      >
                        Record Again
                      </NeumorphicButton>
                      <NeumorphicButton
                        variant="accent"
                        onClick={analyzeTheoryResponse}
                        disabled={isAnalyzing || isGeneratingPractical}
                        className="flex-1"
                        icon={isAnalyzing || isGeneratingPractical ? Loader : CheckCircle}
                      >
                        {isAnalyzing ? 'Analyzing...' : isGeneratingPractical ? 'Generating Practical Question...' : 'Submit & Continue'}
                      </NeumorphicButton>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <NeumorphicButton
                    variant="ghost"
                    onClick={() => {
                      setShowQuestion(false);
                      resetRecording();
                    }}
                  >
                    Change Question
                  </NeumorphicButton>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </div>
          )}
        </>
      )}
    </div>
  );
};

export default MockInterview;

