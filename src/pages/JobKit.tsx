import React, { memo } from 'react';
import { Mail, FileText, Briefcase, Users, Target, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const JobKit: React.FC = () => {
  const navigate = useNavigate();
  
  // Define the job kit resources
  const jobKitResources = [
    {
      id: 'email-templates',
      name: 'Job Email Templates',
      icon: Mail,
      color: 'from-orange-400 to-orange-500',
      description: 'Professional email templates for job applications, follow-ups, and networking'
    },
    {
      id: 'resume-templates',
      name: 'Resume Templates',
      icon: FileText,
      color: 'from-orange-400 to-orange-500',
      description: 'Modern resume templates tailored for data analysts and AI professionals'
    },
    {
      id: 'cover-letters',
      name: 'Cover Letter Examples',
      icon: Briefcase,
      color: 'from-orange-400 to-orange-500',
      description: 'Industry-specific cover letter examples and writing guides'
    },
    {
      id: 'interview-prep',
      name: 'Interview Preparation',
      icon: Users,
      color: 'from-orange-400 to-orange-500',
      description: 'Common interview questions and answers for data analyst roles'
    },
    {
      id: 'portfolio-guide',
      name: 'Portfolio Building Guide',
      icon: Target,
      color: 'from-orange-400 to-orange-500',
      description: 'Step-by-step guide to create an impressive data science portfolio'
    },
    {
      id: 'industry-guides',
      name: 'Industry-Specific Guides',
      icon: Award,
      color: 'from-orange-400 to-orange-500',
      description: 'How to break into different industries as a data analyst'
    }
  ];

  const handleResourceClick = (resourceId: string) => {
    if (resourceId === 'email-templates') {
      navigate('/news/job-kit/email-templates');
    } else if (resourceId === 'cover-letters') {
      navigate('/news/job-kit/cover-letters');
    } else if (resourceId === 'interview-prep') {
      navigate('/news/job-kit/interview-preparation');
    } else if (resourceId === 'resume-templates') {
      navigate('/news/job-kit/resume-templates');
    } else if (resourceId === 'portfolio-guide') {
      navigate('/news/job-kit/portfolio-building-guide');
    } else if (resourceId === 'industry-guides') {
      navigate('/news/job-kit/industry-guides');
    } else {
      // Functionality will be added later for other resources
      console.log(`Clicked on ${resourceId}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <NeumorphicButton
            onClick={() => navigate('/news')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Job Kit</h1>
            <p className="text-gray-200">Career resources, job search tools, and materials</p>
          </div>
        </div>
      </div>

      {/* Job Kit Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobKitResources.map((resource) => {
          const IconComponent = resource.icon;
          return (
            <NeumorphicCard 
              key={resource.id} 
              hoverable 
              padding="lg" 
              className="cursor-pointer transition-all hover:scale-105 text-center"
              onClick={() => handleResourceClick(resource.id)}
            >
              {/* Resource Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${resource.color} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Resource Name */}
              <h3 className="text-lg font-bold text-gray-100 mb-3">
                {resource.name}
              </h3>
              
              {/* Resource Description */}
              <p className="text-gray-200 text-sm mb-6 line-clamp-3">
                {resource.description}
              </p>

              {/* Action Button */}
              <NeumorphicButton
                variant="accent"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleResourceClick(resource.id);
                }}
              >
                {resource.id === 'email-templates' ? 'View Templates' :
                 resource.id === 'resume-templates' ? 'View Templates' :
                 resource.id === 'cover-letters' ? 'View Examples' :
                 resource.id === 'interview-prep' ? 'Start Prep' :
                 resource.id === 'portfolio-guide' ? 'View Guide' :
                 resource.id === 'industry-guides' ? 'View Guides' :
                 'Explore'}
              </NeumorphicButton>
            </NeumorphicCard>
          );
        })}
      </div>
    </div>
  );
};

export default memo(JobKit);
