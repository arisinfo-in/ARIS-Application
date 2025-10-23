const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const UserAgent = require('user-agents'); // For rotating user agents

exports.handler = async (event, context) => {
  let browser;
  try {
    // Launch Puppeteer in headless mode suitable for Netlify
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process' // Required for some environments
      ]
    });

    const page = await browser.newPage();

    // Set a dynamic user agent to mimic a real browser
    const userAgent = new UserAgent({ deviceCategory: 'desktop' }).toString();
    await page.setUserAgent(userAgent);

    // Navigate to LinkedIn jobs search
    const keywords = event.queryStringParameters.keywords || 'data analyst';
    const location = event.queryStringParameters.location || 'United States';
    const linkedinSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}`;

    console.log(`Navigating to: ${linkedinSearchUrl}`);
    await page.goto(linkedinSearchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // Scroll to load more jobs (LinkedIn loads dynamically)
    let previousHeight;
    for (let i = 0; i < 5; i++) { // Scroll 5 times to load more jobs
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`, { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for content to load
    }

    // Extract job data using Cheerio for robust parsing
    const content = await page.content();
    const $ = cheerio.load(content);

    const jobs = [];
    $('.jobs-search-results__list-item').each((i, element) => {
      if (jobs.length >= 25) return false; // Limit to 25 jobs

      const jobTitle = $(element).find('.job-card-list__title').text().trim();
      const companyName = $(element).find('.job-card-container__company-name').text().trim();
      const jobLocation = $(element).find('.job-card-container__metadata-item').first().text().trim();
      const postedDateText = $(element).find('.job-card-container__metadata-item:last-child').text().trim();
      const jobLink = $(element).find('.job-card-list__title a').attr('href');

      // Attempt to get description by navigating to job link (optional, can be slow)
      // For simplicity, we'll use a placeholder or try to extract from the main page if available
      let description = $(element).find('.job-card-list__description')?.text()?.trim() || 'No description available.';

      // Basic date parsing (e.g., "1 day ago" to ISO string)
      const postedDate = new Date().toISOString(); // Placeholder, more robust parsing needed

      jobs.push({
        id: `linkedin-${i}-${Date.now()}`,
        title: jobTitle,
        company: companyName,
        location: {
          country: location, // From query param
          state: '', // Can be extracted from jobLocation
          city: jobLocation.split(',')[0]?.trim() || '',
          isRemote: jobTitle.toLowerCase().includes('remote'),
          workType: jobTitle.toLowerCase().includes('remote') ? 'remote' : 'onsite' // Basic detection
        },
        salary: { min: 0, max: 0, currency: 'USD', isDisclosed: false },
        experience: { min: 0, max: 5 }, // Placeholder
        skills: [], // Can be extracted from description
        jobType: 'full-time', // Placeholder
        source: 'linkedin',
        postedDate: postedDate,
        applicationUrl: jobLink || '#',
        description: description,
        requirements: [],
        benefits: [],
        companySize: '',
        industry: ''
      });
    });

    console.log(`Scraped ${jobs.length} LinkedIn jobs.`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobs: jobs.filter(job => job.title) })
    };

  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message, stack: error.stack })
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
