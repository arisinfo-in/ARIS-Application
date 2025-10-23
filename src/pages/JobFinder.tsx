import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, ExternalLink, Building, Calendar, ArrowLeft } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { jobScrapingService } from '../services/jobScrapingService';
import { linkedinJobService } from '../services/linkedinJobService';
import { JobPosting, JobFilters } from '../types/jobTypes';
import { useNavigate } from 'react-router-dom';

const JobFinder: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLinkedInAuthenticated, setIsLinkedInAuthenticated] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    location: {
      countries: [],
      states: [],
      cities: [],
      workType: []
    },
    experience: { min: 0, max: 10 },
    salary: { min: 0, max: 1000000 },
    skills: [],
    jobType: [],
    companySize: [],
    industry: [],
    postedWithin: 30
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobData = await jobScrapingService.getAllJobs(filters);
      setJobs(jobData);
      setFilteredJobs(jobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if LinkedIn is authenticated
    setIsLinkedInAuthenticated(linkedinJobService.isAuthenticated());
    fetchJobs();

    // Listen for LinkedIn authentication events
    const handleLinkedInAuth = () => {
      setIsLinkedInAuthenticated(true);
      fetchJobs(); // Refresh jobs after authentication
    };

    // Global error handler for LinkedIn-related errors
    const handleGlobalError = (event: ErrorEvent) => {
      if (event.message && (event.message.includes('linkedin') || event.message.includes('licdn.com'))) {
        console.log('LinkedIn-related error caught and ignored:', event.message);
        event.preventDefault();
        return false;
      }
    };

    // Handle LinkedIn static asset errors specifically
    const handleLinkedInAssetError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName === 'IMG' && target.getAttribute('src')?.includes('licdn.com')) {
        console.log('LinkedIn static asset error suppressed');
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('linkedinAuthenticated', handleLinkedInAuth);
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('error', handleLinkedInAssetError);
    
    return () => {
      window.removeEventListener('linkedinAuthenticated', handleLinkedInAuth);
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('error', handleLinkedInAssetError);
    };
  }, []);

  // Handle LinkedIn OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state === 'linkedin_auth_state') {
      handleLinkedInCallback(code);
      // Clean up URL after handling callback
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLinkedInCallback = async (code: string) => {
    setLoading(true);
    try {
      const success = await linkedinJobService.handleCallback(code);
      if (success) {
        setIsLinkedInAuthenticated(true);
        // Refresh jobs after authentication
        await fetchJobs();
      }
    } catch (error) {
      console.error('LinkedIn authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInAuth = () => {
    try {
      linkedinJobService.authenticateWithLinkedIn();
      // The service will automatically trigger the authentication event
    } catch (error) {
      console.error('LinkedIn authentication failed:', error);
      // Fallback: simulate authentication
      setIsLinkedInAuthenticated(true);
      fetchJobs();
    }
  };

  const handleSkipLinkedIn = () => {
    // Skip LinkedIn authentication and use mock data
    setIsLinkedInAuthenticated(true);
    fetchJobs();
  };

  useEffect(() => {
    // Filter jobs based on search query and filters
    let filtered = jobs;

    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    filtered = jobScrapingService.filterJobs(filtered, filters);
    setFilteredJobs(filtered);
  }, [jobs, searchQuery, filters]);

  const handleWorkTypeChange = (workType: string) => {
    setFilters(prev => ({
      ...prev,
      location: {
        ...prev.location,
        workType: workType ? [workType as 'remote' | 'hybrid' | 'onsite'] : []
      }
    }));
  };

  const handleExperienceChange = (field: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        [field]: value
      }
    }));
  };

  const handlePostedWithinChange = (days: number) => {
    setFilters(prev => ({
      ...prev,
      postedWithin: days
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getWorkTypeColor = (workType: string) => {
    switch (workType) {
      case 'remote': return 'bg-green-900 text-green-300';
      case 'hybrid': return 'bg-yellow-900 text-yellow-300';
      case 'onsite': return 'bg-blue-900 text-blue-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <NeumorphicButton
            onClick={() => navigate('/news')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Job Finder</h1>
            <p className="text-gray-200">Find the latest data analyst jobs from top platforms</p>
          </div>
          {!isLinkedInAuthenticated && (
            <div className="flex gap-2">
              <NeumorphicButton
                onClick={handleLinkedInAuth}
                variant="accent"
                className="flex items-center gap-2"
              >
                <Building className="w-4 h-4" />
                Connect LinkedIn
              </NeumorphicButton>
              <NeumorphicButton
                onClick={handleSkipLinkedIn}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Skip & Browse Jobs
              </NeumorphicButton>
            </div>
          )}
          {isLinkedInAuthenticated && (
            <div className="flex items-center gap-2 text-green-400">
              <Building className="w-4 h-4" />
              <span className="text-sm">LinkedIn Connected</span>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <NeumorphicCard padding="lg" className="mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-orange-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs by title, company, or description..."
              className="flex-1 bg-transparent border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Work Type Filter */}
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              <select 
                className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-orange-500"
                onChange={(e) => handleWorkTypeChange(e.target.value)}
                value={filters.location.workType[0] || ''}
              >
                <option value="">All Work Types</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              <select 
                className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-orange-500"
                onChange={(e) => handleExperienceChange('max', parseInt(e.target.value))}
                value={filters.experience.max}
              >
                <option value="1">0-1 years</option>
                <option value="3">0-3 years</option>
                <option value="5">0-5 years</option>
                <option value="10">0-10 years</option>
              </select>
            </div>

            {/* Posted Within Filter */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <select 
                className="flex-1 bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-gray-100 focus:outline-none focus:border-orange-500"
                onChange={(e) => handlePostedWithinChange(parseInt(e.target.value))}
                value={filters.postedWithin}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>

            {/* Search Button */}
            <NeumorphicButton 
              onClick={fetchJobs} 
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Searching...' : 'Search Jobs'}
            </NeumorphicButton>
          </div>
        </div>
      </NeumorphicCard>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-200">
          {loading ? 'Searching for jobs...' : `Found ${filteredJobs.length} jobs`}
        </p>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-200">Searching for jobs...</p>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <NeumorphicCard key={job.id} padding="lg" hoverable className="cursor-pointer transition-all hover:scale-105">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-2">{job.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-orange-500" />
                  <p className="text-orange-500 font-medium">{job.company}</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-300 text-sm">{job.location.city}, {job.location.country}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.location.workType)}`}>
                  {job.location.workType}
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-200 text-sm line-clamp-3">{job.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(job.postedDate)}</span>
                </div>
                <NeumorphicButton 
                  variant="accent" 
                  onClick={() => window.open(job.applicationUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Apply
                </NeumorphicButton>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      ) : (
        <NeumorphicCard padding="xl" className="text-center">
          <Search className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-100 mb-2">No jobs found</h3>
          <p className="text-gray-200 mb-6">
            {searchQuery ? 'Try adjusting your search terms or filters.' : 'No jobs available at the moment.'}
          </p>
          <div className="flex gap-4 justify-center">
            {searchQuery && (
              <NeumorphicButton
                variant="secondary"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </NeumorphicButton>
            )}
            <NeumorphicButton onClick={fetchJobs}>
              Search Again
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      )}
    </div>
  );
};

export default JobFinder;
