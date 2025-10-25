import React, { useState, memo } from 'react';
import { Search, BookOpen, Newspaper, BookOpenCheck, Play, Briefcase, Bot, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

// News article types are imported from newsService

// News data is now fetched from the news service

const TheHub: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Define the All Articles, Series, AI Clips, Free Certificates, Job Kit, and AI Tools cards
  const modules = [
    {
      id: 'all-articles',
      name: 'All Articles',
      icon: Newspaper,
      color: 'from-orange-400 to-orange-500',
      description: 'Browse all articles from all categories'
    },
    {
      id: 'series',
      name: 'Modules Series',
      icon: BookOpenCheck,
      color: 'from-orange-400 to-orange-500',
      description: 'Explore curated article series and learning paths'
    },
    {
      id: 'ai-clips',
      name: 'AI Clips',
      icon: Play,
      color: 'from-orange-400 to-orange-500',
      description: 'Watch curated AI & Analytics videos and industry updates.'
    },
    {
      id: 'free-certificates',
      name: 'Free Certificates',
      icon: BookOpen,
      color: 'from-orange-400 to-orange-500',
      description: 'Access free data analytics & AI certificates from top providers'
    },
    {
      id: 'job-kit',
      name: 'Job Kit',
      icon: Briefcase,
      color: 'from-orange-400 to-orange-500',
      description: 'Career resources, job search tools, and materials'
    },
    {
      id: 'ai-tools',
      name: 'AI Tools',
      icon: Bot,
      color: 'from-orange-400 to-orange-500',
      description: 'Essential AI tools and platforms for data analysts'
    },
    {
      id: 'standard-projects',
      name: 'Standard Projects',
      icon: FolderOpen,
      color: 'from-orange-400 to-orange-500',
      description: 'Ready-to-build data analysis projects for your portfolio'
    },
  ];

  // Filter modules based on search query
  const filteredModules = modules.filter(module =>
    searchQuery.trim() === '' ||
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'all-articles') {
      navigate('/news/all-articles');
    } else if (moduleId === 'series') {
      navigate('/news/series');
    } else if (moduleId === 'ai-clips') {
      navigate('/news/ai-clips');
    } else if (moduleId === 'free-certificates') {
      navigate('/news/free-certificates');
    } else if (moduleId === 'job-kit') {
      navigate('/news/job-kit');
    } else if (moduleId === 'ai-tools') {
      navigate('/news/ai-tools');
    } else if (moduleId === 'standard-projects') {
      navigate('/news/standard-projects');
    } else {
      navigate(`/news/${moduleId}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">The Hub</h1>
            <p className="text-gray-200">Stay updated with the latest in data analysis and AI</p>
          </div>
          {/* Search Bar */}
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
                  {module.id === 'series' ? 'Read Series' : 
                   module.id === 'ai-clips' ? 'Watch Videos' : 
                   module.id === 'free-certificates' ? 'View Certificates' : 
                   module.id === 'job-kit' ? 'Explore Job Kit' :
                   module.id === 'ai-tools' ? 'Explore Tools' :
                   module.id === 'standard-projects' ? 'View Projects' :
                   'Read Articles'}
                </NeumorphicButton>
              </NeumorphicCard>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default memo(TheHub);
