const puppeteer = require('puppeteer');

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }

  const { location, workType, skills } = JSON.parse(event.body || '{}');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const jobs = [];
    
    // Scrape LinkedIn (public pages only)
    try {
      const linkedinJobs = await scrapeLinkedIn(browser, location, workType);
      jobs.push(...linkedinJobs);
      console.log(`LinkedIn jobs scraped: ${linkedinJobs.length}`);
    } catch (error) {
      console.error('LinkedIn scraping failed:', error);
    }
    
    // Scrape Naukri (public pages only)
    try {
      const naukriJobs = await scrapeNaukri(browser, location, workType);
      jobs.push(...naukriJobs);
      console.log(`Naukri jobs scraped: ${naukriJobs.length}`);
    } catch (error) {
      console.error('Naukri scraping failed:', error);
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        jobs,
        total: jobs.length,
        sources: ['linkedin', 'naukri']
      })
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: error.message,
        jobs: []
      })
    };
  } finally {
    await browser.close();
  }
};

async function scrapeLinkedIn(browser, location, workType) {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  try {
    // Use LinkedIn's public job search
    const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=data%20analyst&location=${location || 'United States'}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for job listings to load
    await page.waitForSelector('.jobs-search-results__list', { timeout: 10000 });
    
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.jobs-search-results__list-item');
      return Array.from(jobElements).slice(0, 10).map((element, index) => {
        const titleElement = element.querySelector('.job-search-card__title');
        const companyElement = element.querySelector('.job-search-card__subtitle');
        const locationElement = element.querySelector('.job-search-card__location');
        const linkElement = element.querySelector('.job-search-card__title a');
        const dateElement = element.querySelector('.job-search-card__listdate');
        
        return {
          id: `linkedin-${index}`,
          title: titleElement?.textContent?.trim() || 'Data Analyst',
          company: companyElement?.textContent?.trim() || 'Company',
          location: locationElement?.textContent?.trim() || 'Location',
          postedDate: dateElement?.textContent?.trim() || 'Recently',
          applicationUrl: linkElement?.href || '#',
          source: 'linkedin',
          description: 'Data analyst position requiring analytical skills and experience with data tools.',
          workType: 'onsite'
        };
      });
    });
    
    await page.close();
    return jobs;
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    await page.close();
    return [];
  }
}

async function scrapeNaukri(browser, location, workType) {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  
  try {
    // Use Naukri's public job search
    const searchUrl = `https://www.naukri.com/data-analyst-jobs-in-${location || 'india'}`;
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for job listings to load
    await page.waitForSelector('.jobTuple', { timeout: 10000 });
    
    const jobs = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.jobTuple');
      return Array.from(jobElements).slice(0, 10).map((element, index) => {
        const titleElement = element.querySelector('.title');
        const companyElement = element.querySelector('.subTitle');
        const locationElement = element.querySelector('.locWdth');
        const linkElement = element.querySelector('.title a');
        const dateElement = element.querySelector('.postedDate');
        
        return {
          id: `naukri-${index}`,
          title: titleElement?.textContent?.trim() || 'Data Analyst',
          company: companyElement?.textContent?.trim() || 'Company',
          location: locationElement?.textContent?.trim() || 'Location',
          postedDate: dateElement?.textContent?.trim() || 'Recently',
          applicationUrl: linkElement?.href || '#',
          source: 'naukri',
          description: 'Data analyst position requiring analytical skills and experience with data tools.',
          workType: 'onsite'
        };
      });
    });
    
    await page.close();
    return jobs;
  } catch (error) {
    console.error('Naukri scraping error:', error);
    await page.close();
    return [];
  }
}
