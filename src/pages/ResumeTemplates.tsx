import React, { useState, memo } from 'react';
import { ArrowLeft, Download, Copy, User, Briefcase, GraduationCap, Code, BarChart3, Target, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
}

const ResumeTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<'fresher' | 'experienced'>('fresher');
  const [isEditing, setIsEditing] = useState(false);
  const [editedResume, setEditedResume] = useState<ResumeData | null>(null);

  const fresherResume = {
    personalInfo: {
      name: "Your Name",
      title: "Data Analyst",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "City, State",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername"
    },
    summary: "Results-driven Data Analyst with strong analytical skills and hands-on experience in data analysis tools. Passionate about transforming raw data into actionable insights that drive business decisions and improve operational efficiency. Proficient in Excel, SQL, Python, and Power BI with a solid foundation in statistics, data visualization, and business intelligence. Proven ability to deliver data-driven solutions that impact bottom-line results.",
    skills: [
      { category: "Technical Skills", items: ["Excel (Advanced - VLOOKUP, Pivot Tables, Macros)", "SQL (Complex Queries, Joins, CTEs)", "Python (Pandas, NumPy, Matplotlib, Seaborn)", "Power BI (DAX, Data Modeling, Dashboards)", "Tableau (Advanced Visualizations)", "Statistics & Statistical Analysis", "Data Visualization & Storytelling"] },
      { category: "Tools & Technologies", items: ["Microsoft Office Suite (Advanced)", "Google Analytics & Tag Manager", "Git & Version Control", "Jupyter Notebook & IDEs", "MySQL, PostgreSQL, SQL Server", "R (Statistical Computing)", "Business Intelligence Platforms"] },
      { category: "Soft Skills", items: ["Data-Driven Decision Making", "Stakeholder Management", "Cross-functional Collaboration", "Problem Solving & Critical Thinking", "Technical Communication", "Project Management", "Attention to Detail & Accuracy"] }
    ],
    education: [
      {
        degree: "Bachelor of Science in Data Science",
        school: "University Name",
        location: "City, State",
        year: "2024",
        gpa: "3.8/4.0",
        relevantCoursework: ["Statistics", "Database Management", "Machine Learning", "Data Visualization", "Business Analytics"]
      }
    ],
    projects: [
      {
        title: "Customer Churn Analysis Dashboard",
        description: "Led end-to-end analysis of customer churn patterns using advanced statistical methods and machine learning techniques",
        technologies: ["Python", "Pandas", "Scikit-learn", "Power BI", "SQL", "Statistical Analysis"],
        achievements: ["Identified 3 key factors contributing to 40% of customer churn, enabling targeted retention strategies", "Delivered interactive Power BI dashboard with real-time updates, reducing reporting time by 60%", "Presented data-driven insights to C-level executives, influencing $2M retention budget allocation", "Achieved 25% reduction in customer churn rate within 6 months of implementation"]
      },
      {
        title: "Sales Performance Optimization Analysis",
        description: "Spearheaded comprehensive sales performance analysis using advanced SQL queries and Excel automation to optimize revenue generation",
        technologies: ["SQL", "Excel (Advanced Functions)", "Power Query", "VBA", "Statistical Modeling"],
        achievements: ["Analyzed 50,000+ sales records across 12 regions, identifying $1.2M in untapped revenue opportunities", "Developed automated Excel reporting system using VBA, reducing manual work by 15 hours per week", "Identified top-performing products and regions, leading to 18% increase in sales efficiency", "Created predictive models for sales forecasting with 92% accuracy"]
      },
      {
        title: "Financial Market Data Intelligence Platform",
        description: "Built comprehensive data intelligence platform for analyzing stock market trends and investment patterns using advanced visualization techniques",
        technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "APIs"],
        achievements: ["Processed and analyzed 5 years of historical data (2M+ records) from multiple financial APIs", "Developed 15+ interactive visualizations revealing market trends and correlation patterns", "Implemented real-time data pipeline reducing data processing time by 75%", "Created investment recommendation engine with 78% accuracy rate"]
      }
    ],
    certifications: [
      { name: "Google Data Analytics Certificate", issuer: "Google", year: "2024" },
      { name: "Microsoft Excel Expert", issuer: "Microsoft", year: "2023" },
      { name: "SQL Fundamentals", issuer: "Coursera", year: "2023" }
    ],
    additionalSections: {
      languages: ["English (Native)", "Spanish (Conversational)"],
      interests: ["Data Science", "Machine Learning", "Business Intelligence", "Sports Analytics"]
    }
  };

  const experiencedResume = {
    personalInfo: {
      name: "Your Name",
      title: "Senior Data Analyst",
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "City, State",
      linkedin: "linkedin.com/in/yourprofile",
      github: "github.com/yourusername"
    },
    summary: "Senior Data Analyst with 5+ years of expertise in transforming complex data into strategic insights that drive business growth and operational excellence. Proven track record of delivering data-driven solutions that improve business performance by 30%+ and reduce costs by $2M+ annually. Expert in SQL, Python, Power BI, and advanced statistical analysis with strong leadership, project management, and stakeholder communication skills. Led cross-functional teams and mentored junior analysts while maintaining 95%+ project delivery success rate.",
    skills: [
      { category: "Technical Skills", items: ["SQL (Advanced - Complex Queries, Stored Procedures, Performance Optimization)", "Python (Pandas, NumPy, Scikit-learn, TensorFlow, Advanced Analytics)", "R (Statistical Computing, Data Mining)", "Power BI (DAX, Data Modeling, Advanced Visualizations)", "Tableau (Advanced Dashboards, Calculated Fields)", "Excel (Advanced Functions, VBA, Power Query)", "Machine Learning (Supervised/Unsupervised, Model Deployment)", "Statistical Analysis (A/B Testing, Regression, Time Series)"] },
      { category: "Tools & Technologies", items: ["AWS (S3, Redshift, Lambda, SageMaker)", "Azure (Data Factory, Synapse, ML Studio)", "Git & Version Control", "Docker & Containerization", "Jupyter & Data Science IDEs", "Apache Spark (Big Data Processing)", "PostgreSQL, MongoDB, Snowflake", "Business Intelligence Platforms"] },
      { category: "Soft Skills", items: ["Team Leadership & Management", "Project Management (Agile, Scrum)", "Executive Stakeholder Communication", "Mentoring & Training", "Strategic Thinking & Planning", "Cross-functional Collaboration", "Data Storytelling & Presentation"] }
    ],
    experience: [
      {
        title: "Senior Data Analyst",
        company: "Tech Company Inc.",
        location: "City, State",
        duration: "2022 - Present",
        achievements: [
          "Spearheaded data analysis projects that increased revenue by 25% ($3.2M annually) through advanced customer segmentation insights and targeted marketing strategies",
          "Architected and deployed automated reporting system using Python and Power BI, reducing manual work by 40 hours/week and saving $200K annually in labor costs",
          "Mentored and trained 3 junior analysts, improving team productivity by 30% and reducing project delivery time by 45%",
          "Developed and deployed predictive churn models with 85% accuracy, enabling proactive retention strategies that reduced churn by 22%",
          "Presented data-driven insights to C-level executives, influencing strategic decisions worth $5M+ in budget allocation and resource planning"
        ]
      },
      {
        title: "Data Analyst",
        company: "Marketing Solutions LLC",
        location: "City, State",
        duration: "2020 - 2022",
        achievements: [
          "Analyzed marketing campaign data across 15+ channels, resulting in 35% improvement in ROI ($1.8M additional revenue) through data-driven optimization strategies",
          "Designed and built interactive Power BI dashboards used by 50+ stakeholders across 8 departments, increasing data accessibility by 80% and reducing decision-making time by 50%",
          "Optimized complex database queries and implemented indexing strategies, reducing report generation time by 60% and improving system performance by 40%",
          "Collaborated with cross-functional teams (Marketing, Sales, Product) to implement data-driven strategies that increased customer acquisition by 28% and reduced customer acquisition cost by 22%"
        ]
      },
      {
        title: "Junior Data Analyst",
        company: "Retail Analytics Corp",
        location: "City, State",
        duration: "2019 - 2020",
        achievements: [
          "Performed daily data analysis supporting inventory management decisions across 200+ SKUs, optimizing stock levels and reducing carrying costs by 15%",
          "Created automated data validation processes using Excel VBA and SQL, reducing data errors by 90% and improving data quality metrics by 85%",
          "Assisted in developing customer lifetime value (CLV) models using statistical analysis, enabling targeted marketing campaigns that increased customer retention by 20%"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Science in Data Science",
        school: "University Name",
        location: "City, State",
        year: "2019",
        gpa: "3.9/4.0"
      },
      {
        degree: "Bachelor of Science in Mathematics",
        school: "University Name",
        location: "City, State",
        year: "2017",
        gpa: "3.7/4.0"
      }
    ],
    projects: [
      {
        title: "Real-time Sales Analytics Platform",
        description: "Architected and developed enterprise-grade analytics platform processing 1M+ daily transactions with real-time insights and automated reporting",
        technologies: ["Python", "Apache Spark", "PostgreSQL", "Power BI", "Docker", "Kubernetes", "Redis"],
        achievements: ["Reduced data processing time by 70% (from 4 hours to 1.2 hours), enabling real-time decision making", "Scaled platform to handle 10x data volume growth (10M+ daily transactions) with 99.9% uptime", "Implemented automated alerting system that reduced response time to sales anomalies by 85%", "Delivered $500K+ in cost savings through optimized data processing and reduced infrastructure requirements"]
      },
      {
        title: "Customer Lifetime Value Prediction Model",
        description: "Built and deployed machine learning model to predict customer lifetime value and optimize marketing spend allocation across multiple channels",
        technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "SQL", "XGBoost", "Feature Engineering"],
        achievements: ["Achieved 88% prediction accuracy on customer lifetime value, outperforming industry benchmarks by 15%", "Increased marketing ROI by 40% ($2.1M additional revenue) through optimized spend allocation", "Identified high-value customer segments representing 30% of total revenue, enabling targeted retention strategies", "Reduced customer acquisition cost by 25% through improved targeting and segmentation"]
      }
    ],
    certifications: [
      { name: "AWS Certified Data Analytics", issuer: "Amazon Web Services", year: "2023" },
      { name: "Tableau Desktop Specialist", issuer: "Tableau", year: "2022" },
      { name: "Google Analytics Certified", issuer: "Google", year: "2021" },
      { name: "Microsoft Azure Data Scientist", issuer: "Microsoft", year: "2020" }
    ],
    additionalSections: {
      languages: ["English (Native)", "Spanish (Professional)", "French (Conversational)"],
      interests: ["Machine Learning", "Data Engineering", "Open Source", "Mentoring", "Public Speaking"]
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Resume copied to clipboard!');
  };

  const downloadResume = (template: 'fresher' | 'experienced') => {
    const resumeData = editedResume || (template === 'fresher' ? fresherResume : experiencedResume);
    
    // Create HTML content for PDF generation
    const htmlContent = generateResumeHTML(resumeData);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      };
    }
  };

  const generateResumeHTML = (resume: ResumeData) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${resume.personalInfo.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            color: #333;
            background: white;
          }
          .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
          }
          .title {
            font-size: 18px;
            color: #666;
            margin-bottom: 10px;
          }
          .contact-info {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
          }
          .links {
            font-size: 14px;
            color: #0066cc;
            margin-top: 10px;
          }
          .section {
            margin-bottom: 25px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            padding-bottom: 5px;
            margin-bottom: 15px;
            color: #333;
          }
          .skills-category {
            margin-bottom: 10px;
          }
          .skills-category-title {
            font-weight: bold;
            margin-bottom: 5px;
          }
          .skills-list {
            margin-left: 20px;
            color: #666;
          }
          .experience-item, .project-item, .education-item {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #eee;
            border-radius: 5px;
          }
          .job-title, .project-title, .degree {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
          }
          .company, .school {
            color: #666;
            margin-bottom: 5px;
          }
          .duration, .year {
            color: #666;
            font-size: 14px;
            float: right;
          }
          .achievements {
            margin-top: 10px;
          }
          .achievements-title {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 14px;
          }
          .achievement {
            margin-left: 20px;
            margin-bottom: 3px;
            font-size: 14px;
          }
          .description {
            margin-bottom: 10px;
            color: #666;
          }
          .technologies {
            font-size: 14px;
            color: #666;
            font-style: italic;
          }
          .certification-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            padding: 5px 0;
          }
          .cert-name {
            font-weight: bold;
          }
          .cert-details {
            color: #666;
            font-size: 14px;
          }
          @media print {
            body { margin: 0; padding: 15px; }
            .resume-container { max-width: none; }
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          <!-- Header -->
          <div class="header">
            <div class="name">${resume.personalInfo.name}</div>
            <div class="title">${resume.personalInfo.title}</div>
            <div class="contact-info">
              ${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}
            </div>
            <div class="links">
              ${resume.personalInfo.linkedin} | ${resume.personalInfo.github}
            </div>
          </div>

          <!-- Professional Summary -->
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p>${resume.summary}</p>
          </div>

          <!-- Technical Skills -->
          <div class="section">
            <div class="section-title">Technical Skills</div>
            ${resume.skills.map((skill: string) => `
              <div class="skills-category">
                <div class="skills-category-title">${skill.category}:</div>
                <div class="skills-list">${skill.items.join(', ')}</div>
              </div>
            `).join('')}
          </div>

          ${resume.experience ? `
          <!-- Professional Experience -->
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${resume.experience.map((exp) => `
              <div class="experience-item">
                <div class="job-title">${exp.title}</div>
                <div class="company">${exp.company} | ${exp.location}</div>
                <div class="duration">${exp.duration}</div>
                <div class="achievements">
                  <div class="achievements-title">Key Achievements:</div>
                  ${exp.achievements.map((achievement: string) => `
                    <div class="achievement">• ${achievement}</div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}

          <!-- Education -->
          <div class="section">
            <div class="section-title">Education</div>
            ${resume.education.map((edu) => `
              <div class="education-item">
                <div class="degree">${edu.degree}</div>
                <div class="school">${edu.school} | ${edu.location}</div>
                <div class="year">${edu.year}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
                ${edu.relevantCoursework ? `
                  <div class="technologies">
                    Relevant Coursework: ${edu.relevantCoursework.join(', ')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>

          <!-- Projects -->
          <div class="section">
            <div class="section-title">Projects</div>
            ${resume.projects.map((project) => `
              <div class="project-item">
                <div class="project-title">${project.title}</div>
                <div class="description">${project.description}</div>
                <div class="technologies">Technologies: ${project.technologies.join(', ')}</div>
                <div class="achievements">
                  <div class="achievements-title">Key Achievements:</div>
                  ${project.achievements.map((achievement: string) => `
                    <div class="achievement">• ${achievement}</div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Certifications -->
          <div class="section">
            <div class="section-title">Certifications</div>
            ${resume.certifications?.map((cert) => `
              <div class="certification-item">
                <div class="cert-name">${cert.name}</div>
                <div class="cert-details">${cert.issuer} | ${cert.year}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const startEditing = () => {
    const currentResume = selectedTemplate === 'fresher' ? fresherResume : experiencedResume;
    setEditedResume(JSON.parse(JSON.stringify(currentResume))); // Deep copy
    setIsEditing(true);
  };

  const saveEditing = () => {
    setIsEditing(false);
    alert('Resume updated successfully!');
  };

  const cancelEditing = () => {
    setEditedResume(null);
    setIsEditing(false);
  };

  const updateResumeField = (section: string, field: string, value: string | string[], index?: number) => {
    if (!editedResume) return;
    
    const newResume = { ...editedResume };
    
    if (index !== undefined) {
      if (section === 'projects' || section === 'experience' || section === 'education' || section === 'certifications') {
        newResume[section][index][field] = value;
      }
    } else {
      if (section === 'personalInfo') {
        newResume.personalInfo[field] = value;
      } else if (section === 'summary') {
        newResume.summary = value;
      }
    }
    
    setEditedResume(newResume);
  };

  const formatResumeAsText = (resume: ResumeData) => {
    let text = `${resume.personalInfo.name}\n`;
    text += `${resume.personalInfo.title}\n`;
    text += `${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}\n`;
    text += `LinkedIn: ${resume.personalInfo.linkedin} | GitHub: ${resume.personalInfo.github}\n\n`;
    
    text += `PROFESSIONAL SUMMARY\n`;
    text += `${resume.summary}\n\n`;
    
    text += `TECHNICAL SKILLS\n`;
    resume.skills.forEach((skill) => {
      text += `${skill.category}: ${skill.items.join(', ')}\n`;
    });
    text += `\n`;
    
    if (resume.experience) {
      text += `PROFESSIONAL EXPERIENCE\n`;
      resume.experience.forEach((exp) => {
        text += `${exp.title} | ${exp.company} | ${exp.location} | ${exp.duration}\n`;
        exp.achievements.forEach((achievement: string) => {
          text += `• ${achievement}\n`;
        });
        text += `\n`;
      });
    }
    
    text += `EDUCATION\n`;
    resume.education.forEach((edu) => {
      text += `${edu.degree} | ${edu.school} | ${edu.location} | ${edu.year}`;
      if (edu.gpa) text += ` | GPA: ${edu.gpa}`;
      text += `\n`;
      if (edu.relevantCoursework) {
        text += `Relevant Coursework: ${edu.relevantCoursework.join(', ')}\n`;
      }
    });
    text += `\n`;
    
    text += `PROJECTS\n`;
    resume.projects.forEach((project) => {
      text += `${project.title}\n`;
      text += `${project.description}\n`;
      text += `Technologies: ${project.technologies.join(', ')}\n`;
      text += `Key Achievements:\n`;
      project.achievements.forEach((achievement: string) => {
        text += `• ${achievement}\n`;
      });
      text += `\n`;
    });
    
    text += `CERTIFICATIONS\n`;
    resume.certifications?.forEach((cert) => {
      text += `${cert.name} | ${cert.issuer} | ${cert.year}\n`;
    });
    
    return text;
  };

  const renderEditableResume = () => {
    if (!editedResume) return null;
    
    return (
      <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans text-sm leading-relaxed">
        {/* Header */}
        <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
          <input
            type="text"
            value={editedResume.personalInfo.name}
            onChange={(e) => updateResumeField('personalInfo', 'name', e.target.value)}
            className="text-2xl font-bold text-gray-800 mb-2 text-center bg-transparent border-none outline-none w-full"
          />
          <input
            type="text"
            value={editedResume.personalInfo.title}
            onChange={(e) => updateResumeField('personalInfo', 'title', e.target.value)}
            className="text-lg text-gray-600 mb-2 text-center bg-transparent border-none outline-none w-full"
          />
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <input
              type="email"
              value={editedResume.personalInfo.email}
              onChange={(e) => updateResumeField('personalInfo', 'email', e.target.value)}
              className="bg-transparent border-none outline-none text-center"
              placeholder="Email"
            />
            <span>•</span>
            <input
              type="tel"
              value={editedResume.personalInfo.phone}
              onChange={(e) => updateResumeField('personalInfo', 'phone', e.target.value)}
              className="bg-transparent border-none outline-none text-center"
              placeholder="Phone"
            />
            <span>•</span>
            <input
              type="text"
              value={editedResume.personalInfo.location}
              onChange={(e) => updateResumeField('personalInfo', 'location', e.target.value)}
              className="bg-transparent border-none outline-none text-center"
              placeholder="Location"
            />
          </div>
          <div className="flex justify-center gap-4 text-sm text-blue-600 mt-2">
            <input
              type="text"
              value={editedResume.personalInfo.linkedin}
              onChange={(e) => updateResumeField('personalInfo', 'linkedin', e.target.value)}
              className="bg-transparent border-none outline-none text-center"
              placeholder="LinkedIn"
            />
            <span>•</span>
            <input
              type="text"
              value={editedResume.personalInfo.github}
              onChange={(e) => updateResumeField('personalInfo', 'github', e.target.value)}
              className="bg-transparent border-none outline-none text-center"
              placeholder="GitHub"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
          <textarea
            value={editedResume.summary}
            onChange={(e) => updateResumeField('summary', 'summary', e.target.value)}
            className="w-full text-gray-700 bg-transparent border-none outline-none resize-none"
            rows={4}
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">TECHNICAL SKILLS</h2>
          {editedResume.skills.map((skill, index: number) => (
            <div key={index} className="mb-3 p-3 border border-gray-200 rounded">
              <div className="mb-2">
                <span className="font-semibold text-gray-800">{skill.category}:</span>
              </div>
              <textarea
                value={skill.items.join(', ')}
                onChange={(e) => {
                  const newSkills = { ...editedResume };
                  newSkills.skills[index].items = e.target.value.split(', ').filter(item => item.trim());
                  setEditedResume(newSkills);
                }}
                className="w-full text-gray-700 bg-transparent border border-gray-300 rounded p-2 outline-none resize-none"
                rows={2}
                placeholder="Enter skills separated by commas"
              />
            </div>
          ))}
        </div>

        {/* Experience (for experienced template) */}
        {editedResume.experience && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h2>
            {editedResume.experience.map((exp, index: number) => (
              <div key={index} className="mb-4 p-3 border border-gray-200 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateResumeField('experience', 'title', e.target.value, index)}
                      className="font-bold text-gray-800 bg-transparent border-none outline-none w-full"
                    />
                    <input
                      type="text"
                      value={`${exp.company} | ${exp.location}`}
                      onChange={(e) => {
                        const [company, location] = e.target.value.split(' | ');
                        updateResumeField('experience', 'company', company || '', index);
                        updateResumeField('experience', 'location', location || '', index);
                      }}
                      className="text-gray-600 bg-transparent border-none outline-none w-full"
                    />
                  </div>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => updateResumeField('experience', 'duration', e.target.value, index)}
                    className="text-gray-600 text-sm bg-transparent border-none outline-none text-right"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">Key Achievements:</p>
                  {exp.achievements.map((achievement: string, idx: number) => (
                    <input
                      key={idx}
                      type="text"
                      value={achievement}
                      onChange={(e) => {
                        const newExp = { ...editedResume };
                        newExp.experience[index].achievements[idx] = e.target.value;
                        setEditedResume(newExp);
                      }}
                      className="block w-full text-gray-700 text-sm mb-1 bg-transparent border-none outline-none"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">EDUCATION</h2>
          {editedResume.education.map((edu, index: number) => (
            <div key={index} className="mb-2 p-3 border border-gray-200 rounded">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateResumeField('education', 'degree', e.target.value, index)}
                    className="font-bold text-gray-800 bg-transparent border-none outline-none w-full"
                  />
                  <input
                    type="text"
                    value={`${edu.school} | ${edu.location}`}
                    onChange={(e) => {
                      const [school, location] = e.target.value.split(' | ');
                      updateResumeField('education', 'school', school || '', index);
                      updateResumeField('education', 'location', location || '', index);
                    }}
                    className="text-gray-600 bg-transparent border-none outline-none w-full"
                  />
                  {edu.relevantCoursework && (
                    <input
                      type="text"
                      value={`Relevant Coursework: ${edu.relevantCoursework.join(', ')}`}
                      onChange={(e) => {
                        const coursework = e.target.value.replace('Relevant Coursework: ', '').split(', ');
                        updateResumeField('education', 'relevantCoursework', coursework, index);
                      }}
                      className="text-gray-700 text-sm mt-1 bg-transparent border-none outline-none w-full"
                    />
                  )}
                </div>
                <div className="text-right text-gray-600 text-sm">
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => updateResumeField('education', 'year', e.target.value, index)}
                    className="bg-transparent border-none outline-none text-right"
                  />
                  {edu.gpa && (
                    <div>
                      <input
                        type="text"
                        value={`GPA: ${edu.gpa}`}
                        onChange={(e) => updateResumeField('education', 'gpa', e.target.value.replace('GPA: ', ''), index)}
                        className="bg-transparent border-none outline-none text-right"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">PROJECTS</h2>
          {editedResume.projects.map((project, index: number) => (
            <div key={index} className="mb-4 p-3 border border-gray-200 rounded">
              <input
                type="text"
                value={project.title}
                onChange={(e) => updateResumeField('projects', 'title', e.target.value, index)}
                className="font-bold text-gray-800 bg-transparent border-none outline-none w-full mb-2"
              />
              <textarea
                value={project.description}
                onChange={(e) => updateResumeField('projects', 'description', e.target.value, index)}
                className="w-full text-gray-700 mb-2 bg-transparent border-none outline-none resize-none"
                rows={2}
              />
              <input
                type="text"
                value={`Technologies: ${project.technologies.join(', ')}`}
                onChange={(e) => {
                  const technologies = e.target.value.replace('Technologies: ', '').split(', ');
                  updateResumeField('projects', 'technologies', technologies, index);
                }}
                className="w-full text-gray-600 text-sm mb-2 bg-transparent border-none outline-none"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">Key Achievements:</p>
                {project.achievements.map((achievement: string, idx: number) => (
                  <input
                    key={idx}
                    type="text"
                    value={achievement}
                    onChange={(e) => {
                      const newProject = { ...editedResume };
                      newProject.projects[index].achievements[idx] = e.target.value;
                      setEditedResume(newProject);
                    }}
                    className="block w-full text-gray-700 text-sm mb-1 bg-transparent border-none outline-none"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">CERTIFICATIONS</h2>
          {editedResume.certifications?.map((cert, index: number) => (
            <div key={index} className="flex justify-between items-center mb-1 p-2 border border-gray-200 rounded">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateResumeField('certifications', 'name', e.target.value, index)}
                className="text-gray-700 bg-transparent border-none outline-none flex-1"
              />
              <input
                type="text"
                value={`${cert.issuer} | ${cert.year}`}
                onChange={(e) => {
                  const [issuer, year] = e.target.value.split(' | ');
                  updateResumeField('certifications', 'issuer', issuer || '', index);
                  updateResumeField('certifications', 'year', year || '', index);
                }}
                className="text-gray-600 text-sm bg-transparent border-none outline-none text-right"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResumePreview = (resume: ResumeData) => (
    <div className="bg-white text-black p-8 max-w-4xl mx-auto font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{resume.personalInfo.name}</h1>
        <p className="text-lg text-gray-600 mb-2">{resume.personalInfo.title}</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <span>{resume.personalInfo.email}</span>
          <span>•</span>
          <span>{resume.personalInfo.phone}</span>
          <span>•</span>
          <span>{resume.personalInfo.location}</span>
        </div>
        <div className="flex justify-center gap-4 text-sm text-blue-600 mt-2">
          <span>{resume.personalInfo.linkedin}</span>
          <span>•</span>
          <span>{resume.personalInfo.github}</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
        <p className="text-gray-700">{resume.summary}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">TECHNICAL SKILLS</h2>
        {resume.skills.map((skill, index: number) => (
          <div key={index} className="mb-2">
            <span className="font-semibold text-gray-800">{skill.category}:</span>
            <span className="text-gray-700 ml-2">{skill.items.join(', ')}</span>
          </div>
        ))}
      </div>

      {/* Experience */}
      {resume.experience && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h2>
          {resume.experience.map((exp, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company} | {exp.location}</p>
                </div>
                <span className="text-gray-600 text-sm">{exp.duration}</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                {exp.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="mb-1">{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">EDUCATION</h2>
        {resume.education.map((edu, index: number) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school} | {edu.location}</p>
                {edu.relevantCoursework && (
                  <p className="text-gray-700 text-sm mt-1">
                    Relevant Coursework: {edu.relevantCoursework.join(', ')}
                  </p>
                )}
              </div>
              <div className="text-right text-gray-600 text-sm">
                <div>{edu.year}</div>
                {edu.gpa && <div>GPA: {edu.gpa}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">PROJECTS</h2>
        {resume.projects.map((project, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-gray-800">{project.title}</h3>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
            </p>
            <div>
              <p className="font-semibold text-gray-800 text-sm mb-1">Key Achievements:</p>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                {project.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className="text-sm">{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">CERTIFICATIONS</h2>
        {resume.certifications?.map((cert, index: number) => (
          <div key={index} className="flex justify-between items-center mb-1">
            <span className="text-gray-700">{cert.name}</span>
            <span className="text-gray-600 text-sm">{cert.issuer} | {cert.year}</span>
          </div>
        ))}
      </div>

      {/* Additional Sections */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-300">ADDITIONAL INFORMATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Languages:</h3>
            <p className="text-gray-700 text-sm">{resume.additionalSections.languages.join(', ')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Interests:</h3>
            <p className="text-gray-700 text-sm">{resume.additionalSections.interests.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news/job-kit')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Resume Templates</h1>
            <p className="text-gray-200">ATS-friendly resume templates for data analysts</p>
          </div>
        </div>

        {/* Template Selection */}
        <div className="flex gap-4 mb-8">
          <NeumorphicButton
            variant={selectedTemplate === 'fresher' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTemplate('fresher')}
            className="flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" />
            Fresher Template
          </NeumorphicButton>
          <NeumorphicButton
            variant={selectedTemplate === 'experienced' ? 'accent' : 'ghost'}
            onClick={() => setSelectedTemplate('experienced')}
            className="flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Experienced Template
          </NeumorphicButton>
        </div>
      </div>

      {/* Resume Preview - Full Width */}
      <div className="mb-8">
        <NeumorphicCard padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-100">
              {isEditing ? 'Edit Resume' : (selectedTemplate === 'fresher' ? 'Fresher Resume Template' : 'Experienced Resume Template')}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-500" />
                ATS Optimized
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <NeumorphicButton
                      variant="accent"
                      size="sm"
                      onClick={startEditing}
                      icon={User}
                    >
                      Edit Resume
                    </NeumorphicButton>
                    <NeumorphicButton
                      variant="secondary"
                      size="sm"
                      onClick={() => downloadResume(selectedTemplate)}
                      icon={Download}
                    >
                      Download
                    </NeumorphicButton>
                    <NeumorphicButton
                      variant="ghost"
                                      size="sm"
                      onClick={() => copyToClipboard(formatResumeAsText(editedResume || (selectedTemplate === 'fresher' ? fresherResume : experiencedResume)))}
                      icon={Copy}
                    >
                      Copy
                    </NeumorphicButton>
                  </>
                ) : (
                  <>
                    <NeumorphicButton
                      variant="accent"
                      size="sm"
                      onClick={saveEditing}
                    >
                      Save Changes
                    </NeumorphicButton>
                    <NeumorphicButton
                      variant="secondary"
                      size="sm"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </NeumorphicButton>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-600 rounded-lg overflow-hidden">
            {isEditing ? renderEditableResume() : renderResumePreview(editedResume || (selectedTemplate === 'fresher' ? fresherResume : experiencedResume))}
          </div>
        </NeumorphicCard>
      </div>

      {/* Template Features - Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ATS-Friendly Design */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            ATS-Friendly Design
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Clean, simple formatting</li>
            <li>• Standard section headers</li>
            <li>• No graphics or complex layouts</li>
            <li>• Easy to scan by ATS systems</li>
            <li>• Consistent font and spacing</li>
            <li>• Proper keyword placement</li>
          </ul>
        </NeumorphicCard>

        {/* Data Analyst Focused */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-500" />
            Data Analyst Focused
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Relevant technical skills</li>
            <li>• Quantified achievements</li>
            <li>• Project-based experience</li>
            <li>• Industry-specific keywords</li>
            <li>• Business impact metrics</li>
            <li>• Tool proficiency highlights</li>
          </ul>
        </NeumorphicCard>

        {/* Template Specific Features */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            {selectedTemplate === 'fresher' ? 'Fresher-Specific' : 'Experienced-Specific'}
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            {selectedTemplate === 'fresher' ? (
              <>
                <li>• Education emphasis</li>
                <li>• Academic projects</li>
                <li>• Internships/volunteer work</li>
                <li>• Certifications and courses</li>
                <li>• Relevant coursework</li>
                <li>• Entry-level skills</li>
              </>
            ) : (
              <>
                <li>• Professional experience</li>
                <li>• Leadership examples</li>
                <li>• Advanced technical skills</li>
                <li>• Business impact metrics</li>
                <li>• Team management</li>
                <li>• Strategic projects</li>
              </>
            )}
          </ul>
        </NeumorphicCard>

        {/* Tips for Success */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Tips for Success
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Customize for each job application</li>
            <li>• Use keywords from job description</li>
            <li>• Quantify your achievements</li>
            <li>• Keep it to 1-2 pages maximum</li>
            <li>• Proofread multiple times</li>
            <li>• Use action verbs</li>
          </ul>
        </NeumorphicCard>

        {/* Technical Skills Highlight */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-500" />
            Technical Skills
          </h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Excel (Advanced functions)</li>
            <li>• SQL (Complex queries)</li>
            <li>• Python (Data analysis)</li>
            <li>• Power BI/Tableau</li>
            <li>• Statistics & Analytics</li>
            <li>• Data Visualization</li>
          </ul>
        </NeumorphicCard>

        {/* Download Actions */}
        <NeumorphicCard padding="lg">
          <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-green-500" />
            Get Started
          </h3>
          <div className="space-y-3">
            <NeumorphicButton
              variant="accent"
              className="w-full"
              onClick={() => downloadResume(selectedTemplate)}
              icon={Download}
            >
              Download Template
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              className="w-full"
              onClick={() => copyToClipboard(formatResumeAsText(selectedTemplate === 'fresher' ? fresherResume : experiencedResume))}
              icon={Copy}
            >
              Copy to Clipboard
            </NeumorphicButton>
            <p className="text-xs text-gray-400 text-center">
              Customize the template with your own information
            </p>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(ResumeTemplates);
