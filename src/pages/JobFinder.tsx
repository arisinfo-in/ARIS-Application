import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Search, Filter, MapPin, Building2, Clock, ExternalLink, X } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, Job } from '../firebase/firestore';
import { format } from 'date-fns';

type Platform = 'LinkedIn' | 'Naukri' | 'Indeed';

const JobFinder: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activePlatform, setActivePlatform] = useState<Platform>('LinkedIn');
  
  // Filters
  const [employmentType, setEmploymentType] = useState<string>('');
  const [seniorityLevel, setSeniorityLevel] = useState<string>('');


  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await firestoreOperations.getJobs(activePlatform);
        setJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [activePlatform]);

  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title?.toLowerCase().includes(query) ||
        job.organization?.toLowerCase().includes(query) ||
        job.locations_derived?.some(loc => loc.toLowerCase().includes(query)) ||
        job.description_text?.toLowerCase().includes(query)
      );
    }

    // Employment type filter
    if (employmentType) {
      filtered = filtered.filter(job => {
        if (!job.employment_type || job.employment_type.length === 0) return false;
        return job.employment_type.includes(employmentType);
      });
    }

    // Seniority level filter
    if (seniorityLevel) {
      filtered = filtered.filter(job => job.seniority === seniorityLevel);
    }

    return filtered;
  }, [jobs, searchQuery, employmentType, seniorityLevel]);

  const clearFilters = () => {
    setSearchQuery('');
    setEmploymentType('');
    setSeniorityLevel('');
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (employmentType) count++;
    if (seniorityLevel) count++;
    return count;
  }, [searchQuery, employmentType, seniorityLevel]);

  const employmentTypes = [
    { value: 'FULL_TIME', label: 'Full Time' },
    { value: 'PART_TIME', label: 'Part Time' },
    { value: 'CONTRACTOR', label: 'Contractor' },
    { value: 'INTERN', label: 'Intern' },
    { value: 'TEMPORARY', label: 'Temporary' },
    { value: 'VOLUNTEER', label: 'Volunteer' }
  ];

  const seniorityLevels = [
    { value: 'Entry level', label: 'Entry Level' },
    { value: 'Mid-Senior level', label: 'Mid-Senior Level' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Director', label: 'Director' },
    { value: 'Executive', label: 'Executive' }
  ];

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
            <p className="text-gray-200">Discover data analyst jobs from multiple platforms</p>
          </div>
          <NeumorphicButton
            variant="ghost"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </NeumorphicButton>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 mb-6">
          {(['LinkedIn'] as Platform[]).map((platform) => (
            <button
              key={platform}
              onClick={() => setActivePlatform(platform)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activePlatform === platform
                  ? 'bg-orange-gradient text-gray-100 shadow-[8px_8px_16px_rgba(249,115,22,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)]'
                  : 'bg-gray-800 text-gray-300 hover:text-orange-400 hover:bg-gray-700'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <NeumorphicCard padding="md" className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-gray-100 placeholder-gray-400"
            />
          </div>
        </NeumorphicCard>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Employment Type */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Employment Type
                </label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Types</option>
                  {employmentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Seniority Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seniority Level
                </label>
                <select
                  value={seniorityLevel}
                  onChange={(e) => setSeniorityLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All Levels</option>
                  {seniorityLevels.map(level => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </NeumorphicCard>
        )}
      </div>

      {/* Jobs List */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-100">
          {searchQuery || activeFiltersCount > 0
            ? `Found ${filteredJobs.length} job${filteredJobs.length !== 1 ? 's' : ''}`
            : `${jobs.length} Available Jobs`}
        </h2>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <NeumorphicCard padding="lg" className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300 text-lg mb-2">
            {jobs.length === 0 
              ? activePlatform === 'LinkedIn'
                ? 'No jobs available'
                : `${activePlatform} integration coming soon`
              : 'No jobs match your filters'}
          </p>
          <p className="text-gray-400 text-sm">
            {jobs.length === 0
              ? activePlatform === 'LinkedIn'
                ? 'Jobs will appear here once synced by admin'
                : `We're working on integrating ${activePlatform} jobs. Check back soon!`
              : 'Try adjusting your search or filters'}
          </p>
          {activeFiltersCount > 0 && (
            <NeumorphicButton variant="ghost" onClick={clearFilters} className="mt-4">
              Clear Filters
            </NeumorphicButton>
          )}
        </NeumorphicCard>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <NeumorphicCard key={job.id} padding="lg" hoverable>
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                {job.organization_logo && (
                  <img
                    src={job.organization_logo}
                    alt={job.organization}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}

                {/* Job Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-100 text-xl mb-1">{job.title}</h3>
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Building2 className="w-4 h-4" />
                        <span>{job.organization}</span>
                      </div>
                    </div>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors flex-shrink-0"
                    >
                      <span>Apply</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Job Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-200 mb-3">
                    {job.locations_derived && job.locations_derived.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{job.locations_derived[0]}</span>
                      </div>
                    )}
                    {job.seniority && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                        {job.seniority}
                      </span>
                    )}
                    {job.employment_type && job.employment_type.length > 0 && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">
                        {job.employment_type[0]}
                      </span>
                    )}
                    {job.remote_derived && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                        Remote
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Posted {format(new Date(job.date_posted), 'MMM d, yyyy')}</span>
                    </div>
                  </div>

                  {/* Job Description Preview */}
                  {job.description_text && (
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {job.description_text.substring(0, 200)}...
                    </p>
                  )}

                  {/* Additional Info */}
                  {job.linkedin_org_industry && (
                    <p className="text-xs text-gray-500 mt-2">
                      Industry: {job.linkedin_org_industry}
                    </p>
                  )}
                </div>
              </div>
            </NeumorphicCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobFinder;

