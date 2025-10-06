import React, { memo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Target, CheckCircle, Lightbulb, Copy, Download, Edit3, Eye, Save, MapPin, Linkedin, Briefcase } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const LinkedInStrategy: React.FC = () => {
  const navigate = useNavigate();
  const { strategyType } = useParams<{ strategyType: string }>();
  const [activeTab, setActiveTab] = useState<'guide' | 'templates' | 'builder'>('guide');
  const [, setSelectedTemplate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    headline: 'Aspiring Data Analyst | Excel • SQL • Power BI • Python',
    title: 'Data Analyst',
    location: 'Mumbai, India',
    experienceLevel: '0-1 years',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    about: 'Results-driven aspiring data analyst with strong foundation in Excel, SQL, and Python. Passionate about transforming raw data into actionable insights that drive business decisions. Completed Google Data Analytics Certificate and multiple hands-on projects.',
    experience: [
      {
        title: 'Data Analysis Intern',
        company: 'Tech Solutions Inc.',
        duration: 'Jan 2024 - Present',
        description: 'Analyzed customer data to identify trends and patterns, created interactive dashboards using Power BI, and assisted in generating monthly reports for stakeholders.'
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Mumbai',
        year: '2024',
        gpa: '3.8/4.0',
        percentage: '85%'
      }
    ],
    skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Tableau', 'Statistics', 'Data Visualization'],
    projects: [
      {
        title: 'Customer Churn Analysis',
        description: 'Built predictive model to identify customers at risk of churning using Python and machine learning techniques.',
        link: 'github.com/johndoe/churn-analysis',
        technologies: 'Python, Scikit-learn, SQL'
      }
    ],
    certifications: ['Google Data Analytics Certificate', 'Microsoft Excel Expert']
  });

  const linkedinTemplates = [
    {
      id: 'fresher-template',
      name: 'Fresher Template',
      description: 'Perfect for recent graduates and career changers',
      preview: {
        name: 'Sarah Johnson',
        headline: 'Aspiring Data Analyst | Excel • SQL • Power BI • Python',
        location: 'Bangalore, India',
        about: 'Recent Computer Science graduate passionate about data analysis. Completed Google Data Analytics Certificate with hands-on experience in Excel, SQL, and Python. Eager to apply analytical skills to solve real-world business problems.',
        experience: [
          {
            title: 'Data Analysis Intern',
            company: 'StartupXYZ',
            duration: '3 months',
            description: 'Analyzed user engagement data and created visualizations using Power BI.'
          }
        ],
        education: [
          {
            degree: 'B.Tech Computer Science',
            school: 'IIT Bangalore',
            year: '2024',
            gpa: '8.5/10'
          }
        ],
        skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Statistics', 'Data Visualization'],
        projects: [
          {
            title: 'Sales Dashboard',
            description: 'Created interactive dashboard showing monthly sales trends and KPIs.',
            link: 'github.com/sarah/sales-dashboard'
          }
        ]
      }
    },
    {
      id: 'career-changer-template',
      name: 'Career Changer Template',
      description: 'For professionals transitioning to data analysis',
      preview: {
        name: 'Michael Chen',
        headline: 'Former Marketing Manager | Now Data Analyst | Excel • SQL • Tableau',
        location: 'Delhi, India',
        about: 'Marketing professional with 5+ years experience transitioning to data analysis. Strong business acumen combined with newly acquired technical skills in Excel, SQL, and Tableau. Passionate about using data to drive marketing decisions.',
        experience: [
          {
            title: 'Marketing Manager',
            company: 'Digital Marketing Co.',
            duration: '3 years',
            description: 'Led data-driven marketing campaigns, analyzed customer behavior, and optimized ROI using analytics tools.'
          }
        ],
        education: [
          {
            degree: 'MBA Marketing',
            school: 'IIM Ahmedabad',
            year: '2019',
            gpa: '3.6/4.0'
          }
        ],
        skills: ['Excel', 'SQL', 'Tableau', 'Google Analytics', 'Marketing Analytics', 'Data Storytelling'],
        projects: [
          {
            title: 'Customer Segmentation Analysis',
            description: 'Analyzed customer data to create targeted marketing segments using SQL and Tableau.',
            link: 'github.com/michael/customer-segmentation'
          }
        ]
      }
    },
    {
      id: 'experienced-template',
      name: 'Experienced Template',
      description: 'For professionals with 1-2 years of data analysis experience',
      preview: {
        name: 'Priya Sharma',
        headline: 'Data Analyst | 2+ Years Experience | SQL • Python • Power BI • ML',
        location: 'Pune, India',
        about: 'Experienced data analyst with 2+ years in business intelligence and analytics. Proven track record of delivering actionable insights that improved business performance by 25%. Expert in SQL, Python, and advanced analytics.',
        experience: [
          {
            title: 'Junior Data Analyst',
            company: 'Analytics Solutions Ltd.',
            duration: '2 years',
            description: 'Developed automated reporting systems, created predictive models, and provided data-driven recommendations to senior management.'
          }
        ],
        education: [
          {
            degree: 'M.Sc Statistics',
            school: 'University of Pune',
            year: '2022',
            gpa: '3.9/4.0'
          }
        ],
        skills: ['SQL', 'Python', 'Power BI', 'ML', 'Statistics', 'R', 'Advanced Excel'],
        projects: [
          {
            title: 'Predictive Sales Model',
            description: 'Built ML model to predict quarterly sales with 85% accuracy using Python and scikit-learn.',
            link: 'github.com/priya/sales-prediction'
          }
        ]
      }
    }
  ];

  const naukriTemplates = [
    {
      id: 'fresher-naukri-template',
      name: 'Fresher Naukri Profile',
      description: 'Optimized for Naukri.com job applications',
      preview: {
        name: 'Sarah Johnson',
        title: 'Data Analyst',
        location: 'Bangalore, Karnataka',
        experience: '0-1 years',
        about: 'Recent Computer Science graduate with strong analytical skills and hands-on experience in data analysis tools. Completed Google Data Analytics Certificate and multiple projects using Excel, SQL, and Python. Seeking entry-level data analyst position to apply technical skills in real-world business scenarios.',
        skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Statistics', 'Data Visualization', 'Google Analytics'],
        education: [
          {
            degree: 'B.Tech Computer Science',
            school: 'IIT Bangalore',
            year: '2024',
            percentage: '85%'
          }
        ],
        projects: [
          {
            title: 'Customer Churn Analysis Dashboard',
            description: 'Built interactive Power BI dashboard analyzing customer churn patterns and identifying key factors affecting retention.',
            technologies: 'Power BI, SQL, Excel'
          }
        ],
        certifications: [
          'Google Data Analytics Certificate',
          'Microsoft Excel Expert',
          'SQL Fundamentals'
        ]
      }
    },
    {
      id: 'experienced-naukri-template',
      name: 'Experienced Naukri Profile',
      description: 'For professionals with 1-3 years experience',
      preview: {
        name: 'Priya Sharma',
        title: 'Senior Data Analyst',
        location: 'Pune, Maharashtra',
        experienceLevel: '2-3 years',
        about: 'Experienced data analyst with 2+ years in business intelligence and analytics. Proven track record of delivering actionable insights that improved business performance by 25%. Expert in SQL, Python, and advanced analytics with strong communication skills.',
        skills: ['SQL', 'Python', 'Power BI', 'ML', 'Statistics', 'R', 'Advanced Excel', 'Tableau'],
        education: [
          {
            degree: 'M.Sc Statistics',
            school: 'University of Pune',
            year: '2022',
            percentage: '92%'
          }
        ],
        experience: [
          {
            title: 'Data Analyst',
            company: 'Analytics Solutions Ltd.',
            duration: '2 years',
            description: 'Developed automated reporting systems, created predictive models, and provided data-driven recommendations to senior management. Improved operational efficiency by 30%.'
          }
        ],
        projects: [
          {
            title: 'Predictive Sales Forecasting Model',
            description: 'Built ML model to predict quarterly sales with 85% accuracy using Python and scikit-learn, resulting in 20% improvement in inventory management.',
            technologies: 'Python, Scikit-learn, SQL, Power BI'
          }
        ],
        certifications: [
          'AWS Certified Data Analytics',
          'Tableau Desktop Specialist',
          'Microsoft Azure Data Scientist'
        ]
      }
    },
    {
      id: 'career-changer-naukri-template',
      name: 'Career Changer Naukri Profile',
      description: 'For professionals transitioning to data analysis',
      preview: {
        name: 'Michael Chen',
        title: 'Data Analyst',
        location: 'Delhi, Delhi',
        experienceLevel: '1-2 years',
        about: 'Marketing professional with 5+ years experience transitioning to data analysis. Strong business acumen combined with newly acquired technical skills in Excel, SQL, and Tableau. Passionate about using data to drive business decisions and improve ROI.',
        skills: ['Excel', 'SQL', 'Tableau', 'ML', 'Marketing Analytics', 'Data Storytelling', 'Power BI'],
        education: [
          {
            degree: 'MBA Marketing',
            school: 'IIM Ahmedabad',
            year: '2019',
            percentage: '88%'
          }
        ],
        experience: [
          {
            title: 'Marketing Manager',
            company: 'Digital Marketing Co.',
            duration: '3 years',
            description: 'Led data-driven marketing campaigns, analyzed customer behavior using Google Analytics, and optimized ROI by 35%. Managed team of 5 analysts.'
          }
        ],
        projects: [
          {
            title: 'Customer Segmentation Analysis',
            description: 'Analyzed customer data to create targeted marketing segments using SQL and Tableau, resulting in 25% increase in campaign effectiveness.',
            technologies: 'SQL, Tableau, Google Analytics, Excel'
          }
        ],
        certifications: [
          'Google Analytics Certified',
          'Tableau Desktop Specialist',
          'Digital Marketing Analytics'
        ]
      }
    }
  ];

  const profileTemplates = strategyType === 'linkedin-strategy' ? linkedinTemplates : naukriTemplates;

  const strategyDetails = {
    'linkedin-strategy': {
      title: 'LinkedIn Job Strategy (Step-by-Step for Freshers)',
      icon: Users,
      color: 'from-orange-400 to-orange-500',
      description: 'Complete step-by-step guide for freshers to land data analyst roles on LinkedIn',
      sections: [
        {
          title: 'Optimize Your Profile First',
          tips: [
            'Add a professional photo & custom banner',
            'Write a strong headline (e.g., "Aspiring Data Analyst | Excel • SQL • Power BI • Python")',
            'Use keyword-rich "About" section (include tools, certifications, and 1–2 projects)'
          ]
        },
        {
          title: 'Turn On "Open to Work" Setting',
          tips: [
            'Add preferred job titles: Data Analyst, Business Analyst, Junior Analyst',
            'Select locations (Remote, PAN India, Top Metro Cities)'
          ]
        },
        {
          title: 'Use LinkedIn Job Search Filters',
          tips: [
            'Filter by experience level → "Entry Level" or "Internship"',
            'Use keyword search: "Data Analyst Fresher", "SQL Power BI", "Graduate Analyst"',
            'Turn on job alerts (daily or instant)'
          ]
        },
        {
          title: 'Apply Smart with Easy Apply',
          tips: [
            'Prioritize "Easy Apply" listings for faster outreach',
            'Customize your resume based on JD keywords using ChatGPT'
          ]
        },
        {
          title: 'Engage with Hiring Managers & Recruiters',
          tips: [
            'Like + Comment on their posts',
            'DM with a short message + resume link (from the DM Template above)'
          ]
        },
        {
          title: 'Post Content to Attract Recruiters',
          tips: [
            'Weekly post ideas:',
            'Share your projects (add GitHub & dashboards)',
            'Share what you learned (e.g., SQL joins example with visuals)',
            'Celebrate small wins: certifications, interview calls'
          ]
        },
        {
          title: 'Join Relevant LinkedIn Groups',
          tips: [
            '"Data Analyst Jobs - India", "SQL Interview Prep", "Power BI Users"',
            'Actively comment, answer questions, and share your progress'
          ]
        },
        {
          title: 'Use Hashtags for Visibility',
          tips: [
            '#DataAnalyst #OpenToWork #SQLJobs #PowerBI #Freshers #EntryLevelJobs'
          ]
        },
        {
          title: 'Track Applications via Spreadsheet or Notion',
          tips: [
            'Company Name, JD link, Applied Date, Status',
            'Follow-up every 5–7 days if no response'
          ]
        }
      ]
    },
    'naukri-strategy': {
      title: 'Naukri Job Strategy (Step-by-Step for Freshers)',
      icon: Target,
      color: 'from-orange-400 to-orange-500',
      description: 'Complete step-by-step guide for freshers to land data analyst roles on Naukri.com',
      sections: [
        {
          title: 'Create a Strong Profile (100% Complete)',
          tips: [
            'Use professional photo, targeted headline (e.g., "Aspiring Data Analyst | Excel • SQL • Power BI • Python")',
            'Write a keyword-rich summary with tools, certifications, and internship experience',
            'Add at least 2–3 projects with results/impact (e.g., "Built sales dashboard in Power BI for retail dataset")'
          ]
        },
        {
          title: 'Upload a Tailored Resume',
          tips: [
            'ATS-optimized, with role-specific keywords',
            'Rename file like: Name_DataAnalyst_Fresher_Resume.pdf',
            'Use ChatGPT to match resume with job description keywords'
          ]
        },
        {
          title: 'Set Up Job Alerts (Smart Filters)',
          tips: [
            'Title: Data Analyst, Business Analyst, MIS Analyst',
            'Location: All India + Remote',
            'Experience: 0–1 years',
            'Salary: Set "0–6 LPA" for fresher opportunities'
          ]
        },
        {
          title: 'Apply to Minimum 10 Jobs Daily (With Customization)',
          tips: [
            'Avoid mass applying — add a short 2-line note using JD keywords',
            'Prioritize "Recently Posted" listings with <50 applicants',
            'Save and revisit similar company listings'
          ]
        },
        {
          title: 'Use "Recruiter Connection" Feature',
          tips: [
            'Check who posted the job → try connecting via LinkedIn',
            'Use LinkedIn DM templates to build rapport'
          ]
        },
        {
          title: 'Update Profile Activity Weekly',
          tips: [
            'Refresh resume upload every 7–10 days (shows up as "active jobseeker")',
            'Keep last login active — log in daily or every 2–3 days'
          ]
        },
        {
          title: 'Get Featured with Naukri Boost (Optional)',
          tips: [
            'Use free credits or Naukri campaigns to appear in top search',
            'Join fresher-specific campaigns if available'
          ]
        },
        {
          title: 'Track Your Applications + Follow Up',
          tips: [
            'Maintain tracker for: Job Link, Role, Date Applied, Status',
            'After 5–7 days, find HR contact from job post/LinkedIn → follow up with polite message'
          ]
        },
        {
          title: 'Common Mistakes to Avoid',
          tips: [
            'Incomplete profile or missing projects',
            'Resume not aligned with job title (e.g., writing "Python Developer" instead of "Data Analyst")',
            'Not refreshing activity'
          ]
        },
        {
          title: '✅ BONUS TIP',
          tips: [
            'Use ChatGPT to write a custom note or email for each job.'
          ]
        }
      ]
    }
  };

  const currentStrategy = strategyDetails[strategyType as keyof typeof strategyDetails];

  if (!currentStrategy) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Strategy Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/job-kit/portfolio-building-guide')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const copyStrategy = () => {
    const strategyText = currentStrategy.sections
      .map(section => `${section.title}\n${section.tips.map(tip => `• ${tip}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(strategyText);
    alert('Strategy copied to clipboard!');
  };

  const downloadStrategy = () => {
    const strategyText = currentStrategy.sections
      .map(section => `${section.title}\n${section.tips.map(tip => `• ${tip}`).join('\n')}`)
      .join('\n\n');
    
    const blob = new Blob([strategyText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${strategyType}-strategy.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // const useTemplate = (templateId: string) => {
  //   const template = profileTemplates.find(t => t.id === templateId);
  //   if (template) {
  //     setProfileData(template.preview);
  //     setSelectedTemplate(templateId);
  //     setActiveTab('builder');
  //     setIsEditing(true);
  //   }
  // };

  const updateProfileData = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyProfileText = () => {
    const profileText = `
${profileData.name}
${profileData.headline}
${profileData.location}

ABOUT:
${profileData.about}

EXPERIENCE:
${profileData.experience.map(exp => `${exp.title} at ${exp.company} (${exp.duration})
${exp.description}`).join('\n\n')}

EDUCATION:
${profileData.education.map(edu => `${edu.degree} from ${edu.school} (${edu.year}) - GPA: ${edu.gpa}`).join('\n')}

SKILLS:
${profileData.skills.join(' • ')}

PROJECTS:
${profileData.projects.map(proj => `${proj.title}: ${proj.description}
Link: ${proj.link}`).join('\n\n')}
    `;
    
    navigator.clipboard.writeText(profileText);
    alert('Profile content copied to clipboard!');
  };

  const scrollToSection = (index: number) => {
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const IconComponent = currentStrategy.icon;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news/job-kit/portfolio-building-guide')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-r ${currentStrategy.color} rounded-xl flex items-center justify-center mr-4`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{currentStrategy.title}</h1>
              <p className="text-gray-200 text-lg">{currentStrategy.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800 rounded-xl p-1 flex">
          <NeumorphicButton
            variant={activeTab === 'guide' ? 'accent' : 'ghost'}
            onClick={() => setActiveTab('guide')}
            className="px-6"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Strategy Guide
          </NeumorphicButton>
          <NeumorphicButton
            variant={activeTab === 'templates' ? 'accent' : 'ghost'}
            onClick={() => setActiveTab('templates')}
            className="px-6"
          >
            <Eye className="w-4 h-4 mr-2" />
            Profile Templates
          </NeumorphicButton>
          <NeumorphicButton
            variant={activeTab === 'builder' ? 'accent' : 'ghost'}
            onClick={() => setActiveTab('builder')}
            className="px-6"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Profile Builder
          </NeumorphicButton>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'guide' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <NeumorphicCard hoverable className="text-center p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg mx-auto mb-2 orange-glow">
                <CheckCircle className="w-5 h-5 text-gray-100" />
              </div>
              <h3 className="text-lg font-bold text-high-contrast">{currentStrategy.sections.length}</h3>
              <p className="text-secondary-contrast text-xs">Strategy Steps</p>
            </NeumorphicCard>

            <NeumorphicCard hoverable className="text-center p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg mx-auto mb-2 orange-glow">
                <Lightbulb className="w-5 h-5 text-gray-100" />
              </div>
              <h3 className="text-lg font-bold text-high-contrast">
                {currentStrategy.sections.reduce((total, section) => total + section.tips.length, 0)}
              </h3>
              <p className="text-secondary-contrast text-xs">Actionable Tips</p>
            </NeumorphicCard>

            <NeumorphicCard hoverable className="text-center p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg mx-auto mb-2 orange-glow">
                <Target className="w-5 h-5 text-gray-100" />
              </div>
              <h3 className="text-lg font-bold text-high-contrast">Proven</h3>
              <p className="text-secondary-contrast text-xs">Success Method</p>
            </NeumorphicCard>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <NeumorphicButton
              variant="accent"
              onClick={copyStrategy}
              icon={Copy}
            >
              Copy Strategy
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={downloadStrategy}
              icon={Download}
            >
              Download Strategy
            </NeumorphicButton>
          </div>

          {/* Strategy Content */}
          <div className="space-y-6">
            {currentStrategy.sections.map((section, index) => (
              <NeumorphicCard key={index} id={`section-${index}`} padding="lg" className="hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-bold text-gray-100 mb-4 cursor-pointer hover:text-orange-400 transition-colors duration-200"
                      onClick={() => scrollToSection(index)}
                    >
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-200 text-sm leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Choose Your LinkedIn Profile Template</h2>
            <p className="text-gray-200">Select a template that matches your experience level and customize it for your profile</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {profileTemplates.map((template) => (
              <NeumorphicCard key={template.id} padding="lg" hoverable className="h-full">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {strategyType === 'linkedin-strategy' ? (
                      <Linkedin className="w-8 h-8 text-white" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{template.name}</h3>
                  <p className="text-gray-200 text-sm">{template.description}</p>
                </div>

                {/* Template Preview */}
                <div className="bg-white rounded-lg p-4 mb-6 text-black text-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-bold">{template.preview.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{template.preview.name}</h4>
                      <p className="text-xs text-gray-600">
                        {strategyType === 'linkedin-strategy' ? template.preview.headline : template.preview.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {template.preview.location}
                      </p>
                      {strategyType === 'naukri-strategy' && (
                        <p className="text-xs text-gray-500">
                          Experience: {template.preview.experienceLevel}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mb-2 line-clamp-3">{template.preview.about}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.preview.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className={`${strategyType === 'linkedin-strategy' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'} text-xs px-2 py-1 rounded`}>
                        {skill}
                      </span>
                    ))}
                    {template.preview.skills.length > 4 && (
                      <span className="text-xs text-gray-500">+{template.preview.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                <NeumorphicButton
                  variant="accent"
                  className="w-full"
                  onClick={() => {
                    const template = profileTemplates.find(t => t.id === template.id);
                    if (template) {
                      setProfileData(template.preview);
                      setSelectedTemplate(template.id);
                      setActiveTab('builder');
                      setIsEditing(true);
                    }
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Use This Template
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-2">
                {strategyType === 'linkedin-strategy' ? 'LinkedIn Profile Builder' : 'Naukri Profile Builder'}
              </h2>
              <p className="text-gray-200">Customize your profile content and see a live preview</p>
            </div>
            <div className="flex gap-2">
              <NeumorphicButton
                variant="secondary"
                onClick={copyProfileText}
                icon={Copy}
              >
                Copy Content
              </NeumorphicButton>
              <NeumorphicButton
                variant="accent"
                onClick={() => setIsEditing(!isEditing)}
                icon={isEditing ? Save : Edit3}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </NeumorphicButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Preview */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </h3>
              
              <div className="bg-white rounded-xl p-6 text-black shadow-2xl">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className={`w-24 h-24 bg-gradient-to-r ${strategyType === 'linkedin-strategy' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl font-bold">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {strategyType === 'linkedin-strategy' ? profileData.headline : profileData.title}
                  </p>
                  <p className="text-gray-500 flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </p>
                  {strategyType === 'naukri-strategy' && (
                    <p className="text-gray-500 text-sm mt-1">
                      Experience: {profileData.experienceLevel}
                    </p>
                  )}
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                  <p className="text-gray-700 text-sm leading-relaxed">{profileData.about}</p>
                </div>

                {/* Experience */}
                {profileData.experience && profileData.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      {strategyType === 'linkedin-strategy' ? 'Experience' : 'Work Experience'}
                    </h2>
                    {profileData.experience.map((exp, idx) => (
                      <div key={idx} className="mb-4">
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600 text-sm">{exp.company} • {exp.duration}</p>
                        <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Education</h2>
                  {profileData.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">
                        {edu.school} • {edu.year}
                        {strategyType === 'linkedin-strategy' ? ` • GPA: ${edu.gpa}` : ` • ${edu.percentage}`}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, idx) => (
                      <span key={idx} className={`${strategyType === 'linkedin-strategy' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'} text-sm px-3 py-1 rounded-full`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Projects</h2>
                  {profileData.projects.map((proj, idx) => (
                    <div key={idx} className="mb-3">
                      <h3 className="font-semibold text-gray-900">{proj.title}</h3>
                      <p className="text-gray-700 text-sm">{proj.description}</p>
                      {strategyType === 'linkedin-strategy' ? (
                        <a href="#" className="text-blue-600 text-sm hover:underline">{proj.link}</a>
                      ) : (
                        <p className="text-sm text-gray-600">
                          <strong>Technologies:</strong> {proj.technologies}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Certifications for Naukri */}
                {strategyType === 'naukri-strategy' && profileData.certifications && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h2>
                    <div className="space-y-2">
                      {profileData.certifications.map((cert, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Edit Profile
                </h3>

                <NeumorphicCard padding="lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => updateProfileData('name', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        {strategyType === 'linkedin-strategy' ? 'Headline' : 'Job Title'}
                      </label>
                      <input
                        type="text"
                        value={strategyType === 'linkedin-strategy' ? profileData.headline : profileData.title}
                        onChange={(e) => updateProfileData(strategyType === 'linkedin-strategy' ? 'headline' : 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {strategyType === 'naukri-strategy' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Experience Level</label>
                        <input
                          type="text"
                          value={profileData.experienceLevel}
                          onChange={(e) => updateProfileData('experienceLevel', e.target.value)}
                          placeholder="e.g., 0-1 years, 1-2 years"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => updateProfileData('location', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">About</label>
                      <textarea
                        value={profileData.about}
                        onChange={(e) => updateProfileData('about', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Skills (comma separated)</label>
                      <input
                        type="text"
                        value={profileData.skills.join(', ')}
                        onChange={(e) => updateProfileData('skills', e.target.value.split(', ').filter(s => s.trim()))}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {strategyType === 'naukri-strategy' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">Certifications (one per line)</label>
                        <textarea
                          value={profileData.certifications ? profileData.certifications.join('\n') : ''}
                          onChange={(e) => updateProfileData('certifications', e.target.value.split('\n').filter(c => c.trim()))}
                          rows={4}
                          placeholder="Google Data Analytics Certificate&#10;Microsoft Excel Expert&#10;SQL Fundamentals"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    )}
                  </div>
                </NeumorphicCard>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-12">
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Ready to Implement This Strategy?</h3>
          <p className="text-gray-200 mb-6">
            Start implementing these steps today to boost your chances of landing your dream data analyst role!
          </p>
          <div className="flex justify-center gap-4">
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/news/job-kit/interview-preparation')}
            >
              Practice Interview Questions
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={() => navigate('/news/job-kit/resume-templates')}
            >
              Create Your Resume
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(LinkedInStrategy);
