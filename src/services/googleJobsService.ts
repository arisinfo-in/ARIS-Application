export interface GoogleJobSearchParams {
  query: string;
  page?: number;
  num_pages?: number;
  country?: string;
  language?: string;
  date_posted?: 'all' | 'today' | '3days' | 'week' | 'month';
  work_from_home?: boolean;
  employment_types?: string; // Comma-separated: FULLTIME, CONTRACTOR, PARTTIME, INTERN
  job_requirements?: string; // Comma-separated: under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
  radius?: number;
  exclude_job_publishers?: string;
  fields?: string;
}

export interface GoogleJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo?: string;
  employer_website?: string;
  job_publisher: string;
  job_employment_type: string;
  job_employment_types?: string[];
  job_apply_link: string;
  job_apply_is_direct: boolean;
  apply_options?: Array<{
    publisher: string;
    apply_link: string;
    is_direct: boolean;
  }>;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at: string | null;
  job_posted_at_timestamp: number | null;
  job_posted_at_datetime_utc: string | null;
  job_location: string;
  job_city: string | null;
  job_state: string | null;
  job_country: string;
  job_latitude?: number;
  job_longitude?: number;
  job_benefits?: string[] | null;
  job_google_link: string;
  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_salary_period?: string | null;
  job_highlights?: {
    Qualifications?: string[];
    Benefits?: string[];
    Responsibilities?: string[];
  };
  job_onet_soc?: string | null;
  job_onet_job_zone?: string | null;
}

export interface GoogleJobsResponse {
  status: string;
  request_id: string;
  parameters: {
    query: string;
    page: number;
    num_pages: number;
    date_posted?: string;
    country?: string;
    language?: string;
  };
  data: GoogleJob[];
}

class GoogleJobsService {
  private apiKey: string;
  private apiHost: string;
  private baseUrl = 'https://jsearch.p.rapidapi.com';

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_JOBS_RAPIDAPI_KEY || '';
    this.apiHost = import.meta.env.VITE_GOOGLE_JOBS_RAPIDAPI_HOST || 'jsearch.p.rapidapi.com';
  }

  /**
   * Set API key dynamically (for admin configuration)
   */
  setAPIKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Test API connection
   */
  async testConnection(apiKey?: string): Promise<{ success: boolean; message: string }> {
    const key = apiKey || this.apiKey;
    if (!key) {
      return { success: false, message: 'API key is required' };
    }

    try {
      const params = new URLSearchParams({
        query: 'data analyst',
        page: '1',
        num_pages: '1'
      });

      const response = await fetch(`${this.baseUrl}/search?${params.toString()}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': this.apiHost,
          'x-rapidapi-key': key
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          message: `API Error: ${response.status} - ${errorText}`
        };
      }

      return { success: true, message: 'Connection successful' };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to connect to API'
      };
    }
  }

  /**
   * Build query parameters from search params
   */
  private buildQueryParams(params: GoogleJobSearchParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    queryParams.append('query', params.query);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.num_pages) queryParams.append('num_pages', params.num_pages.toString());
    if (params.country) queryParams.append('country', params.country);
    if (params.language) queryParams.append('language', params.language);
    if (params.date_posted) queryParams.append('date_posted', params.date_posted);
    if (params.work_from_home !== undefined) queryParams.append('work_from_home', params.work_from_home.toString());
    if (params.employment_types) queryParams.append('employment_types', params.employment_types);
    if (params.job_requirements) queryParams.append('job_requirements', params.job_requirements);
    if (params.radius) queryParams.append('radius', params.radius.toString());
    if (params.exclude_job_publishers) queryParams.append('exclude_job_publishers', params.exclude_job_publishers);
    if (params.fields) queryParams.append('fields', params.fields);

    return queryParams;
  }

  /**
   * Fetch jobs from Google Jobs API
   */
  async fetchJobs(
    params: GoogleJobSearchParams,
    apiKey?: string
  ): Promise<GoogleJobsResponse> {
    const key = apiKey || this.apiKey;
    if (!key) {
      throw new Error('Google Jobs RapidAPI key is required. Please configure it in admin settings.');
    }

    const queryParams = this.buildQueryParams(params);
    const url = `${this.baseUrl}/search?${queryParams.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': this.apiHost,
          'x-rapidapi-key': key
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `API Error: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorData.details || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        if (response.status === 400) {
          throw new Error(`Bad Request: ${errorMessage}. Please check your search parameters.`);
        }

        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        throw new Error(`API Error (${response.status}): ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(`Failed to fetch jobs: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Fetch multiple pages of jobs (for pagination)
   */
  async fetchJobsPages(
    params: GoogleJobSearchParams,
    maxPages: number = 3,
    apiKey?: string
  ): Promise<GoogleJob[]> {
    const allJobs: GoogleJob[] = [];

    for (let page = 1; page <= maxPages; page++) {
      const pageParams = {
        ...params,
        page,
        num_pages: 1
      };

      const response = await this.fetchJobs(pageParams, apiKey);
      allJobs.push(...response.data);

      // If we got fewer jobs than expected, we've reached the end
      if (response.data.length === 0) {
        break;
      }

      // Add a small delay between pages to avoid rate limiting
      if (page < maxPages) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return allJobs;
  }
}

export const googleJobsService = new GoogleJobsService();

