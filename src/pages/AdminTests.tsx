import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, Test, TestAttempt } from '../firebase/firestore';
import { subDays, isAfter, isBefore } from 'date-fns';
import { safeFormatDate } from '../utils/dateFormat';

type SortOption = 'newest' | 'oldest' | 'most-questions' | 'least-questions' | 'alphabetical';
type DateRange = 'all' | '7days' | '30days' | '90days' | 'custom';

const AdminTests: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showResearch, setShowResearch] = useState(false);

  // Filter states
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTestType, setSelectedTestType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>('all');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [minQuestions, setMinQuestions] = useState<number>(0);
  const [maxQuestions, setMaxQuestions] = useState<number>(100);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const modules = [
    { id: 'all', name: 'All Modules' },
    { id: 'excel', name: 'Excel' },
    { id: 'powerbi', name: 'Power BI' },
    { id: 'sql', name: 'SQL & Database' },
    { id: 'python', name: 'Python' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'prompt', name: 'Prompt Engineering' },
    { id: 'advanced', name: 'Advanced AI' }
  ];

  const difficultyLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner', description: 'Basic concepts' },
    { id: 'intermediate', name: 'Intermediate', description: 'Advanced concepts' },
    { id: 'advanced', name: 'Advanced', description: 'Expert level' }
  ];

  const testTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'default', name: 'Default' },
    { id: 'custom', name: 'Custom' },
    { id: 'dynamic', name: 'Dynamic' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [testsData, attemptsData] = await Promise.all([
        firestoreOperations.getTests(),
        firestoreOperations.getAllTestAttempts().catch(() => []) // Gracefully handle if not available
      ]);
      setTests(testsData);
      setTestAttempts(attemptsData);
    } catch (error) {
      console.error('Error loading tests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate test metrics
  const testMetrics = useMemo(() => {
    const metrics: { [testId: string]: {
      attempts: number;
      avgScore: number;
      completionRate: number;
      avgTime: number;
    } } = {};

    tests.forEach(test => {
      const attempts = testAttempts.filter(attempt => attempt.testId === test.id);
      if (attempts.length > 0) {
        const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
        const avgScore = totalScore / attempts.length;
        const totalTime = attempts.reduce((sum, a) => {
          const time = new Date(a.finishedAt).getTime() - new Date(a.startedAt).getTime();
          return sum + time;
        }, 0);
        const avgTime = totalTime / attempts.length / 1000 / 60; // Convert to minutes

        metrics[test.id] = {
          attempts: attempts.length,
          avgScore: Math.round(avgScore),
          completionRate: 100, // All attempts are completed
          avgTime: Math.round(avgTime * 10) / 10
        };
      } else {
        metrics[test.id] = {
          attempts: 0,
          avgScore: 0,
          completionRate: 0,
          avgTime: 0
        };
      }
    });

    return metrics;
  }, [tests, testAttempts]);

  // Filter and sort tests
  const filteredTests = useMemo(() => {
    let filtered = [...tests];

    // Module filter
    if (selectedModule !== 'all') {
      filtered = filtered.filter(test => test.module === selectedModule);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(test => test.level === selectedDifficulty);
    }

    // Test type filter
    if (selectedTestType !== 'all') {
      if (selectedTestType === 'default') {
        filtered = filtered.filter(test => test.isDefault);
      } else if (selectedTestType === 'custom') {
        filtered = filtered.filter(test => test.isCustom);
      } else if (selectedTestType === 'dynamic') {
        filtered = filtered.filter(test => test.isDynamic);
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(test =>
        test.title?.toLowerCase().includes(query) ||
        test.topics?.toLowerCase().includes(query) ||
        test.module?.toLowerCase().includes(query)
      );
    }

    // Date range filter
    if (dateRange !== 'all') {
      let startDate: Date;
      if (dateRange === 'custom') {
        if (customStartDate) {
          startDate = new Date(customStartDate);
        } else {
          startDate = new Date(0); // Beginning of time
        }
      } else {
        const days = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 90;
        startDate = subDays(new Date(), days);
      }

      filtered = filtered.filter(test => {
        const testDate = new Date(test.createdAt);
        return isAfter(testDate, startDate) || testDate.getTime() === startDate.getTime();
      });

      if (dateRange === 'custom' && customEndDate) {
        const endDate = new Date(customEndDate);
        filtered = filtered.filter(test => {
          const testDate = new Date(test.createdAt);
          return isBefore(testDate, endDate) || testDate.getTime() === endDate.getTime();
        });
      }
    }

    // Question count filter
    filtered = filtered.filter(test => {
      const qCount = test.questions.length;
      return qCount >= minQuestions && qCount <= maxQuestions;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'most-questions':
          return b.questions.length - a.questions.length;
        case 'least-questions':
          return a.questions.length - b.questions.length;
        case 'alphabetical':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    tests,
    selectedModule,
    selectedDifficulty,
    selectedTestType,
    searchQuery,
    dateRange,
    customStartDate,
    customEndDate,
    minQuestions,
    maxQuestions,
    sortBy
  ]);

  const handleViewTest = (test: Test) => {
    navigate(`/admin/tests/${test.id}`);
  };

  const clearFilters = () => {
    setSelectedModule('all');
    setSelectedDifficulty('all');
    setSelectedTestType('all');
    setSearchQuery('');
    setDateRange('all');
    setCustomStartDate('');
    setCustomEndDate('');
    setMinQuestions(0);
    setMaxQuestions(1000);
    setSortBy('newest');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedModule !== 'all') count++;
    if (selectedDifficulty !== 'all') count++;
    if (selectedTestType !== 'all') count++;
    if (searchQuery.trim()) count++;
    if (dateRange !== 'all') count++;
    if (minQuestions > 0 || maxQuestions < 100) count++;
    if (sortBy !== 'newest') count++;
    return count;
  }, [selectedModule, selectedDifficulty, selectedTestType, searchQuery, dateRange, minQuestions, maxQuestions, sortBy]);

  // Research panel statistics
  const researchStats = useMemo(() => {
    const totalAttempts = testAttempts.length;
    const totalTests = tests.length;
    const testsWithAttempts = tests.filter(test => testMetrics[test.id]?.attempts > 0).length;
    const avgAttemptsPerTest = totalTests > 0 ? (totalAttempts / totalTests) : 0;
    const avgScore = testAttempts.length > 0
      ? testAttempts.reduce((sum, a) => sum + a.score, 0) / testAttempts.length
      : 0;

    // Module popularity
    const moduleStats: { [key: string]: number } = {};
    tests.forEach(test => {
      const attempts = testMetrics[test.id]?.attempts || 0;
      moduleStats[test.module] = (moduleStats[test.module] || 0) + attempts;
    });

    const mostPopularModule = Object.entries(moduleStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalAttempts,
      totalTests,
      testsWithAttempts,
      testsWithoutAttempts: totalTests - testsWithAttempts,
      avgAttemptsPerTest: Math.round(avgAttemptsPerTest * 10) / 10,
      avgScore: Math.round(avgScore),
      mostPopularModule
    };
  }, [tests, testAttempts, testMetrics]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Test Management</h1>
            <p className="text-gray-200">Manage and research all tests in the platform</p>
          </div>
          <div className="flex gap-3">
            <NeumorphicButton
              variant="ghost"
              icon={showResearch ? BarChart3 : BarChart3}
              onClick={() => setShowResearch(!showResearch)}
            >
              {showResearch ? 'Hide' : 'Show'} Research
            </NeumorphicButton>
            <NeumorphicButton
              variant="ghost"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </NeumorphicButton>
          </div>
        </div>

        {/* Research Panel */}
        {showResearch && (
          <NeumorphicCard padding="lg" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-orange-400" />
                Research & Analytics
              </h2>
              <button
                onClick={() => setShowResearch(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Total Attempts</p>
                <p className="text-2xl font-bold text-gray-100">{researchStats.totalAttempts}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Tests with Attempts</p>
                <p className="text-2xl font-bold text-gray-100">{researchStats.testsWithAttempts}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Avg Score</p>
                <p className="text-2xl font-bold text-gray-100">{researchStats.avgScore}%</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Most Popular Module</p>
                <p className="text-2xl font-bold text-gray-100 capitalize">{researchStats.mostPopularModule}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Tests Without Attempts</p>
                <p className="text-xl font-bold text-gray-100">{researchStats.testsWithoutAttempts}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Avg Attempts per Test</p>
                <p className="text-xl font-bold text-gray-100">{researchStats.avgAttemptsPerTest}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-1">Total Tests</p>
                <p className="text-xl font-bold text-gray-100">{researchStats.totalTests}</p>
              </div>
            </div>
          </NeumorphicCard>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <NeumorphicCard padding="lg" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-400" />
                Filters
              </h2>
              <div className="flex gap-2">
                <NeumorphicButton variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </NeumorphicButton>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Module Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Module</label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {modules.map(module => (
                    <option key={module.id} value={module.id}>{module.name}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {difficultyLevels.map(level => (
                    <option key={level.id} value={level.id}>
                      {level.name} {level.description && `- ${level.description}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Test Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Test Type</label>
                <select
                  value={selectedTestType}
                  onChange={(e) => setSelectedTestType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {testTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, topics, or module..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as DateRange)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Time</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Custom Date Range */}
              {dateRange === 'custom' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date</label>
                    <input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </>
              )}

              {/* Question Count Range */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Question Count: {minQuestions} - {maxQuestions}
                </label>
                <div className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-400 w-12">Min:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minQuestions}
                      onChange={(e) => setMinQuestions(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-300 w-12 text-right">{minQuestions}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-400 w-12">Max:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxQuestions}
                      onChange={(e) => setMaxQuestions(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-300 w-12 text-right">{maxQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-questions">Most Questions</option>
                  <option value="least-questions">Least Questions</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </NeumorphicCard>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            {searchQuery || activeFiltersCount > 0
              ? `Filtered Tests (${filteredTests.length} of ${tests.length})`
              : `All Tests (${tests.length})`}
          </h2>
        </div>

        {filteredTests.length === 0 ? (
          <NeumorphicCard padding="lg" className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No tests found matching your filters</p>
            <NeumorphicButton variant="ghost" onClick={clearFilters} className="mt-4">
              Clear Filters
            </NeumorphicButton>
          </NeumorphicCard>
        ) : (
          <div className="grid gap-4">
            {filteredTests.map((test) => {
              const metrics = testMetrics[test.id];
              return (
                <NeumorphicCard key={test.id} padding="lg" hoverable>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-100 text-lg">{test.title}</h3>
                        {metrics && metrics.attempts > 0 && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                            {metrics.attempts} attempts
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-200 flex-wrap">
                        <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 rounded">
                          {test.module}
                        </span>
                        {test.level && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded capitalize">
                            {test.level}
                          </span>
                        )}
                        <span>{test.questions.length} questions</span>
                        <span className="px-2 py-1 bg-gray-700 rounded">
                          {test.isDefault ? 'Default' : test.isCustom ? 'Custom' : test.isDynamic ? 'Dynamic' : 'N/A'}
                        </span>
                        <span>Created {safeFormatDate(test.createdAt, 'MMM d, yyyy', 'date unavailable')}</span>
                        {metrics && metrics.attempts > 0 && (
                          <>
                            <span className="text-green-400">Avg: {metrics.avgScore}%</span>
                            <span className="text-gray-400">Time: {metrics.avgTime} min</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <NeumorphicButton 
                        variant="ghost" 
                        size="sm" 
                        icon={Eye}
                        onClick={() => handleViewTest(test)}
                      >
                        View
                      </NeumorphicButton>
                      <NeumorphicButton variant="ghost" size="sm" icon={Trash2} className="text-red-500">
                        Delete
                      </NeumorphicButton>
                    </div>
                  </div>
                </NeumorphicCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTests;
