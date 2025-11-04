import React, { useState, useEffect, memo } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Code, AlertCircle } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import { pythonProblemService } from '../services/pythonProblemService';
import { PythonProblem } from '../data/pythonProblems';

interface ProblemSelectorProps {
  onProblemSelect: (problem: PythonProblem) => void;
}

const ProblemSelector: React.FC<ProblemSelectorProps> = ({ onProblemSelect }) => {
  const [problems, setProblems] = useState<PythonProblem[]>([]);
  const [expandedDifficulties, setExpandedDifficulties] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      setLoading(true);
      try {
        const allProblems = await pythonProblemService.getProblems();
        setProblems(allProblems);
      } catch (error) {
        console.error('Error loading problems:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const toggleDifficulty = (difficulty: string) => {
    setExpandedDifficulties(prev => {
      const next = new Set(prev);
      if (next.has(difficulty)) {
        next.delete(difficulty);
      } else {
        next.add(difficulty);
      }
      return next;
    });
  };

  const getProblemsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    return problems.filter(p => p.difficulty === difficulty);
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Beginner';
      case 'intermediate':
        return 'Intermediate';
      case 'advanced':
        return 'Advanced';
      default:
        return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <NeumorphicCard padding="md" className="h-full">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </NeumorphicCard>
    );
  }

  return (
    <NeumorphicCard padding="md">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-100 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-orange-500" />
          Coding Problems
        </h3>
        <p className="text-sm text-gray-300">Select a problem to get started</p>
      </div>

      <div className="space-y-3">
        {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => {
          const difficultyProblems = getProblemsByDifficulty(difficulty);
          const isExpanded = expandedDifficulties.has(difficulty);

          return (
            <div key={difficulty} className="border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleDifficulty(difficulty)}
                className="w-full px-3 py-2 bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                    {getDifficultyLabel(difficulty)}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{difficultyProblems.length} problems</span>
              </button>

              {isExpanded && (
                <div className="bg-gray-900 border-t border-gray-700">
                  {difficultyProblems.length === 0 ? (
                    <div className="px-3 py-4 text-center text-gray-400 text-sm">
                      No problems available
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-800">
                      {difficultyProblems.map((problem) => (
                        <button
                          key={problem.id}
                          onClick={() => onProblemSelect(problem)}
                          className="w-full px-3 py-3 hover:bg-gray-800 transition-colors text-left"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Code className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-200 truncate">
                                {problem.title}
                              </span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${getDifficultyBadgeColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                            {problem.description}
                          </p>
                          {problem.dataset && (
                            <div className="flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-blue-400">Includes dataset</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </NeumorphicCard>
  );
};

export default memo(ProblemSelector);

