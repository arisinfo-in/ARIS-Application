import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Video, VideoOff, Mic, Play, Square, RotateCcw, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
// import { speechAnalysisService } from '../services/speechAnalysisService';

const MockInterview: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
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
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let finalTranscript = '';

    recognition.onstart = () => {
      setIsTranscribing(true);
      setLiveTranscript('');
      finalTranscript = '';
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      // Only show final transcript + current interim transcript
      setLiveTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsTranscribing(false);
    };

    recognition.onend = () => {
      setIsTranscribing(false);
    };

    recognition.start();
  };

  const stopLiveTranscription = () => {
    setIsTranscribing(false);
  };

  const analyzeRecording = async () => {
    if (!recordedBlob || !currentQuestion) return;

    setIsAnalyzing(true);
    try {
      // Simulate analysis process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to results page
      navigate('/news/job-kit/interview-results', {
        state: {
          question: currentQuestion,
          difficulty: selectedLevel,
          recordingBlob: recordedBlob
        }
      });
    } catch (error) {
      console.error('Error analyzing recording:', error);
      setIsAnalyzing(false);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startInterview = () => {
    const questions = interviewQuestions[selectedLevel as keyof typeof interviewQuestions];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setShowQuestion(true);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Question Panel */}
          <div>
            <NeumorphicCard padding="lg" className="h-full">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Interview Question</h2>
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <p className="text-gray-200 text-lg leading-relaxed">
                  {currentQuestion}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Difficulty: {levels.find(l => l.id === selectedLevel)?.name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Take your time to think before answering</span>
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
                        onClick={analyzeRecording}
                        disabled={isAnalyzing}
                        className="flex-1"
                        icon={isAnalyzing ? Loader : CheckCircle}
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Response'}
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
    </div>
  );
};

export default MockInterview;

