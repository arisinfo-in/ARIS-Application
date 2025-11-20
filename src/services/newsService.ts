import { geminiService } from './geminiService';
import { FIREBASE_FUNCTIONS } from '../utils/firebaseFunctions';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  url: string;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: number; // in minutes
  trending: boolean;
  imageUrl?: string;
}

class NewsService {
  private readonly NEWS_CACHE_KEY = 'aris_news_cache';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  private readonly REFRESH_TIME = 12; // 12 PM

  /**
   * Get trending news articles related to data analysis and AI
   */
  async getTrendingNews(): Promise<NewsArticle[]> {
    try {
      // Check if we have cached news that's still fresh
      const cachedNews = this.getCachedNews();
      if (cachedNews && this.isCacheValid(cachedNews.timestamp)) {
        return cachedNews.articles;
      }

      // Fetch new articles from Gemini API
      const newArticles = await this.fetchNewsFromGemini();
      
      // Cache the new articles
      this.cacheNews(newArticles);
      
      return newArticles;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching news:', error);
      }
      // Return cached news if available, otherwise return mock data
      const cachedNews = this.getCachedNews();
      return cachedNews?.articles || this.getMockNewsData();
    }
  }


  /**
   * Get trending news for a specific module
   */
  async getModuleNews(moduleId: string): Promise<NewsArticle[]> {
    try {
      // Always return the new mock format to ensure consistency
      // In production, you would check cache and fetch from Gemini API here
      const newArticles = this.getMockModuleNews(moduleId);
      
      // Cache the new articles
      const cacheKey = `module_${moduleId}`;
      this.cacheModuleNews(cacheKey, newArticles);
      
      return newArticles;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Error fetching news for module ${moduleId}:`, error);
      }
      // Return mock data as fallback
      return this.getMockModuleNews(moduleId);
    }
  }

  /**
   * Fetch module-specific news articles using Gemini API
   */
  private async fetchModuleNewsFromGemini(moduleId: string): Promise<NewsArticle[]> {
    const moduleInfo = this.getModuleInfo(moduleId);
    
    const prompt = `
    You are a data analysis and AI news curator. Create 1 comprehensive, trending topic blog post specifically related to: ${moduleInfo.name}
    
    Focus on:
    ${moduleInfo.focus}
    
    Create a REALISTIC, DETAILED article following this EXACT structure:
    
    **H1: Catchy Title** - Must grab attention and include relevant keywords for ${moduleInfo.name}
    
    **Engaging Introduction** - Hook the reader with a surprising statistic, thought-provoking question, or compelling anecdote related to ${moduleInfo.name} trends. Briefly explain what the trend is and what you will cover.
    
    **H2: What Is ${moduleInfo.name}? A Quick Overview** - Explain the trend in simple terms, assuming the reader might only have a vague idea.
    
    **H2: The Core of the Trend: Why is Everyone Talking About This?** - Explore the reasons behind the trend's popularity in ${moduleInfo.name}.
    
    **H3: A Deep Dive into [Sub-topic 1]** - Choose a relevant sub-topic like "The Economic Impact" or "Technical Breakthroughs"
    
    **H3: The Key Players and Influencers** - Mention brands, companies, or personalities driving the ${moduleInfo.name} trend
    
    **H2: My Unique Take: [Your Perspective or Angle]** - Share a professional opinion or contrarian viewpoint about ${moduleInfo.name}
    
    **H3: [A specific point you want to make]** - Like "Why the Trend Might Be Overhyped" or "Hidden Opportunities"
    
    **H3: Actionable Steps for You** - How to capitalize on the ${moduleInfo.name} trend in business or career
    
    **H2: The Future of ${moduleInfo.name}** - Speculate on where the trend is headed. Is it a fad or long-term shift?
    
    **H2: Final Thoughts and Your Conclusion** - Concise summary and final message
    
    **H2: What's Your Opinion? [Call to Action]** - Encourage reader engagement
    
    Requirements:
    1. A compelling, keyword-rich title (H1)
    2. A detailed summary (3-4 sentences)
    3. FULL article content (1500-2000 words) following the exact structure above
    4. Use short paragraphs (2-4 sentences max)
    5. Use bullet points and numbered lists
    6. Use **bold** and *italicized* text to highlight key points
    7. Author name (realistic industry expert)
    8. Source publication (realistic tech publication)
    9. Category (${moduleInfo.category})
    10. Relevant tags (5-7 tags related to ${moduleInfo.name})
    11. Read time estimate (10-15 minutes)
    12. Whether it's trending (true)
    13. A realistic URL

    Format the response as a JSON object with these exact fields:
    - id (string, unique)
    - title (string)
    - summary (string)
    - content (string - use markdown formatting with # for H1, ## for H2, ### for H3, - for bullets, **bold** for emphasis, *italic* for emphasis)
    - author (string)
    - source (string)
    - url (string)
    - publishedAt (ISO string, recent dates)
    - category (string)
    - tags (array of strings)
    - readTime (number)
    - trending (boolean)
    - imageUrl (string, placeholder URL)

    Make the article engaging, skimmable, and valuable for data analysts and AI professionals. Focus on trending aspects of ${moduleInfo.name} with real industry insights and actionable advice.
    `;

    try {
      const response = await geminiService.generateContent(prompt);
      const article = JSON.parse(response);
      
      // Validate and process the single article
      return [{
        id: article.id || `${moduleId}_${Date.now()}`,
        title: article.title || 'Untitled Article',
        summary: article.summary || 'No summary available',
        content: article.content || 'No content available',
        author: article.author || 'Unknown Author',
        source: article.source || 'Unknown Source',
        url: article.url || '#',
        publishedAt: article.publishedAt || new Date().toISOString(),
        category: article.category || moduleInfo.category,
        tags: Array.isArray(article.tags) ? article.tags : [],
        readTime: typeof article.readTime === 'number' ? article.readTime : 10,
        trending: Boolean(article.trending),
        imageUrl: article.imageUrl || `https://via.placeholder.com/400x200/1f2937/ffffff?text=${encodeURIComponent(moduleInfo.name.substring(0, 20))}`
      }];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing Gemini response:', error);
      }
      return this.getMockModuleNews(moduleId);
    }
  }

  /**
   * Fetch news articles using Firebase Function
   */
  private async fetchNewsFromGemini(): Promise<NewsArticle[]> {
    try {
      const response = await fetch(FIREBASE_FUNCTIONS.newsFeed, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          moduleId: 'general',
          category: 'all',
          limit: 8
        })
      });

      if (!response.ok) {
        throw new Error(`News function error: ${response.status}`);
      }

      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching news from Firebase function:', error);
      }
      return this.getMockNewsData();
    }
  }

  /**
   * Get module information
   */
  private getModuleInfo(moduleId: string) {
    const modules = {
      'advanced-ai': {
        name: 'Advanced AI & Analytics',
        category: 'ai',
        focus: 'Advanced AI techniques, deep learning, neural networks, AI analytics, machine learning algorithms, AI-powered insights, predictive analytics, automated decision making'
      },
      'prompt-engineering': {
        name: 'Prompt Engineering',
        category: 'ai',
        focus: 'Prompt engineering techniques, AI prompt optimization, ChatGPT prompts, AI conversation design, prompt templates, AI interaction patterns, prompt best practices'
      },
      'excel': {
        name: 'Excel',
        category: 'excel',
        focus: 'Microsoft Excel features, advanced formulas, data analysis in Excel, Excel automation, VBA programming, Excel dashboards, pivot tables, data visualization'
      },
      'powerbi': {
        name: 'Power BI',
        category: 'powerbi',
        focus: 'Microsoft Power BI, business intelligence, data visualization, Power BI reports, DAX formulas, Power Query, dashboard design, data modeling'
      },
      'sql-database': {
        name: 'SQL & Database',
        category: 'sql',
        focus: 'SQL programming, database management, query optimization, database design, SQL Server, MySQL, PostgreSQL, data warehousing, ETL processes'
      },
      'python': {
        name: 'Python',
        category: 'python',
        focus: 'Python programming for data analysis, pandas, numpy, matplotlib, scikit-learn, data science libraries, Python automation, data processing'
      },
      'statistics': {
        name: 'Statistics',
        category: 'statistics',
        focus: 'Statistical analysis, hypothesis testing, regression analysis, A/B testing, statistical modeling, data interpretation, probability, inferential statistics'
      },
      'machine-learning': {
        name: 'Machine Learning',
        category: 'ml',
        focus: 'Machine learning algorithms, model training, feature engineering, model evaluation, supervised learning, unsupervised learning, deep learning, ML frameworks'
      }
    };
    
    return modules[moduleId as keyof typeof modules] || {
      name: 'General',
      category: 'general',
      focus: 'General data analysis and AI topics'
    };
  }

  /**
   * Get cached module news articles
   */
  private getCachedModuleNews(cacheKey: string): { articles: NewsArticle[]; timestamp: number } | null {
    try {
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reading cached module news:', error);
      }
      return null;
    }
  }

  /**
   * Cache module news articles
   */
  private cacheModuleNews(cacheKey: string, articles: NewsArticle[]): void {
    try {
      const cacheData = {
        articles,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error caching module news:', error);
      }
    }
  }

  /**
   * Get cached news articles
   */
  private getCachedNews(): { articles: NewsArticle[]; timestamp: number } | null {
    try {
      const cached = localStorage.getItem(this.NEWS_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error reading cached news:', error);
      }
      return null;
    }
  }

  /**
   * Cache news articles
   */
  private cacheNews(articles: NewsArticle[]): void {
    try {
      const cacheData = {
        articles,
        timestamp: Date.now()
      };
      localStorage.setItem(this.NEWS_CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error caching news:', error);
      }
    }
  }

  /**
   * Check if cached news is still valid
   */
  private isCacheValid(timestamp: number): boolean {
    const now = new Date();
    const cacheTime = new Date(timestamp);
    const hoursSinceCache = (now.getTime() - cacheTime.getTime()) / (1000 * 60 * 60);
    
    // Cache is valid if it's less than 24 hours old
    return hoursSinceCache < 24;
  }

  /**
   * Check if it's time to refresh news (12 PM daily)
   */
  shouldRefreshNews(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    const cachedNews = this.getCachedNews();
    
    if (!cachedNews) return true;
    
    const cacheTime = new Date(cachedNews.timestamp);
    const isAfterRefreshTime = currentHour >= this.REFRESH_TIME;
    const isNewDay = now.getDate() !== cacheTime.getDate();
    
    return isAfterRefreshTime && isNewDay;
  }

  /**
   * Force refresh news (clear cache and fetch new)
   */
  async forceRefreshNews(): Promise<NewsArticle[]> {
    localStorage.removeItem(this.NEWS_CACHE_KEY);
    return this.getTrendingNews();
  }

  /**
   * Clear all module caches to force refresh
   */
  clearAllModuleCaches(): void {
    const moduleIds = ['advanced-ai', 'prompt-engineering', 'excel', 'powerbi', 'sql-database', 'python', 'statistics', 'machine-learning'];
    moduleIds.forEach(moduleId => {
      localStorage.removeItem(`module_${moduleId}`);
    });
  }

  /**
   * Get mock module news data as fallback
   */
  private getMockModuleNews(moduleId: string): NewsArticle[] {
    const moduleInfo = this.getModuleInfo(moduleId);
    
    return [
      {
        id: `${moduleId}_1`,
        title: `The ${moduleInfo.name} Revolution: Why Everyone's Talking About This Game-Changing Trend`,
        summary: `Did you know that ${moduleInfo.name} adoption has skyrocketed by 340% in just the past 18 months? This comprehensive analysis explores why this trend is dominating conversations everywhere, uncovers the key players driving this revolution, and reveals actionable strategies you can implement today.`,
        content: `# The ${moduleInfo.name} Revolution: Why Everyone's Talking About This Game-Changing Trend

Did you know that **${moduleInfo.name} adoption has skyrocketed by 340%** in just the past 18 months? If you're in the data analysis or AI space, you've probably noticed this trend dominating conversations everywhere—from LinkedIn feeds to industry conferences. But what's really driving this massive shift, and more importantly, what does it mean for your career or business?

In this deep dive, we'll explore why ${moduleInfo.name} has become the hottest topic in tech, uncover the key players driving this revolution, and reveal actionable strategies you can implement today. Whether you're a seasoned professional or just getting started, this comprehensive analysis will give you the insights you need to stay ahead of the curve.

## What Is ${moduleInfo.name}? A Quick Overview

${moduleInfo.name} represents a fundamental shift in how we approach data analysis and AI-driven solutions. At its core, it's about leveraging advanced technologies to extract meaningful insights from complex datasets while maintaining efficiency and accuracy.

Think of it as the evolution from traditional data processing to **intelligent, automated analysis** that can adapt and learn from patterns. This isn't just another tech buzzword—it's a practical framework that's already transforming industries from healthcare to finance.

The beauty of ${moduleInfo.name} lies in its accessibility. You don't need to be a data scientist to benefit from its capabilities. Modern tools and platforms have democratized these powerful techniques, making them available to professionals across all skill levels.

## The Core of the Trend: Why is Everyone Talking About This?

The ${moduleInfo.name} trend isn't happening in a vacuum. Several key factors are driving this massive surge in interest and adoption:

- **Economic Pressure**: Companies are under increasing pressure to do more with less, and ${moduleInfo.name} offers a clear path to efficiency
- **Data Explosion**: We're generating more data than ever before, and traditional methods simply can't keep up
- **Talent Shortage**: The demand for skilled data professionals far exceeds supply, making automation essential
- **Competitive Advantage**: Early adopters are seeing **75% faster processing times** and **60% cost reductions**

### A Deep Dive into the Economic Impact

The financial implications of ${moduleInfo.name} adoption are staggering. Companies implementing these solutions report:

- **Average ROI of 340%** within the first year
- **Reduced operational costs** by up to 60%
- **Increased revenue** through better decision-making capabilities
- **Faster time-to-market** for new products and services

### The Key Players and Influencers

Several major players are driving the ${moduleInfo.name} revolution:

**Tech Giants**: Companies like Microsoft, Google, and Amazon are investing billions in ${moduleInfo.name} technologies, making them more accessible and powerful.

**Startups**: Innovative startups are creating specialized tools that address specific pain points in the ${moduleInfo.name} ecosystem.

**Industry Leaders**: Thought leaders and practitioners are sharing their experiences, creating a knowledge-sharing community that's accelerating adoption.

## My Unique Take: Why This Trend Might Be Overhyped (But Still Worth Your Attention)

Here's where I might surprise you: **${moduleInfo.name} is both overhyped and underappreciated**. The hype comes from vendors promising magical solutions to complex problems. The reality is more nuanced.

**The Overhyped Part**: Not every problem needs a ${moduleInfo.name} solution. Sometimes, a simple Excel formula or basic SQL query is more appropriate than deploying a complex AI model.

**The Underappreciated Part**: The real value of ${moduleInfo.name} isn't in the technology itself—it's in the **mindset shift** it represents. Organizations that embrace data-driven decision making at every level see the most significant benefits.

### Hidden Opportunities in the ${moduleInfo.name} Space

While everyone's focused on the obvious applications, there are several **hidden opportunities**:

- **Consulting Services**: There's a massive demand for professionals who can help organizations implement ${moduleInfo.name} solutions
- **Training and Education**: As adoption increases, so does the need for quality training programs
- **Integration Services**: Many companies struggle with connecting ${moduleInfo.name} tools to their existing systems
- **Custom Development**: Off-the-shelf solutions don't fit every use case

### Actionable Steps for You

Ready to capitalize on the ${moduleInfo.name} trend? Here's your roadmap:

**For Professionals**:
1. **Start Learning**: Take online courses or certifications in ${moduleInfo.name} fundamentals
2. **Practice Hands-On**: Work on real projects, even if they're personal or volunteer-based
3. **Build Your Network**: Connect with other professionals in the ${moduleInfo.name} space
4. **Share Your Journey**: Document your learning process and share insights with others

**For Businesses**:
1. **Assess Your Current State**: Understand what data you have and how you're currently using it
2. **Start Small**: Begin with pilot projects in low-risk areas
3. **Invest in Training**: Ensure your team has the skills needed to succeed
4. **Measure Everything**: Track ROI and adjust your strategy based on results

## The Future of ${moduleInfo.name}

So, is ${moduleInfo.name} a passing fad or a long-term transformation? Based on current trends and industry indicators, this is definitely a **long-term shift** that's here to stay.

**Short-term (1-2 years)**: We'll see continued rapid adoption, with more companies jumping on the bandwagon. Expect some consolidation in the vendor space as the market matures.

**Medium-term (3-5 years)**: ${moduleInfo.name} will become the standard way of doing business, not an exception. Companies that haven't adopted these practices will find themselves at a significant competitive disadvantage.

**Long-term (5+ years)**: We'll see the emergence of new paradigms that build on the foundation of ${moduleInfo.name}. Think quantum computing, advanced AI, and technologies we haven't even imagined yet.

## Final Thoughts and Your Conclusion

The ${moduleInfo.name} revolution is real, it's happening now, and it's not going away. The question isn't whether you should get involved—it's how quickly you can adapt and capitalize on this massive opportunity.

The key to success isn't just understanding the technology; it's about developing the **right mindset** and **practical skills** that will serve you regardless of how the technology evolves. Focus on fundamentals, stay curious, and always be learning.

Remember: **trends come and go, but the ability to adapt and learn is timeless**. ${moduleInfo.name} might be the hot topic today, but the skills you develop while learning about it will serve you throughout your entire career.

## What's Your Opinion? Let's Keep the Conversation Going

I'd love to hear your thoughts on the ${moduleInfo.name} trend. Have you started implementing these practices in your work? What challenges are you facing? What opportunities are you seeing that others might be missing?

Share your experiences in the comments below, and let's build a community of professionals who are navigating this exciting transformation together. Your insights could be exactly what someone else needs to take their next step forward.

**Ready to dive deeper?** Follow me for more insights on ${moduleInfo.name} trends, practical tips, and industry analysis. The future of data analysis is being written right now—let's make sure you're part of the story.`,
        author: 'Syed Rahman Hussain, AI Data Analyst',
        source: `${moduleInfo.name} Industry Report`,
        url: `https://example.com/${moduleId}-comprehensive-analysis`,
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: moduleInfo.category,
        tags: [moduleInfo.name, 'Industry Analysis', 'Technology Trends', 'Best Practices', 'Future Outlook', 'Implementation Guide'],
        readTime: 12,
        trending: true,
        imageUrl: `https://via.placeholder.com/400x200/1f2937/ffffff?text=${encodeURIComponent(moduleInfo.name.substring(0, 20))}`
      }
    ];
  }


  /**
   * Get mock news data as fallback
   */
  private getMockNewsData(): NewsArticle[] {
    return [
      {
        id: '1',
        title: 'Microsoft Excel 365 Introduces New AI-Powered Data Analysis Features',
        summary: 'Microsoft has announced new AI capabilities in Excel 365 that can automatically detect patterns and suggest insights from your data.',
        content: 'Microsoft Excel 365 now includes advanced AI features that can help users identify trends, outliers, and patterns in their data automatically. The new "Insights" feature uses machine learning to analyze your spreadsheets and provide actionable recommendations.',
        author: 'Sarah Johnson',
        source: 'Data Science Weekly',
        url: 'https://example.com/excel-ai-features',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: 'excel',
        tags: ['Excel', 'AI', 'Data Analysis', 'Microsoft'],
        readTime: 5,
        trending: true,
        imageUrl: 'https://via.placeholder.com/400x200/1f2937/ffffff?text=Excel+AI'
      },
      {
        id: '2',
        title: 'Python Pandas 2.0 Release: Major Performance Improvements',
        summary: 'The latest version of Pandas brings significant performance enhancements and new data manipulation capabilities.',
        content: 'Pandas 2.0 introduces a new backend engine that can process large datasets up to 10x faster than previous versions. The update also includes improved memory management and new data types for better performance.',
        author: 'Mike Chen',
        source: 'Python Weekly',
        url: 'https://example.com/pandas-2-release',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: 'python',
        tags: ['Python', 'Pandas', 'Performance', 'Data Science'],
        readTime: 7,
        trending: true,
        imageUrl: 'https://via.placeholder.com/400x200/1f2937/ffffff?text=Pandas+2.0'
      }
    ];
  }
}

export const newsService = new NewsService();
