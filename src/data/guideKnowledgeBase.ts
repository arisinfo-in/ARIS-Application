export interface FeatureGuide {
  id: string;
  name: string;
  description: string;
  route: string;
  category: 'main' | 'ai-tutor' | 'hub' | 'job-kit' | 'practice';
  steps: string[];
  relatedFeatures: string[];
  commonQuestions: string[];
  keywords: string[];
  quickActions?: {
    label: string;
    action: string;
  }[];
  externalLink?: string; // External URL for company-related queries
}

export const guideKnowledgeBase: FeatureGuide[] = [
  // MAIN FEATURES
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Your central hub for tracking learning progress, recent activities, and analytics',
    route: '/dashboard',
    category: 'main',
    steps: [
      '1. The Dashboard is your home page when you log in',
      '2. View your learning statistics and progress metrics',
      '3. See recent test attempts, AI sessions, and study plans',
      '4. Track your learning streak and achievements',
      '5. Access quick links to all major features'
    ],
    relatedFeatures: ['Practice Tests', 'AI Tutors', 'Study Plans'],
    commonQuestions: [
      'How do I view my progress?',
      'What does the dashboard show?',
      'How do I track my learning streak?'
    ],
    keywords: ['dashboard', 'home', 'progress', 'statistics', 'analytics', 'overview']
  },
  
  {
    id: 'ai-tutor',
    name: 'AI Tutors',
    description: 'Interactive AI-powered tutors for 8 specialized data analysis modules',
    route: '/tutor/excel',
    category: 'ai-tutor',
    steps: [
      '1. Click on "AI TUTORS" in the sidebar',
      '2. Select the module you want to learn (Excel, Power BI, SQL, Python, Statistics, ML, Prompt Engineering, or Advanced AI)',
      '3. Start asking questions - the AI tutor will provide detailed explanations',
      '4. Your conversation history is automatically saved',
      '5. Use suggested questions to get started quickly',
      '6. Switch between modules anytime to learn different topics'
    ],
    relatedFeatures: ['Practice Tests', 'Study Plans', 'SQL Practice', 'Python Notebook'],
    commonQuestions: [
      'How do I use the AI tutor?',
      'What modules are available?',
      'Can I save my conversations?',
      'How do I ask questions?'
    ],
    keywords: ['ai tutor', 'tutor', 'learn', 'ask questions', 'help', 'excel tutor', 'python tutor', 'sql tutor']
  },
  
  {
    id: 'ai-tutor-excel',
    name: 'Excel AI Tutor',
    description: 'Learn Microsoft Excel with AI-powered interactive tutoring',
    route: '/tutor/excel',
    category: 'ai-tutor',
    steps: [
      '1. Navigate to AI TUTORS section in sidebar',
      '2. Click on "Excel"',
      '3. Ask questions about Excel formulas, functions, pivot tables, charts, etc.',
      '4. Get instant explanations with examples',
      '5. Your session is saved automatically'
    ],
    relatedFeatures: ['Practice Tests', 'Study Plans'],
    commonQuestions: [
      'How do I learn Excel?',
      'What Excel topics can I learn?',
      'Can the tutor help with VLOOKUP?'
    ],
    keywords: ['excel', 'spreadsheet', 'formulas', 'vlookup', 'pivot table', 'charts', 'functions']
  },
  
  {
    id: 'ai-tutor-powerbi',
    name: 'Power BI AI Tutor',
    description: 'Master Microsoft Power BI with AI guidance',
    route: '/tutor/powerbi',
    category: 'ai-tutor',
    steps: [
      '1. Go to AI TUTORS in sidebar',
      '2. Select "Power BI"',
      '3. Ask about DAX formulas, data modeling, visualizations, dashboards',
      '4. Learn best practices and techniques'
    ],
    relatedFeatures: ['Practice Tests', 'Study Plans'],
    commonQuestions: [
      'How do I learn Power BI?',
      'What are DAX formulas?',
      'How do I create dashboards?'
    ],
    keywords: ['power bi', 'powerbi', 'dax', 'dashboard', 'visualization', 'data modeling']
  },
  
  {
    id: 'ai-tutor-sql',
    name: 'SQL & Database AI Tutor',
    description: 'Learn SQL and database management with AI assistance',
    route: '/tutor/sql',
    category: 'ai-tutor',
    steps: [
      '1. Click "SQL & Database" in AI TUTORS',
      '2. Ask questions about SQL queries, JOINs, database design, optimization',
      '3. Get code examples and explanations',
      '4. Practice with the SQL Practice tool after learning'
    ],
    relatedFeatures: ['SQL Practice', 'Practice Tests'],
    commonQuestions: [
      'How do I learn SQL?',
      'What are SQL JOINs?',
      'How do I write better queries?'
    ],
    keywords: ['sql', 'database', 'queries', 'joins', 'mysql', 'postgresql', 'database design']
  },
  
  {
    id: 'ai-tutor-python',
    name: 'Python AI Tutor',
    description: 'Learn Python programming for data analysis',
    route: '/tutor/python',
    category: 'ai-tutor',
    steps: [
      '1. Select "Python" from AI TUTORS',
      '2. Ask about pandas, numpy, matplotlib, data analysis, libraries',
      '3. Get code examples and explanations',
      '4. Practice in the Python Notebook feature'
    ],
    relatedFeatures: ['Python Notebook', 'Practice Tests'],
    commonQuestions: [
      'How do I learn Python?',
      'What Python libraries should I know?',
      'How do I analyze data with Python?'
    ],
    keywords: ['python', 'pandas', 'numpy', 'matplotlib', 'data science', 'programming']
  },
  
  {
    id: 'ai-tutor-statistics',
    name: 'Statistics AI Tutor',
    description: 'Learn statistical concepts and methods',
    route: '/tutor/statistics',
    category: 'ai-tutor',
    steps: [
      '1. Choose "Statistics" from AI TUTORS',
      '2. Ask about descriptive statistics, hypothesis testing, regression, probability',
      '3. Get explanations with formulas and examples'
    ],
    relatedFeatures: ['Practice Tests', 'Study Plans'],
    commonQuestions: [
      'How do I learn statistics?',
      'What is hypothesis testing?',
      'How do I calculate p-values?'
    ],
    keywords: ['statistics', 'statistical', 'hypothesis', 'regression', 'probability', 'mean', 'median']
  },
  
  {
    id: 'ai-tutor-ml',
    name: 'Machine Learning AI Tutor',
    description: 'Learn machine learning algorithms and techniques',
    route: '/tutor/ml',
    category: 'ai-tutor',
    steps: [
      '1. Select "Machine Learning" from AI TUTORS',
      '2. Ask about algorithms, model training, evaluation, scikit-learn',
      '3. Learn supervised and unsupervised learning concepts'
    ],
    relatedFeatures: ['Practice Tests', 'Python Notebook'],
    commonQuestions: [
      'How do I learn machine learning?',
      'What are ML algorithms?',
      'How do I train a model?'
    ],
    keywords: ['machine learning', 'ml', 'algorithms', 'scikit-learn', 'model', 'training', 'ai']
  },
  
  {
    id: 'ai-tutor-prompt',
    name: 'Prompt Engineering AI Tutor',
    description: 'Master the art of prompt engineering for AI',
    route: '/tutor/prompt',
    category: 'ai-tutor',
    steps: [
      '1. Click "Prompt Engineering" in AI TUTORS',
      '2. Learn how to write effective prompts',
      '3. Understand AI interaction techniques',
      '4. Get examples and best practices'
    ],
    relatedFeatures: ['AI Tutors', 'Advanced AI Tutor'],
    commonQuestions: [
      'What is prompt engineering?',
      'How do I write better prompts?',
      'What are prompt techniques?'
    ],
    keywords: ['prompt engineering', 'prompts', 'ai interaction', 'chatgpt', 'prompting']
  },
  
  {
    id: 'ai-tutor-advanced',
    name: 'Advanced AI Tutor',
    description: 'Learn advanced AI concepts and cutting-edge technologies',
    route: '/tutor/advanced',
    category: 'ai-tutor',
    steps: [
      '1. Select "Advanced AI Tutor" from AI TUTORS',
      '2. Explore deep learning, transformers, advanced ML techniques',
      '3. Learn about latest AI developments'
    ],
    relatedFeatures: ['Machine Learning Tutor', 'Prompt Engineering'],
    commonQuestions: [
      'What is advanced AI?',
      'How do I learn deep learning?',
      'What are transformers?'
    ],
    keywords: ['advanced ai', 'deep learning', 'transformers', 'neural networks', 'cnn', 'rnn']
  },
  
  // PRACTICE FEATURES
  {
    id: 'practice-tests',
    name: 'Practice Tests',
    description: 'Take AI-generated practice tests to assess your knowledge',
    route: '/tests',
    category: 'practice',
    steps: [
      '1. Click "Practice Tests" in the sidebar',
      '2. Browse available tests or create a new one',
      '3. Click "Start Test" on any test',
      '4. Answer questions and submit when done',
      '5. View detailed results and performance analysis',
      '6. Get personalized test recommendations based on your performance'
    ],
    relatedFeatures: ['AI Tutors', 'Study Plans', 'Dashboard'],
    commonQuestions: [
      'How do I take a test?',
      'How do I create a test?',
      'How do I see my test results?',
      'What are recommended tests?'
    ],
    keywords: ['test', 'practice test', 'quiz', 'exam', 'assessment', 'questions', 'results']
  },
  
  {
    id: 'study-plans',
    name: 'Study Plans',
    description: 'Create personalized learning schedules and track your progress',
    route: '/study-plans',
    category: 'main',
    steps: [
      '1. Click "Study Plans" in the sidebar',
      '2. Click "Create New Plan" or "Generate Recommended Plan"',
      '3. Select modules and set duration',
      '4. Follow the daily schedule',
      '5. Mark tasks as complete',
      '6. Track your progress over time'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests', 'SQL Practice'],
    commonQuestions: [
      'How do I create a study plan?',
      'How do I get a recommended plan?',
      'How do I track my progress?'
    ],
    keywords: ['study plan', 'schedule', 'learning plan', 'curriculum', 'track progress']
  },
  
  {
    id: 'sql-practice',
    name: 'SQL Practice',
    description: 'Practice SQL queries with real datasets in an interactive environment',
    route: '/study-plans/sql-practice',
    category: 'practice',
    steps: [
      '1. Go to Study Plans and click "SQL Practice" or navigate directly',
      '2. Select a dataset (Customer Data, Sales Data, or Weather Data)',
      '3. Write SQL queries in the editor',
      '4. Click "Run Query" to execute',
      '5. View results and schema information',
      '6. Save your queries for later',
      '7. Try example queries to learn'
    ],
    relatedFeatures: ['SQL AI Tutor', 'Practice Tests'],
    commonQuestions: [
      'How do I practice SQL?',
      'What datasets are available?',
      'How do I save my queries?',
      'Can I see the database schema?'
    ],
    keywords: ['sql practice', 'sql', 'database', 'queries', 'practice sql', 'sql editor']
  },
  
  {
    id: 'python-notebook',
    name: 'Python Notebook',
    description: 'Write and execute Python code in a Jupyter-like notebook environment',
    route: '/python-notebook',
    category: 'practice',
    steps: [
      '1. Click "Python Notebook" from Study Plans or navigate directly',
      '2. Add code cells using the "+" button',
      '3. Write Python code (pandas, numpy, matplotlib supported)',
      '4. Click "Run" to execute the cell',
      '5. View output, errors, or visualizations',
      '6. Save your notebook for later',
      '7. Load saved notebooks anytime'
    ],
    relatedFeatures: ['Python AI Tutor', 'Practice Tests'],
    commonQuestions: [
      'How do I use the Python notebook?',
      'What libraries are available?',
      'How do I save my code?',
      'Can I create visualizations?'
    ],
    keywords: ['python notebook', 'python', 'code', 'jupyter', 'pandas', 'numpy', 'matplotlib']
  },
  
  // THE HUB FEATURES
  {
    id: 'the-hub',
    name: 'The Hub',
    description: 'Your content library with articles, series, certificates, and career resources',
    route: '/news',
    category: 'hub',
    steps: [
      '1. Click "The Hub" in the sidebar',
      '2. Browse different sections: Articles, Series, AI Clips, Certificates, Job Kit, AI Tools, Projects',
      '3. Click on any section to explore',
      '4. Use search to find specific content',
      '5. Bookmark articles for later reading'
    ],
    relatedFeatures: ['Job Kit', 'Free Certificates', 'AI Tools'],
    commonQuestions: [
      'What is The Hub?',
      'What content is available?',
      'How do I find articles?'
    ],
    keywords: ['hub', 'news', 'articles', 'content', 'library', 'resources']
  },
  
  {
    id: 'all-articles',
    name: 'All Articles',
    description: 'Browse all educational articles across all topics',
    route: '/news/all-articles',
    category: 'hub',
    steps: [
      '1. Go to The Hub',
      '2. Click "All Articles"',
      '3. Browse or search articles',
      '4. Click on any article to read',
      '5. Filter by category or topic'
    ],
    relatedFeatures: ['Series', 'AI Clips'],
    commonQuestions: [
      'How do I find articles?',
      'What topics are covered?'
    ],
    keywords: ['articles', 'blog', 'posts', 'content', 'reading']
  },
  
  {
    id: 'series',
    name: 'Modules Series',
    description: 'Curated learning series and structured learning paths',
    route: '/news/series',
    category: 'hub',
    steps: [
      '1. Navigate to The Hub',
      '2. Click "Modules Series"',
      '3. Select a series to follow',
      '4. Read episodes in order',
      '5. Track your progress through the series'
    ],
    relatedFeatures: ['All Articles', 'Study Plans'],
    commonQuestions: [
      'What are series?',
      'How do I follow a series?'
    ],
    keywords: ['series', 'episodes', 'learning path', 'curriculum']
  },
  
  {
    id: 'ai-clips',
    name: 'AI Clips',
    description: 'Watch curated videos about AI and data analytics',
    route: '/news/ai-clips',
    category: 'hub',
    steps: [
      '1. Go to The Hub',
      '2. Click "AI Clips"',
      '3. Browse video content',
      '4. Click to watch videos',
      '5. Learn from industry experts'
    ],
    relatedFeatures: ['All Articles', 'Series'],
    commonQuestions: [
      'What videos are available?',
      'How do I watch videos?'
    ],
    keywords: ['videos', 'clips', 'youtube', 'watch', 'video content']
  },
  
  {
    id: 'free-certificates',
    name: 'Free Certificates',
    description: 'Access free data analytics certificates from top companies',
    route: '/news/free-certificates',
    category: 'hub',
    steps: [
      '1. Navigate to The Hub',
      '2. Click "Free Certificates"',
      '3. Browse available certificates from companies like Quantium, Deloitte, TATA, Cisco, Citi, Great Learning',
      '4. Click on a certificate to view details',
      '5. Click "Get Certificate" to access the external link',
      '6. Complete the certificate program on the provider\'s platform'
    ],
    relatedFeatures: ['Job Kit', 'Study Plans'],
    commonQuestions: [
      'What certificates are available?',
      'Are they really free?',
      'How do I get a certificate?'
    ],
    keywords: ['certificates', 'certification', 'free', 'credentials', 'quantium', 'deloitte', 'tata']
  },
  
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'Discover essential AI tools and platforms for data analysts',
    route: '/news/ai-tools',
    category: 'hub',
    steps: [
      '1. Go to The Hub',
      '2. Click "AI Tools"',
      '3. Browse tools by category',
      '4. Learn about each tool',
      '5. Access tool websites and resources'
    ],
    relatedFeatures: ['AI Tutors', 'Standard Projects'],
    commonQuestions: [
      'What AI tools are recommended?',
      'How do I use these tools?'
    ],
    keywords: ['ai tools', 'tools', 'software', 'platforms', 'resources']
  },
  
  {
    id: 'standard-projects',
    name: 'Standard Projects',
    description: 'Explore standard data analysis projects with step-by-step guides',
    route: '/news/standard-projects',
    category: 'hub',
    steps: [
      '1. Navigate to The Hub',
      '2. Click "Standard Projects"',
      '3. Browse project templates',
      '4. Click on a project to see details',
      '5. Follow the step-by-step guide',
      '6. Build your portfolio with these projects'
    ],
    relatedFeatures: ['Python Notebook', 'SQL Practice', 'Portfolio Building Guide'],
    commonQuestions: [
      'What projects are available?',
      'How do I complete a project?',
      'Can I use these for my portfolio?'
    ],
    keywords: ['projects', 'portfolio', 'templates', 'examples', 'practice projects']
  },
  
  // JOB KIT FEATURES
  {
    id: 'job-kit',
    name: 'Job Kit',
    description: 'Complete career resources for data analyst job search',
    route: '/news/job-kit',
    category: 'job-kit',
    steps: [
      '1. Go to The Hub',
      '2. Click "Job Kit"',
      '3. Explore resources: Email Templates, Resumes, Cover Letters, Interview Prep, Portfolio Guide, Industry Guides',
      '4. Click on any resource to access',
      '5. Use templates and guides for your job search'
    ],
    relatedFeatures: ['Mock Interview', 'Resume Templates', 'Cover Letters'],
    commonQuestions: [
      'What is the Job Kit?',
      'What resources are available?',
      'How do I prepare for interviews?'
    ],
    keywords: ['job kit', 'career', 'job search', 'resume', 'interview', 'portfolio']
  },
  
  {
    id: 'email-templates',
    name: 'Job Email Templates',
    description: 'Professional email templates for job applications and networking',
    route: '/news/job-kit/email-templates',
    category: 'job-kit',
    steps: [
      '1. Go to Job Kit',
      '2. Click "Job Email Templates"',
      '3. Browse available templates',
      '4. Click on a template to view and customize',
      '5. Copy and personalize for your use'
    ],
    relatedFeatures: ['Cover Letters', 'Resume Templates'],
    commonQuestions: [
      'What email templates are available?',
      'How do I use the templates?'
    ],
    keywords: ['email templates', 'job application', 'networking', 'follow up']
  },
  
  {
    id: 'resume-templates',
    name: 'Resume Templates',
    description: 'Modern resume templates for data analysts',
    route: '/news/job-kit/resume-templates',
    category: 'job-kit',
    steps: [
      '1. Navigate to Job Kit',
      '2. Click "Resume Templates"',
      '3. Browse template designs',
      '4. Select a template',
      '5. Download and customize with your information'
    ],
    relatedFeatures: ['Cover Letters', 'Portfolio Building Guide'],
    commonQuestions: [
      'What resume templates are available?',
      'How do I download a template?'
    ],
    keywords: ['resume', 'cv', 'template', 'download']
  },
  
  {
    id: 'cover-letters',
    name: 'Cover Letter Examples',
    description: 'Industry-specific cover letter examples and writing guides',
    route: '/news/job-kit/cover-letters',
    category: 'job-kit',
    steps: [
      '1. Go to Job Kit',
      '2. Click "Cover Letter Examples"',
      '3. Browse examples by industry',
      '4. View and customize examples',
      '5. Use as a guide for your cover letter'
    ],
    relatedFeatures: ['Resume Templates', 'Email Templates'],
    commonQuestions: [
      'What cover letter examples are available?',
      'How do I write a cover letter?'
    ],
    keywords: ['cover letter', 'application letter', 'examples']
  },
  
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    description: 'Common interview questions and answers for data analyst roles',
    route: '/news/job-kit/interview-preparation',
    category: 'job-kit',
    steps: [
      '1. Navigate to Job Kit',
      '2. Click "Interview Preparation"',
      '3. Review common questions',
      '4. Study answers and tips',
      '5. Practice with Mock Interview feature'
    ],
    relatedFeatures: ['Mock Interview', 'Industry Guides'],
    commonQuestions: [
      'What questions should I prepare for?',
      'How do I answer interview questions?'
    ],
    keywords: ['interview', 'interview prep', 'questions', 'answers', 'preparation']
  },
  
  {
    id: 'mock-interview',
    name: 'Mock Interview',
    description: 'Practice interviews with AI-powered analysis of your responses',
    route: '/news/job-kit/mock-interview',
    category: 'job-kit',
    steps: [
      '1. Go to Job Kit',
      '2. Click "Mock Interview" (or find it in Interview Preparation)',
      '3. Select difficulty level (Easy, Medium, Hard)',
      '4. Click "Start Interview"',
      '5. Answer questions (theory or practical coding)',
      '6. Record your video response',
      '7. Get AI-powered feedback on your performance',
      '8. Review detailed analysis and improve'
    ],
    relatedFeatures: ['Interview Preparation', 'Practice Tests'],
    commonQuestions: [
      'How does mock interview work?',
      'What types of questions are asked?',
      'How do I get feedback?'
    ],
    keywords: ['mock interview', 'practice interview', 'interview practice', 'video interview']
  },
  
  {
    id: 'portfolio-guide',
    name: 'Portfolio Building Guide',
    description: 'Step-by-step guide to create an impressive data science portfolio',
    route: '/news/job-kit/portfolio-building-guide',
    category: 'job-kit',
    steps: [
      '1. Navigate to Job Kit',
      '2. Click "Portfolio Building Guide"',
      '3. Follow the step-by-step instructions',
      '4. Learn what projects to include',
      '5. Get tips on presentation and hosting',
      '6. Use Standard Projects for portfolio pieces'
    ],
    relatedFeatures: ['Standard Projects', 'Python Notebook', 'SQL Practice'],
    commonQuestions: [
      'How do I build a portfolio?',
      'What projects should I include?',
      'Where should I host my portfolio?'
    ],
    keywords: ['portfolio', 'portfolio building', 'projects', 'github', 'showcase']
  },
  
  {
    id: 'industry-guides',
    name: 'Industry-Specific Guides',
    description: 'Learn how to break into different industries as a data analyst',
    route: '/news/job-kit/industry-guides',
    category: 'job-kit',
    steps: [
      '1. Go to Job Kit',
      '2. Click "Industry-Specific Guides"',
      '3. Browse guides by industry',
      '4. Read about requirements and opportunities',
      '5. Get industry-specific tips'
    ],
    relatedFeatures: ['LinkedIn Strategy', 'Interview Preparation'],
    commonQuestions: [
      'What industries can I work in?',
      'What skills do I need for each industry?'
    ],
    keywords: ['industry', 'career path', 'industries', 'sectors']
  },
  
  {
    id: 'linkedin-strategy',
    name: 'LinkedIn Strategy',
    description: 'Learn how to optimize your LinkedIn profile and network effectively',
    route: '/news/job-kit/strategy/linkedin',
    category: 'job-kit',
    steps: [
      '1. Navigate to Job Kit',
      '2. Find LinkedIn Strategy guide',
      '3. Learn profile optimization tips',
      '4. Understand networking strategies',
      '5. Get content creation ideas'
    ],
    relatedFeatures: ['Resume Templates', 'Portfolio Building Guide'],
    commonQuestions: [
      'How do I optimize my LinkedIn?',
      'How do I network on LinkedIn?'
    ],
    keywords: ['linkedin', 'networking', 'profile', 'social media']
  },
  
  // ARIS COMPANY INFORMATION
  {
    id: 'aris-about',
    name: 'About ARIS',
    description: 'ARIS is a leading AI data analytics company specializing in agentic AI training and consultancy, founded in 2020',
    route: '/dashboard',
    externalLink: 'https://arisinfo.in/about',
    category: 'main',
    steps: [
      'ARIS is a leading AI data analytics company',
      'Specializes in agentic AI training and consultancy',
      'Founded in 2020 with vision to make AI accessible',
      'Tagline: "Human + AI = Super Intelligence Analytics"',
      'Platform: https://aris-aidataanlayst.web.app/'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests', 'Study Plans'],
    commonQuestions: [
      'What is ARIS?',
      'Tell me about ARIS',
      'Who is ARIS?',
      'What does ARIS do?'
    ],
    keywords: ['about aris', 'what is aris', 'aris company', 'aris info', 'aris information']
  },
  
  {
    id: 'aris-mission',
    name: 'ARIS Mission',
    description: 'ARIS mission to democratize artificial intelligence education',
    route: '/dashboard',
    category: 'main',
    steps: [
      'To democratize artificial intelligence education',
      'Provide accessible, practical, and ethical training',
      'Empower individuals and organizations',
      'Harness AI for positive change'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests'],
    commonQuestions: [
      'What is ARIS mission?',
      'What is the mission of ARIS?',
      'What does ARIS stand for?'
    ],
    keywords: ['mission', 'aris mission', 'purpose', 'goal']
  },
  
  {
    id: 'aris-vision',
    name: 'ARIS Vision',
    description: 'ARIS vision for a world where AI is accessible to everyone',
    route: '/dashboard',
    category: 'main',
    steps: [
      'A world where AI is accessible to everyone',
      'Innovation driven by ethical principles',
      'Technology serving human progress',
      'Future-ready thinking and scalable solutions'
    ],
    relatedFeatures: ['AI Tutors', 'The Hub'],
    commonQuestions: [
      'What is ARIS vision?',
      'What is the vision of ARIS?',
      'Where is ARIS heading?'
    ],
    keywords: ['vision', 'aris vision', 'future', 'direction', 'goals']
  },
  
  {
    id: 'aris-values',
    name: 'ARIS Core Values',
    description: 'ARIS core values: Precision-Driven, Innovation-First, Ethical AI, Future-Ready Thinking',
    route: '/dashboard',
    category: 'main',
    steps: [
      'Precision-Driven: Accurate, data-driven AI solutions',
      'Innovation-First: Stay at forefront of AI technology',
      'Ethical AI: Responsible AI with transparency and fairness',
      'Future-Ready Thinking: Smart, scalable AI solutions'
    ],
    relatedFeatures: ['AI Tutors', 'Study Plans'],
    commonQuestions: [
      'What are ARIS values?',
      'What are ARIS core values?',
      'What principles does ARIS follow?'
    ],
    keywords: ['values', 'core values', 'principles', 'ethics', 'ethical ai']
  },
  
  {
    id: 'aris-trainers',
    name: 'ARIS Trainers',
    description: 'Expert trainers and instructors at ARIS',
    route: '/dashboard',
    externalLink: 'https://arisinfo.in/training',
    category: 'main',
    steps: [
      'Syed Shabaz - CEO & Founder, teaches Vibe Analytics',
      'Syed Rahman Hussain - Lead AI Data Analyst, teaches Data Analytics & AI, Excel, Power BI, Python, SQL',
      'Mohammed Imtiyaz - AI Data Engineer, teaches Prompting & AI Tools, Statistics, Machine Learning',
      'Eshwar Kumar - Data Analyst Trainer, specializes in Data Modeling and Visualization'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests'],
    commonQuestions: [
      'Who are ARIS trainers?',
      'Who teaches at ARIS?',
      'Who are the instructors?',
      'Who are the experts?'
    ],
    keywords: ['trainers', 'instructors', 'teachers', 'experts', 'who teaches', 'mentors', 'syed shabaz', 'syed rahman', 'mohammed imtiyaz', 'eshwar kumar']
  },
  
  {
    id: 'aris-courses',
    name: 'ARIS Courses',
    description: 'Complete list of training programs offered by ARIS',
    route: '/tutor/excel',
    externalLink: 'https://arisinfo.in/training',
    category: 'ai-tutor',
    steps: [
      'Main Programs: Vibe Analytics (₹5,000), Data Analytics & AI (₹10,000), Prompting & AI Tools (₹5,000)',
      'Additional Programs: Excel (₹5,000), Power BI (₹8,000), Python (₹8,000), SQL (₹5,000), Statistics (₹5,000), Machine Learning (₹5,000)',
      'All courses include certification',
      'Flexible scheduling available'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests', 'Study Plans'],
    commonQuestions: [
      'What courses does ARIS offer?',
      'What can I learn at ARIS?',
      'What training programs are available?',
      'How many courses are there?'
    ],
    keywords: ['courses', 'training programs', 'subjects', 'modules', 'what courses', 'curriculum', 'programs']
  },
  
  {
    id: 'vibe-analytics',
    name: 'Vibe Analytics Course',
    description: 'Advanced 2-week course on vibe analytics, data preprocessing, and AI models',
    route: '/dashboard',
    category: 'ai-tutor',
    steps: [
      'Duration: 2 weeks, Mon-Fri, 1.5 hours/day',
      'Price: ₹5,000',
      'Instructor: Syed Shabaz',
      'Level: Advanced',
      'Includes: Data Pattern Recognition, Predictive Modeling, AI Model Training',
      'Certification: Yes'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests'],
    commonQuestions: [
      'What is Vibe Analytics?',
      'Tell me about Vibe Analytics course',
      'How much is Vibe Analytics?'
    ],
    keywords: ['vibe analytics', 'syed shabaz', 'advanced course']
  },
  
  {
    id: 'data-analytics-ai',
    name: 'Data Analytics & AI Course',
    description: 'Comprehensive 6-week program combining data analytics with cutting-edge AI technologies',
    route: '/tutor/excel',
    category: 'ai-tutor',
    steps: [
      'Duration: 6 weeks, Mon-Fri, 2 hours/day',
      'Price: ₹10,000',
      'Instructor: Syed Rahman Hussain',
      'Level: Intermediate to Advanced',
      'Includes: Statistical Analysis, Machine Learning, Deep Learning',
      'Certification: Yes'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests', 'Study Plans'],
    commonQuestions: [
      'What is Data Analytics & AI course?',
      'Tell me about the main program',
      'How much is Data Analytics & AI?'
    ],
    keywords: ['data analytics ai', 'main program', 'syed rahman hussain', 'comprehensive program']
  },
  
  {
    id: 'prompting-ai-tools',
    name: 'Prompting & AI Tools Course',
    description: '2-week course on AI prompt engineering and tool integration',
    route: '/tutor/prompt',
    category: 'ai-tutor',
    steps: [
      'Duration: 2 weeks, Mon-Fri, 1.5 hours/day',
      'Price: ₹5,000',
      'Instructor: Mohammed Imtiyaz',
      'Level: Beginner to Intermediate',
      'Includes: AI Prompt Engineering, Tool Integration, Workflow Automation',
      'Certification: Yes'
    ],
    relatedFeatures: ['AI Tutors', 'Practice Tests'],
    commonQuestions: [
      'What is Prompting & AI Tools?',
      'Tell me about prompt engineering course',
      'How much is Prompting & AI Tools?'
    ],
    keywords: ['prompting', 'ai tools', 'prompt engineering', 'mohammed imtiyaz']
  },
  
  {
    id: 'aris-services',
    name: 'ARIS Services',
    description: 'AI training, consultancy, and analytics services offered by ARIS',
    route: '/dashboard',
    externalLink: 'https://arisinfo.in/services',
    category: 'main',
    steps: [
      'AI Analytics Training: Comprehensive programs with practical applications',
      'Self-Paced Learning: Flexible online courses with 24/7 access',
      'AI Consultancy: Strategic AI implementation guidance',
      'Agentic AI Solutions: Autonomous AI agents development',
      'Consulting Services: Strategy, Data Governance, Digital Transformation',
      'Analytics Services: Predictive Analytics, Business Intelligence, Data Visualization',
      'AI Solutions: Machine Learning, NLP, Computer Vision'
    ],
    relatedFeatures: ['AI Tutors', 'Job Kit'],
    commonQuestions: [
      'What services does ARIS offer?',
      'What consulting services are available?',
      'What analytics services do you provide?'
    ],
    keywords: ['services', 'consulting', 'consultancy', 'analytics services', 'ai solutions', 'training services']
  },
  
  {
    id: 'aris-contact',
    name: 'ARIS Contact Information',
    description: 'How to contact ARIS for inquiries and support',
    route: '/dashboard',
    externalLink: 'https://arisinfo.in/contact',
    category: 'main',
    steps: [
      'Email: arisinfo.in@gmail.com',
      'Phone: +91 8374316403',
      'Location: Hyderabad, INDIA',
      'Working Hours: Monday-Friday, 9:00 AM - 6:00 PM PST',
      'Response Time: Within 24 hours',
      'Social Media: LinkedIn, Facebook, Instagram, YouTube'
    ],
    relatedFeatures: ['Dashboard'],
    commonQuestions: [
      'How do I contact ARIS?',
      'What is ARIS email?',
      'What is ARIS phone number?',
      'Where is ARIS located?'
    ],
    keywords: ['contact', 'email', 'phone', 'address', 'location', 'support', 'reach out']
  },
  
  {
    id: 'aris-statistics',
    name: 'ARIS Statistics & Achievements',
    description: 'Key metrics and achievements of ARIS',
    route: '/dashboard',
    category: 'main',
    steps: [
      '50,000+ Happy Students',
      '250+ Projects Completed',
      '4.9/5 Average Rating',
      '5,000+ Verified Reviews',
      '98% Student Satisfaction',
      '92% Course Completion Rate',
      '85% Career Advancement',
      '96% Client Retention',
      'AI Excellence Award 2024',
      '50K+ Students Milestone 2023'
    ],
    relatedFeatures: ['Dashboard', 'Practice Tests'],
    commonQuestions: [
      'How many students does ARIS have?',
      'What is ARIS rating?',
      'What are ARIS achievements?',
      'How successful is ARIS?'
    ],
    keywords: ['statistics', 'achievements', 'rating', 'students', 'success', 'metrics', 'reviews']
  },
  
  {
    id: 'aris-platform',
    name: 'ARIS Platform',
    description: 'ARIS AI Data Analyst Companion platform features and statistics',
    route: '/dashboard',
    category: 'main',
    steps: [
      'Platform URL: https://aris-aidataanlayst.web.app/',
      '1,200+ Learners',
      '9 Modules available',
      '25 AI Tools',
      'Features: Study Plans, Practice Tests, AI Tutors, Resources, Free Certificates, Job Kit',
      'Video Introduction available on YouTube'
    ],
    relatedFeatures: ['Dashboard', 'AI Tutors', 'Practice Tests', 'Study Plans'],
    commonQuestions: [
      'What is the ARIS platform?',
      'How many learners are on the platform?',
      'What features does the platform have?'
    ],
    keywords: ['platform', 'aris platform', 'web app', 'learners', 'modules', 'ai tools']
  }
];

