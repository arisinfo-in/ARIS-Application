import { Request, Response } from 'express';


export async function newsFeed(req: Request, res: Response) {
  // Allow GET and POST requests
  if (!['GET', 'POST'].includes(req.method)) {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse query parameters or body
    const params = req.method === 'GET' 
      ? req.query
      : req.body;

    const { moduleId, category, limit = 8 } = params as any;

    // Get API key from environment variables
    const apiKey = process.env.GROQ_API_KEY || '';
    if (!apiKey) {
      console.error('GROQ_API_KEY not found in environment variables');
      res.status(500).json({ error: 'Server configuration error' });
      return;
    }

    // Generate news articles using AI
    const articles = await generateNewsArticles(apiKey, moduleId, category, limit);

    res.status(200).json({ 
      articles,
      moduleId,
      category,
      count: articles.length,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in news-feed function:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

async function generateNewsArticles(apiKey: string, moduleId: string, category: string, limit: number) {
  try {
    const prompt = createNewsPrompt(moduleId, category, limit);
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{
          role: "user",
          content: prompt
        }],
        temperature: 0.8,
        max_completion_tokens: 4096,
        top_p: 1,
        reasoning_effort: "medium",
        stream: false,
        stop: null
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as any;
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from AI');
    }

    const articles = parseNewsResponse(data.choices[0].message.content);
    return articles.slice(0, limit);

  } catch (error) {
    console.error('Error generating news articles:', error);
    // Return mock data as fallback
    return getMockNewsData(moduleId, limit);
  }
}

function createNewsPrompt(moduleId: string, category: string, limit: number): string {
  const moduleInfo = getModuleInfo(moduleId);
  const categoryContext = category ? `Focus on ${category} category.` : '';
  
  return `You are a data analysis and AI news curator. Create ${limit} trending news articles related to ${moduleInfo.name} and data analysis.

${categoryContext}

For each article, provide:
1. A compelling, accurate title (real or realistic)
2. A detailed summary (2-3 sentences)
3. Full article content (500-800 words)
4. Author name (realistic)
5. Source publication (realistic)
6. Category (one of: excel, powerbi, sql, python, ai, statistics, career, tools)
7. Relevant tags (3-5 tags)
8. Read time estimate (3-12 minutes)
9. Whether it's trending (true/false)
10. A realistic URL

Format the response as a JSON array of objects with these exact fields:
- id (string, unique)
- title (string)
- summary (string)
- content (string)
- author (string)
- source (string)
- url (string)
- publishedAt (ISO string, recent dates)
- category (string)
- tags (array of strings)
- readTime (number)
- trending (boolean)
- imageUrl (string, placeholder URL)

Focus areas for ${moduleInfo.name}:
${moduleInfo.focusAreas}

Make the articles current, relevant, and valuable for data analysts and AI professionals.
Generate exactly ${limit} articles.`;
}

function getModuleInfo(moduleId: string) {
  const modules: Record<string, { name: string; focusAreas: string }> = {
    'excel': {
      name: 'Microsoft Excel and Spreadsheet Analysis',
      focusAreas: 'Excel formulas, functions, pivot tables, data visualization, Power Query, VBA, data analysis techniques'
    },
    'powerbi': {
      name: 'Microsoft Power BI and Business Intelligence',
      focusAreas: 'DAX formulas, data modeling, Power Query, data visualization, Power BI Service, business intelligence'
    },
    'sql': {
      name: 'SQL and Database Management',
      focusAreas: 'SQL queries, database design, data warehousing, query optimization, database administration'
    },
    'python': {
      name: 'Python for Data Analysis',
      focusAreas: 'Python programming, pandas, numpy, matplotlib, seaborn, data science libraries, machine learning'
    },
    'statistics': {
      name: 'Statistics and Data Science',
      focusAreas: 'Statistical analysis, hypothesis testing, probability, regression analysis, data science methodologies'
    },
    'ml': {
      name: 'Machine Learning and AI',
      focusAreas: 'Machine learning algorithms, deep learning, AI applications, model training, data science'
    },
    'prompt': {
      name: 'Prompt Engineering and AI Interaction',
      focusAreas: 'AI prompting techniques, large language models, AI tools, prompt optimization, AI applications'
    },
    'advanced': {
      name: 'Advanced AI and Cutting-edge Technology',
      focusAreas: 'Advanced AI, deep learning, neural networks, transformers, MLOps, emerging AI technologies'
    }
  };

  return modules[moduleId] || {
    name: 'Data Analysis and AI',
    focusAreas: 'General data analysis, AI tools, business intelligence, data science, analytics'
  };
}

function parseNewsResponse(response: string): any[] {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const articles = JSON.parse(jsonMatch[0]);
      
      // Validate and clean up articles
      return articles.map((article: any, index: number) => ({
        id: article.id || `article_${Date.now()}_${index}`,
        title: article.title || 'Untitled Article',
        summary: article.summary || 'No summary available',
        content: article.content || 'No content available',
        author: article.author || 'Unknown Author',
        source: article.source || 'Unknown Source',
        url: article.url || '#',
        publishedAt: article.publishedAt || new Date().toISOString(),
        category: article.category || 'general',
        tags: Array.isArray(article.tags) ? article.tags : [],
        readTime: typeof article.readTime === 'number' ? article.readTime : 5,
        trending: Boolean(article.trending),
        imageUrl: article.imageUrl || `https://via.placeholder.com/400x200/1f2937/ffffff?text=${encodeURIComponent(article.title?.substring(0, 20) || 'News')}`
      }));
    }
    
    // Fallback: create mock articles if parsing fails
    return getMockNewsData(null, 3);
  } catch (error) {
    console.error('Error parsing news response:', error);
    return getMockNewsData(null, 3);
  }
}

function getMockNewsData(moduleId: string | null, limit: number = 3): any[] {
  const mockArticles = [
    {
      id: 'mock_1',
      title: 'The Future of Data Analysis: AI-Powered Insights',
      summary: 'Exploring how artificial intelligence is revolutionizing data analysis workflows and enabling more sophisticated insights from complex datasets.',
      content: 'The landscape of data analysis is undergoing a dramatic transformation as artificial intelligence technologies become more accessible and powerful. Organizations are increasingly leveraging AI-powered tools to extract deeper insights from their data, automate routine analysis tasks, and make more informed business decisions. This shift represents a fundamental change in how we approach data analysis, moving from traditional statistical methods to more dynamic, machine learning-driven approaches that can identify patterns and trends that might otherwise go unnoticed. The integration of AI into data analysis workflows is not just about automation; it\'s about enhancing human capabilities and enabling analysts to focus on higher-level strategic thinking while AI handles the heavy computational lifting.',
      author: 'Sarah Johnson',
      source: 'Data Science Weekly',
      url: 'https://datascienceweekly.com/future-data-analysis-ai',
      publishedAt: new Date().toISOString(),
      category: 'ai',
      tags: ['AI', 'Data Analysis', 'Machine Learning', 'Future Tech'],
      readTime: 8,
      trending: true,
      imageUrl: 'https://via.placeholder.com/400x200/1f2937/ffffff?text=AI+Data+Analysis'
    },
    {
      id: 'mock_2',
      title: 'Excel 365: New Features for Advanced Data Analysis',
      summary: 'Microsoft introduces powerful new features in Excel 365 that streamline complex data analysis tasks and improve collaboration among teams.',
      content: 'Microsoft Excel 365 continues to evolve as a powerful platform for data analysis, with recent updates introducing several game-changing features. The new dynamic arrays functionality allows users to work with arrays more intuitively, while the enhanced Power Query capabilities make data transformation more efficient than ever. These improvements, combined with the growing integration with Power BI and other Microsoft 365 services, position Excel as a comprehensive solution for both individual analysts and enterprise teams. The latest updates also focus on improving real-time collaboration, enabling multiple users to work on complex spreadsheets simultaneously without conflicts.',
      author: 'Mike Chen',
      source: 'Excel Pro Magazine',
      url: 'https://excelpromag.com/excel-365-new-features',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      category: 'excel',
      tags: ['Excel', 'Microsoft 365', 'Data Analysis', 'Productivity'],
      readTime: 6,
      trending: false,
      imageUrl: 'https://via.placeholder.com/400x200/1f2937/ffffff?text=Excel+365'
    },
    {
      id: 'mock_3',
      title: 'Python Libraries That Every Data Analyst Should Know',
      summary: 'A comprehensive guide to the essential Python libraries for data analysis, from pandas and numpy to the latest machine learning frameworks.',
      content: 'Python has become the lingua franca of data analysis, and understanding its ecosystem of libraries is crucial for any aspiring data analyst. Pandas remains the cornerstone for data manipulation and analysis, providing powerful tools for cleaning, transforming, and exploring datasets. NumPy offers the mathematical foundation with its array operations and linear algebra functions. For visualization, matplotlib and seaborn provide comprehensive plotting capabilities, while plotly enables interactive visualizations. The machine learning landscape is dominated by scikit-learn for traditional algorithms and TensorFlow or PyTorch for deep learning applications. Each library serves a specific purpose in the data analysis pipeline, and mastering their integration is key to becoming an effective data analyst.',
      author: 'Dr. Emily Rodriguez',
      source: 'Python Data Science Journal',
      url: 'https://pythondatascience.com/essential-libraries',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      category: 'python',
      tags: ['Python', 'Data Analysis', 'Libraries', 'Tutorial'],
      readTime: 10,
      trending: true,
      imageUrl: 'https://via.placeholder.com/400x200/1f2937/ffffff?text=Python+Libraries'
    }
  ];

  return mockArticles.slice(0, limit);
}

