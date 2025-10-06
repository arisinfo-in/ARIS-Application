import React, { useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Eye, EyeOff } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const CoverLetterForm: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');

  // Template configurations
  const templates = {
    'fresher-cover-letter': {
      title: 'Fresher Cover Letter Template',
      description: 'Professional cover letter for fresh graduates and entry-level positions',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'email', label: 'Email Address', placeholder: 'your.email@example.com', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true },
        { id: 'jobTitle', label: 'Job Title', placeholder: 'e.g., Junior Data Analyst', required: true },
        { id: 'degree', label: 'Degree/Education', placeholder: 'e.g., Bachelor of Science in Computer Science', required: true },
        { id: 'university', label: 'University/College', placeholder: 'Enter your university name', required: true },
        { id: 'technicalSkills', label: 'Technical Skills', placeholder: 'e.g., Python, SQL, Excel, Tableau, R', required: true }
      ],
      template: `[yourName]
[email]

[Date]

Hiring Manager
[companyName]

Dear Hiring Manager,

I am writing to express my strong interest in the [jobTitle] position at [companyName]. As a recent graduate with a [degree] from [university], I am excited to begin my career in data analysis and contribute to your team's success.

During my academic journey, I have developed a solid foundation in data analysis. My technical skills include proficiency in [technicalSkills], which I have applied in various projects. These experiences have deepened my passion for transforming raw data into actionable insights that drive business decisions.

What particularly excites me about the [jobTitle] role at [companyName] is the opportunity to work with cutting-edge data analytics tools and contribute to meaningful projects that impact business outcomes. I am eager to bring my fresh perspective, strong analytical skills, and enthusiasm for data-driven solutions to your team while learning from experienced professionals in the field.

I am confident that my educational background, technical skills, and passion for data analysis make me a strong candidate for this position. I would welcome the opportunity to discuss how I can contribute to [companyName]'s continued success.

Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
[yourName]`
    },
    'experienced-cover-letter': {
      title: 'Experienced Cover Letter Template',
      description: 'Comprehensive cover letter for experienced data analysts and senior positions',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'email', label: 'Email Address', placeholder: 'your.email@example.com', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true },
        { id: 'jobTitle', label: 'Job Title', placeholder: 'e.g., Senior Data Analyst', required: true },
        { id: 'yearsExperience', label: 'Years of Experience', placeholder: 'e.g., 5 years', required: true },
        { id: 'currentRole', label: 'Current/Previous Role', placeholder: 'e.g., Data Analyst at ABC Company', required: true },
        { id: 'keyAchievements', label: 'Key Achievement', placeholder: 'e.g., Increased efficiency by 30%, Led team of 5 analysts', required: true }
      ],
      template: `[yourName]
[email]

[Date]

Hiring Manager
[companyName]

Dear Hiring Manager,

I am writing to express my strong interest in the [jobTitle] position at [companyName]. With [yearsExperience] of experience in data analysis and my current role as [currentRole], I am excited about the opportunity to bring my expertise and proven track record to your team.

Throughout my career, I have consistently delivered measurable results, including [keyAchievements]. I have successfully applied my technical skills to drive data-driven decision making and business growth.

What particularly attracts me to the [jobTitle] role at [companyName] is the opportunity to leverage my extensive experience in data analysis to drive strategic initiatives and mentor emerging talent. I am excited about the prospect of contributing to innovative projects that will have a significant impact on the company's growth and success.

I am confident that my combination of technical expertise and proven ability to deliver results makes me an ideal candidate for this position. I would welcome the opportunity to discuss how my experience and skills can contribute to [companyName]'s continued success.

Thank you for considering my application.

Sincerely,
[yourName]`
    }
  };

  const currentTemplate = templates[templateId as keyof typeof templates];

  if (!currentTemplate) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Template Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/job-kit/cover-letters')}>
            Go Back
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateCoverLetter = () => {
    let coverLetter = currentTemplate.template;

    // Replace placeholders with form data
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = `[${key}]`;
      coverLetter = coverLetter.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    setGeneratedCoverLetter(coverLetter);
    setShowPreview(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCoverLetter = () => {
    const blob = new Blob([generatedCoverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateId}-cover-letter.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <NeumorphicButton
            onClick={() => navigate('/news/job-kit/cover-letters')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{currentTemplate.title}</h1>
            <p className="text-gray-200">{currentTemplate.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div>
          <NeumorphicCard padding="lg" className="mb-6">
            <h2 className="text-xl font-bold text-gray-100 mb-6">Fill in Your Details</h2>
            <div className="space-y-4">
              {currentTemplate.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    {field.label} {field.required && <span className="text-orange-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <NeumorphicButton
                variant="accent"
                onClick={generateCoverLetter}
                className="w-full"
              >
                Generate Cover Letter
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>

        {/* Preview Section */}
        <div>
          <NeumorphicCard padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-100">Cover Letter Preview</h2>
              <NeumorphicButton
                variant="ghost"
                onClick={() => setShowPreview(!showPreview)}
                icon={showPreview ? EyeOff : Eye}
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </NeumorphicButton>
            </div>
            
            {showPreview && generatedCoverLetter ? (
              <div className="space-y-4">
                <div>
                  <div className="p-4 bg-gray-800 rounded-lg text-gray-100 border border-gray-600 whitespace-pre-line max-h-96 overflow-y-auto">
                    {generatedCoverLetter}
                  </div>
                </div>
                <div className="flex gap-3">
                  <NeumorphicButton
                    variant="secondary"
                    onClick={() => copyToClipboard(generatedCoverLetter)}
                    icon={Copy}
                    className="flex-1"
                  >
                    Copy Cover Letter
                  </NeumorphicButton>
                  <NeumorphicButton
                    variant="secondary"
                    onClick={downloadCoverLetter}
                    icon={Download}
                    className="flex-1"
                  >
                    Download
                  </NeumorphicButton>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Fill in the form and click "Generate Cover Letter" to see the preview</p>
              </div>
            )}
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default memo(CoverLetterForm);
