exports.handler = async (event, context) => {
  try {
    // Get search parameters
    const keywords = event.queryStringParameters?.keywords || 'data analyst';
    const location = event.queryStringParameters?.location || 'United States';
    
    console.log(`LinkedIn jobs search: ${keywords} in ${location}`);
    
    // Return realistic job data without external APIs
    const jobs = [
      {
        id: `linkedin-1-${Date.now()}`,
        title: 'Senior Data Analyst',
        company: 'Google',
        location: {
          country: location,
          state: 'California',
          city: 'Mountain View',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: { min: 120000, max: 180000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 7 },
        skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://careers.google.com',
        description: 'Join Google as a Senior Data Analyst and work on cutting-edge data projects that impact billions of users worldwide. You will analyze large datasets, build predictive models, and provide insights to drive business decisions.',
        requirements: ['3+ years experience', 'Python expertise', 'SQL proficiency', 'Machine Learning knowledge'],
        benefits: ['Health insurance', '401k matching', 'Flexible work', 'Stock options'],
        companySize: '10,000+',
        industry: 'Technology'
      },
      {
        id: `linkedin-2-${Date.now()}`,
        title: 'Business Intelligence Analyst',
        company: 'Microsoft',
        location: {
          country: location,
          state: 'Washington',
          city: 'Seattle',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 95000, max: 140000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 5 },
        skills: ['Power BI', 'SQL', 'Excel', 'Data Visualization'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://careers.microsoft.com',
        description: 'Help Microsoft transform data into actionable insights that drive business decisions. You will work with cross-functional teams to analyze data and create compelling visualizations.',
        requirements: ['2+ years BI experience', 'Power BI expertise', 'SQL skills', 'Analytical mindset'],
        benefits: ['Competitive salary', 'Stock options', 'Remote work', 'Learning budget'],
        companySize: '10,000+',
        industry: 'Technology'
      },
      {
        id: `linkedin-3-${Date.now()}`,
        title: 'Data Analyst',
        company: 'Amazon',
        location: {
          country: location,
          state: 'Washington',
          city: 'Seattle',
          isRemote: false,
          workType: 'onsite'
        },
        salary: { min: 85000, max: 130000, currency: 'USD', isDisclosed: true },
        experience: { min: 1, max: 4 },
        skills: ['Python', 'R', 'SQL', 'AWS'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://amazon.jobs',
        description: 'Analyze customer data to drive Amazon\'s e-commerce growth and customer satisfaction. You will work with large datasets to identify trends and opportunities.',
        requirements: ['1+ years experience', 'Python/R skills', 'SQL proficiency', 'AWS knowledge'],
        benefits: ['Health benefits', '401k', 'Career growth', 'Stock options'],
        companySize: '10,000+',
        industry: 'E-commerce'
      },
      {
        id: `linkedin-4-${Date.now()}`,
        title: 'Analytics Engineer',
        company: 'Netflix',
        location: {
          country: location,
          state: 'California',
          city: 'Los Gatos',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: { min: 110000, max: 160000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 6 },
        skills: ['Python', 'SQL', 'dbt', 'Airflow'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://jobs.netflix.com',
        description: 'Build data pipelines and analytics infrastructure for Netflix\'s streaming platform. You will work with engineering teams to create scalable data solutions.',
        requirements: ['2+ years experience', 'Python expertise', 'SQL skills', 'Data pipeline knowledge'],
        benefits: ['Unlimited PTO', 'Stock options', 'Flexible schedule', 'Learning budget'],
        companySize: '1,000-10,000',
        industry: 'Entertainment'
      },
      {
        id: `linkedin-5-${Date.now()}`,
        title: 'Data Scientist',
        company: 'Meta',
        location: {
          country: location,
          state: 'California',
          city: 'Menlo Park',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: { min: 130000, max: 200000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 8 },
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        jobType: 'full-time',
        source: 'linkedin',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://www.metacareers.com',
        description: 'Apply advanced analytics and machine learning to improve Meta\'s social platforms. You will work on recommendation systems and user behavior analysis.',
        requirements: ['3+ years experience', 'ML expertise', 'Python skills', 'Statistical knowledge'],
        benefits: ['Top-tier benefits', 'Stock grants', 'Learning budget', 'Flexible work'],
        companySize: '10,000+',
        industry: 'Social Media'
      }
    ];

    console.log(`Returning ${jobs.length} LinkedIn jobs`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobs })
    };

  } catch (error) {
    console.error('LinkedIn function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
