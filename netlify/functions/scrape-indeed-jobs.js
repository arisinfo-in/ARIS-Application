const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');

exports.handler = async (event, context) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    const userAgent = new UserAgent({ deviceCategory: 'desktop' }).toString();
    await page.setUserAgent(userAgent);

    const keywords = event.queryStringParameters.keywords || 'data analyst';
    const location = event.queryStringParameters.location || 'United States';
    const indeedSearchUrl = `https://www.indeed.com/jobs?q=${encodeURIComponent(keywords)}&l=${encodeURIComponent(location)}`;

    console.log(`Navigating to: ${indeedSearchUrl}`);
    await page.goto(indeedSearchUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    const content = await page.content();
    const $ = cheerio.load(content);

    const jobs = [];
    $('div.jobsearch-SerpJobCard').each((i, element) => { // Indeed's job card selector
      if (jobs.length >= 25) return false;

      const jobTitle = $(element).find('.title a').text().trim();
      const companyName = $(element).find('.company').text().trim();
      const jobLocation = $(element).find('.location').text().trim();
      const description = $(element).find('.summary').text().trim();
      const jobLink = 'https://www.indeed.com' + $(element).find('.title a').attr('href');
      const postedDateText = $(element).find('.date').text().trim();

      const postedDate = new Date().toISOString(); // Placeholder

      jobs.push({
        id: `indeed-${i}-${Date.now()}`,
        title: jobTitle,
        company: companyName,
        location: {
          country: location,
          state: '',
          city: jobLocation.split(',')[0]?.trim() || '',
          isRemote: jobTitle.toLowerCase().includes('remote'),
          workType: jobTitle.toLowerCase().includes('remote') ? 'remote' : 'onsite'
        },
        salary: { min: 0, max: 0, currency: 'USD', isDisclosed: false },
        experience: { min: 0, max: 5 },
        skills: [],
        jobType: 'full-time',
        source: 'indeed',
        postedDate: postedDate,
        applicationUrl: jobLink || '#',
        description: description,
        requirements: [],
        benefits: [],
        companySize: '',
        industry: ''
      });
    });

    console.log(`Scraped ${jobs.length} Indeed jobs.`);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jobs: jobs.filter(job => job.title) })
    };

  } catch (error) {
    console.error('Indeed scraping error:', error);
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
