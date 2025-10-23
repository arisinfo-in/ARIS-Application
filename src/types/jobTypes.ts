export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: {
    country: string;
    state: string;
    city: string;
    isRemote: boolean;
    workType: 'remote' | 'hybrid' | 'onsite';
  };
  salary: {
    min: number;
    max: number;
    currency: string;
    isDisclosed: boolean;
  };
  experience: {
    min: number;
    max: number;
  };
  skills: string[];
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  source: 'linkedin' | 'naukri' | 'github' | 'remote' | 'indeed';
  postedDate: string;
  applicationUrl: string;
  description: string;
  requirements: string[];
  benefits: string[];
  companySize: string;
  industry: string;
}

export interface JobFilters {
  location: {
    countries: string[];
    states: string[];
    cities: string[];
    workType: ('remote' | 'hybrid' | 'onsite')[];
  };
  experience: {
    min: number;
    max: number;
  };
  salary: {
    min: number;
    max: number;
  };
  skills: string[];
  jobType: string[];
  companySize: string[];
  industry: string[];
  postedWithin: number;
}

export interface JobRecommendation {
  jobId: string;
  matchScore: number;
  reasons: string[];
  skillGaps: string[];
  suggestedActions: string[];
}

export interface JobAlert {
  id: string;
  userId: string;
  criteria: JobFilters;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
}
