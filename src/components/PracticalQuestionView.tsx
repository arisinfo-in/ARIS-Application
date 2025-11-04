import React, { useState } from 'react';
import { CheckCircle, FileText, AlertCircle, Loader } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import CodeEditor from './CodeEditor';
import { PracticalQuestion } from '../services/practicalQuestionService';

interface PracticalQuestionViewProps {
  question: PracticalQuestion;
  onSubmit: (code: string) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const PracticalQuestionView: React.FC<PracticalQuestionViewProps> = ({
  question,
  onSubmit,
  onCancel,
  isSubmitting = false
}) => {
  const [userCode, setUserCode] = useState('');
  const [showHints, setShowHints] = useState(false);

  const handleSubmit = async () => {
    if (!userCode.trim()) {
      return;
    }
    await onSubmit(userCode);
  };

  const getLanguageFromModule = (module: string): 'sql' | 'python' => {
    const moduleLower = module.toLowerCase();
    if (moduleLower.includes('excel')) {
      // Excel uses textarea for formulas, but for now we'll use SQL-like syntax highlighting
      // In the future, we could add Excel formula support
      return 'sql'; // Monaco doesn't have Excel syntax, so we'll use SQL as closest match
    }
    if (moduleLower.includes('sql')) return 'sql';
    if (moduleLower.includes('python')) return 'python';
    return 'sql'; // Default fallback
  };
  
  const isExcelModule = (module: string): boolean => {
    return module.toLowerCase().includes('excel');
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <NeumorphicCard padding="lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-100">Practical Coding Question</h2>
              <p className="text-sm text-gray-300">
                Difficulty: <span className="capitalize text-orange-400">{question.difficulty}</span> • 
                Time: {question.estimatedTime}
              </p>
            </div>
          </div>
          {onCancel && (
            <NeumorphicButton variant="ghost" onClick={onCancel}>
              Cancel
            </NeumorphicButton>
          )}
        </div>
      </NeumorphicCard>

      {/* Scenario */}
      <NeumorphicCard padding="lg">
        <h3 className="text-lg font-bold text-gray-100 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-400" />
          Scenario
        </h3>
        <p className="text-gray-200 leading-relaxed mb-4">{question.scenario}</p>
        
        {question.dataContext && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm font-medium text-gray-300 mb-2">Data Context:</p>
            <p className="text-sm text-gray-400">{question.dataContext}</p>
          </div>
        )}
      </NeumorphicCard>

      {/* Question */}
      <NeumorphicCard padding="lg">
        <h3 className="text-lg font-bold text-gray-100 mb-4">Question</h3>
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <p className="text-gray-200 leading-relaxed">{question.question}</p>
        </div>

        {/* Requirements */}
        {question.requirements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h4>
            <ul className="space-y-2">
              {question.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints */}
        {question.hints && question.hints.length > 0 && (
          <div className="mt-4">
            <NeumorphicButton
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="mb-2"
            >
              {showHints ? 'Hide' : 'Show'} Hints
            </NeumorphicButton>
            {showHints && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <span className="text-sm font-medium text-yellow-400">Hints:</span>
                </div>
                <ul className="space-y-1 ml-6">
                  {question.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-yellow-300">• {hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </NeumorphicCard>

      {/* Code Editor / Solution Input */}
      <NeumorphicCard padding="lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-100">Your Solution</h3>
          <span className="text-xs text-gray-400 capitalize">
            {isExcelModule(question.module) ? 'Excel Formulas' : `${getLanguageFromModule(question.module)} Code`}
          </span>
        </div>
        {isExcelModule(question.module) ? (
          // Excel formulas - use textarea with helpful placeholder
          <div className="relative">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder={`Enter your Excel formula or solution here...
Example: =VLOOKUP(A2,Sheet2!A:B,2,FALSE)
Or describe your approach with formulas and steps.`}
              className="w-full h-96 bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none resize-none"
              disabled={isSubmitting}
            />
            <div className="mt-2 text-xs text-gray-400">
              <p>💡 Tip: You can write Excel formulas, describe your approach, or provide step-by-step instructions.</p>
            </div>
          </div>
        ) : (
          <CodeEditor
            language={getLanguageFromModule(question.module)}
            value={userCode}
            onChange={(value) => setUserCode(value || '')}
            height="400px"
            readOnly={isSubmitting}
          />
        )}
        <div className="mt-4 flex gap-3">
          <NeumorphicButton
            variant="accent"
            onClick={handleSubmit}
            disabled={!userCode.trim() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Validating...
              </>
            ) : (
              'Submit Code'
            )}
          </NeumorphicButton>
        </div>
      </NeumorphicCard>

      {/* Test Cases Preview */}
      {question.testCases.length > 0 && (
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-gray-400" />
            Test Cases
          </h3>
          <div className="space-y-2">
            {question.testCases.map((testCase, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-gray-300">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300 mb-1">
                      {testCase.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Expected: {testCase.expectedOutput}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </NeumorphicCard>
      )}
    </div>
  );
};

export default PracticalQuestionView;

