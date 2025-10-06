import React, { memo } from 'react';
import { GraduationCap, Briefcase, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const CoverLetterTemplates: React.FC = () => {
  const navigate = useNavigate();
  
  const coverLetterTemplates = [
    {
      id: 'fresher-cover-letter',
      name: 'Fresher Cover Letter',
      icon: GraduationCap,
      color: 'from-orange-400 to-orange-500',
      description: 'Professional cover letter template for fresh graduates and entry-level data analyst positions'
    },
    {
      id: 'experienced-cover-letter',
      name: 'Experienced Cover Letter',
      icon: Briefcase,
      color: 'from-orange-400 to-orange-500',
      description: 'Comprehensive cover letter template for experienced data analysts and senior positions'
    }
  ];

  const handleTemplateClick = (templateId: string) => {
    navigate(`/news/job-kit/cover-letters/${templateId}`);
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
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Cover Letter Templates</h1>
            <p className="text-gray-200">Professional cover letter templates for your job applications</p>
          </div>
        </div>
      </div>

      {/* Cover Letter Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverLetterTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <NeumorphicCard 
              key={template.id} 
              hoverable 
              padding="lg" 
              className="cursor-pointer transition-all hover:scale-105 text-center"
              onClick={() => handleTemplateClick(template.id)}
            >
              {/* Template Icon */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${template.color} flex items-center justify-center`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Template Name */}
              <h3 className="text-lg font-bold text-gray-100 mb-3">
                {template.name}
              </h3>
              
              {/* Template Description */}
              <p className="text-gray-200 text-sm mb-6 line-clamp-3">
                {template.description}
              </p>

              {/* Action Button */}
              <NeumorphicButton
                variant="accent"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTemplateClick(template.id);
                }}
              >
                Create Cover Letter
              </NeumorphicButton>
            </NeumorphicCard>
          );
        })}
      </div>
    </div>
  );
};

export default memo(CoverLetterTemplates);
