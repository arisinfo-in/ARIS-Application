import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Target, Users, TrendingUp, FileText, Award, Lightbulb } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const PortfolioBuildingGuide: React.FC = () => {
  const navigate = useNavigate();

  const strategyCards = [
    {
      id: 'linkedin-strategy',
      title: 'LinkedIn Strategy',
      icon: Users,
      color: 'from-orange-400 to-orange-500',
      description: 'Master LinkedIn to build your professional network and showcase your data analysis expertise',
      features: [
        'Profile Optimization',
        'Content Strategy',
        'Network Building',
        'Industry Engagement'
      ]
    },
    {
      id: 'naukri-strategy',
      title: 'Naukri Job Strategy',
      icon: Target,
      color: 'from-orange-400 to-orange-500',
      description: 'Leverage Naukri.com to find the right data analyst opportunities and get noticed by recruiters',
      features: [
        'Profile Enhancement',
        'Job Search Tactics',
        'Application Optimization',
        'Recruiter Engagement'
      ]
    }
  ];


  const handleStrategyClick = (strategyId: string) => {
    navigate(`/news/job-kit/strategy/${strategyId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <NeumorphicButton
            onClick={() => navigate('/news/job-kit')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Portfolio Building Guide</h1>
            <p className="text-gray-200">Strategic approaches to build your professional presence and land your dream data analyst role</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Briefcase className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">Platforms</h3>
              <p className="text-secondary-contrast text-xs">Strategic Approaches</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">Proven</h3>
              <p className="text-secondary-contrast text-xs">Success Methods</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Award className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">Expert</h3>
              <p className="text-secondary-contrast text-xs">Curated Content</p>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {strategyCards.map((strategy) => {
          const IconComponent = strategy.icon;
          return (
            <NeumorphicCard key={strategy.id} padding="lg" hoverable className="h-full">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${strategy.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mb-3">{strategy.title}</h3>
                <p className="text-gray-200 text-lg leading-relaxed">{strategy.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  Key Focus Areas
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {strategy.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <NeumorphicButton
                  variant="accent"
                  className="w-full"
                  onClick={() => handleStrategyClick(strategy.id)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Strategy
                </NeumorphicButton>
              </div>
            </NeumorphicCard>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="mt-12">
        <NeumorphicCard padding="lg">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-100 mb-4">Why Portfolio Building Matters</h3>
            <p className="text-gray-200 leading-relaxed max-w-4xl mx-auto">
              A strong portfolio is your gateway to landing data analyst roles. Our strategic guides help you 
              leverage the most effective platforms and techniques to showcase your skills, build professional 
              relationships, and stand out in a competitive job market. Whether you're targeting LinkedIn for 
              networking or Naukri for job applications, we provide the roadmap to success.
            </p>
          </div>
        </NeumorphicCard>
      </div>

    </div>
  );
};

export default memo(PortfolioBuildingGuide);
