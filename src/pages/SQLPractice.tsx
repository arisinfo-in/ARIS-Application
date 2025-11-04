import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Download, Trash2, BookOpen, ChevronDown, ChevronUp, AlertCircle, CheckCircle, Loader, ArrowLeft, Save, FolderOpen, X } from 'lucide-react';
import jsPDF from 'jspdf';
import CodeEditor from '../components/CodeEditor';
import SQLResults from '../components/SQLResults';
import DatasetSelector from '../components/DatasetSelector';
import SQLSchemaExplorer from '../components/SQLSchemaExplorer';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { sqlEngineService, QueryResult } from '../services/sqlEngineService';
import { datasetService, Dataset } from '../services/datasetService';
import { sqlExamples, getExamplesByDataset, SQLExample } from '../data/sqlExamples';
import { useAuth } from '../contexts/AuthContext';
import { sqlQueryService, SavedQuery } from '../services/sqlQueryService';

interface SQLPracticeProps {
  embedded?: boolean;
}

const SQLPractice: React.FC<SQLPracticeProps> = ({ embedded = false }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [datasetLoading, setDatasetLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [queryHistory, setQueryHistory] = useState<string[]>([]);
  const [queriesExecuted, setQueriesExecuted] = useState(0);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [showSavedQueries, setShowSavedQueries] = useState(false);
  const [savingQuery, setSavingQuery] = useState(false);
  const [loadingSavedQueries, setLoadingSavedQueries] = useState(false);
  const [queryTitle, setQueryTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const isMountedRef = useRef(true);

  const handleDatasetChange = useCallback(async (datasetId: string) => {
    if (!isMountedRef.current) return;
    
    try {
      setSelectedDataset(datasetId);
      setDatasetLoading(true);
      setError(null);
      setResults(null);
      setQuery('');

      await datasetService.loadDataset(datasetId);
      if (!isMountedRef.current) return;
    } catch (error: any) {
      if (!isMountedRef.current) return;
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading dataset:', error);
      }
      setError(error.message || 'Failed to load dataset');
    } finally {
      if (isMountedRef.current) {
        setDatasetLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const loadDatasets = async () => {
      try {
        const availableDatasets = await datasetService.getDatasets();
        if (!isMountedRef.current) return;
        
        setDatasets(availableDatasets);
        
        // Auto-select first dataset
        if (availableDatasets.length > 0 && !selectedDataset) {
          handleDatasetChange(availableDatasets[0].id);
        }
      } catch (error) {
        if (!isMountedRef.current) return;
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading datasets:', error);
        }
        setError('Failed to load datasets. Please refresh the page.');
      }
    };

    loadDatasets();
  }, [selectedDataset, handleDatasetChange]);

  // Load saved queries on mount
  useEffect(() => {
    const loadSavedQueries = async () => {
      if (!user || embedded) return;
      
      try {
        setLoadingSavedQueries(true);
        const queries = await sqlQueryService.getUserQueries(user.uid);
        if (!isMountedRef.current) return;
        setSavedQueries(queries);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading saved queries:', error);
        }
      } finally {
        if (isMountedRef.current) {
          setLoadingSavedQueries(false);
        }
      }
    };

    loadSavedQueries();
  }, [user, embedded]);

  // Auto-load last query when dataset changes
  useEffect(() => {
    const loadLastQuery = async () => {
      if (!user || !selectedDataset || embedded || !savedQueries.length) return;
      
      try {
        const queries = savedQueries.filter(q => q.dataset === selectedDataset);
        if (queries.length > 0) {
          // Load the most recent query for this dataset
          const lastQuery = queries[0];
          if (!query.trim()) {
            setQuery(lastQuery.query);
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading last query:', error);
        }
      }
    };

    loadLastQuery();
  }, [selectedDataset, user, embedded, savedQueries]);

  // Cleanup on unmount - defer to avoid blocking navigation
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      // Defer cleanup to next tick to avoid blocking navigation
      setTimeout(() => {
        try {
          sqlEngineService.close();
        } catch (error) {
          // Silently handle cleanup errors to prevent white screen
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error during SQL editor cleanup:', error);
          }
        }
      }, 0);
    };
  }, []);


  const executeQuery = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    if (!selectedDataset) {
      setError('Please select a dataset first');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Always ensure dataset is loaded before executing query
      await datasetService.loadDataset(selectedDataset);
      
      if (!isMountedRef.current) return;
      
      // Double-check database is ready
      if (!sqlEngineService.isReady()) {
        throw new Error('Database failed to load. Please try selecting the dataset again.');
      }

      const queryResult = await sqlEngineService.executeQuery(query);
      
      if (!isMountedRef.current) return;
      
      setResults(queryResult);
      
      // Add to query history
      setQueryHistory(prev => {
        const updated = [query, ...prev.filter(q => q !== query)].slice(0, 10);
        return updated;
      });

      // Track query execution count
      setQueriesExecuted(prev => prev + 1);
    } catch (error: any) {
      if (!isMountedRef.current) return;
      if (process.env.NODE_ENV === 'development') {
        console.error('Query execution error:', error);
      }
      setError(error.message || 'Failed to execute query');
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [query, selectedDataset]);

  const handleExampleClick = (example: SQLExample) => {
    setQuery(example.query);
    setError(null);
    setResults(null);
  };

  const handleDownloadQuery = () => {
    if (!query.trim() || !selectedDataset) return;
    
    try {
      const doc = new jsPDF();
      const dataset = datasets.find(d => d.id === selectedDataset);
      
      // Validate query length (jsPDF has page size limits)
      const MAX_QUERY_LENGTH = 10000;
      if (query.length > MAX_QUERY_LENGTH) {
        setError('Query is too long to generate PDF. Please export as text file instead.');
        return;
      }
      
      let yPosition = 20;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const maxWidth = 170;
      
      // Add title
      doc.setFontSize(18);
      doc.text('SQL Query', margin, yPosition);
      yPosition += 10;
      
      // Add dataset info
      doc.setFontSize(12);
      doc.setFont('helvetica');
      doc.text(`Dataset: ${dataset?.name || selectedDataset}`, margin, yPosition);
      yPosition += 7;
      doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPosition);
      yPosition += 10;
      
      // Add query label
      doc.setFontSize(12);
      doc.text('Query:', margin, yPosition);
      yPosition += 7;
      
      // Add query with proper wrapping and page breaks
      doc.setFontSize(10);
      doc.setFont('courier');
      const lines = doc.splitTextToSize(query, maxWidth);
      
      for (let i = 0; i < lines.length; i++) {
        // Check if we need a new page
        if (yPosition > pageHeight - margin - 10) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(lines[i], margin, yPosition);
        yPosition += 5;
      }
      
      // Generate filename
      const filename = `sql_query_${selectedDataset}_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Save PDF
          doc.save(filename);
        } catch (error: any) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error generating PDF:', error);
          }
          if (error.message?.includes('font')) {
        setError('PDF generation failed: Font issue. Please try again.');
      } else if (error.message?.includes('size')) {
        setError('Query is too large for PDF generation. Please use a shorter query.');
      } else {
        setError('Failed to download query as PDF. Please try again.');
      }
    }
  };

  const handleClearQuery = () => {
    setQuery('');
    setResults(null);
    setError(null);
  };

  const handleSaveQuery = async () => {
    if (!user || !query.trim() || !selectedDataset) return;

    if (!queryTitle.trim()) {
      setError('Please enter a title for your query');
      return;
    }

    setSavingQuery(true);
    setError(null);

    try {
      await sqlQueryService.saveQuery(user.uid, query, selectedDataset, queryTitle.trim());
      
      // Reload saved queries
      const queries = await sqlQueryService.getUserQueries(user.uid);
      if (!isMountedRef.current) return;
      setSavedQueries(queries);
      
      setShowSaveDialog(false);
      setQueryTitle('');
      setError(null);
    } catch (error: any) {
      if (!isMountedRef.current) return;
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving query:', error);
      }
      setError('Failed to save query. Please try again.');
    } finally {
      if (isMountedRef.current) {
        setSavingQuery(false);
      }
    }
  };

  const handleLoadQuery = (savedQuery: SavedQuery) => {
    if (savedQuery.dataset !== selectedDataset) {
      handleDatasetChange(savedQuery.dataset);
    }
    setQuery(savedQuery.query);
    setShowSavedQueries(false);
    setError(null);
  };

  const handleDeleteQuery = async (queryId: string) => {
    if (!user) return;

    try {
      await sqlQueryService.deleteQuery(queryId);
      const queries = await sqlQueryService.getUserQueries(user.uid);
      if (!isMountedRef.current) return;
      setSavedQueries(queries);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting query:', error);
      }
      setError('Failed to delete query. Please try again.');
    }
  };

  const currentExamples = selectedDataset ? getExamplesByDataset(selectedDataset) : [];

  return (
    <div className={embedded ? "w-full" : "p-6 max-w-7xl mx-auto"}>
      {/* Header */}
      {!embedded && (
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
                <h1 className="text-3xl font-bold text-gray-100 mb-2">SQL Practice</h1>
                <p className="text-gray-200">Practice SQL queries with sample datasets</p>
              </div>
            </div>
            <div className="flex items-center">
              <DatasetSelector
                datasets={datasets}
                selectedDataset={selectedDataset}
                onDatasetChange={handleDatasetChange}
                loading={datasetLoading}
              />
            </div>
          </div>
        </div>
      )}

      {embedded && (
        <div className="mb-6">

          {/* Dataset Selector */}
          <div className="mb-4">
            <DatasetSelector
              datasets={datasets}
              selectedDataset={selectedDataset}
              onDatasetChange={handleDatasetChange}
              loading={datasetLoading}
            />
          </div>

          {/* Error Display */}
          {error && (
            <NeumorphicCard padding="md" className="mb-4 bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </NeumorphicCard>
          )}

          {/* Success Message */}
          {results && !error && (
            <NeumorphicCard padding="md" className="mb-4 bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-400 text-sm">Query executed successfully</p>
              </div>
            </NeumorphicCard>
          )}
        </div>
      )}

      {!embedded && (
        <>
          {/* Error Display */}
          {error && (
            <NeumorphicCard padding="md" className="mb-4 bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </NeumorphicCard>
          )}

          {/* Success Message */}
          {results && !error && (
            <NeumorphicCard padding="md" className="mb-4 bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-400 text-sm">Query executed successfully</p>
              </div>
            </NeumorphicCard>
          )}
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Schema Explorer */}
        <div className="lg:col-span-1">
          <SQLSchemaExplorer datasetId={selectedDataset} />
        </div>

        {/* Main Content - Editor and Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* SQL Editor */}
          <NeumorphicCard padding="lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-100">SQL Query Editor</h3>
              <div className="flex gap-2">
                {user && !embedded && (
                  <>
                    <NeumorphicButton
                      size="sm"
                      variant="ghost"
                      icon={FolderOpen}
                      onClick={() => setShowSavedQueries(!showSavedQueries)}
                    >
                      Saved
                    </NeumorphicButton>
                    <NeumorphicButton
                      size="sm"
                      variant="ghost"
                      icon={Save}
                      onClick={() => setShowSaveDialog(true)}
                      disabled={!query.trim() || !selectedDataset}
                    >
                      Save
                    </NeumorphicButton>
                  </>
                )}
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={Trash2}
                  onClick={handleClearQuery}
                  disabled={!query}
                >
                  Clear
                </NeumorphicButton>
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={Download}
                  onClick={handleDownloadQuery}
                  disabled={!query.trim()}
                >
                  Download
                </NeumorphicButton>
                <NeumorphicButton
                  size="sm"
                  variant="accent"
                  icon={Play}
                  onClick={executeQuery}
                  disabled={loading || !query.trim() || !selectedDataset || datasetLoading}
                >
                  {loading ? 'Running...' : 'Run Query'}
                </NeumorphicButton>
              </div>
            </div>

            <CodeEditor
              language="sql"
              value={query}
              onChange={(value) => setQuery(value || '')}
              height="200px"
              theme="vs-dark"
            />

            {loading && (
              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Executing query...</span>
              </div>
            )}
          </NeumorphicCard>

          {/* Saved Queries Panel */}
          {user && !embedded && showSavedQueries && (
            <NeumorphicCard padding="lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-100">Saved Queries</h3>
                <NeumorphicButton
                  size="sm"
                  variant="ghost"
                  icon={X}
                  onClick={() => setShowSavedQueries(false)}
                >
                  Close
                </NeumorphicButton>
              </div>
              
              {loadingSavedQueries ? (
                <div className="flex items-center justify-center py-8">
                  <Loader className="w-5 h-5 animate-spin text-orange-500" />
                </div>
              ) : savedQueries.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>No saved queries yet. Save your first query to see it here!</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {savedQueries.map((savedQuery) => (
                    <NeumorphicCard
                      key={savedQuery.id}
                      padding="md"
                      variant="pressed"
                      className="cursor-pointer hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-100 truncate">{savedQuery.title}</h4>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {new Date(savedQuery.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">Dataset: {savedQuery.dataset}</p>
                          <pre className="text-xs text-gray-400 bg-gray-900 p-2 rounded overflow-x-auto max-h-20">
                            {savedQuery.query.substring(0, 150)}
                            {savedQuery.query.length > 150 ? '...' : ''}
                          </pre>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <NeumorphicButton
                            size="sm"
                            variant="ghost"
                            onClick={() => handleLoadQuery(savedQuery)}
                          >
                            Load
                          </NeumorphicButton>
                          <NeumorphicButton
                            size="sm"
                            variant="ghost"
                            icon={Trash2}
                            onClick={() => handleDeleteQuery(savedQuery.id)}
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

          {/* Save Query Dialog */}
          {user && !embedded && showSaveDialog && (
            <NeumorphicCard padding="lg" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-100">Save Query</h3>
                  <NeumorphicButton
                    size="sm"
                    variant="ghost"
                    icon={X}
                    onClick={() => {
                      setShowSaveDialog(false);
                      setQueryTitle('');
                    }}
                  >
                  </NeumorphicButton>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Query Title
                  </label>
                  <input
                    type="text"
                    value={queryTitle}
                    onChange={(e) => setQueryTitle(e.target.value)}
                    placeholder="e.g., Find top customers"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveQuery();
                      } else if (e.key === 'Escape') {
                        setShowSaveDialog(false);
                        setQueryTitle('');
                      }
                    }}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <NeumorphicButton
                    variant="ghost"
                    onClick={() => {
                      setShowSaveDialog(false);
                      setQueryTitle('');
                    }}
                    disabled={savingQuery}
                  >
                    Cancel
                  </NeumorphicButton>
                  <NeumorphicButton
                    variant="accent"
                    onClick={handleSaveQuery}
                    disabled={savingQuery || !queryTitle.trim()}
                    icon={savingQuery ? Loader : Save}
                  >
                    {savingQuery ? 'Saving...' : 'Save'}
                  </NeumorphicButton>
                </div>
              </div>
            </NeumorphicCard>
          )}

          {/* Results */}
          {results && (
            <NeumorphicCard padding="lg">
              <h3 className="text-lg font-bold text-gray-100 mb-4">Query Results</h3>
              <SQLResults
                columns={results.columns}
                values={results.values}
                rowCount={results.rowCount}
              />
            </NeumorphicCard>
          )}

          {/* Example Queries - Below Results */}
          {currentExamples.length > 0 && (
            <NeumorphicCard padding="lg">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="w-full flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold text-gray-100">Example Queries</h3>
                  <span className="text-sm text-gray-400">({currentExamples.length})</span>
                </div>
                {showExamples ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {showExamples && (
                <div className="space-y-3">
                  {currentExamples.map((example) => (
                    <NeumorphicCard
                      key={example.id}
                      padding="md"
                      className="cursor-pointer hover:bg-gray-800/50 transition-colors"
                      onClick={() => handleExampleClick(example)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-100">{example.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              example.difficulty === 'beginner' 
                                ? 'bg-green-500/20 text-green-400'
                                : example.difficulty === 'intermediate'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {example.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{example.description}</p>
                          <pre className="text-xs text-gray-400 bg-gray-900 p-2 rounded overflow-x-auto">
                            {example.query.substring(0, 100)}
                            {example.query.length > 100 ? '...' : ''}
                          </pre>
                        </div>
                      </div>
                    </NeumorphicCard>
                  ))}
                </div>
              )}
            </NeumorphicCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLPractice;

