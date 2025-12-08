import React, { useEffect } from 'react';
import { X, FileText, Calendar, User, BookOpen, CheckCircle } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { Test } from '../firebase/firestore';
import { format } from 'date-fns';

interface TestDetailModalProps {
  test: Test | null;
  isOpen: boolean;
  onClose: () => void;
}

const TestDetailModal: React.FC<TestDetailModalProps> = ({ test, isOpen, onClose }) => {
  // All hooks must be called before any early returns
  useEffect(() => {
    console.log('TestDetailModal - isOpen:', isOpen, 'test:', test);
  }, [isOpen, test]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Early return after all hooks
  if (!isOpen || !test) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] z-[101] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <NeumorphicCard padding="xl" className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">Test Details</h2>
            <p className="text-gray-300">Complete test information</p>
          </div>

          {/* Test Information */}
          <div className="space-y-4 mb-6">
            {/* Title */}
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Title</p>
                <p className="text-gray-100 font-medium text-lg">{test.title || 'N/A'}</p>
              </div>
            </div>

            {/* Module */}
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Module</p>
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600">
                  {test.module || 'N/A'}
                </span>
              </div>
            </div>

            {/* Created Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Created Date</p>
                <p className="text-gray-100 font-medium">
                  {format(new Date(test.createdAt), 'MMMM d, yyyy')}
                </p>
              </div>
            </div>

            {/* Created By */}
            {test.createdBy && (
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-orange-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Created By</p>
                  <p className="text-gray-100 font-medium">{test.createdBy}</p>
                </div>
              </div>
            )}

            {/* Test Type */}
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

            {/* Topics */}
            {test.topics && (
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-orange-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Topics</p>
                  <p className="text-gray-100 font-medium">{test.topics}</p>
                </div>
              </div>
            )}

            {/* Number of Questions */}
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Total Questions</p>
                <p className="text-gray-100 font-medium text-lg">{test.questions?.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Questions List */}
          {test.questions && test.questions.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Questions ({test.questions.length})</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {test.questions.map((question, index) => (
                  <NeumorphicCard key={question.id || index} padding="md" className="mb-4">
                    <div className="space-y-3">
                      {/* Question Number and Text */}
                      <div>
                        <div className="flex items-start gap-2 mb-2">
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                            Q{index + 1}
                          </span>
                          <p className="text-gray-100 font-medium flex-1">{question.question}</p>
                        </div>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 ml-6">
                        {question.options?.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-2 rounded-lg ${
                              optIndex === question.correctAnswer
                                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-2 border-green-400'
                                : 'bg-gray-800 text-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span>{option}</span>
                              {optIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Explanation */}
                      {question.explanation && (
                        <div className="ml-6 mt-2 p-3 bg-gray-800 rounded-lg border-l-4 border-orange-500">
                          <p className="text-xs text-gray-400 mb-1">Explanation:</p>
                          <p className="text-gray-200 text-sm">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>
          )}

          {/* Test ID */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Test ID</p>
            <p className="text-gray-300 text-xs font-mono break-all">{test.id}</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end">
            <NeumorphicButton variant="accent" onClick={onClose}>
              Close
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default TestDetailModal;

