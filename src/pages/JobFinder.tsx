import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Briefcase, DollarSign, Calendar, ExternalLink, Linkedin } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import { JobPosting, JobFilters } from '../types/jobTypes';
import { JobScrapingService } from '../services/jobScrapingService';
import { LinkedInJobService } from '../services/linkedinJobService';

const JobFinder: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [workType, setWorkType] = useState<'all' | 'remote' | 'hybrid' | 'onsite'>('all');
  const [isLinkedInAuthenticated, setIsLinkedInAuthenticated] = useState(false);
  
  const jobScrapingService = new JobScrapingService();
  const linkedinJobService = new LinkedInJobService();

  useEffect(() => {
    fetchJobs();
    setIsLinkedInAuthenticated(linkedinJobService.isAuthenticated());
  }, []);

  // Handle LinkedIn OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state === 'linkedin_auth_state') {
      handleLinkedInCallback();
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const filters: JobFilters = {
        keywords: searchTerm,
        location: location,
        workType: workType,
        experience: 'all',
        salary: 'all'
      };
      
      const jobData = await jobScrapingService.getAllJobs(filters);
      setJobs(jobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkedInCallback = async () => {
    try {
      const success = await linkedinJobService.handleCallback();
      if (success) {
        setIsLinkedInAuthenticated(true);
        fetchJobs(); // Refresh jobs after authentication
      }
    } catch (error) {
      console.error('LinkedIn callback error:', error);
    }
  };

  const handleLinkedInAuth = () => {
    linkedinJobService.authenticateWithLinkedIn();
  };

  const handleSkipLinkedIn = () => {
    fetchJobs();
  };

  const handleSearch = () => {
    fetchJobs();
  };

  const formatSalary = (job: JobPosting) => {
    if (!job.salary.isDisclosed) return 'Salary not disclosed';
    if (job.salary.min === 0 && job.salary.max === 0) return 'Salary not disclosed';
    if (job.salary.min === job.salary.max) return `$${job.salary.min.toLocaleString()}`;
    return `$${job.salary.min.toLocaleString()} - $${job.salary.max.toLocaleString()}`;
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
      case 'remote': return 'text-green-400 bg-green-500/20';
      case 'hybrid': return 'text-blue-400 bg-blue-500/20';
      case 'onsite': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/news')}
              className="p-3 rounded-2xl bg-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 text-white hover:bg-orange-600"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Job Finder</h1>
              <p className="text-gray-300">Find your next data analyst role</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isLinkedInAuthenticated ? (
              <div className="flex items-center space-x-2 text-green-400">
                <Linkedin size={20} />
                <span className="font-medium">LinkedIn Connected</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLinkedInAuth}
                  className="px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:bg-orange-600"
                >
                  <Linkedin size={20} />
                  <span>Connect LinkedIn</span>
                </button>
                <button
                  onClick={handleSkipLinkedIn}
                  className="px-6 py-3 bg-gray-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-500"
                >
                  Skip & Browse Jobs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <NeumorphicCard className="mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Data Analyst, Python, SQL..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-0 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State, Country"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border-0 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Work Type</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl border-0 bg-gray-800 text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search Jobs'}
              </button>
            </div>
          </div>
        </NeumorphicCard>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {jobs.length} Jobs Found
          </h2>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <NeumorphicCard key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-3 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded"></div>
              </NeumorphicCard>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <NeumorphicCard key={job.id} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-300 font-medium">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(job.location.workType)}`}>
                    {job.location.workType}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">
                      {job.location.city}, {job.location.state || job.location.country}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <DollarSign size={16} className="mr-2" />
                    <span className="text-sm">{formatSalary(job)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{formatDate(job.postedDate)}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full">
                      +{job.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 capitalize">
                    {job.source} • {job.jobType}
                  </span>
                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <span className="text-sm font-medium">Apply</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        ) : (
          <NeumorphicCard className="p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Jobs Found</h3>
            <p className="text-gray-300 mb-6">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Search Again
            </button>
          </NeumorphicCard>
        )}
      </div>
    </div>
  );
};

export default JobFinder;
