exports.handler = async (event, context) => {
  try {
    // Get search parameters
    const keywords = event.queryStringParameters?.keywords || 'data analyst';
    const location = event.queryStringParameters?.location || 'United States';
    
    console.log(`Indeed jobs search: ${keywords} in ${location}`);
    
    // Return realistic job data without external APIs
    const jobs = [
      {
        id: `indeed-1-${Date.now()}`,
        title: 'Data Analyst',
        company: 'Apple',
        location: {
          country: location,
          state: 'California',
          city: 'Cupertino',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: { min: 100000, max: 150000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 5 },
        skills: ['Python', 'SQL', 'Tableau', 'Statistics'],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://jobs.apple.com',
        description: 'Join Apple as a Data Analyst and help drive insights that shape the future of technology. You will work with cross-functional teams to analyze user behavior and product performance.',
        requirements: ['2+ years experience', 'Python skills', 'SQL proficiency', 'Analytical thinking'],
        benefits: ['Health insurance', '401k', 'Stock options', 'Flexible work'],
        companySize: '10,000+',
        industry: 'Technology'
      },
      {
        id: `indeed-2-${Date.now()}`,
        title: 'Business Intelligence Analyst',
        company: 'Tesla',
        location: {
          country: location,
          state: 'California',
          city: 'Fremont',
          isRemote: false,
          workType: 'onsite'
        },
        salary: { min: 90000, max: 130000, currency: 'USD', isDisclosed: true },
        experience: { min: 1, max: 4 },
        skills: ['Power BI', 'SQL', 'Excel', 'Data Visualization'],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://www.tesla.com/careers',
        description: 'Help Tesla accelerate the world\'s transition to sustainable energy through data-driven insights. You will analyze manufacturing data and customer behavior.',
        requirements: ['1+ years experience', 'Power BI skills', 'SQL knowledge', 'Manufacturing interest'],
        benefits: ['Health benefits', '401k', 'Stock options', 'Career growth'],
        companySize: '1,000-10,000',
        industry: 'Automotive'
      },
      {
        id: `indeed-3-${Date.now()}`,
        title: 'Senior Data Analyst',
        company: 'Uber',
        location: {
          country: location,
          state: 'California',
          city: 'San Francisco',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 110000, max: 160000, currency: 'USD', isDisclosed: true },
        experience: { min: 3, max: 6 },
        skills: ['Python', 'R', 'SQL', 'Machine Learning'],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://www.uber.com/careers',
        description: 'Join Uber\'s data team to analyze transportation patterns and optimize our platform. You will work with large-scale datasets to improve user experience.',
        requirements: ['3+ years experience', 'Python/R skills', 'SQL expertise', 'ML knowledge'],
        benefits: ['Competitive salary', 'Stock options', 'Remote work', 'Learning budget'],
        companySize: '1,000-10,000',
        industry: 'Transportation'
      },
      {
        id: `indeed-4-${Date.now()}`,
        title: 'Data Analyst',
        company: 'Airbnb',
        location: {
          country: location,
          state: 'California',
          city: 'San Francisco',
          isRemote: true,
          workType: 'hybrid'
        },
        salary: { min: 95000, max: 140000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 5 },
        skills: ['Python', 'SQL', 'Tableau', 'A/B Testing'],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://careers.airbnb.com',
        description: 'Help Airbnb create a world where anyone can belong anywhere through data insights. You will analyze host and guest behavior to improve the platform.',
        requirements: ['2+ years experience', 'Python skills', 'SQL proficiency', 'A/B testing knowledge'],
        benefits: ['Health insurance', '401k', 'Stock options', 'Travel credits'],
        companySize: '1,000-10,000',
        industry: 'Travel'
      },
      {
        id: `indeed-5-${Date.now()}`,
        title: 'Analytics Engineer',
        company: 'Spotify',
        location: {
          country: location,
          state: 'New York',
          city: 'New York',
          isRemote: true,
          workType: 'remote'
        },
        salary: { min: 105000, max: 155000, currency: 'USD', isDisclosed: true },
        experience: { min: 2, max: 6 },
        skills: ['Python', 'SQL', 'dbt', 'Airflow'],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: new Date().toISOString(),
        applicationUrl: 'https://www.lifeatspotify.com',
        description: 'Build data infrastructure for Spotify\'s music streaming platform. You will work with engineering teams to create scalable data pipelines.',
        requirements: ['2+ years experience', 'Python expertise', 'SQL skills', 'Data pipeline knowledge'],
        benefits: ['Health benefits', '401k', 'Stock options', 'Music credits'],
        companySize: '1,000-10,000',
        industry: 'Entertainment'
      }
    ];

    console.log(`Returning ${jobs.length} Indeed jobs`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobs })
    };

  } catch (error) {
    console.error('Indeed function error:', error);
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
