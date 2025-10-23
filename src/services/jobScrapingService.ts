import { JobPosting, JobFilters } from '../types/jobTypes';

export class JobScrapingService {
  private baseUrl: string;
  private cacheExpiry = 6 * 60 * 60 * 1000; // 6 hours
  private scrapingCacheKey = 'scraped_jobs_cache';

  constructor() {
    this.baseUrl = window.location.origin;
  }

  // Get all jobs from various sources
  async getAllJobs(filters: JobFilters): Promise<JobPosting[]> {
    try {
      console.log('Fetching jobs with filters:', filters);
      
      // Try scraped jobs first (LinkedIn + Indeed)
      const scrapedJobs = await this.getScrapedJobs(filters);
      console.log(`Scraped jobs: ${scrapedJobs.length}`);
      
      // Combine with other sources if needed
      const allJobs = [...scrapedJobs];
      
      // Remove duplicates based on title and company
      const uniqueJobs = this.removeDuplicates(allJobs);
      
      console.log(`Total unique jobs: ${uniqueJobs.length}`);
      return uniqueJobs;
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return this.getMockJobs();
    }
  }

  // Get scraped jobs from LinkedIn and Indeed
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
        const linkedinResponse = await fetch(`${this.baseUrl}/.netlify/functions/scrape-linkedin-jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
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
        console.log('LinkedIn scraping failed, trying Indeed...');
      }

      // Try Indeed scraping as fallback
      try {
        const indeedResponse = await fetch(`${this.baseUrl}/.netlify/functions/scrape-indeed-jobs`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
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
        console.log('Indeed scraping failed, using mock data...');
      }

      // If all scraping fails, use mock data
      console.log('All scraping failed, using enhanced mock data');
      return this.getMockJobs();
      
    } catch (error) {
      console.error('Scraping failed:', error);
      return this.getMockJobs();
    }
  }

  // Cache scraped jobs
  private cacheScrapedJobs(jobs: JobPosting[]): void {
    try {
      const cacheData = {
        jobs,
        timestamp: Date.now()
      };
      localStorage.setItem(this.scrapingCacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to cache scraped jobs:', error);
    }
  }

  // Get scraped jobs from cache
  private getScrapedJobsFromCache(): JobPosting[] {
    try {
      const cached = localStorage.getItem(this.scrapingCacheKey);
      if (cached) {
        const cacheData = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > this.cacheExpiry;
        
        if (!isExpired && cacheData.jobs) {
          return cacheData.jobs;
        }
      }
    } catch (error) {
      console.error('Failed to get cached jobs:', error);
    }
    return [];
  }

  // Enhanced mock jobs for development and fallback
  private getMockJobs(): JobPosting[] {
    return [
      {
        id: 'mock-1',
        title: 'Senior Data Analyst',
        company: 'Google',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Mountain View',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: {
          min: 120000,
          max: 180000,
          currency: 'USD',
          isDisclosed: true
        },
        experience: {
          min: 3,
          max: 7
        },
        skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
        jobType: 'full-time',
        source: 'mock',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://careers.google.com',
        description: 'Join Google as a Senior Data Analyst and work on cutting-edge data projects that impact billions of users worldwide.',
        requirements: ['3+ years experience', 'Python expertise', 'SQL proficiency'],
        benefits: ['Health insurance', '401k matching', 'Flexible work'],
        companySize: '10,000+',
        industry: 'Technology'
      },
      {
        id: 'mock-2',
        title: 'Business Intelligence Analyst',
        company: 'Microsoft',
        location: {
          country: 'United States',
          state: 'Washington',
          city: 'Seattle',
          isRemote: true,
          workType: 'remote'
        },
        salary: {
          min: 95000,
          max: 140000,
          currency: 'USD',
          isDisclosed: true
        },
        experience: {
          min: 2,
          max: 5
        },
        skills: ['Power BI', 'SQL', 'Excel', 'Data Visualization'],
        jobType: 'full-time',
        source: 'mock',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://careers.microsoft.com',
        description: 'Help Microsoft transform data into actionable insights that drive business decisions.',
        requirements: ['2+ years BI experience', 'Power BI expertise', 'SQL skills'],
        benefits: ['Competitive salary', 'Stock options', 'Remote work'],
        companySize: '10,000+',
        industry: 'Technology'
      },
      {
        id: 'mock-3',
        title: 'Data Analyst',
        company: 'Amazon',
        location: {
          country: 'United States',
          state: 'Washington',
          city: 'Seattle',
          isRemote: false,
          workType: 'onsite'
        },
        salary: {
          min: 85000,
          max: 130000,
          currency: 'USD',
          isDisclosed: true
        },
        experience: {
          min: 1,
          max: 4
        },
        skills: ['Python', 'R', 'SQL', 'AWS'],
        jobType: 'full-time',
        source: 'mock',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://amazon.jobs',
        description: 'Analyze customer data to drive Amazon\'s e-commerce growth and customer satisfaction.',
        requirements: ['1+ years experience', 'Python/R skills', 'SQL proficiency'],
        benefits: ['Health benefits', '401k', 'Career growth'],
        companySize: '10,000+',
        industry: 'E-commerce'
      },
      {
        id: 'mock-4',
        title: 'Analytics Engineer',
        company: 'Netflix',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Los Gatos',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: {
          min: 110000,
          max: 160000,
          currency: 'USD',
          isDisclosed: true
        },
        experience: {
          min: 2,
          max: 6
        },
        skills: ['Python', 'SQL', 'dbt', 'Airflow'],
        jobType: 'full-time',
        source: 'mock',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://jobs.netflix.com',
        description: 'Build data pipelines and analytics infrastructure for Netflix\'s streaming platform.',
        requirements: ['2+ years experience', 'Python expertise', 'SQL skills'],
        benefits: ['Unlimited PTO', 'Stock options', 'Flexible schedule'],
        companySize: '1,000-10,000',
        industry: 'Entertainment'
      },
      {
        id: 'mock-5',
        title: 'Data Scientist',
        company: 'Meta',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Menlo Park',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: {
          min: 130000,
          max: 200000,
          currency: 'USD',
          isDisclosed: true
        },
        experience: {
          min: 3,
          max: 8
        },
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        jobType: 'full-time',
        source: 'mock',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://www.metacareers.com',
        description: 'Apply advanced analytics and machine learning to improve Meta\'s social platforms.',
        requirements: ['3+ years experience', 'ML expertise', 'Python skills'],
        benefits: ['Top-tier benefits', 'Stock grants', 'Learning budget'],
        companySize: '10,000+',
        industry: 'Social Media'
      }
    ];
  }

  // Remove duplicate jobs
  private removeDuplicates(jobs: JobPosting[]): JobPosting[] {
    const seen = new Set();
    return jobs.filter(job => {
      const key = `${job.title}-${job.company}`.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
}
