import React, { useState } from 'react';
import { Play, Trash2, Plus, ArrowUp, ArrowDown, Loader, CheckCircle, XCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { pyodideService, PythonExecutionResult } from '../services/pyodideService';

interface NotebookCellProps {
  id: string;
  code: string;
  output: PythonExecutionResult | null;
  isExecuting: boolean;
  onCodeChange: (id: string, code: string) => void;
  onExecute: (id: string) => Promise<void>;
  onDelete: (id: string) => void;
  onAddBelow: (id: string) => void;
  onMoveUp?: (id: string) => void;
  onMoveDown?: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const NotebookCell: React.FC<NotebookCellProps> = ({
  id,
  code,
  output,
  isExecuting,
  onCodeChange,
  onExecute,
  onDelete,
  onAddBelow,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleExecute = async () => {
    await onExecute(id);
  };

  const getExecutionStatus = () => {
    if (isExecuting) {
      return { icon: Loader, color: 'text-blue-400', text: 'Running...' };
    }
    if (output) {
      if (output.error) {
        return { icon: XCircle, color: 'text-red-400', text: 'Error' };
      }
      return { icon: CheckCircle, color: 'text-green-400', text: 'Success' };
    }
    return null;
  };

  const status = getExecutionStatus();

  return (
    <NeumorphicCard padding="lg">
      {/* Cell Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Cell</span>
          {status && (
            <div className={`flex items-center gap-1 ${status.color}`}>
              <status.icon className={`w-4 h-4 ${isExecuting ? 'animate-spin' : ''}`} />
              <span className="text-xs">{status.text}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <NeumorphicButton
            size="sm"
            variant="ghost"
            icon={isExecuting ? Loader : Play}
            onClick={handleExecute}
            disabled={isExecuting || !code.trim()}
            className={isExecuting ? 'animate-spin' : ''}
          >
            {isExecuting ? 'Running...' : 'Run'}
          </NeumorphicButton>
          {canMoveUp && onMoveUp && (
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={ArrowUp}
              onClick={() => onMoveUp(id)}
            />
          )}
          {canMoveDown && onMoveDown && (
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={ArrowDown}
              onClick={() => onMoveDown(id)}
            />
          )}
          <NeumorphicButton
            size="sm"
            variant="ghost"
            icon={Plus}
            onClick={() => onAddBelow(id)}
          />
          <NeumorphicButton
            size="sm"
            variant="ghost"
            icon={Trash2}
            onClick={() => onDelete(id)}
            className="text-red-500 hover:text-red-700"
          />
        </div>
      </div>

      {/* Code Editor */}
      <div className="mb-3">
        <CodeEditor
          language="python"
          value={code}
          onChange={(value) => onCodeChange(id, value || '')}
          height="140px"
          theme="vs-dark"
        />
      </div>

      {/* Output Display */}
      {output && (
        <div className="mt-3 border-t border-gray-700 pt-3">
          {output.error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Error</span>
              </div>
              <pre className="text-sm text-red-300 whitespace-pre-wrap font-mono">
                {output.error}
              </pre>
            </div>
          ) : (
            <div className="space-y-2">
              {output.output && (
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs font-medium text-gray-400">Output</span>
                    {output.executionTime > 0 && (
                      <span className="text-xs text-gray-500 ml-auto">
                        ({output.executionTime}ms)
                      </span>
                    )}
                  </div>
                  <div 
                    className="text-sm text-gray-200 whitespace-pre-wrap font-mono"
                    dangerouslySetInnerHTML={{ __html: output.output }}
                  />
                </div>
              )}
              {output.returnValue !== null && output.returnValue !== undefined && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-blue-400">Return Value</span>
                  </div>
                  <pre className="text-sm text-blue-300 whitespace-pre-wrap font-mono">
                    {JSON.stringify(output.returnValue, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </NeumorphicCard>
  );
};

export default NotebookCell;

