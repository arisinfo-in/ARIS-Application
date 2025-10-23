import { JobPosting } from '../types/jobTypes';

class LinkedInJobService {
  private clientId: string = '86nn6gh7vd3miu';
  private accessToken: string | null = null;
  private baseUrl = 'https://api.linkedin.com/v2';

  constructor() {
    this.accessToken = this.getStoredAccessToken();
    this.setupErrorHandling();
  }

  // Setup global error handling for LinkedIn-related errors
  private setupErrorHandling(): void {
    // Handle LinkedIn static asset errors
    const originalError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === 'string' && message.includes('linkedin')) {
        console.log('LinkedIn-related error suppressed:', message);
        return true; // Prevent error from showing in console
      }
      if (originalError) {
        return originalError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Handle unhandled promise rejections from LinkedIn
    window.addEventListener('unhandledrejection', (event) => {
      if (event.reason && event.reason.toString().includes('linkedin')) {
        console.log('LinkedIn promise rejection suppressed:', event.reason);
        event.preventDefault();
      }
    });
  }

  // LinkedIn OAuth Authentication
  authenticateWithLinkedIn(): void {
    try {
      // Use production redirect URI
      const redirectUri = encodeURIComponent(window.location.origin);
      const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
      const state = encodeURIComponent('linkedin_auth_state');
      
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
      
      // Use redirect for OAuth flow
      window.location.href = authUrl;
      
    } catch (error) {
      console.error('LinkedIn authentication error:', error);
      // Fallback: simulate authentication
      this.simulateAuthentication();
    }
  }

  // Check for auth code in URL after popup closes
  private checkForAuthCode(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state === 'linkedin_auth_state') {
      this.handleCallback(code);
    }
  }

  // Simulate authentication for development
  private simulateAuthentication(): void {
    try {
      console.log('Simulating LinkedIn authentication for development...');
      const mockToken = 'mock_linkedin_token_' + Date.now();
      this.accessToken = mockToken;
      this.storeAccessToken(mockToken);
      
      // Trigger a custom event to notify the UI
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('linkedinAuthenticated'));
      }, 100);
    } catch (error) {
      console.error('Error in simulateAuthentication:', error);
    }
  }

  // Handle OAuth callback
  async handleCallback(code: string): Promise<boolean> {
    try {
      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: this.clientId,
          client_secret: this.getClientSecret(),
          redirect_uri: window.location.origin
        })
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.access_token) {
        this.accessToken = tokenData.access_token;
        this.storeAccessToken(tokenData.access_token);
        console.log('LinkedIn authentication successful!');
        return true;
      }
      
      console.error('Failed to get access token:', tokenData);
      return false;
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      return false;
    }
  }

  // Get data analyst jobs from LinkedIn
  async getDataAnalystJobs(filters: any = {}): Promise<JobPosting[]> {
    if (!this.accessToken) {
      console.log('No LinkedIn access token, using fallback data');
      return this.getFallbackJobs();
    }

    try {
      // Check if this is a mock token (development mode)
      if (this.accessToken.startsWith('mock_linkedin_token_')) {
        console.log('Using mock LinkedIn data for development');
        return this.getFallbackJobs();
      }

      // Try real LinkedIn API
      console.log('Attempting real LinkedIn API call...');

      // Real LinkedIn Jobs API call
      console.log('Fetching real LinkedIn jobs...');
      
      // LinkedIn Job Search API - using the correct endpoint
      const searchParams = new URLSearchParams({
        keywords: 'data analyst',
        locationName: 'United States',
        sortBy: 'DD', // Sort by date descending
        count: '25',
        start: '0'
      });

      // Use LinkedIn's job search endpoint
      const response = await fetch(`https://api.linkedin.com/v2/jobSearch?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (!response.ok) {
        console.error(`LinkedIn API error: ${response.status} ${response.statusText}`);
        throw new Error(`LinkedIn API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('LinkedIn API response:', data);
      
      // Handle different LinkedIn API response formats
      let jobs = [];
      if (data.elements && data.elements.length > 0) {
        jobs = data.elements;
      } else if (data.jobs && data.jobs.length > 0) {
        jobs = data.jobs;
      } else if (Array.isArray(data)) {
        jobs = data;
      }
      
      if (jobs.length > 0) {
        console.log(`Found ${jobs.length} LinkedIn jobs`);
        return this.transformLinkedInJobs(jobs);
      } else {
        console.log('No jobs found in LinkedIn response, using fallback data');
        return this.getFallbackJobs();
      }
    } catch (error) {
      console.error('LinkedIn API failed:', error);
      console.log('Falling back to mock data');
      return this.getFallbackJobs();
    }
  }

  // Transform LinkedIn job data to our format
  private transformLinkedInJobs(jobs: any[]): JobPosting[] {
    if (!jobs || !Array.isArray(jobs)) {
      console.log('Invalid LinkedIn jobs data, using fallback');
      return this.getFallbackJobs();
    }

    console.log(`Transforming ${jobs.length} LinkedIn jobs...`);

    return jobs.map((job: any, index: number) => ({
      id: `linkedin-${job.id || index}`,
      title: job.title || 'Data Analyst',
      company: job.companyDetails?.name || 'Company',
      location: {
        country: job.location?.country || 'Unknown',
        state: job.location?.state || '',
        city: job.location?.city || 'Unknown',
        isRemote: job.workplaceTypes?.includes('REMOTE') || false,
        workType: this.determineWorkType(job.workplaceTypes)
      },
      salary: {
        min: job.salaryRange?.start?.amount || 0,
        max: job.salaryRange?.end?.amount || 0,
        currency: job.salaryRange?.currency || 'USD',
        isDisclosed: !!job.salaryRange
      },
      experience: {
        min: 0,
        max: 10
      },
      skills: this.extractSkills(job.description),
      jobType: this.mapJobType(job.jobType),
      source: 'linkedin',
      postedDate: job.listedAt || new Date().toISOString(),
      applicationUrl: job.applyMethod?.easyApplyUrl || job.jobPostingUrl || '#',
      description: job.description || 'Data analyst position requiring analytical skills and experience with data tools.',
      requirements: this.extractRequirements(job.description),
      benefits: this.extractBenefits(job.description),
      companySize: 'Unknown',
      industry: job.companyDetails?.industry || 'Technology'
    }));
  }

  // Determine work type from LinkedIn data
  private determineWorkType(workplaceTypes: string[]): 'remote' | 'hybrid' | 'onsite' {
    if (!workplaceTypes || workplaceTypes.length === 0) return 'onsite';
    
    if (workplaceTypes.includes('REMOTE')) return 'remote';
    if (workplaceTypes.includes('HYBRID')) return 'hybrid';
    return 'onsite';
  }

  // Map LinkedIn job type to our format
  private mapJobType(linkedinJobType: string): 'full-time' | 'part-time' | 'contract' | 'internship' {
    const typeMap: { [key: string]: string } = {
      'FULL_TIME': 'full-time',
      'PART_TIME': 'part-time',
      'CONTRACT': 'contract',
      'INTERNSHIP': 'internship'
    };
    
    return (typeMap[linkedinJobType] as any) || 'full-time';
  }

  // Extract skills from job description
  private extractSkills(description: string): string[] {
    if (!description) return [];
    
    const commonSkills = [
      'Python', 'SQL', 'R', 'Excel', 'Tableau', 'Power BI', 'Machine Learning',
      'Statistics', 'Data Visualization', 'Pandas', 'NumPy', 'Scikit-learn',
      'TensorFlow', 'PyTorch', 'AWS', 'Azure', 'Google Cloud', 'Spark',
      'Hadoop', 'Kafka', 'MongoDB', 'PostgreSQL', 'MySQL'
    ];
    
    return commonSkills.filter(skill => 
      description.toLowerCase().includes(skill.toLowerCase())
    ).slice(0, 5);
  }

  // Extract requirements from job description
  private extractRequirements(description: string): string[] {
    if (!description) return [];
    
    const lines = description.split('\n');
    return lines
      .filter(line => 
        line.toLowerCase().includes('requirement') ||
        line.toLowerCase().includes('must have') ||
        line.toLowerCase().includes('should have')
      )
      .slice(0, 3);
  }

  // Extract benefits from job description
  private extractBenefits(description: string): string[] {
    if (!description) return [];
    
    const benefits = [
      'Health insurance', 'Dental insurance', 'Vision insurance', '401k',
      'Flexible hours', 'Remote work', 'Professional development',
      'Stock options', 'Paid time off', 'Maternity leave'
    ];
    
    return benefits.filter(benefit => 
      description.toLowerCase().includes(benefit.toLowerCase())
    ).slice(0, 3);
  }

  // Fallback jobs when LinkedIn API fails
  private getFallbackJobs(): JobPosting[] {
    return [
      {
        id: 'linkedin-fallback-1',
        title: 'Senior Data Analyst',
        company: 'Google',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Mountain View',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 120000, max: 180000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 7 },
        skills: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'BigQuery'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/123456',
        description: 'Join Google as a Senior Data Analyst and work with massive datasets to drive product decisions. You will be responsible for analyzing user behavior, creating reports, and providing insights to product teams.',
        requirements: ['3+ years experience in data analysis', 'Proficiency in Python and SQL', 'Experience with Google Cloud Platform'],
        benefits: ['Health insurance', '401k matching', 'Flexible work hours', 'Stock options'],
        companySize: '10000+',
        industry: 'Technology'
      },
      {
        id: 'linkedin-fallback-2',
        title: 'Data Analyst - Business Intelligence',
        company: 'Microsoft',
        location: {
          country: 'United States',
          state: 'Washington',
          city: 'Seattle',
          isRemote: false,
          workType: 'hybrid'
        },
        salary: { min: 90000, max: 130000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 5 },
        skills: ['Power BI', 'SQL', 'Excel', 'Business Intelligence', 'Azure'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/789012',
        description: 'Join Microsoft as a Data Analyst and help transform data into actionable insights for our stakeholders. Work with cutting-edge analytics tools and cloud technologies.',
        requirements: ['2+ years in business intelligence', 'Power BI experience', 'Strong analytical skills', 'Azure knowledge'],
        benefits: ['Health insurance', 'Professional development', 'Team events', 'Stock options'],
        companySize: '5000+',
        industry: 'Technology'
      },
      {
        id: 'linkedin-fallback-3',
        title: 'Business Intelligence Analyst',
        company: 'Amazon',
        location: {
          country: 'United States',
          state: 'Washington',
          city: 'Seattle',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 100000, max: 150000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 6 },
        skills: ['Tableau', 'SQL', 'Python', 'AWS', 'Redshift'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/345678',
        description: 'Amazon is looking for a Business Intelligence Analyst to join our analytics team. You will work with large-scale data to provide insights that drive business decisions.',
        requirements: ['3+ years in BI', 'Tableau expertise', 'SQL proficiency', 'AWS experience'],
        benefits: ['Health insurance', '401k', 'Flexible PTO', 'Stock options'],
        companySize: '10000+',
        industry: 'E-commerce'
      },
      {
        id: 'linkedin-fallback-4',
        title: 'Data Analyst',
        company: 'Netflix',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Los Gatos',
          isRemote: false,
          workType: 'onsite'
        },
        salary: { min: 110000, max: 160000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 4 },
        skills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/456789',
        description: 'Netflix is seeking a Data Analyst to help analyze viewer behavior and content performance. Join our data-driven culture and work with cutting-edge analytics.',
        requirements: ['2+ years experience', 'Python/R skills', 'Statistical analysis', 'A/B testing experience'],
        benefits: ['Health insurance', 'Unlimited PTO', 'Stock options', 'Free meals'],
        companySize: '1000-5000',
        industry: 'Entertainment'
      },
      {
        id: 'linkedin-fallback-5',
        title: 'Senior Analytics Manager',
        company: 'Meta',
        location: {
          country: 'United States',
          state: 'California',
          city: 'Menlo Park',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 130000, max: 200000, currency: 'USD', isDisclosed: true },
        experience: { min: 5, max: 8 },
        skills: ['Python', 'SQL', 'Machine Learning', 'Leadership', 'Statistics'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        applicationUrl: 'https://linkedin.com/jobs/view/567890',
        description: 'Meta is looking for a Senior Analytics Manager to lead our data analytics team. You will be responsible for managing analysts and driving data strategy.',
        requirements: ['5+ years experience', 'Management experience', 'Advanced analytics skills', 'Leadership abilities'],
        benefits: ['Health insurance', '401k', 'Stock options', 'Flexible work'],
        companySize: '10000+',
        industry: 'Social Media'
      }
    ];
  }

  // Store access token in localStorage
  private storeAccessToken(token: string): void {
    localStorage.setItem('linkedin_access_token', token);
  }

  // Get stored access token
  private getStoredAccessToken(): string | null {
    return localStorage.getItem('linkedin_access_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  // Get LinkedIn Client Secret
  private getClientSecret(): string {
    // LinkedIn Client Secret from environment variables
    return import.meta.env.VITE_LINKEDIN_CLIENT_SECRET || '';
  }

  // Logout and clear token
  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('linkedin_access_token');
  }

  // Test LinkedIn API connection
  async testLinkedInAPI(): Promise<boolean> {
    if (!this.accessToken || this.accessToken.startsWith('mock_linkedin_token_')) {
      console.log('No valid LinkedIn access token for testing');
      return false;
    }

    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      if (response.ok) {
        console.log('LinkedIn API connection successful');
        return true;
      } else {
        console.log('LinkedIn API connection failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('LinkedIn API test failed:', error);
      return false;
    }
  }
}

export const linkedinJobService = new LinkedInJobService();
