import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FolderOpen, BarChart3, Users, ShoppingCart, TrendingUp, DollarSign, Clock, Target, Code } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const StandardProjects: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'sales-dashboard',
      title: 'Sales Dashboard Using Power BI',
      goal: 'Analyze and visualize monthly sales performance by region, product, and category.',
      tools: ['Excel dataset', 'Power BI', 'DAX formulas'],
      skills: ['Data cleaning', 'Dashboard design', 'KPIs', 'Slicers', 'Interactive visuals'],
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
      ]
    },
    {
      id: 'customer-churn',
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
      ]
    },
    {
      id: 'ecommerce-analysis',
      title: 'E-Commerce Product Analysis Using SQL',
      goal: 'Analyze customer purchase behavior and product popularity.',
      tools: ['MySQL', 'PostgreSQL'],
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
      ]
    },
    {
      id: 'marketing-dashboard',
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
      ]
    },
    {
      id: 'financial-analysis',
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
      ]
    }
  ];

  const totalProjects = projects.length;
  // const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const totalSkills = projects.reduce((sum, project) => sum + project.skills.length, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Standard Projects</h1>
            <p className="text-gray-200">Ready-to-build data analysis projects for your portfolio</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <FolderOpen className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">{totalProjects}</h3>
              <p className="text-secondary-contrast text-xs">Projects</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Target className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">{totalSkills}</h3>
              <p className="text-secondary-contrast text-xs">Skills Covered</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Clock className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">2-5 Days</h3>
              <p className="text-secondary-contrast text-xs">Per Project</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Star className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">Portfolio</h3>
              <p className="text-secondary-contrast text-xs">Ready</p>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const IconComponent = project.icon;
          return (
            <NeumorphicCard 
              key={project.id} 
              padding="lg" 
              hoverable 
              className="h-full flex flex-col cursor-pointer transition-all hover:scale-105"
              onClick={() => navigate(`/news/standard-projects/${project.id}`)}
            >
              {/* Project Icon */}
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-200 text-sm mb-6 line-clamp-3">{project.description}</p>
              </div>

              {/* Action Button */}
              <NeumorphicButton
                variant="accent"
                className="w-full mt-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/news/standard-projects/${project.id}`);
                }}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                View Project Details
              </NeumorphicButton>
            </NeumorphicCard>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-12">
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Ready to Build Your Portfolio?</h3>
          <p className="text-gray-200 mb-6">
            These projects will help you showcase your data analysis skills and build a strong portfolio for job applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/news/job-kit')}
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Explore Job Kit
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={() => navigate('/news/ai-tools')}
            >
              <Code className="w-4 h-4 mr-2" />
              Check AI Tools
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(StandardProjects);
