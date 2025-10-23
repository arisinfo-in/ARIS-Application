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
  source: 'linkedin' | 'indeed' | 'github' | 'remote' | 'mock';
  postedDate: string;
  applicationUrl: string;
  description: string;
  requirements: string[];
  benefits: string[];
  companySize: string;
  industry: string;
}

export interface JobFilters {
  keywords: string;
  location: string;
  workType: 'all' | 'remote' | 'hybrid' | 'onsite';
  experience: 'all' | 'entry' | 'mid' | 'senior';
  salary: 'all' | 'low' | 'medium' | 'high';
}
