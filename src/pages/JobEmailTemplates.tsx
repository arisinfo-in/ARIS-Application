import React, { memo } from 'react';
import { Mail, Clock, CheckCircle, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const JobEmailTemplates: React.FC = () => {
  const navigate = useNavigate();
  
  const emailTemplates = [
    {
      id: 'job-application',
      name: 'Job Application Email Template',
      icon: Mail,
      color: 'from-orange-400 to-orange-500',
      description: 'Professional email template for job applications with personalized details'
    },
    {
      id: 'follow-up-no-response',
      name: 'Follow-up Email Template (If no response)',
      icon: Clock,
      color: 'from-orange-400 to-orange-500',
      description: 'Polite follow-up email when you haven\'t received a response'
    },
    {
      id: 'follow-up-interview',
      name: 'Follow-up Email Template after an Interview',
      icon: CheckCircle,
      color: 'from-orange-400 to-orange-500',
      description: 'Thank you email after an interview to maintain positive impression'
    },
    {
      id: 'rejection-follow-up',
      name: 'Rejection Follow-up Email Template (Stay Positive)',
      icon: Heart,
      color: 'from-orange-400 to-orange-500',
      description: 'Professional response to rejection while staying positive and connected'
    }
  ];

  const handleTemplateClick = (templateId: string) => {
    navigate(`/news/job-kit/email-templates/${templateId}`);
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
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Job Email Templates</h1>
            <p className="text-gray-200">Professional email templates for your job search journey</p>
          </div>
        </div>
      </div>

      {/* Email Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {emailTemplates.map((template) => {
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
                Create Email
              </NeumorphicButton>
            </NeumorphicCard>
          );
        })}
      </div>
    </div>
  );
};

export default memo(JobEmailTemplates);
