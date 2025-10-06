import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen, Brain, MessageSquare, FileSpreadsheet, BarChart3, Database, Code, TrendingUp as TrendingUpIcon, Cpu } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const AllArticles: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Define the 8 modules (excluding All Articles)
  const modules = [
    {
      id: 'advanced-ai',
      name: 'AI & Analytics',
      icon: Brain,
      color: 'from-orange-400 to-orange-500',
      description: 'Latest trends in AI, and advanced analytics'
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      icon: MessageSquare,
      color: 'from-orange-400 to-orange-500',
      description: 'AI prompt optimization and conversation design techniques'
    },
    {
      id: 'excel',
      name: 'Excel',
      icon: FileSpreadsheet,
      color: 'from-orange-400 to-orange-500',
      description: 'Microsoft Excel features, formulas, and data analysis'
    },
    {
      id: 'powerbi',
      name: 'Power BI',
      icon: BarChart3,
      color: 'from-orange-400 to-orange-500',
      description: 'Business intelligence and data visualization with Power BI'
    },
    {
      id: 'sql-database',
      name: 'SQL & Database',
      icon: Database,
      color: 'from-orange-400 to-orange-500',
      description: 'Database management, and SQL adhoc queries'
    },
    {
      id: 'python',
      name: 'Python',
      icon: Code,
      color: 'from-orange-400 to-orange-500',
      description: 'Python programming for data analysis and automation'
    },
    {
      id: 'statistics',
      name: 'Statistics',
      icon: TrendingUpIcon,
      color: 'from-orange-400 to-orange-500',
      description: 'Statistical analysis, hypothesis testing, and data modeling'
    },
    {
      id: 'machine-learning',
      name: 'Machine Learning',
      icon: Cpu,
      color: 'from-orange-400 to-orange-500',
      description: 'ML algorithms, model training, and predictive analytics'
    }
  ];

  // Filter modules based on search query
  const filteredModules = modules.filter(module =>
    searchQuery.trim() === '' ||
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModuleClick = (moduleId: string) => {
    navigate(`/news/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <NeumorphicButton
                onClick={() => navigate('/news')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </NeumorphicButton>
              <div>
                <h1 className="text-3xl font-bold text-gray-100 mb-2">All Articles</h1>
                <p className="text-gray-200">Browse all article categories and modules</p>
              </div>
            </div>
            
            {/* Search Bar - aligned with the title */}
            <div className="w-80">
              <NeumorphicCard padding="md">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search modules..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-400"
                  />
                </div>
              </NeumorphicCard>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        {filteredModules.length === 0 ? (
          <NeumorphicCard padding="xl" className="text-center">
            <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-100 mb-2">No modules found</h3>
            <p className="text-gray-200 mb-6">
              {searchQuery ? 'Try adjusting your search terms.' : 'No modules available at the moment.'}
            </p>
            {searchQuery && (
              <NeumorphicButton
                variant="secondary"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </NeumorphicButton>
            )}
          </NeumorphicCard>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {filteredModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <NeumorphicCard 
                  key={module.id} 
                  hoverable 
                  padding="lg" 
                  className="cursor-pointer transition-all hover:scale-105 text-center"
                  onClick={() => handleModuleClick(module.id)}
                >
                  {/* Module Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Module Name */}
                  <h3 className="text-lg font-bold text-gray-100 mb-3">
                    {module.name}
                  </h3>
                  
                  {/* Module Description */}
                  <p className="text-gray-200 text-sm mb-6 line-clamp-3">
                    {module.description}
                  </p>

                  {/* Read Article Button */}
                  <NeumorphicButton
                    variant="accent"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleClick(module.id);
                    }}
                  >
                    Read Article
                  </NeumorphicButton>
                </NeumorphicCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AllArticles);
