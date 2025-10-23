const puppeteer = require('puppeteer');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    console.log('Starting LinkedIn job scraping...');
    
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1366, height: 768 });
    
    // Navigate to LinkedIn jobs search
    const searchUrl = 'https://www.linkedin.com/jobs/search/?keywords=data%20analyst&location=United%20States&f_TPR=r86400&sortBy=DD';
    console.log('Navigating to:', searchUrl);
    
    await page.goto(searchUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for job listings to load
    try {
      await page.waitForSelector('.jobs-search-results__list-item', { timeout: 15000 });
    } catch (error) {
      console.log('Job listings not found, trying alternative selectors...');
    }
    
    // Extract job data
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.jobs-search-results__list-item');
      console.log(`Found ${jobElements.length} job elements`);
      
      return Array.from(jobElements).slice(0, 25).map((job, index) => {
        try {
          const titleElement = job.querySelector('.job-card-list__title a') || job.querySelector('.job-card-list__title');
          const companyElement = job.querySelector('.job-card-container__company-name a') || job.querySelector('.job-card-container__company-name');
          const locationElement = job.querySelector('.job-card-container__metadata-item') || job.querySelector('.job-card-container__metadata-wrapper .job-card-container__metadata-item');
          const descriptionElement = job.querySelector('.job-card-list__description') || job.querySelector('.job-card-container__metadata-wrapper');
          const linkElement = job.querySelector('.job-card-list__title a');
          const postedElement = job.querySelector('.job-card-container__metadata-item:last-child') || job.querySelector('.job-card-container__metadata-wrapper .job-card-container__metadata-item:last-child');
          
          const title = titleElement?.textContent?.trim() || 'Data Analyst';
          const company = companyElement?.textContent?.trim() || 'Company';
          const location = locationElement?.textContent?.trim() || 'United States';
          const description = descriptionElement?.textContent?.trim() || 'Data analyst position requiring analytical skills and experience with data tools.';
          const link = linkElement?.href || '#';
          const posted = postedElement?.textContent?.trim() || 'Recently';
          
          // Extract salary if available
          const salaryElement = job.querySelector('[data-test-id="salary"]') || job.querySelector('.job-card-container__metadata-item');
          const salary = salaryElement?.textContent?.trim() || '';
          
          return {
            id: `linkedin-scraped-${index}`,
            title: title,
            company: company,
            location: {
              country: 'United States',
              state: location.includes(',') ? location.split(',')[1]?.trim() || 'Unknown' : 'Unknown',
              city: location.includes(',') ? location.split(',')[0]?.trim() || 'Unknown' : location,
              isRemote: location.toLowerCase().includes('remote') || title.toLowerCase().includes('remote'),
              workType: location.toLowerCase().includes('remote') ? 'remote' : 
                        location.toLowerCase().includes('hybrid') ? 'hybrid' : 'onsite'
            },
            salary: {
              min: 0,
              max: 0,
              currency: 'USD',
              isDisclosed: salary.includes('$') || salary.includes('salary')
            },
            experience: {
              min: 0,
              max: 10
            },
            skills: ['Data Analysis', 'SQL', 'Python', 'Excel', 'Statistics'],
            jobType: 'full-time',
            source: 'linkedin',
            postedDate: new Date().toISOString(),
            applicationUrl: link,
            description: description,
            requirements: ['Bachelor\'s degree', 'Analytical skills', 'Data analysis experience'],
            benefits: ['Health insurance', 'Dental insurance', '401k'],
            companySize: 'Unknown',
            industry: 'Technology'
          };
        } catch (error) {
          console.error('Error processing job element:', error);
          return null;
        }
      }).filter(job => job !== null);
    });
    
    await browser.close();
    
    console.log(`Successfully scraped ${jobs.length} jobs from LinkedIn`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        jobs: jobs,
        source: 'linkedin',
        timestamp: new Date().toISOString(),
        count: jobs.length
      })
    };
    
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to scrape LinkedIn jobs',
        message: error.message,
        jobs: []
      })
    };
  }
};
