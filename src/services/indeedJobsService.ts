export interface IndeedJobSearchParams {
  query: string;
  location?: string;
  page_id?: number;
  locality?: string;
  fromage?: number;
  radius?: number;
  sort?: 'date';
  job_type?: 'permanent' | 'contract' | 'temporary' | 'internship' | 'apprenticeship';
}

export interface IndeedJobSalary {
  max?: number;
  min?: number;
  type?: 'yearly' | 'hourly' | 'monthly';
}

export interface IndeedJob {
  company_name: string;
  formatted_relative_time: string;
  id: string;
  link: string;
  locality: string;
  location: string;
  pub_date_ts_milli: number;
  salary?: IndeedJobSalary;
  title: string;
}

export interface IndeedJobsResponse {
  count: number;
  hits: IndeedJob[];
  indeed_final_url?: string;
  next_page_id?: number;
  suggest_locality?: string | null;
}

class IndeedJobsService {
  private apiKey: string;
  private apiHost: string;
  private baseUrl = 'https://indeed12.p.rapidapi.com';

  constructor() {
    this.apiKey = import.meta.env.VITE_INDEED_RAPIDAPI_KEY || '';
    this.apiHost = import.meta.env.VITE_INDEED_RAPIDAPI_HOST || 'indeed12.p.rapidapi.com';
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
        location: 'Hyderabad',
        page_id: '1',
        locality: 'in'
      });

      const response = await fetch(`${this.baseUrl}/jobs/search?${params.toString()}`, {
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
  private buildQueryParams(params: IndeedJobSearchParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    queryParams.append('query', params.query);
    if (params.location) queryParams.append('location', params.location);
    if (params.page_id) queryParams.append('page_id', params.page_id.toString());
    if (params.locality) queryParams.append('locality', params.locality);
    if (params.fromage) queryParams.append('fromage', params.fromage.toString());
    if (params.radius) queryParams.append('radius', params.radius.toString());
    if (params.sort) queryParams.append('sort', params.sort);
    if (params.job_type) queryParams.append('job_type', params.job_type);

    return queryParams;
  }

  /**
   * Fetch jobs from Indeed API
   */
  async fetchJobs(
    params: IndeedJobSearchParams,
    apiKey?: string
  ): Promise<IndeedJobsResponse> {
    const key = apiKey || this.apiKey;
    if (!key) {
      throw new Error('Indeed RapidAPI key is required. Please configure it in admin settings.');
    }

    const queryParams = this.buildQueryParams(params);
    const url = `${this.baseUrl}/jobs/search?${queryParams.toString()}`;

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
    params: IndeedJobSearchParams,
    maxPages: number = 3,
    apiKey?: string
  ): Promise<IndeedJob[]> {
    const allJobs: IndeedJob[] = [];

    for (let page = 1; page <= maxPages; page++) {
      const pageParams = {
        ...params,
        page_id: page
      };

      const response = await this.fetchJobs(pageParams, apiKey);
      allJobs.push(...response.hits);

      // If we got fewer jobs than expected or no next page, we've reached the end
      if (!response.next_page_id || response.hits.length === 0) {
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

export const indeedJobsService = new IndeedJobsService();

