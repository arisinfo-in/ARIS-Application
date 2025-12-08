export interface LinkedInJobSearchParams {
  limit?: number;
  offset?: number;
  title_filter?: string;
  location_filter?: string;
  description_filter?: string;
  organization_description_filter?: string;
  organization_specialties_filter?: string;
  organization_slug_filter?: string;
  description_type?: 'text';
  type_filter?: string;
  remote?: boolean;
  agency?: boolean;
  industry_filter?: string;
  seniority_filter?: string;
  date_filter?: string;
  exclude_ats_duplicate?: boolean;
  external_apply_url?: boolean;
  directapply?: boolean;
  employees_lte?: number;
  employees_gte?: number;
  order?: 'asc' | 'desc';
  advanced_title_filter?: string;
  advanced_organization_filter?: string;
  include_ai?: boolean;
  ai_work_arrangement_filter?: string;
  ai_experience_level_filter?: string;
  ai_visa_sponsorship_filter?: boolean;
  ai_has_salary?: boolean;
  ai_taxonomies_a_filter?: string;
  ai_taxonomies_a_primary_filter?: string;
  ai_taxonomies_a_exclusion_filter?: string;
  organization_filter?: string;
}

export interface LinkedInJobLocation {
  '@type': string;
  address: {
    '@type': string;
    addressCountry: string;
    addressLocality: string;
    addressRegion?: string;
    streetAddress?: string;
  };
  latitude: number;
  longitude: number;
}

export interface LinkedInJob {
  id: string;
  date_posted: string;
  date_created: string;
  title: string;
  organization: string;
  organization_url: string;
  date_validthrough: string;
  locations_raw: LinkedInJobLocation[];
  location_requirements_raw?: any;
  salary_raw?: {
    '@type': string;
    currency: string;
    value: {
      '@type': string;
      minValue?: number;
      maxValue?: number;
      unitText: string;
    };
  } | null;
  employment_type: string[];
  url: string;
  source_type: string;
  source: string;
  source_domain: string;
  organization_logo?: string;
  cities_derived?: string[];
  counties_derived?: string[];
  regions_derived?: string[];
  countries_derived?: string[];
  locations_derived?: string[];
  timezones_derived?: string[];
  lats_derived?: number[];
  lngs_derived?: number[];
  remote_derived?: boolean;
  linkedin_org_employees?: number;
  linkedin_org_url?: string;
  linkedin_org_size?: string;
  linkedin_org_slogan?: string;
  linkedin_org_industry?: string;
  linkedin_org_followers?: number;
  linkedin_org_headquarters?: string;
  linkedin_org_type?: string;
  linkedin_org_foundeddate?: string;
  linkedin_org_specialties?: string[];
  linkedin_org_locations?: string[];
  linkedin_org_description?: string;
  linkedin_org_recruitment_agency_derived?: boolean;
  seniority?: string;
  directapply?: boolean;
  linkedin_org_slug?: string;
  no_jb_schema?: any;
  external_apply_url?: string;
  ats_duplicate?: boolean | null;
  description_text?: string;
}

export interface LinkedInJobsResponse {
  jobs: LinkedInJob[];
  total?: number;
}

class LinkedInJobsService {
  private apiKey: string;
  private apiHost: string;
  private baseUrl = 'https://linkedin-job-search-api.p.rapidapi.com';

  constructor() {
    this.apiKey = import.meta.env.VITE_RAPIDAPI_KEY || '';
    this.apiHost = import.meta.env.VITE_RAPIDAPI_HOST || 'linkedin-job-search-api.p.rapidapi.com';
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
        limit: '1',
        offset: '0'
      });

      const response = await fetch(`${this.baseUrl}/active-jb-7d?${params.toString()}`, {
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
  private buildQueryParams(params: LinkedInJobSearchParams): URLSearchParams {
    const queryParams = new URLSearchParams();

    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params.offset !== undefined) queryParams.append('offset', params.offset.toString());
    if (params.title_filter) queryParams.append('title_filter', params.title_filter);
    if (params.location_filter) queryParams.append('location_filter', params.location_filter);
    if (params.description_filter) queryParams.append('description_filter', params.description_filter);
    if (params.organization_description_filter) queryParams.append('organization_description_filter', params.organization_description_filter);
    if (params.organization_specialties_filter) queryParams.append('organization_specialties_filter', params.organization_specialties_filter);
    if (params.organization_slug_filter) queryParams.append('organization_slug_filter', params.organization_slug_filter);
    if (params.description_type) queryParams.append('description_type', params.description_type);
    if (params.type_filter) queryParams.append('type_filter', params.type_filter);
    if (params.remote !== undefined) queryParams.append('remote', params.remote.toString());
    if (params.agency !== undefined) queryParams.append('agency', params.agency.toString());
    if (params.industry_filter) queryParams.append('industry_filter', params.industry_filter);
    if (params.seniority_filter) queryParams.append('seniority_filter', params.seniority_filter);
    if (params.date_filter) queryParams.append('date_filter', params.date_filter);
    if (params.exclude_ats_duplicate !== undefined) queryParams.append('exclude_ats_duplicate', params.exclude_ats_duplicate.toString());
    if (params.external_apply_url !== undefined) queryParams.append('external_apply_url', params.external_apply_url.toString());
    if (params.directapply !== undefined) queryParams.append('directapply', params.directapply.toString());
    if (params.employees_lte !== undefined) queryParams.append('employees_lte', params.employees_lte.toString());
    if (params.employees_gte !== undefined) queryParams.append('employees_gte', params.employees_gte.toString());
    if (params.order) queryParams.append('order', params.order);
    if (params.advanced_title_filter) queryParams.append('advanced_title_filter', params.advanced_title_filter);
    if (params.advanced_organization_filter) queryParams.append('advanced_organization_filter', params.advanced_organization_filter);
    if (params.include_ai !== undefined) queryParams.append('include_ai', params.include_ai.toString());
    if (params.ai_work_arrangement_filter) queryParams.append('ai_work_arrangement_filter', params.ai_work_arrangement_filter);
    if (params.ai_experience_level_filter) queryParams.append('ai_experience_level_filter', params.ai_experience_level_filter);
    if (params.ai_visa_sponsorship_filter !== undefined) queryParams.append('ai_visa_sponsorship_filter', params.ai_visa_sponsorship_filter.toString());
    if (params.ai_has_salary !== undefined) queryParams.append('ai_has_salary', params.ai_has_salary.toString());
    if (params.ai_taxonomies_a_filter) queryParams.append('ai_taxonomies_a_filter', params.ai_taxonomies_a_filter);
    if (params.ai_taxonomies_a_primary_filter) queryParams.append('ai_taxonomies_a_primary_filter', params.ai_taxonomies_a_primary_filter);
    if (params.ai_taxonomies_a_exclusion_filter) queryParams.append('ai_taxonomies_a_exclusion_filter', params.ai_taxonomies_a_exclusion_filter);
    if (params.organization_filter) queryParams.append('organization_filter', params.organization_filter);

    return queryParams;
  }

  /**
   * Fetch jobs from LinkedIn Jobs API
   */
  async fetchJobs(
    params: LinkedInJobSearchParams,
    apiKey?: string
  ): Promise<LinkedInJobsResponse> {
    const key = apiKey || this.apiKey;
    if (!key) {
      throw new Error('RapidAPI key is required. Please configure it in admin settings.');
    }

    const queryParams = this.buildQueryParams(params);
    const url = `${this.baseUrl}/active-jb-7d?${queryParams.toString()}`;

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
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Handle array response
      if (Array.isArray(data)) {
        return { jobs: data };
      }

      // Handle object response with jobs array
      if (data.jobs && Array.isArray(data.jobs)) {
        return { jobs: data.jobs, total: data.total };
      }

      // Handle direct jobs property
      if (data.data && Array.isArray(data.data)) {
        return { jobs: data.data, total: data.total };
      }

      throw new Error('Unexpected API response format');
    } catch (error: any) {
      if (error.message) {
        throw error;
      }
      throw new Error(`Failed to fetch jobs: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Fetch multiple batches of jobs (for pagination)
   */
  async fetchJobsBatches(
    params: LinkedInJobSearchParams,
    totalJobs: number,
    apiKey?: string
  ): Promise<LinkedInJob[]> {
    const limit = params.limit || 100;
    const batches = Math.ceil(totalJobs / limit);
    const allJobs: LinkedInJob[] = [];

    for (let i = 0; i < batches; i++) {
      const batchParams = {
        ...params,
        limit,
        offset: i * limit
      };

      const response = await this.fetchJobs(batchParams, apiKey);
      allJobs.push(...response.jobs);

      // If we got fewer jobs than requested, we've reached the end
      if (response.jobs.length < limit) {
        break;
      }

      // Add a small delay between batches to avoid rate limiting
      if (i < batches - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return allJobs;
  }
}

export const linkedinJobsService = new LinkedInJobsService();

