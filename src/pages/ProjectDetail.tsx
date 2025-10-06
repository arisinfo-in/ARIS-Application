import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BarChart3, Users, ShoppingCart, TrendingUp, DollarSign, CheckCircle, Clock, Target, Zap, Database, Code, ExternalLink, Download, Play, BookOpen, Lightbulb, Award } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const projectDetails = {
    'sales-dashboard': {
      title: 'Sales Dashboard Using Power BI',
      goal: 'Analyze and visualize monthly sales performance by region, product, and category.',
      tools: ['Excel dataset', 'Power BI', 'DAX formulas'],
      skills: ['Data cleaning', 'Dashboard design', 'KPIs', 'Interactive visuals'],
      recommendedFor: ['FMCG', 'Retail', 'Ecommerce job roles'],
      difficulty: 'Beginner',
      duration: '2-3 days',
      icon: BarChart3,
      color: 'from-orange-400 to-orange-500',
      description: 'Create an interactive sales dashboard that provides insights into monthly performance across different dimensions.',
      features: [
        'Monthly sales trends and patterns',
        'Regional performance comparison',
        'Product category analysis',
        'Interactive slicers and filters',
        'KPI metrics and key insights'
      ],
      stepByStep: [
        {
          step: 1,
          title: 'Data Preparation',
          description: 'Clean and prepare your sales data in Excel',
          tasks: [
            'Import sales data from CSV/Excel files',
            'Remove duplicates and handle missing values',
            'Create calculated columns for month, quarter, and year',
            'Standardize product categories and regions'
          ],
          resources: [
            'Sample sales dataset (download link)',
            'Data cleaning checklist',
            'Excel data preparation guide'
          ]
        },
        {
          step: 2,
          title: 'Power BI Setup',
          description: 'Import data and create basic visualizations',
          tasks: [
            'Connect Power BI to your Excel file',
            'Create a data model with proper relationships',
            'Build basic charts (bar, line, pie)',
            'Set up date hierarchy for time analysis'
          ],
          resources: [
            'Power BI Desktop (free download)',
            'Power BI beginner tutorial',
            'Data modeling best practices'
          ]
        },
        {
          step: 3,
          title: 'Dashboard Design',
          description: 'Create interactive dashboard with KPIs',
          tasks: [
            'Design dashboard layout and theme',
            'Add KPI cards for key metrics',
            'Create slicers for filtering',
            'Add drill-through functionality'
          ],
          resources: [
            'Dashboard design templates',
            'KPI calculation formulas',
            'Power BI design guidelines'
          ]
        },
        {
          step: 4,
          title: 'Advanced Features',
          description: 'Add advanced analytics and insights',
          tasks: [
            'Create DAX formulas for custom calculations',
            'Add conditional formatting',
            'Implement bookmarks and buttons',
            'Create mobile-responsive layout'
          ],
          resources: [
            'DAX formula reference',
            'Advanced Power BI techniques',
            'Mobile optimization guide'
          ]
        }
      ],
      datasets: [
        {
          name: 'Sample Sales Dataset',
          description: 'Comprehensive sales data with 10,000+ records',
          size: '2.5 MB',
          format: 'Excel (.xlsx)',
          downloadUrl: 'https://go.microsoft.com/fwlink/?LinkID=521962',
          features: ['Product details', 'Sales transactions', 'Customer information', 'Regional data']
        }
      ],
      youtubeVideos: [
        {
          title: 'Power BI Dashboard Tutorial',
          description: 'Complete guide to building sales dashboards in Power BI',
          duration: '45 min',
          channel: 'Data Analysis Pro',
          url: 'https://youtube.com/watch?v=powerbi-sales-dashboard'
        },
        {
          title: 'DAX Formulas for Beginners',
          description: 'Learn essential DAX formulas for data analysis',
          duration: '30 min',
          channel: 'Power BI Academy',
          url: 'https://youtube.com/watch?v=dax-formulas-beginner'
        }
      ],
      tutorials: [
        {
          title: 'Power BI Basics for Beginners',
          duration: '45 minutes',
          type: 'Video Tutorial',
          url: '#',
          description: 'Complete guide to Power BI fundamentals'
        },
        {
          title: 'DAX Formulas Made Easy',
          duration: '30 minutes',
          type: 'Article',
          url: '#',
          description: 'Master DAX formulas for data analysis'
        }
      ],
      portfolioTips: [
        'Include screenshots of your dashboard in different views',
        'Write a brief case study explaining your approach',
        'Highlight the business impact of your insights',
        'Show before/after comparisons if applicable'
      ]
    },
    'customer-churn': {
      title: 'Customer Churn Analysis Using Python',
      goal: 'Predict which customers are likely to stop using a product.',
      tools: ['Python (Pandas, Seaborn, Matplotlib)', 'CSV dataset'],
      skills: ['EDA', 'Correlation', 'Data cleaning', 'Visualization', 'Business insights'],
      recommendedFor: ['SaaS', 'Telecom', 'B2C product companies'],
      difficulty: 'Intermediate',
      duration: '3-4 days',
      icon: Users,
      color: 'from-orange-400 to-orange-500',
      description: 'Build a comprehensive churn analysis model to identify at-risk customers and provide actionable insights.',
      features: [
        'Exploratory data analysis (EDA)',
        'Customer segmentation analysis',
        'Churn prediction modeling',
        'Data visualization and insights',
        'Business recommendations'
      ],
      stepByStep: [
        {
          step: 1,
          title: 'Data Exploration',
          description: 'Understand your customer data and churn patterns',
          tasks: [
            'Load and examine the dataset structure',
            'Perform basic statistical analysis',
            'Identify missing values and outliers',
            'Create initial visualizations'
          ],
          resources: [
            'Customer churn dataset (download link)',
            'Python EDA template',
            'Statistical analysis guide'
          ]
        },
        {
          step: 2,
          title: 'Feature Engineering',
          description: 'Create meaningful features for churn prediction',
          tasks: [
            'Calculate customer lifetime value',
            'Create usage frequency metrics',
            'Engineer time-based features',
            'Handle categorical variables'
          ],
          resources: [
            'Feature engineering best practices',
            'Pandas data manipulation guide',
            'Feature selection techniques'
          ]
        },
        {
          step: 3,
          title: 'Model Building',
          description: 'Build and train churn prediction models',
          tasks: [
            'Split data into train/test sets',
            'Train multiple models (Logistic Regression, Random Forest)',
            'Evaluate model performance',
            'Tune hyperparameters'
          ],
          resources: [
            'Scikit-learn documentation',
            'Model evaluation metrics guide',
            'Hyperparameter tuning tutorial'
          ]
        },
        {
          step: 4,
          title: 'Visualization & Insights',
          description: 'Create compelling visualizations and business insights',
          tasks: [
            'Create churn prediction visualizations',
            'Build customer segmentation charts',
            'Generate business recommendations',
            'Create interactive dashboard'
          ],
          resources: [
            'Matplotlib/Seaborn tutorials',
            'Business storytelling guide',
            'Interactive visualization tools'
          ]
        }
      ],
      datasets: [
        {
          name: 'Customer Churn Dataset',
          description: 'Real-world customer data with churn labels',
          size: '1.8 MB',
          format: 'CSV',
          downloadUrl: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn',
          features: ['Customer demographics', 'Usage patterns', 'Transaction history', 'Churn labels']
        }
      ],
      youtubeVideos: [
        {
          title: 'Python Churn Analysis Tutorial',
          description: 'Complete customer churn analysis using Python',
          duration: '1.5 hours',
          channel: 'Python Data Science',
          url: 'https://youtube.com/watch?v=python-churn-analysis'
        },
        {
          title: 'Machine Learning for Churn Prediction',
          description: 'Build ML models to predict customer churn',
          duration: '2 hours',
          channel: 'ML Academy',
          url: 'https://youtube.com/watch?v=ml-churn-prediction'
        }
      ],
      tutorials: [
        {
          title: 'Python for Data Science',
          duration: '2 hours',
          type: 'Video Course',
          url: '#',
          description: 'Complete Python data science course'
        },
        {
          title: 'Customer Churn Analysis Guide',
          duration: '1 hour',
          type: 'Article',
          url: '#',
          description: 'Step-by-step churn analysis tutorial'
        }
      ],
      portfolioTips: [
        'Include Jupyter notebook with your analysis',
        'Show model performance metrics and confusion matrix',
        'Create a business presentation of findings',
        'Highlight actionable recommendations for the business'
      ]
    },
    'ecommerce-analysis': {
      title: 'E-Commerce Product Analysis Using SQL',
      goal: 'Analyze customer purchase behavior and product popularity.',
      tools: ['MySQL', 'SQL'],
      skills: ['Complex joins', 'CTEs', 'Subqueries', 'Window functions'],
      recommendedFor: ['Startups', 'Analytics agencies', 'Product Analyst roles'],
      difficulty: 'Intermediate',
      duration: '2-3 days',
      icon: ShoppingCart,
      color: 'from-orange-400 to-orange-500',
      description: 'Perform deep-dive analysis of e-commerce data using advanced SQL techniques to understand customer behavior.',
      features: [
        'Customer purchase patterns',
        'Product popularity analysis',
        'Sales performance metrics',
        'Advanced SQL queries',
        'Data insights and recommendations'
      ],
      stepByStep: [
        {
          step: 1,
          title: 'Database Setup',
          description: 'Set up your database and import e-commerce data',
          tasks: [
            'Install MySQL or PostgreSQL',
            'Create database and tables',
            'Import sample e-commerce dataset',
            'Verify data integrity'
          ],
          resources: [
            'E-commerce database schema',
            'Sample e-commerce dataset',
            'Database setup guide'
          ]
        },
        {
          step: 2,
          title: 'Basic Queries',
          description: 'Write fundamental SQL queries for data exploration',
          tasks: [
            'Explore table structures and relationships',
            'Write SELECT queries with WHERE clauses',
            'Use GROUP BY and aggregate functions',
            'Create basic JOIN operations'
          ],
          resources: [
            'SQL basics tutorial',
            'Query optimization guide',
            'SQL practice exercises'
          ]
        },
        {
          step: 3,
          title: 'Advanced Analysis',
          description: 'Implement complex queries for business insights',
          tasks: [
            'Use CTEs for complex analysis',
            'Implement window functions',
            'Create subqueries for advanced filtering',
            'Build analytical queries'
          ],
          resources: [
            'Advanced SQL techniques',
            'Window functions guide',
            'CTE best practices'
          ]
        },
        {
          step: 4,
          title: 'Insights & Reporting',
          description: 'Generate business insights and create reports',
          tasks: [
            'Create summary reports',
            'Build customer segmentation queries',
            'Analyze product performance',
            'Generate actionable insights'
          ],
          resources: [
            'SQL reporting templates',
            'Business intelligence guide',
            'Data storytelling techniques'
          ]
        }
      ],
      datasets: [
        {
          name: 'E-commerce Database',
          description: 'Complete e-commerce database with multiple tables',
          size: '5.2 MB',
          format: 'SQL Dump',
          downloadUrl: 'https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce',
          features: ['Orders table', 'Products table', 'Customers table', 'Categories table']
        }
      ],
      youtubeVideos: [
        {
          title: 'Advanced SQL for E-commerce Analysis',
          description: 'Complex SQL queries for product and customer analysis',
          duration: '2 hours',
          channel: 'SQL Mastery',
          url: 'https://youtube.com/watch?v=sql-ecommerce-analysis'
        },
        {
          title: 'Window Functions in SQL',
          description: 'Master window functions for advanced analytics',
          duration: '1 hour',
          channel: 'Database Pro',
          url: 'https://youtube.com/watch?v=sql-window-functions'
        }
      ],
      tutorials: [
        {
          title: 'SQL Mastery Course',
          duration: '3 hours',
          type: 'Video Course',
          url: '#',
          description: 'Complete SQL course from beginner to advanced'
        },
        {
          title: 'E-commerce Analytics with SQL',
          duration: '1.5 hours',
          type: 'Tutorial',
          url: '#',
          description: 'Real-world e-commerce analysis examples'
        }
      ],
      portfolioTips: [
        'Include your SQL queries with comments',
        'Create a data dictionary for your analysis',
        'Show query performance and optimization',
        'Present findings in a clear, business-focused report'
      ]
    },
    'marketing-dashboard': {
      title: 'Marketing Campaign Performance Dashboard',
      goal: 'Track and compare campaign results across different platforms (Google, Meta, Email).',
      tools: ['Power BI / Tableau', 'Sample Ad performance data'],
      skills: ['ROI analysis', 'Funnel drop-off', 'Segmentation', 'Storytelling with data'],
      recommendedFor: ['Digital marketing', 'Analytics in agencies', 'B2C brands'],
      difficulty: 'Intermediate',
      duration: '3-4 days',
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-500',
      description: 'Create a comprehensive marketing dashboard to track and analyze campaign performance across multiple channels.',
      features: [
        'Multi-platform campaign tracking',
        'ROI and conversion analysis',
        'Funnel visualization',
        'Customer segmentation insights',
        'Performance recommendations'
      ],
      stepByStep: [
        {
          step: 1,
          title: 'Data Collection',
          description: 'Gather marketing data from multiple sources',
          tasks: [
            'Collect Google Ads performance data',
            'Extract Facebook/Meta campaign data',
            'Gather email marketing metrics',
            'Consolidate data into unified format'
          ],
          resources: [
            'Marketing data templates',
            'API integration guides',
            'Data collection checklist'
          ]
        },
        {
          step: 2,
          title: 'Data Modeling',
          description: 'Create data model for multi-platform analysis',
          tasks: [
            'Design star schema for marketing data',
            'Create relationships between tables',
            'Build calculated fields and measures',
            'Implement data validation rules'
          ],
          resources: [
            'Data modeling best practices',
            'Marketing KPI definitions',
            'Calculated field formulas'
          ]
        },
        {
          step: 3,
          title: 'Dashboard Creation',
          description: 'Build interactive marketing dashboard',
          tasks: [
            'Create campaign performance overview',
            'Build ROI and conversion funnels',
            'Add segmentation analysis',
            'Implement cross-platform comparisons'
          ],
          resources: [
            'Dashboard design templates',
            'Marketing visualization guide',
            'Interactive dashboard techniques'
          ]
        },
        {
          step: 4,
          title: 'Insights & Optimization',
          description: 'Generate insights and optimization recommendations',
          tasks: [
            'Identify top-performing campaigns',
            'Analyze funnel drop-off points',
            'Create optimization recommendations',
            'Build automated reporting'
          ],
          resources: [
            'Marketing analytics framework',
            'Optimization best practices',
            'Automated reporting guide'
          ]
        }
      ],
      datasets: [
        {
          name: 'Marketing Campaign Data',
          description: 'Multi-platform marketing performance data',
          size: '3.1 MB',
          format: 'Excel (.xlsx)',
          downloadUrl: 'https://colorstech.net/wp-content/uploads/2025/01/Marketing_Analytics_Dataset_by_Slidescope.xlsx',
          features: ['Google Ads data', 'Facebook campaigns', 'Email metrics', 'Conversion tracking']
        }
      ],
      youtubeVideos: [
        {
          title: 'Marketing Analytics Dashboard',
          description: 'Build comprehensive marketing dashboards',
          duration: '1.5 hours',
          channel: 'Marketing Analytics',
          url: 'https://youtube.com/watch?v=marketing-dashboard-tutorial'
        },
        {
          title: 'ROI Analysis in Tableau',
          description: 'Calculate and visualize marketing ROI',
          duration: '45 min',
          channel: 'Tableau Academy',
          url: 'https://youtube.com/watch?v=tableau-roi-analysis'
        }
      ],
      tutorials: [
        {
          title: 'Marketing Analytics Masterclass',
          duration: '2.5 hours',
          type: 'Video Course',
          url: '#',
          description: 'Complete marketing analytics course'
        },
        {
          title: 'Multi-Platform Campaign Analysis',
          duration: '1 hour',
          type: 'Tutorial',
          url: '#',
          description: 'Cross-platform marketing analysis guide'
        }
      ],
      portfolioTips: [
        'Show campaign performance comparisons',
        'Include ROI calculations and methodology',
        'Create executive summary of findings',
        'Demonstrate data storytelling skills'
      ]
    },
    'financial-analysis': {
      title: 'Financial Data Analysis & Forecasting',
      goal: 'Analyze income/expense trends & forecast next quarter using moving average.',
      tools: ['Excel', 'Python'],
      skills: ['Financial reporting', 'Trend analysis', 'Forecasting models'],
      recommendedFor: ['Finance', 'Consulting', 'Fintech analyst roles'],
      difficulty: 'Advanced',
      duration: '4-5 days',
      icon: DollarSign,
      color: 'from-orange-400 to-orange-500',
      description: 'Develop a comprehensive financial analysis and forecasting model using advanced statistical techniques.',
      features: [
        'Income and expense trend analysis',
        'Financial forecasting models',
        'Moving average calculations',
        'Budget vs actual analysis',
        'Financial insights and recommendations'
      ],
      stepByStep: [
        {
          step: 1,
          title: 'Financial Data Preparation',
          description: 'Clean and structure financial data for analysis',
          tasks: [
            'Import financial statements data',
            'Categorize income and expenses',
            'Handle missing values and outliers',
            'Create time series data structure'
          ],
          resources: [
            'Financial dataset template',
            'Data cleaning checklist',
            'Financial data standards'
          ]
        },
        {
          step: 2,
          title: 'Trend Analysis',
          description: 'Analyze historical trends and patterns',
          tasks: [
            'Calculate year-over-year growth rates',
            'Identify seasonal patterns',
            'Analyze variance between budget and actual',
            'Create trend visualizations'
          ],
          resources: [
            'Financial trend analysis guide',
            'Time series analysis techniques',
            'Excel financial functions'
          ]
        },
        {
          step: 3,
          title: 'Forecasting Models',
          description: 'Build and implement forecasting models',
          tasks: [
            'Implement moving average models',
            'Create exponential smoothing forecasts',
            'Build regression-based models',
            'Validate forecast accuracy'
          ],
          resources: [
            'Forecasting methodology guide',
            'Python forecasting libraries',
            'Model validation techniques'
          ]
        },
        {
          step: 4,
          title: 'Financial Reporting',
          description: 'Create comprehensive financial reports and insights',
          tasks: [
            'Build financial dashboard',
            'Create variance analysis reports',
            'Generate forecasting summaries',
            'Develop business recommendations'
          ],
          resources: [
            'Financial reporting templates',
            'Dashboard design guide',
            'Business presentation tips'
          ]
        }
      ],
      datasets: [
        {
          name: 'Financial Statements Dataset',
          description: 'Comprehensive financial data for analysis',
          size: '1.2 MB',
          format: 'Excel (.xlsx)',
          downloadUrl: 'https://www.kaggle.com/datasets/krantiswalke/bank-personal-loan-modelling',
          features: ['Income statements', 'Balance sheets', 'Cash flow data', 'Budget vs actual']
        }
      ],
      youtubeVideos: [
        {
          title: 'Financial Analysis with Python',
          description: 'Complete financial data analysis and forecasting',
          duration: '2.5 hours',
          channel: 'Finance Analytics',
          url: 'https://youtube.com/watch?v=python-financial-analysis'
        },
        {
          title: 'Excel Financial Modeling',
          description: 'Advanced Excel techniques for financial analysis',
          duration: '1.5 hours',
          channel: 'Excel Pro',
          url: 'https://youtube.com/watch?v=excel-financial-modeling'
        }
      ],
      tutorials: [
        {
          title: 'Financial Analysis with Python',
          duration: '3 hours',
          type: 'Video Course',
          url: '#',
          description: 'Complete financial analysis course'
        },
        {
          title: 'Time Series Forecasting',
          duration: '2 hours',
          type: 'Tutorial',
          url: '#',
          description: 'Advanced forecasting techniques'
        }
      ],
      portfolioTips: [
        'Include financial model documentation',
        'Show forecast accuracy metrics',
        'Create executive financial summary',
        'Demonstrate advanced Excel/Python skills'
      ]
    }
  };

  const currentProject = projectDetails[projectId as keyof typeof projectDetails];

  if (!currentProject) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Project Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/standard-projects')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const IconComponent = currentProject.icon;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news/standard-projects')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{currentProject.title}</h1>
            <p className="text-gray-200">{currentProject.description}</p>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <NeumorphicCard padding="lg" className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 bg-gradient-to-r ${currentProject.color} rounded-xl flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Project Overview</h2>
              <p className="text-gray-200">{currentProject.goal}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-orange-400" />
                Tools Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.tools.map((tool, idx) => (
                  <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                Skills Shown
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </NeumorphicCard>

      {/* Datasets and Resources */}
      <NeumorphicCard padding="lg" className="mb-8">
        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-orange-400" />
          Datasets & Resources
        </h2>
        <div className="space-y-4">
          {currentProject.datasets.map((dataset, idx) => (
            <div key={idx} className="border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-100">{dataset.name}</h3>
                <span className="text-sm text-gray-400">{dataset.size}</span>
              </div>
              <p className="text-gray-200 text-sm mb-2">{dataset.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{dataset.format}</span>
                <NeumorphicButton variant="secondary" size="sm" onClick={() => window.open(dataset.downloadUrl, '_blank')}>
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </NeumorphicButton>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Step by Step Guide */}
      <NeumorphicCard padding="lg" className="mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-orange-400" />
          Step-by-Step Guide
        </h2>
        <div className="space-y-6">
          {currentProject.stepByStep.map((step, index) => (
            <div key={index} className="border-l-4 border-orange-400 pl-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-100">{step.title}</h3>
              </div>
              <p className="text-gray-200 mb-4">{step.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Tasks
                  </h4>
                  <ul className="space-y-1">
                    {step.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-200 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-orange-400" />
                    Resources
                  </h4>
                  <ul className="space-y-1">
                    {step.resources.map((resource, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-200 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NeumorphicCard>


      {/* Project Meta Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <NeumorphicCard padding="md">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-400" />
            <div>
              <h4 className="font-semibold text-gray-100">Duration</h4>
              <p className="text-gray-200 text-sm">{currentProject.duration}</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard padding="md">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-orange-400" />
            <div>
              <h4 className="font-semibold text-gray-100">Difficulty</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                currentProject.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                currentProject.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentProject.difficulty}
              </span>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard padding="md">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-orange-400" />
            <div>
              <h4 className="font-semibold text-gray-100">Recommended For</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentProject.recommendedFor.slice(0, 2).map((role, idx) => (
                  <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {role}
                  </span>
                ))}
                {currentProject.recommendedFor.length > 2 && (
                  <span className="text-xs text-gray-400">+{currentProject.recommendedFor.length - 2} more</span>
                )}
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Portfolio Tips */}
      <NeumorphicCard padding="lg" className="mb-8">
        <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-400" />
          Portfolio Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentProject.portfolioTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Lightbulb className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-200 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </NeumorphicCard>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <NeumorphicButton
          variant="accent"
          onClick={() => {
            // Placeholder for future functionality
            console.log(`Start project: ${currentProject.title}`);
          }}
        >
          <Play className="w-4 h-4 mr-2" />
          Start This Project
        </NeumorphicButton>
        <NeumorphicButton
          variant="secondary"
          onClick={() => navigate('/news/standard-projects')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Projects
        </NeumorphicButton>
      </div>
    </div>
  );
};

export default memo(ProjectDetail);
