import React from 'react';
import { Mic, Code } from 'lucide-react';

interface QuestionTypeBadgeProps {
  type: 'theory' | 'practical';
  className?: string;
}

const QuestionTypeBadge: React.FC<QuestionTypeBadgeProps> = ({ type, className = '' }) => {
  const isTheory = type === 'theory';

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
        isTheory
          ? 'bg-blue-500/20 border border-blue-500/30'
          : 'bg-purple-500/20 border border-purple-500/30'
      } ${className}`}
    >
      {isTheory ? (
        <>
          <Mic className="w-4 h-4 text-blue-400" />
          <span className="text-blue-400 font-semibold text-sm">THEORY QUESTION</span>
        </>
      ) : (
        <>
          <Code className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 font-semibold text-sm">PRACTICAL QUESTION</span>
        </>
      )}
    </div>
  );
};

export default QuestionTypeBadge;

