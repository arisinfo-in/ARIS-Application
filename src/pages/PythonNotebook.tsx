import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Download, Trash2, Plus, ArrowLeft, Loader, AlertCircle, CheckCircle, Save, FolderOpen, X } from 'lucide-react';
import NotebookCell from '../components/NotebookCell';
import ProblemSelector from '../components/ProblemSelector';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { pyodideService, PythonExecutionResult } from '../services/pyodideService';
import { pythonProblemService } from '../services/pythonProblemService';
import { PythonProblem } from '../data/pythonProblems';
import { useAuth } from '../contexts/AuthContext';
import { pythonNotebookService, SavedNotebook } from '../services/pythonNotebookService';

interface NotebookCellData {
  id: string;
  code: string;
  output: PythonExecutionResult | null;
  isExecuting: boolean;
}

const PythonNotebook: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cells, setCells] = useState<NotebookCellData[]>([
    { id: '1', code: '# Start coding here!\nprint("Hello, Python!")', output: null, isExecuting: false }
  ]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedNotebooks, setSavedNotebooks] = useState<SavedNotebook[]>([]);
  const [showSavedNotebooks, setShowSavedNotebooks] = useState(false);
  const [savingNotebook, setSavingNotebook] = useState(false);
  const [loadingSavedNotebooks, setLoadingSavedNotebooks] = useState(false);
  const [notebookTitle, setNotebookTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentNotebookId, setCurrentNotebookId] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  // Initialize Pyodide on mount
  useEffect(() => {
    const initializePyodide = async () => {
      try {
        setIsInitializing(true);
        await pyodideService.initialize();
        if (!isMountedRef.current) return;
        setIsInitializing(false);
      } catch (error: any) {
        if (!isMountedRef.current) return;
        if (process.env.NODE_ENV === 'development') {
          console.error('Error initializing Pyodide:', error);
        }
        setError('Failed to initialize Python environment. Please refresh the page.');
        setIsInitializing(false);
      }
    };

    initializePyodide();
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      setTimeout(() => {
        try {
          pyodideService.close();
        } catch {
          // Silent cleanup failure
        }
      }, 0);
    };
  }, []);

  // Load saved notebooks on mount
  useEffect(() => {
    const loadSavedNotebooks = async () => {
      if (!user) return;
      
      try {
        setLoadingSavedNotebooks(true);
        const notebooks = await pythonNotebookService.getUserNotebooks(user.uid);
        if (!isMountedRef.current) return;
        setSavedNotebooks(notebooks);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading saved notebooks:', error);
        }
      } finally {
        if (isMountedRef.current) {
          setLoadingSavedNotebooks(false);
        }
      }
    };

    loadSavedNotebooks();
  }, [user]);

  // Auto-load latest notebook on mount
  useEffect(() => {
    const loadLatestNotebook = async () => {
      if (!user || isInitializing) return;
      
      try {
        const latestNotebook = await pythonNotebookService.getLatestNotebook(user.uid);
        if (!isMountedRef.current || !latestNotebook) return;
        
        // Only load if cells are empty (fresh start)
        if (cells.length === 1 && cells[0].code.trim() === '# Start coding here!\nprint("Hello, Python!")') {
          setCells(latestNotebook.cells.map((cell, index) => ({
            id: cell.id || `cell-${index}`,
            code: cell.code,
            output: null,
            isExecuting: false
          })));
          setCurrentNotebookId(latestNotebook.id);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading latest notebook:', error);
        }
      }
    };

    if (!isInitializing) {
      loadLatestNotebook();
    }
  }, [user, isInitializing]);

  const addCell = useCallback((afterId?: string) => {
    const newCell: NotebookCellData = {
      id: Date.now().toString(),
      code: '',
      output: null,
      isExecuting: false
    };

    if (afterId) {
      const index = cells.findIndex(c => c.id === afterId);
      if (index >= 0) {
        setCells(prev => [...prev.slice(0, index + 1), newCell, ...prev.slice(index + 1)]);
      } else {
        setCells(prev => [...prev, newCell]);
      }
    } else {
      setCells(prev => [...prev, newCell]);
    }
  }, [cells]);

  const deleteCell = useCallback((id: string) => {
    if (cells.length > 1) {
      setCells(prev => prev.filter(c => c.id !== id));
    } else {
      setError('At least one cell is required');
      setTimeout(() => setError(null), 3000);
    }
  }, [cells.length]);

  const updateCellCode = useCallback((id: string, code: string) => {
    setCells(prev => prev.map(c => c.id === id ? { ...c, code } : c));
  }, []);

  const executeCell = useCallback(async (id: string) => {
    const cell = cells.find(c => c.id === id);
    if (!cell || !cell.code.trim()) return;

    setCells(prev => prev.map(c => c.id === id ? { ...c, isExecuting: true, output: null } : c));

    try {
      const result = await pyodideService.executeCode(cell.code);
      if (!isMountedRef.current) return;
      
      setCells(prev => prev.map(c => 
        c.id === id ? { ...c, isExecuting: false, output: result } : c
      ));
    } catch (error: any) {
      if (!isMountedRef.current) return;
      if (process.env.NODE_ENV === 'development') {
        console.error('Error executing cell:', error);
      }
      const errorResult: PythonExecutionResult = {
        output: '',
        error: error.message || 'Failed to execute code',
        returnValue: null,
        executionTime: 0
      };
      setCells(prev => prev.map(c => 
        c.id === id ? { ...c, isExecuting: false, output: errorResult } : c
      ));
    }
  }, [cells]);

  const executeAllCells = useCallback(async () => {
    if (!pyodideService.isReady()) {
      setError('Python environment not ready. Please wait...');
      return;
    }

    // Reset Pyodide state
    pyodideService.reset();

    // Execute cells sequentially
    for (const cell of cells) {
      if (!cell.code.trim()) continue;
      
      setCells(prev => prev.map(c => 
        c.id === cell.id ? { ...c, isExecuting: true, output: null } : c
      ));

      try {
        const result = await pyodideService.executeCode(cell.code);
        if (!isMountedRef.current) return;
        
        setCells(prev => prev.map(c => 
          c.id === cell.id ? { ...c, isExecuting: false, output: result } : c
        ));
      } catch (error: any) {
        if (!isMountedRef.current) return;
        const errorResult: PythonExecutionResult = {
          output: '',
          error: error.message || 'Failed to execute code',
          returnValue: null,
          executionTime: 0
        };
        setCells(prev => prev.map(c => 
          c.id === cell.id ? { ...c, isExecuting: false, output: errorResult } : c
        ));
        break; // Stop on error
      }
    }
  }, [cells]);

  const clearAllCells = useCallback(() => {
    pyodideService.reset();
    setCells([
      { id: Date.now().toString(), code: '# Start coding here!\nprint("Hello, Python!")', output: null, isExecuting: false }
    ]);
    setError(null);
    setCurrentNotebookId(null);
  }, []);

  const handleProblemSelect = useCallback(async (problem: PythonProblem) => {
    let template = problem.template;
    
    // If problem has a dataset, load it
    if (problem.dataset) {
      try {
        const datasetCode = await pythonProblemService.loadDatasetAsCode(problem.dataset);
        template = datasetCode + '\n\n# ' + problem.title + '\n' + problem.template;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading dataset:', error);
        }
      }
    }

    // Create new cell with problem template
    const newCell: NotebookCellData = {
      id: Date.now().toString(),
      code: `# ${problem.title}\n# ${problem.description}\n\n${template}`,
      output: null,
      isExecuting: false
    };

    setCells(prev => [...prev, newCell]);
  }, []);

  const downloadNotebook = useCallback(() => {
    const notebookContent = cells.map((cell, index) => {
      return `# Cell ${index + 1}\n${cell.code}\n`;
    }).join('\n\n');

    const blob = new Blob([notebookContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python_notebook_${new Date().toISOString().split('T')[0]}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [cells]);

  const handleSaveNotebook = async () => {
    if (!user || cells.length === 0) return;

    if (!notebookTitle.trim()) {
      setError('Please enter a title for your notebook');
      return;
    }

    setSavingNotebook(true);
    setError(null);

    try {
      const notebookCells = cells.map(cell => ({
        id: cell.id,
        code: cell.code
      }));

      if (currentNotebookId) {
        // Update existing notebook
        await pythonNotebookService.updateNotebook(currentNotebookId, notebookTitle.trim(), notebookCells);
      } else {
        // Create new notebook
        const notebookId = await pythonNotebookService.saveNotebook(user.uid, notebookTitle.trim(), notebookCells);
        if (!isMountedRef.current) return;
        setCurrentNotebookId(notebookId);
      }

      // Reload saved notebooks
      const notebooks = await pythonNotebookService.getUserNotebooks(user.uid);
      if (!isMountedRef.current) return;
      setSavedNotebooks(notebooks);

      setShowSaveDialog(false);
      setNotebookTitle('');
      setError(null);
    } catch (error: any) {
      if (!isMountedRef.current) return;
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving notebook:', error);
      }
      setError('Failed to save notebook. Please try again.');
    } finally {
      if (isMountedRef.current) {
        setSavingNotebook(false);
      }
    }
  };

  const handleLoadNotebook = async (notebook: SavedNotebook) => {
    try {
      setCells(notebook.cells.map((cell, index) => ({
        id: cell.id || `cell-${index}`,
        code: cell.code,
        output: null,
        isExecuting: false
      })));
      setCurrentNotebookId(notebook.id);
      setShowSavedNotebooks(false);
      setError(null);
      pyodideService.reset();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading notebook:', error);
      }
      setError('Failed to load notebook. Please try again.');
    }
  };

  const handleDeleteNotebook = async (notebookId: string) => {
    if (!user) return;

    try {
      await pythonNotebookService.deleteNotebook(notebookId);
      const notebooks = await pythonNotebookService.getUserNotebooks(user.uid);
      if (!isMountedRef.current) return;
      setSavedNotebooks(notebooks);
      
      if (currentNotebookId === notebookId) {
        setCurrentNotebookId(null);
        setCells([{ id: '1', code: '# Start coding here!\nprint("Hello, Python!")', output: null, isExecuting: false }]);
        pyodideService.reset();
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting notebook:', error);
      }
      setError('Failed to delete notebook. Please try again.');
    }
  };

  const moveCellUp = useCallback((id: string) => {
    const index = cells.findIndex(c => c.id === id);
    if (index > 0) {
      const newCells = [...cells];
      [newCells[index - 1], newCells[index]] = [newCells[index], newCells[index - 1]];
      setCells(newCells);
    }
  }, [cells]);

  const moveCellDown = useCallback((id: string) => {
    const index = cells.findIndex(c => c.id === id);
    if (index < cells.length - 1) {
      const newCells = [...cells];
      [newCells[index], newCells[index + 1]] = [newCells[index + 1], newCells[index]];
      setCells(newCells);
    }
  }, [cells]);

  if (isInitializing) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <NeumorphicCard padding="xl" className="text-center">
          <Loader className="w-12 h-12 text-orange-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-medium text-gray-100 mb-2">Initializing Python Environment</h3>
          <p className="text-gray-300">Loading Pyodide and required packages...</p>
        </NeumorphicCard>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <NeumorphicButton
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </NeumorphicButton>
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">Python Notebook</h1>
              <p className="text-gray-200">Write and execute Python code in your browser</p>
            </div>
          </div>
          <div className="flex gap-2">
            {user && (
              <>
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={FolderOpen}
                  onClick={() => setShowSavedNotebooks(!showSavedNotebooks)}
                >
                  Saved
                </NeumorphicButton>
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={Save}
                  onClick={() => {
                    setNotebookTitle(currentNotebookId ? savedNotebooks.find(n => n.id === currentNotebookId)?.title || 'My Notebook' : 'My Notebook');
                    setShowSaveDialog(true);
                  }}
                  disabled={cells.length === 0}
                >
                  Save
                </NeumorphicButton>
              </>
            )}
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={Trash2}
              onClick={clearAllCells}
            >
              Clear All
            </NeumorphicButton>
            <NeumorphicButton
              size="sm"
              variant="ghost"
              icon={Download}
              onClick={downloadNotebook}
            >
              Download
            </NeumorphicButton>
            <NeumorphicButton
              size="sm"
              variant="accent"
              icon={Play}
              onClick={executeAllCells}
              disabled={!pyodideService.isReady() || cells.every(c => !c.code.trim())}
            >
              Run All
            </NeumorphicButton>
          </div>
        </div>

        {error && (
          <NeumorphicCard padding="md" className="mb-4 bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </NeumorphicCard>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sidebar - Problem Selector */}
        <div className="lg:col-span-1 space-y-4">
          <ProblemSelector onProblemSelect={handleProblemSelect} />

          {/* Saved Notebooks Panel */}
          {user && showSavedNotebooks && (
            <NeumorphicCard padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-100">Saved Notebooks</h3>
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={X}
                  onClick={() => setShowSavedNotebooks(false)}
                >
                  Close
                </NeumorphicButton>
              </div>
              
              {loadingSavedNotebooks ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-5 h-5 animate-spin text-orange-500" />
                </div>
              ) : savedNotebooks.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No saved notebooks yet. Save your first notebook to see it here!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {savedNotebooks.map((notebook) => (
                    <NeumorphicCard
                      key={notebook.id}
                      padding="md"
                      variant="pressed"
                      className="cursor-pointer hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-100 truncate">{notebook.title}</h4>
                          </div>
                          <p className="text-xs text-gray-400 mb-1">
                            {notebook.cells.length} cell{notebook.cells.length !== 1 ? 's' : ''}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(notebook.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <NeumorphicButton
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLoadNotebook(notebook)}
                          >
                            Load
                          </NeumorphicButton>
                          <NeumorphicButton
                            size="sm"
                            variant="ghost"
                            icon={Trash2}
                            onClick={() => handleDeleteNotebook(notebook.id)}
                          >
                          </NeumorphicButton>
                        </div>
                      </div>
                    </NeumorphicCard>
                  ))}
                </div>
              )}
            </NeumorphicCard>
          )}
        </div>

        {/* Main Content - Notebook Cells */}
        <div className="lg:col-span-3 space-y-4">
          {cells.map((cell, index) => (
            <NotebookCell
              key={cell.id}
              id={cell.id}
              code={cell.code}
              output={cell.output}
              isExecuting={cell.isExecuting}
              onCodeChange={updateCellCode}
              onExecute={executeCell}
              onDelete={deleteCell}
              onAddBelow={addCell}
              onMoveUp={moveCellUp}
              onMoveDown={moveCellDown}
              canMoveUp={index > 0}
              canMoveDown={index < cells.length - 1}
            />
          ))}

          {/* Add Cell Button */}
          <NeumorphicButton
            variant="ghost"
            icon={Plus}
            onClick={() => addCell()}
            className="w-full"
          >
            Add New Cell
          </NeumorphicButton>
        </div>
      </div>

      {/* Save Notebook Dialog */}
      {user && showSaveDialog && (
        <NeumorphicCard padding="lg" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-100">Save Notebook</h3>
              <NeumorphicButton
                size="sm"
                variant="ghost"
                icon={X}
                onClick={() => {
                  setShowSaveDialog(false);
                  setNotebookTitle('');
                }}
              >
              </NeumorphicButton>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notebook Title
              </label>
              <input
                type="text"
                value={notebookTitle}
                onChange={(e) => setNotebookTitle(e.target.value)}
                placeholder="e.g., Data Analysis Project"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveNotebook();
                  } else if (e.key === 'Escape') {
                    setShowSaveDialog(false);
                    setNotebookTitle('');
                  }
                }}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <NeumorphicButton
                variant="ghost"
                onClick={() => {
                  setShowSaveDialog(false);
                  setNotebookTitle('');
                }}
                disabled={savingNotebook}
              >
                Cancel
              </NeumorphicButton>
              <NeumorphicButton
                variant="accent"
                onClick={handleSaveNotebook}
                disabled={savingNotebook || !notebookTitle.trim()}
                icon={savingNotebook ? Loader : Save}
              >
                {savingNotebook ? 'Saving...' : currentNotebookId ? 'Update' : 'Save'}
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicCard>
      )}
    </div>
  );
};

export default PythonNotebook;

