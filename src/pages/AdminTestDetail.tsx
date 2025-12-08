import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User, BookOpen, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, Test } from '../firebase/firestore';
import { format } from 'date-fns';

const AdminTestDetail: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'questions'>('details');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (testId) {
      loadTest();
    }
  }, [testId]);

  const loadTest = async () => {
    if (!testId) return;
    
    setLoading(true);
    try {
      const testData = await firestoreOperations.getTest(testId);
      if (testData) {
        setTest(testData);
      } else {
        // Test not found, redirect back
        navigate('/admin/tests');
      }
    } catch (error) {
      console.error('Error loading test:', error);
      navigate('/admin/tests');
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    if (!test) return;
    const allIds = new Set(test.questions.map(q => q.id || `q-${test.questions.indexOf(q)}`));
    setExpandedQuestions(allIds);
  };

  const collapseAll = () => {
    setExpandedQuestions(new Set());
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <NeumorphicCard padding="lg" className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Test Not Found</h2>
          <p className="text-gray-200 mb-6">The requested test could not be found.</p>
          <NeumorphicButton onClick={() => navigate('/admin/tests')}>
            Back to Tests
          </NeumorphicButton>
        </NeumorphicCard>
      </div>
    );
  }

  const renderDetailsTab = () => (
    <div className="space-y-4">
      {/* Title */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Title</p>
            <p className="text-gray-100 font-medium text-lg">{test.title || 'N/A'}</p>
          </div>
        </div>
      </NeumorphicCard>

      {/* Module */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Module</p>
            <span className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600">
              {test.module || 'N/A'}
            </span>
          </div>
        </div>
      </NeumorphicCard>

      {/* Created Date */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Created Date</p>
            <p className="text-gray-100 font-medium">
              {format(new Date(test.createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </NeumorphicCard>

      {/* Created By */}
      {test.createdBy && (
        <NeumorphicCard padding="lg">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-orange-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Created By</p>
              <p className="text-gray-100 font-medium">{test.createdBy}</p>
            </div>
          </div>
        </NeumorphicCard>
      )}

      {/* Test Type */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Test Type</p>
            <div className="flex gap-2 flex-wrap">
              {test.isDefault && (
                <span className="px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
                  Default
                </span>
              )}
              {test.isCustom && (
                <span className="px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600">
                  Custom
                </span>
              )}
              {test.isDynamic && (
                <span className="px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-600">
                  Dynamic
                </span>
              )}
            </div>
          </div>
        </div>
      </NeumorphicCard>

      {/* Topics */}
      {test.topics && (
        <NeumorphicCard padding="lg">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-orange-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Topics</p>
              <p className="text-gray-100 font-medium">{test.topics}</p>
            </div>
          </div>
        </NeumorphicCard>
      )}

      {/* Number of Questions */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Total Questions</p>
            <p className="text-gray-100 font-medium text-lg">{test.questions?.length || 0}</p>
          </div>
        </div>
      </NeumorphicCard>

      {/* Test ID */}
      <NeumorphicCard padding="lg">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-orange-400 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-400 mb-1">Test ID</p>
            <p className="text-gray-300 text-xs font-mono break-all">{test.id}</p>
          </div>
        </div>
      </NeumorphicCard>
    </div>
  );

  const renderQuestionsTab = () => {
    if (!test.questions || test.questions.length === 0) {
      return (
        <NeumorphicCard padding="lg" className="text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">No questions found in this test.</p>
        </NeumorphicCard>
      );
    }

    return (
      <div className="space-y-4">
        {/* Expand/Collapse All Buttons */}
        <div className="flex gap-2 justify-end mb-4">
          <NeumorphicButton
            variant="ghost"
            size="sm"
            onClick={expandAll}
          >
            Expand All
          </NeumorphicButton>
          <NeumorphicButton
            variant="ghost"
            size="sm"
            onClick={collapseAll}
          >
            Collapse All
          </NeumorphicButton>
        </div>

        {/* Questions List */}
        {test.questions.map((question, index) => {
          const questionId = question.id || `q-${index}`;
          const isExpanded = expandedQuestions.has(questionId);

          return (
            <NeumorphicCard key={questionId} padding="md" className="cursor-pointer" hoverable>
              <div onClick={() => toggleQuestion(questionId)}>
                {/* Question Header - Always Visible */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-bold rounded flex-shrink-0">
                      Q{index + 1}
                    </span>
                    <p className="text-gray-100 font-medium flex-1">{question.question}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestion(questionId);
                    }}
                    className="p-1 rounded-full hover:bg-gray-800 transition-colors flex-shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                    {/* Options */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 mb-2">Options:</p>
                      {question.options?.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg transition-all ${
                            optIndex === question.correctAnswer
                              ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-2 border-green-400'
                              : 'bg-gray-800 text-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            <span className="flex-1">{option}</span>
                            {optIndex === question.correctAnswer && (
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-4 p-3 bg-gray-800 rounded-lg border-l-4 border-orange-500">
                        <p className="text-xs text-gray-400 mb-1 font-semibold">Explanation:</p>
                        <p className="text-gray-200 text-sm">{question.explanation}</p>
                      </div>
                    )}

                    {/* Correct Answer Badge */}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">Correct Answer:</span>
                      <span className="px-2 py-1 bg-green-500 text-white font-bold rounded">
                        {String.fromCharCode(65 + question.correctAnswer)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </NeumorphicCard>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center gap-4">
        <NeumorphicButton
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/admin/tests')}
        >
          Back
        </NeumorphicButton>
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Test Details</h1>
          <p className="text-gray-200">{test.title}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <NeumorphicCard padding="md">
          <div className="flex gap-2">
            <NeumorphicButton
              variant={activeTab === 'details' ? 'accent' : 'ghost'}
              size="md"
              icon={FileText}
              onClick={() => setActiveTab('details')}
            >
              Details
            </NeumorphicButton>
            <NeumorphicButton
              variant={activeTab === 'questions' ? 'accent' : 'ghost'}
              size="md"
              icon={BookOpen}
              onClick={() => setActiveTab('questions')}
            >
              Questions ({test.questions?.length || 0})
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'questions' && renderQuestionsTab()}
      </div>
    </div>
  );
};

export default AdminTestDetail;

