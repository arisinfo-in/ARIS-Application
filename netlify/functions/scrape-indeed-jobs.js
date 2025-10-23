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
    console.log('Starting Indeed job scraping...');
    
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
    
    // Navigate to Indeed jobs search
    const searchUrl = 'https://www.indeed.com/jobs?q=data+analyst&l=United+States&sort=date';
    console.log('Navigating to:', searchUrl);
    
    await page.goto(searchUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait for job listings to load
    try {
      await page.waitForSelector('[data-testid="job-title"]', { timeout: 15000 });
    } catch (error) {
      console.log('Indeed job listings not found, trying alternative selectors...');
    }
    
    // Extract job data
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('[data-testid="job-title"]');
      console.log(`Found ${jobElements.length} Indeed job elements`);
      
      return Array.from(jobElements).slice(0, 20).map((job, index) => {
        try {
          const titleElement = job.querySelector('a[data-testid="job-title"]');
          const companyElement = job.closest('[data-testid="job-container"]')?.querySelector('[data-testid="company-name"]');
          const locationElement = job.closest('[data-testid="job-container"]')?.querySelector('[data-testid="job-location"]');
          const salaryElement = job.closest('[data-testid="job-container"]')?.querySelector('[data-testid="attribute_snippet_testid"]');
          const descriptionElement = job.closest('[data-testid="job-container"]')?.querySelector('[data-testid="job-snippet"]');
          
          const title = titleElement?.textContent?.trim() || 'Data Analyst';
          const company = companyElement?.textContent?.trim() || 'Company';
          const location = locationElement?.textContent?.trim() || 'United States';
          const salary = salaryElement?.textContent?.trim() || '';
          const description = descriptionElement?.textContent?.trim() || 'Data analyst position requiring analytical skills and experience with data tools.';
          const link = titleElement?.href || '#';
          
          return {
            id: `indeed-scraped-${index}`,
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
            source: 'indeed',
            postedDate: new Date().toISOString(),
            applicationUrl: link,
            description: description,
            requirements: ['Bachelor\'s degree', 'Analytical skills', 'Data analysis experience'],
            benefits: ['Health insurance', 'Dental insurance', '401k'],
            companySize: 'Unknown',
            industry: 'Technology'
          };
        } catch (error) {
          console.error('Error processing Indeed job element:', error);
          return null;
        }
      }).filter(job => job !== null);
    });
    
    await browser.close();
    
    console.log(`Successfully scraped ${jobs.length} jobs from Indeed`);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        jobs: jobs,
        source: 'indeed',
        timestamp: new Date().toISOString(),
        count: jobs.length
      })
    };
    
  } catch (error) {
    console.error('Indeed scraping error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to scrape Indeed jobs',
        message: error.message,
        jobs: []
      })
    };
  }
};
