import React, { useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Eye, EyeOff } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const EmailTemplateForm: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedEmail, setGeneratedEmail] = useState({ subject: '', body: '' });

  // Template configurations
  const templates = {
    'job-application': {
      title: 'Job Application Email Template',
      description: 'Professional email template for job applications',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'hiringManagerName', label: 'Hiring Manager\'s Name', placeholder: 'Enter hiring manager\'s name', required: true },
        { id: 'jobRole', label: 'Job Role', placeholder: 'e.g., Data Analyst', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true }
      ],
      subject: 'Application for Data Analyst Role – [yourName]',
      body: `Hi [hiringManagerName],

I'm reaching out to apply for the [jobRole] position at [companyName]. I believe that my skills match the requirements of the job and I can contribute as a valuable team member.

Through academic work and hands-on experience, I have a strong foundation in Excel, SQL, Power BI, and Python. I'm passionate about transforming data into actionable insights that drive business decisions.

What particularly excites me about the [jobRole] role at [companyName] is the opportunity to work with cutting-edge data analytics tools and contribute to meaningful projects that impact business outcomes. I'm eager to bring my analytical skills and fresh perspective to your team while learning from experienced professionals in the field.

I have included my resume in this email for your consideration. Thank you for your consideration and I am eager to answer any questions you may have.

Looking forward to your positive response.

Best regards,
[yourName]`
    },
    'follow-up-no-response': {
      title: 'Follow-up Email Template (If no response)',
      description: 'Polite follow-up email when you haven\'t received a response',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'hiringManagerName', label: 'Hiring Manager\'s Name', placeholder: 'Enter hiring manager\'s name', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true }
      ],
      subject: 'Following up on Data Analyst Role Application – [yourName]',
      body: `Hi [hiringManagerName],
I hope you are doing well. I am writing to check on the status of my application for the Data Analyst position at [companyName] that I sent in on [date]. 
I am confident that my data analysis, dashboarding, and problem-solving skills would make me a great addition to your team.
For your reference, I have attached my resume again and am happy to provide any further information.
I appreciate your time.
Best regards,
[yourName]`
    },
    'follow-up-interview': {
      title: 'Follow-up Email Template after an Interview',
      description: 'Thank you email after an interview to maintain positive impression',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'interviewerName', label: 'Interviewer\'s Name', placeholder: 'Enter interviewer\'s name', required: true },
        { id: 'jobTitle', label: 'Job Title', placeholder: 'e.g., Data Analyst', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true }
      ],
      subject: 'Thank You for the Interview – [yourName]',
      body: `Hi [interviewerName],
I am grateful for the opportunity to interview for the [jobTitle] position at [companyName]. It was refreshing to learn about your team and get an insight into the exciting work happening at [projectTeamName].
I'm even more excited now about the opportunity to jump in as a Data Analyst, I believe my skills in Excel, SQL, Power BI, and Python perfectly align with the requirements. 
Generally speaking, my background in sifting through data and turning raw figures into real actions seems like a natural fit for your needs. If there's anything else you need from me, just let me know. 
I look forward to hearing about the next steps in the process.
Warm regards,
[yourName]`
    },
    'rejection-follow-up': {
      title: 'Rejection Follow-up Email Template (Stay Positive)',
      description: 'Professional response to rejection while staying positive and connected',
      fields: [
        { id: 'yourName', label: 'Your Name', placeholder: 'Enter your full name', required: true },
        { id: 'interviewerName', label: 'Interviewer\'s Name', placeholder: 'Enter interviewer\'s name', required: true },
        { id: 'companyName', label: 'Company Name', placeholder: 'Enter company name', required: true }
      ],
      subject: 'Thank You for the Opportunity – [yourName]',
      body: `Hi [interviewerName],
I appreciate you informing me of your decision. I am grateful for the opportunity to interview for the Data Analyst role at [companyName]. It was great to learn more about your team, your work culture, and the exciting projects you're working on.
The experience has been both valuable and inspiring. I would be grateful if you could share any feedback that could help me improve going forward.
I hope to stay in touch and would love to be considered for any future opportunities where my profile may be a better match.
I wish you and the team continued success!
Warm regards,
[yourName]`
    }
  };

  const currentTemplate = templates[templateId as keyof typeof templates];

  if (!currentTemplate) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Template Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/job-kit/email-templates')}>
            Go Back
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const generateEmail = () => {
    let subject = currentTemplate.subject;
    let body = currentTemplate.body;

    // Create a mapping from field IDs to template placeholders
    const placeholderMap: Record<string, string> = {
      'yourName': '[yourName]',
      'hiringManagerName': '[hiringManagerName]',
      'jobRole': '[jobRole]',
      'companyName': '[companyName]',
      'projectsName': '[projectsName]',
      'relevantPoints': '[relevantPoints]',
      'githubLink': '[githubLink]',
      'linkedinProfile': '[linkedinProfile]',
      'phoneNumber': '[phoneNumber]',
      'portfolioLink': '[portfolioLink]',
      'interviewerName': '[interviewerName]',
      'jobTitle': '[jobTitle]',
      'projectTeamName': '[projectTeamName]',
      'date': '[date]'
    };

    // Replace placeholders with form data
    Object.entries(formData).forEach(([key, value]) => {
      const placeholder = placeholderMap[key] || `[${key}]`;
      subject = subject.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
      body = body.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    setGeneratedEmail({ subject, body });
    setShowPreview(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadEmail = () => {
    const content = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateId}-email.txt`;
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
            onClick={() => navigate('/news/job-kit/email-templates')}
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
                onClick={generateEmail}
                className="w-full"
              >
                Generate Email
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </div>

        {/* Preview Section */}
        <div>
          <NeumorphicCard padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-100">Email Preview</h2>
              <NeumorphicButton
                variant="ghost"
                onClick={() => setShowPreview(!showPreview)}
                icon={showPreview ? EyeOff : Eye}
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </NeumorphicButton>
            </div>
            
            {showPreview && generatedEmail.subject ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">Subject:</label>
                  <div className="p-3 bg-gray-800 rounded-lg text-gray-100 border border-gray-600">
                    {generatedEmail.subject}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">Body:</label>
                  <div className="p-3 bg-gray-800 rounded-lg text-gray-100 border border-gray-600 whitespace-pre-line max-h-96 overflow-y-auto">
                    {generatedEmail.body}
                  </div>
                </div>
                <div className="flex gap-3">
                  <NeumorphicButton
                    variant="secondary"
                    onClick={() => copyToClipboard(`${generatedEmail.subject}\n\n${generatedEmail.body}`)}
                    icon={Copy}
                    className="flex-1"
                  >
                    Copy Email
                  </NeumorphicButton>
                  <NeumorphicButton
                    variant="secondary"
                    onClick={downloadEmail}
                    icon={Download}
                    className="flex-1"
                  >
                    Download
                  </NeumorphicButton>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Fill in the form and click "Generate Email" to see the preview</p>
              </div>
            )}
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default memo(EmailTemplateForm);
