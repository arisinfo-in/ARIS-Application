import React, { useState, useEffect, useMemo } from 'react';
import { Briefcase, Plus, Search, Filter, RefreshCw, CheckCircle, X, Eye, Trash2, AlertCircle } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, Job } from '../firebase/firestore';
import { linkedinJobsService, LinkedInJobSearchParams } from '../services/linkedinJobsService';
import { googleJobsService, GoogleJobSearchParams } from '../services/googleJobsService';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

type Platform = 'LinkedIn' | 'GoogleJobs';

const AdminJobs: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState({ current: 0, total: 0 });
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [activePlatform, setActivePlatform] = useState<Platform>('LinkedIn');

  // Get API keys from environment
  const linkedinApiKey = import.meta.env.VITE_RAPIDAPI_KEY || '';
  const googleJobsApiKey = import.meta.env.VITE_GOOGLE_JOBS_RAPIDAPI_KEY || '';

  // LinkedIn Search Parameters
  const [linkedinSearchParams, setLinkedinSearchParams] = useState<LinkedInJobSearchParams>({
    limit: 10,
    offset: 0,
    title_filter: 'Data Analyst OR "Data Scientist" OR "Business Analyst" OR "Analytics Engineer" OR "BI Analyst" OR "Financial Analyst"',
    location_filter: 'Hyderabad, India',
    description_type: 'text'
  });

  // Google Jobs Search Parameters
  const [googleJobsSearchParams, setGoogleJobsSearchParams] = useState<GoogleJobSearchParams>({
    query: 'Data Analyst',
    page: 1,
    num_pages: 1,
    country: 'in',
    language: 'en',
    date_posted: 'all'
  });

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

  useEffect(() => {
    loadJobs();
  }, [activePlatform]);


  const handleSyncJobs = async () => {
    // Handle LinkedIn
    if (activePlatform === 'LinkedIn') {
      if (!linkedinApiKey) {
        setSyncResult({ success: false, message: 'LinkedIn RapidAPI key not found. Please add VITE_RAPIDAPI_KEY to your .env file.' });
        return;
      }

      setSyncing(true);
      setSyncProgress({ current: 0, total: 0 });
      setSyncResult(null);

      try {
        const limit = linkedinSearchParams.limit || 10;
        
        setSyncProgress({ current: 0, total: limit });

        // Fetch jobs from LinkedIn API
        const response = await linkedinJobsService.fetchJobs(
          { ...linkedinSearchParams, limit, offset: 0 },
          linkedinApiKey
        );

        const allJobs = response.jobs;
        setSyncProgress({ current: allJobs.length, total: limit });

        // Store jobs in Firestore
        let saved = 0;
        let skipped = 0;
        const now = new Date().toISOString();

        for (const job of allJobs) {
          try {
            // Check if job already exists
            const existingJob = await firestoreOperations.getJobByLinkedInId(job.id);
            
            if (existingJob) {
              skipped++;
              continue;
            }

            // Create job document
            const jobData: Omit<Job, 'id'> = {
              platform: 'LinkedIn',
              linkedinId: job.id,
            date_posted: job.date_posted,
            date_created: job.date_created,
            title: job.title,
            organization: job.organization,
            organization_url: job.organization_url,
            date_validthrough: job.date_validthrough,
            locations_raw: job.locations_raw,
            salary_raw: job.salary_raw,
            employment_type: job.employment_type,
            url: job.url,
            source_type: job.source_type,
            source: job.source,
            source_domain: job.source_domain,
            organization_logo: job.organization_logo,
            cities_derived: job.cities_derived,
            counties_derived: job.counties_derived,
            regions_derived: job.regions_derived,
            countries_derived: job.countries_derived,
            locations_derived: job.locations_derived,
            timezones_derived: job.timezones_derived,
            lats_derived: job.lats_derived,
            lngs_derived: job.lngs_derived,
            remote_derived: job.remote_derived,
            linkedin_org_employees: job.linkedin_org_employees,
            linkedin_org_url: job.linkedin_org_url,
            linkedin_org_size: job.linkedin_org_size,
            linkedin_org_slogan: job.linkedin_org_slogan,
            linkedin_org_industry: job.linkedin_org_industry,
            linkedin_org_followers: job.linkedin_org_followers,
            linkedin_org_headquarters: job.linkedin_org_headquarters,
            linkedin_org_type: job.linkedin_org_type,
            linkedin_org_foundeddate: job.linkedin_org_foundeddate,
            linkedin_org_specialties: job.linkedin_org_specialties,
            linkedin_org_locations: job.linkedin_org_locations,
            linkedin_org_description: job.linkedin_org_description,
            linkedin_org_recruitment_agency_derived: job.linkedin_org_recruitment_agency_derived,
            seniority: job.seniority,
            directapply: job.directapply,
            linkedin_org_slug: job.linkedin_org_slug,
            external_apply_url: job.external_apply_url,
            description_text: job.description_text,
            syncedAt: now,
            syncedBy: user?.uid || 'unknown',
            createdAt: now
          };

          await firestoreOperations.createJob(jobData);
          saved++;
        } catch (error) {
          console.error('Error saving job:', error);
        }
      }

      setSyncResult({
        success: true,
        message: `LinkedIn sync complete! Saved ${saved} new jobs, skipped ${skipped} duplicates.`
      });

      // Reload jobs
      await loadJobs();
    } catch (error: any) {
      setSyncResult({
        success: false,
        message: error.message || 'Failed to sync LinkedIn jobs'
      });
    } finally {
      setSyncing(false);
      setSyncProgress({ current: 0, total: 0 });
    }
      return;
    }

    // Handle Google Jobs
    if (activePlatform === 'GoogleJobs') {
      if (!googleJobsApiKey) {
        setSyncResult({ success: false, message: 'Google Jobs RapidAPI key not found. Please add VITE_GOOGLE_JOBS_RAPIDAPI_KEY to your .env file.' });
        return;
      }

      setSyncing(true);
      setSyncProgress({ current: 0, total: 0 });
      setSyncResult(null);

      try {
        const numPages = googleJobsSearchParams.num_pages || 1;
        const jobsPerPage = 10;
        const maxJobs = numPages * jobsPerPage;
        setSyncProgress({ current: 0, total: maxJobs });

        console.log('Fetching Google Jobs with params:', googleJobsSearchParams);

        // Fetch jobs from Google Jobs API
        const response = await googleJobsService.fetchJobs(
          googleJobsSearchParams,
          googleJobsApiKey
        );

        console.log('Google Jobs API response:', response);

        const allJobs = response.data;
        setSyncProgress({ current: allJobs.length, total: maxJobs });

        // Store jobs in Firestore
        let saved = 0;
        let skipped = 0;
        const now = new Date().toISOString();

        for (const job of allJobs) {
          try {
            // Check if job already exists
            const existingJob = await firestoreOperations.getJobByGoogleJobsId(job.job_id);
            
            if (existingJob) {
              skipped++;
              continue;
            }

            // Convert Google Jobs job to our Job format
            const jobData: Omit<Job, 'id'> = {
              platform: 'GoogleJobs',
              googleJobsId: job.job_id,
              title: job.job_title,
              organization: job.employer_name,
              organization_url: job.employer_website,
              organization_logo: job.employer_logo,
              url: job.job_apply_link,
              date_posted: job.job_posted_at_datetime_utc || new Date().toISOString(),
              date_created: new Date().toISOString(),
              employment_type: job.job_employment_types || [job.job_employment_type],
              remote_derived: job.job_is_remote,
              locations_derived: job.job_location ? [job.job_location] : [],
              cities_derived: job.job_city ? [job.job_city] : [],
              countries_derived: job.job_country ? [job.job_country] : [],
              description_text: job.job_description,
              // Google Jobs specific fields
              job_publisher: job.job_publisher,
              job_apply_is_direct: job.job_apply_is_direct,
              job_min_salary: job.job_min_salary,
              job_max_salary: job.job_max_salary,
              job_salary_period: job.job_salary_period,
              job_benefits: job.job_benefits,
              job_highlights: job.job_highlights,
              // Metadata
              syncedAt: now,
              syncedBy: user?.uid || 'unknown',
              createdAt: now
            };

            await firestoreOperations.createJob(jobData);
            saved++;
          } catch (error) {
            console.error('Error saving job:', error);
          }
        }

        setSyncResult({
          success: true,
          message: `Google Jobs sync complete! Saved ${saved} new jobs, skipped ${skipped} duplicates.`
        });

        // Reload jobs
        await loadJobs();
      } catch (error: any) {
        setSyncResult({
          success: false,
          message: error.message || 'Failed to sync Google Jobs'
        });
      } finally {
        setSyncing(false);
        setSyncProgress({ current: 0, total: 0 });
      }
      return;
    }
  };

  const filteredJobs = useMemo(() => {
    if (!searchQuery.trim()) return jobs;
    
    const query = searchQuery.toLowerCase();
    return jobs.filter(job =>
      job.title?.toLowerCase().includes(query) ||
      job.organization?.toLowerCase().includes(query) ||
      job.locations_derived?.some(loc => loc.toLowerCase().includes(query)) ||
      job.description_text?.toLowerCase().includes(query)
    );
  }, [jobs, searchQuery]);

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      await firestoreOperations.deleteJob(jobId);
      await loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Job Management</h1>
            <p className="text-gray-200">Manage job postings from multiple platforms</p>
          </div>
          <div className="flex gap-3">
            <NeumorphicButton
              variant="ghost"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              icon={RefreshCw}
              onClick={handleSyncJobs}
                disabled={
                syncing || 
                (activePlatform === 'LinkedIn' && !linkedinApiKey) ||
                (activePlatform === 'GoogleJobs' && !googleJobsApiKey)
              }
            >
              {syncing ? 'Syncing...' : `Sync ${activePlatform === 'GoogleJobs' ? 'All Jobs' : activePlatform} Jobs`}
            </NeumorphicButton>
          </div>
        </div>

        {/* Platform Tabs */}
        <div className="flex gap-2 mb-6">
          {(['LinkedIn', 'GoogleJobs'] as Platform[]).map((platform) => {
            const displayName = platform === 'GoogleJobs' ? 'All Jobs' : platform;
            return (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activePlatform === platform
                    ? 'bg-orange-gradient text-gray-100 shadow-[8px_8px_16px_rgba(249,115,22,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)]'
                    : 'bg-gray-800 text-gray-300 hover:text-orange-400 hover:bg-gray-700'
                }`}
              >
                {displayName}
              </button>
            );
          })}
        </div>

        {/* Sync Status */}
        {(syncResult || syncing) && (
          <NeumorphicCard padding="lg" className="mb-6">
            {syncing && (
              <div className="p-3 bg-blue-500/20 rounded-xl mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400">Syncing jobs...</span>
                  <span className="text-sm text-blue-300">
                    {syncProgress.current} / {syncProgress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: syncProgress.total > 0
                        ? `${(syncProgress.current / syncProgress.total) * 100}%`
                        : '0%'
                    }}
                  />
                </div>
              </div>
            )}

            {syncResult && (
              <div className={`p-3 rounded-xl flex items-center gap-2 ${
                syncResult.success
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {syncResult.success ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{syncResult.message}</span>
              </div>
            )}
          </NeumorphicCard>
        )}

        {/* Search Parameters / Filters */}
        {showFilters && (
          <NeumorphicCard padding="lg" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-orange-400" />
                Search Parameters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Platform-specific filters */}
            {activePlatform === 'LinkedIn' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Limit (per request)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={linkedinSearchParams.limit || 10}
                    onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, limit: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title Filter
                  </label>
                  <input
                    type="text"
                    value={linkedinSearchParams.title_filter || ''}
                    onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, title_filter: e.target.value || undefined })}
                    placeholder="e.g., Data Engineer"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location Filter
                  </label>
                  <input
                    type="text"
                    value={linkedinSearchParams.location_filter || ''}
                    onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, location_filter: e.target.value || undefined })}
                    placeholder='e.g., "United States" OR "United Kingdom"'
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Employment Type
                  </label>
                  <select
                    value={linkedinSearchParams.type_filter || ''}
                    onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, type_filter: e.target.value || undefined })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Types (Default)</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="INTERN">Intern</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="VOLUNTEER">Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Seniority Level
                  </label>
                  <select
                    value={linkedinSearchParams.seniority_filter || ''}
                    onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, seniority_filter: e.target.value || undefined })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Levels (Default)</option>
                    <option value="Entry level">Entry Level</option>
                    <option value="Mid-Senior level">Mid-Senior Level</option>
                    <option value="Associate">Associate</option>
                    <option value="Director">Director</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={linkedinSearchParams.remote === true}
                      onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, remote: e.target.checked ? true : undefined })}
                      className="w-4 h-4 rounded"
                    />
                    Remote Only
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={linkedinSearchParams.description_type === 'text'}
                      onChange={(e) => setLinkedinSearchParams({ ...linkedinSearchParams, description_type: e.target.checked ? 'text' : undefined })}
                      className="w-4 h-4 rounded"
                    />
                    Include Full Description
                  </label>
                </div>
              </div>
            )}

            {activePlatform === 'GoogleJobs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Query (Required)
                  </label>
                  <input
                    type="text"
                    value={googleJobsSearchParams.query}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, query: e.target.value })}
                    placeholder="e.g., Data Analyst in Hyderabad"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country Code
                  </label>
                  <input
                    type="text"
                    value={googleJobsSearchParams.country || ''}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, country: e.target.value || undefined })}
                    placeholder="e.g., in, us, uk (ISO 3166-1 alpha-2)"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language Code
                  </label>
                  <input
                    type="text"
                    value={googleJobsSearchParams.language || ''}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, language: e.target.value || undefined })}
                    placeholder="e.g., en (ISO 639)"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date Posted
                  </label>
                  <select
                    value={googleJobsSearchParams.date_posted || 'all'}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, date_posted: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="3days">Last 3 Days</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={googleJobsSearchParams.num_pages || 1}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, num_pages: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Employment Types
                  </label>
                  <input
                    type="text"
                    value={googleJobsSearchParams.employment_types || ''}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, employment_types: e.target.value || undefined })}
                    placeholder="FULLTIME, CONTRACTOR, PARTTIME, INTERN"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Radius (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={googleJobsSearchParams.radius || ''}
                    onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, radius: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={googleJobsSearchParams.work_from_home || false}
                      onChange={(e) => setGoogleJobsSearchParams({ ...googleJobsSearchParams, work_from_home: e.target.checked || undefined })}
                      className="w-4 h-4 rounded"
                    />
                    Work From Home Only
                  </label>
                </div>
              </div>
            )}
          </NeumorphicCard>
        )}
      </div>

      <div className="space-y-4">
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

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            {searchQuery ? `Filtered Jobs (${filteredJobs.length} of ${jobs.length})` : `All Jobs (${jobs.length})`}
          </h2>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <NeumorphicCard padding="lg" className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 text-lg mb-2">
              {jobs.length === 0 
                ? 'No jobs found'
                : 'No jobs match your search'}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {jobs.length === 0
                ? `Click "Sync ${activePlatform === 'GoogleJobs' ? 'All Jobs' : activePlatform} Jobs" to fetch jobs from ${activePlatform === 'LinkedIn' ? 'LinkedIn' : 'All Jobs'} API`
                : 'Try adjusting your search query'}
            </p>
            {jobs.length === 0 && (
              <NeumorphicButton
                variant="accent"
                icon={RefreshCw}
                onClick={handleSyncJobs}
                disabled={syncing || (activePlatform === 'LinkedIn' && !linkedinApiKey) || (activePlatform === 'GoogleJobs' && !googleJobsApiKey)}
              >
                Sync Jobs Now
              </NeumorphicButton>
            )}
          </NeumorphicCard>
        ) : (
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <NeumorphicCard key={job.id} padding="lg" hoverable>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {job.organization_logo && (
                        <img
                          src={job.organization_logo}
                          alt={job.organization}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-100 text-lg mb-1">{job.title}</h3>
                        <p className="text-gray-300 text-sm">{job.organization}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-200 flex-wrap mt-3">
                      {job.locations_derived && job.locations_derived.length > 0 && (
                        <span className="px-2 py-1 bg-gray-700 rounded">
                          📍 {job.locations_derived[0]}
                        </span>
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
                      <span className="text-gray-400">
                        Posted {format(new Date(job.date_posted), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {job.description_text && (
                      <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                        {job.description_text.substring(0, 200)}...
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5 text-gray-400" />
                    </a>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
