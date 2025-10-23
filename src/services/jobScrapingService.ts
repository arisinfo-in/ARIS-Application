import { JobPosting, JobFilters } from '../types/jobTypes';
import { linkedinJobService } from './linkedinJobService';

class JobScrapingService {
  private baseUrl = '/.netlify/functions';
  private cache = new Map<string, { data: JobPosting[]; timestamp: number }>();
  private cacheDuration = 3600000; // 1 hour
  private scrapingCacheKey = 'scraped_jobs_cache';

  async getAllJobs(filters: JobFilters): Promise<JobPosting[]> {
    const cacheKey = this.generateCacheKey(filters);
    const cached = this.getCachedJobs(cacheKey);
    
    if (cached) {
      console.log('Returning cached jobs');
      return cached;
    }

    const jobs = [];
    
    try {
      // LinkedIn API first (primary source)
      try {
        const linkedinJobs = await linkedinJobService.getDataAnalystJobs(filters);
        jobs.push(...linkedinJobs);
        console.log(`LinkedIn jobs: ${linkedinJobs.length}`);
      } catch (error) {
        console.log('LinkedIn API failed, trying other sources:', error);
      }
      
      // Fallback APIs
      const [githubJobs, remoteJobs] = await Promise.allSettled([
        this.getGitHubJobs(filters),
        this.getRemoteCoJobs(filters)
      ]);
      
      if (githubJobs.status === 'fulfilled') {
        jobs.push(...githubJobs.value);
        console.log(`GitHub jobs: ${githubJobs.value.length}`);
      }
      
      if (remoteJobs.status === 'fulfilled') {
        jobs.push(...remoteJobs.value);
        console.log(`Remote.co jobs: ${remoteJobs.value.length}`);
      }
      
      // Scraped jobs from Netlify functions
      try {
        const scrapedJobs = await this.getScrapedJobs(filters);
        jobs.push(...scrapedJobs);
        console.log(`Scraped jobs: ${scrapedJobs.length}`);
      } catch (error) {
        console.log('Scraping failed, continuing with other sources:', error);
      }
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    
    // If no jobs found from APIs, add mock data to ensure something is always shown
    if (jobs.length === 0) {
      console.log('No jobs from APIs, adding mock data');
      jobs.push(...this.getMockJobs());
    }
    
    const deduplicatedJobs = this.deduplicateJobs(jobs);
    this.setCachedJobs(cacheKey, deduplicatedJobs);
    
    return deduplicatedJobs;
  }

  private async getGitHubJobs(filters: JobFilters): Promise<JobPosting[]> {
    try {
      // GitHub Jobs API is deprecated, so we'll return empty array
      // In production, you could use alternative APIs like:
      // - Indeed API
      // - AngelList API
      // - Remote.co API
      console.log('GitHub Jobs API is deprecated, skipping...');
      return [];
    } catch (error) {
      console.error('GitHub jobs failed:', error);
      return [];
    }
  }

  private async getRemoteCoJobs(filters: JobFilters): Promise<JobPosting[]> {
    try {
      // Remote.co RSS might have CORS issues, so we'll return empty for now
      // In production, you could use server-side RSS parsing
      console.log('Remote.co RSS parsing skipped due to CORS...');
      return [];
    } catch (error) {
      console.error('Remote.co jobs failed:', error);
      return [];
    }
  }

  private async getScrapedJobs(filters: JobFilters): Promise<JobPosting[]> {
    try {
      // Check cache first
      const cachedJobs = this.getScrapedJobsFromCache();
      if (cachedJobs.length > 0) {
        console.log(`Using cached scraped jobs: ${cachedJobs.length} jobs`);
        return cachedJobs;
      }
      
      // Try LinkedIn scraping first
      try {
        const linkedinResponse = await fetch(`${this.baseUrl}/scrape-linkedin-jobs`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (linkedinResponse.ok) {
          const linkedinData = await linkedinResponse.json();
          if (linkedinData.jobs && linkedinData.jobs.length > 0) {
            console.log(`LinkedIn scraping successful: ${linkedinData.jobs.length} jobs`);
            this.cacheScrapedJobs(linkedinData.jobs);
            return linkedinData.jobs;
          }
        }
      } catch (error) {
        console.log('LinkedIn scraping failed, trying Indeed...', error);
      }
      
      // Try Indeed scraping as fallback
      try {
        const indeedResponse = await fetch(`${this.baseUrl}/scrape-indeed-jobs`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (indeedResponse.ok) {
          const indeedData = await indeedResponse.json();
          if (indeedData.jobs && indeedData.jobs.length > 0) {
            console.log(`Indeed scraping successful: ${indeedData.jobs.length} jobs`);
            this.cacheScrapedJobs(indeedData.jobs);
            return indeedData.jobs;
          }
        }
      } catch (error) {
        console.log('Indeed scraping failed, using mock data...', error);
      }
      
      // Final fallback to mock data
      console.log('All scraping failed, using enhanced mock data');
      return this.getMockJobs();
      
    } catch (error) {
      console.error('Scraping failed:', error);
      return this.getMockJobs();
    }
  }

  private parseRSSFeed(xml: string): JobPosting[] {
    // Simple RSS parsing - in production, use a proper XML parser
    const jobs: JobPosting[] = [];
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
    
    items.forEach((item, index) => {
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      
      if (titleMatch && linkMatch) {
        jobs.push({
          id: `remote-${index}`,
          title: titleMatch[1] || 'Remote Job',
          company: 'Remote Company',
          location: {
            country: 'Remote',
            state: '',
            city: 'Remote',
            isRemote: true,
            workType: 'remote'
          },
          salary: { min: 0, max: 0, currency: 'USD', isDisclosed: false },
          experience: { min: 0, max: 10 },
          skills: [],
          jobType: 'full-time',
          source: 'remote',
          postedDate: new Date().toISOString(),
          applicationUrl: linkMatch[1],
          description: descriptionMatch ? descriptionMatch[1] : '',
          requirements: [],
          benefits: [],
          companySize: '',
          industry: ''
        });
      }
    });
    
    return jobs;
  }

  private transformGitHubJobs(data: any[]): JobPosting[] {
    return data.map(job => ({
      id: `github-${job.id}`,
      title: job.title,
      company: job.company,
      location: {
        country: job.location || 'Unknown',
        state: '',
        city: job.location || 'Unknown',
        isRemote: job.type === 'Full Time',
        workType: 'onsite'
      },
      salary: { min: 0, max: 0, currency: 'USD', isDisclosed: false },
      experience: { min: 0, max: 10 },
      skills: [],
      jobType: 'full-time',
      source: 'github',
      postedDate: job.created_at,
      applicationUrl: job.url,
      description: job.description,
      requirements: [],
      benefits: [],
      companySize: '',
      industry: ''
    }));
  }

  private deduplicateJobs(jobs: JobPosting[]): JobPosting[] {
    const seen = new Set();
    return jobs.filter(job => {
      const key = `${job.title}-${job.company}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private generateCacheKey(filters: JobFilters): string {
    return JSON.stringify(filters);
  }

  private getCachedJobs(key: string): JobPosting[] | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    return null;
  }

  private setCachedJobs(key: string, jobs: JobPosting[]): void {
    this.cache.set(key, {
      data: jobs,
      timestamp: Date.now()
    });
  }

  private getMockJobs(): JobPosting[] {
    return [
      {
        id: 'mock-1',
        title: 'Senior Data Analyst',
        company: 'TechCorp Solutions',
        location: {
          country: 'United States',
          state: 'California',
          city: 'San Francisco',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 80000, max: 120000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 7 },
        skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/123456',
        description: 'We are looking for a Senior Data Analyst to join our growing team. You will be responsible for analyzing large datasets, creating reports, and providing insights to drive business decisions.',
        requirements: ['3+ years experience in data analysis', 'Proficiency in Python and SQL', 'Experience with visualization tools'],
        benefits: ['Health insurance', '401k matching', 'Flexible work hours'],
        companySize: '100-500',
        industry: 'Technology'
      },
      {
        id: 'mock-2',
        title: 'Data Analyst - Marketing Analytics',
        company: 'DataDriven Inc',
        location: {
          country: 'India',
          state: 'Karnataka',
          city: 'Bangalore',
          isRemote: false,
          workType: 'hybrid'
        },
        salary: { min: 600000, max: 900000, currency: 'INR', isDisclosed: true },
        experience: { min: 2, max: 5 },
        skills: ['R', 'Python', 'Google Analytics', 'Marketing Analytics'],
        jobType: 'full-time',
        source: 'naukri',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://naukri.com/job/123456',
        description: 'Join our marketing team as a Data Analyst to help optimize our digital marketing campaigns through data-driven insights and analysis.',
        requirements: ['2+ years in marketing analytics', 'Experience with Google Analytics', 'Strong analytical skills'],
        benefits: ['Health insurance', 'Learning budget', 'Team outings'],
        companySize: '50-100',
        industry: 'Marketing'
      },
      {
        id: 'mock-3',
        title: 'Junior Data Analyst',
        company: 'StartupXYZ',
        location: {
          country: 'United States',
          state: 'New York',
          city: 'New York',
          isRemote: false,
          workType: 'onsite'
        },
        salary: { min: 50000, max: 70000, currency: 'USD', isDisclosed: true },
        experience: { min: 0, max: 2 },
        skills: ['Excel', 'SQL', 'Power BI', 'Statistics'],
        jobType: 'full-time',
        source: 'github',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://github.com/jobs/123456',
        description: 'Perfect opportunity for a recent graduate to start their career in data analysis. We provide mentorship and training.',
        requirements: ['Bachelor degree in related field', 'Basic SQL knowledge', 'Eagerness to learn'],
        benefits: ['Mentorship program', 'Stock options', 'Flexible schedule'],
        companySize: '10-50',
        industry: 'Technology'
      },
      {
        id: 'mock-4',
        title: 'Business Intelligence Analyst',
        company: 'GlobalCorp',
        location: {
          country: 'United Kingdom',
          state: 'England',
          city: 'London',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 45000, max: 65000, currency: 'GBP', isDisclosed: true },
        experience: { min: 2, max: 4 },
        skills: ['Tableau', 'Power BI', 'SQL', 'Business Intelligence'],
        jobType: 'full-time',
        source: 'remote',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://remote.co/jobs/123456',
        description: 'We are seeking a Business Intelligence Analyst to help transform our data into actionable business insights.',
        requirements: ['2+ years BI experience', 'Tableau or Power BI expertise', 'Strong communication skills'],
        benefits: ['Remote work', 'Health insurance', 'Professional development'],
        companySize: '500+',
        industry: 'Consulting'
      },
      {
        id: 'mock-5',
        title: 'Data Analyst - E-commerce',
        company: 'ShopSmart',
        location: {
          country: 'India',
          state: 'Maharashtra',
          city: 'Mumbai',
          isRemote: false,
          workType: 'hybrid'
        },
        salary: { min: 500000, max: 800000, currency: 'INR', isDisclosed: true },
        experience: { min: 1, max: 3 },
        skills: ['Python', 'Pandas', 'E-commerce Analytics', 'A/B Testing'],
        jobType: 'full-time',
        source: 'naukri',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://naukri.com/job/789012',
        description: 'Join our e-commerce team to analyze customer behavior, optimize conversion rates, and drive growth through data insights.',
        requirements: ['1+ years in e-commerce analytics', 'Python experience', 'Understanding of online retail'],
        benefits: ['Performance bonus', 'Health insurance', 'Team events'],
        companySize: '100-500',
        industry: 'E-commerce'
      }
    ];
  }

  // Filter jobs based on criteria
  filterJobs(jobs: JobPosting[], filters: JobFilters): JobPosting[] {
    return jobs.filter(job => {
      // Work type filter
      if (filters.location.workType.length > 0 && !filters.location.workType.includes(job.location.workType)) {
        return false;
      }

      // Experience filter
      if (job.experience.min < filters.experience.min || job.experience.max > filters.experience.max) {
        return false;
      }

      // Salary filter
      if (job.salary.isDisclosed) {
        if (job.salary.min < filters.salary.min || job.salary.max > filters.salary.max) {
          return false;
        }
      }

      // Job type filter
      if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
        return false;
      }

      // Posted within filter
      const postedDate = new Date(job.postedDate);
      const daysSincePosted = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePosted > filters.postedWithin) {
        return false;
      }

      return true;
    });
  }

  // Cache scraped jobs
  private cacheScrapedJobs(jobs: JobPosting[]): void {
    const cacheData = {
      jobs: jobs,
      timestamp: Date.now(),
      expiry: Date.now() + (6 * 60 * 60 * 1000) // 6 hours
    };
    localStorage.setItem(this.scrapingCacheKey, JSON.stringify(cacheData));
  }

  // Get scraped jobs from cache
  private getScrapedJobsFromCache(): JobPosting[] {
    try {
      const cached = localStorage.getItem(this.scrapingCacheKey);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() < data.expiry) {
          return data.jobs || [];
        }
      }
    } catch (error) {
      console.error('Error reading scraped jobs cache:', error);
    }
    return [];
  }
}

export const jobScrapingService = new JobScrapingService();
