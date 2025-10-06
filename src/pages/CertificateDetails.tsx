import React, { memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Star, Clock, Users, CheckCircle, Award } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const CertificateDetails: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const navigate = useNavigate();

  // Certificate data - in a real app, this would be fetched based on certificateId
  const certificates = [
    {
      id: 'quantium-data-analytics',
      title: 'Data Analytics Certificate',
      provider: 'Quantium',
      description: 'Explore the power of data and its ability to power breakthrough possibilities for individuals, organisations and societies with Quantium.',
      rating: '11750+ 5 Star Reviews',
      duration: '4-5 hours',
      level: 'Advanced',
      price: 'Free',
      image: '/Images/Qunatium Data Analytics.png',
      link: 'https://www.theforage.com/simulations/quantium/data-analytics-rqkb',
      skills: ['Data Validation', 'Data Visualization', 'Data Cleaning', 'Programming', 'Data Analysis', 'Commercial Thinking', 'Statistical Analysis'],
      whatYoullLearn: [
        'Understand how to examine and clean transaction and customer data',
        'Learn to identify customer segments based on purchasing behavior',
        'Gain experience in creating charts and graphs to present data insights',
        'Learn how to derive commercial recommendations from data analysis'
      ],
      whatYoullDo: [
        'Analyze transaction and customer data to identify trends and inconsistencies',
        'Develop metrics and examine sales drivers to gain insights into overall sales performance',
        'Create visualizations and prepare findings to formulate a clear recommendation for the client\'s strategy'
      ]
    },
    {
      id: 'deloitte-data-analytics',
      title: 'Data Analytics Certificate',
      provider: 'Deloitte',
      description: 'Work with our team to deliver Deloitte expertise to our clients',
      rating: '126150+ 5 Star Reviews',
      duration: '1-2 hours',
      level: 'Intermediate',
      price: 'Free',
      image: '/Images/Deloitte Data Analytics.png',
      link: 'https://www.theforage.com/simulations/deloitte-au/data-analytics-s5zy',
      skills: ['Data Analysis', 'Client Consulting', 'Business Intelligence', 'Data Visualization', 'Statistical Analysis', 'Problem Solving', 'Team Collaboration'],
      whatYoullLearn: [
        'Learn to work with real client data and deliver actionable insights',
        'Develop skills in data analysis and business intelligence',
        'Gain experience in client consulting and problem-solving',
        'Understand how to present findings to stakeholders effectively'
      ],
      whatYoullDo: [
        'Analyze client data to identify business opportunities and challenges',
        'Create data visualizations and reports for client presentations',
        'Collaborate with team members to deliver comprehensive solutions',
        'Present findings and recommendations to client stakeholders'
      ]
    },
    {
      id: 'tata-genai-data-analytics',
      title: 'GenAI Powered Data Analytics Certificate',
      provider: 'TATA',
      description: 'GenAI-Powered No-Code Analytics to Realize Business Objectives',
      rating: '42950+ 5 Star Reviews',
      duration: '3-4 hours',
      level: 'Intermediate',
      price: 'Free',
      image: '/Images/TATA Data Analytics.png',
      link: 'https://www.theforage.com/simulations/tata/data-analytics-t3zr',
      skills: ['Generative AI', 'Data Analytics', 'No-Code Platforms', 'Business Intelligence', 'Machine Learning', 'Prompt Engineering', 'Data Visualization'],
      whatYoullLearn: [
        'Explore the fundamentals of Generative AI in data analytics',
        'Learn to use no-code tools for data analysis and visualization',
        'Understand how to achieve business objectives with GenAI',
        'Develop skills in prompt engineering for data tasks'
      ],
      whatYoullDo: [
        'Build GenAI-powered analytics solutions using no-code platforms',
        'Create data visualizations and insights using AI assistance',
        'Implement business intelligence solutions with generative AI',
        'Develop automated data analysis workflows'
      ]
    },
        {
          id: 'google-analytics',
          title: 'Google Analytics Certificate',
          provider: 'Great Learning',
          description: 'Explore key metrics, such as page views and bounce rates, analyze user behavior and create custom reports and alerts for your business needs. Enroll in this free Google Analytics course to master the fundamentals of web analytics.',
          rating: '4.3L+ Learners',
          duration: '1.5 hours',
          level: 'Beginner',
          price: 'Free',
          image: '/Images/Great Learning Google Analytics.png',
          link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/google-analytics',
          skills: ['Google Analytics', 'Web Analytics', 'Data Analysis', 'Digital Marketing', 'Campaign Tracking', 'User Behavior Analysis', 'Custom Reports'],
          whatYoullLearn: [
            'Master the fundamentals of Google Analytics dashboard',
            'Learn to track key metrics like page views and bounce rates',
            'Understand user behavior analysis and demographic research',
            'Create custom reports and alerts for business needs'
          ],
          whatYoullDo: [
            'Set up Google Analytics account and configure data streams',
            'Analyze audience demographics and user interaction trends',
            'Monitor critical metrics and their implications for website success',
            'Build custom reports and alerts tailored to your business'
          ]
        },
        {
          id: 'great-learning-big-data-analytics',
          title: 'Big Data Analytics Certificate',
          provider: 'Great Learning',
          description: 'Learn big data from basics in this free online training. Big data course is taught hands-on by experts. Understand all about hadoop, hive, apache kafka, spark. Go from beginners level to advance in this big data course.',
          rating: '1.5L+ Learners',
          duration: '28.5 hours',
          level: 'Intermediate',
          price: 'Free',
          image: '/Images/Great Learning Big Data Anlaytics.png',
          link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/mastering-big-data-analytics',
          skills: ['Map Reduce', 'HDFS', 'YARN', 'Hive', 'Apache Hadoop', 'PySpark', 'Kafka', 'Spark Streaming'],
          whatYoullLearn: [
            'Master Hadoop framework and its different versions for distributed processing',
            'Learn Hive tool for SQL-like interface to query data across databases',
            'Understand Spark tool for streaming and analyzing large-scale data',
            'Work with Apache Kafka for distributed event streaming and high-performance pipelining',
            'Develop skills in PySpark and RDD concepts for data processing'
          ],
          whatYoullDo: [
            'Analyze NYC taxi trip data using Hive for exploratory data analysis',
            'Perform real-time sentiment analysis on Twitter data using PySpark',
            'Work with Hadoop ecosystem tools for big data processing',
            'Build distributed streaming applications with Apache Kafka',
            'Complete hands-on projects and assessments to evaluate your learning'
          ]
        },
        {
          id: 'citi-markets-quantitative-analysis',
          title: 'Markets Quantitative Analysis (MQA)',
          provider: 'Citi',
          description: 'Master financial markets with Citi\'s immersive Quantitative Analyst Experience',
          rating: '1250+ 5 Star Reviews',
          duration: '3-4 hours',
          level: 'Intermediate',
          price: 'Free',
          image: '/Images/Citi Markets Quantitative Analysis.png',
          link: 'https://www.theforage.com/simulations/citi/global-quantitative-analysis-analyst-6b4m',
          skills: ['Capital Markets', 'Financial Mathematics', 'Quantitative Analysis', 'Risk Management', 'Market Analysis', 'Financial Analysis', 'Critical Thinking', 'Communication Skills'],
          whatYoullLearn: [
            'Master financial markets with Citi\'s immersive Quantitative Analyst Experience',
            'Learn key skills in financial risk management and securities structuring',
            'Develop quantitative analysis techniques for real-world financial scenarios',
            'Gain experience in market research and financial mathematics',
            'Understand portfolio development and risk management strategies'
          ],
          whatYoullDo: [
            'Complete tasks as a quantitative analyst intern at Citi\'s Markets division',
            'Review financial math fundamentals and apply them to real scenarios',
            'Work on pricing commodities and hedging securities',
            'Assist in risk management and portfolio analysis',
            'Collaborate with seasoned professionals and learn from experienced mentors'
          ]
        },
        {
          id: 'cisco-data-analytics-essentials',
          title: 'Data Analytics Essentials',
          provider: 'Cisco',
          description: 'Organizations all over the world recognize the value of analytics. Learn the essential tools of the trade.',
          rating: '493,809 already enrolled',
          duration: 'Self-Paced',
          level: 'Beginner',
          price: 'Free',
          image: '/Images/Cisco Data Analytics Essential.png',
          link: 'https://www.netacad.com/courses/data-analytics-essentials?courseLang=en-US',
          skills: ['Data Analytics', 'Data Visualization', 'Statistical Analysis', 'Data Interpretation', 'Business Intelligence', 'Data Tools', 'Analytics Fundamentals', 'Data-Driven Decision Making'],
          whatYoullLearn: [
            'Understand the fundamental concepts of data analytics and its value to organizations',
            'Learn essential tools and techniques used in data analysis',
            'Master data visualization and interpretation skills',
            'Develop statistical analysis capabilities for business insights',
            'Gain proficiency in data-driven decision making processes'
          ],
          whatYoullDo: [
            'Complete self-paced online modules covering analytics fundamentals',
            'Work with real-world datasets to practice analytical techniques',
            'Create data visualizations and interpret results effectively',
            'Apply statistical methods to solve business problems',
            'Build a portfolio of analytics projects to showcase your skills'
          ]
        }
  ];

  const certificate = certificates.find(cert => cert.id === certificateId);

  if (!certificate) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Certificate Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/free-certificates')}>
            Back to Certificates
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const handleGetCertificate = () => {
    window.open(certificate.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button and Get Certificate Button */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <NeumorphicButton
              onClick={() => navigate('/news/free-certificates')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </NeumorphicButton>
            
            <NeumorphicButton
              variant="accent"
              onClick={handleGetCertificate}
              className="flex items-center gap-2"
              icon={ExternalLink}
            >
              Get Certificate
            </NeumorphicButton>
          </div>
        </div>

        {/* Certificate Image */}
        <NeumorphicCard className="p-0 mb-6 overflow-hidden">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-96 object-contain"
          />
        </NeumorphicCard>

        {/* Certificate Header */}
        <NeumorphicCard className="p-8 mb-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">{certificate.title}</h1>
            <p className="text-orange-400 text-xl font-medium">{certificate.provider}</p>
          </div>

          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            {certificate.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-300">{certificate.rating}</span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>{certificate.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <span>{certificate.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">{certificate.price}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-100 mb-3">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </NeumorphicCard>

        {/* What You'll Learn */}
        <NeumorphicCard className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">What You'll Learn</h2>
          <div className="space-y-4">
            {certificate.whatYoullLearn.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </NeumorphicCard>

        {/* What You'll Do */}
        <NeumorphicCard className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">What You'll Do</h2>
          <div className="space-y-4">
            {certificate.whatYoullDo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                <p className="text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </NeumorphicCard>

        {/* Get Certificate Button */}
        <div className="text-center">
          <NeumorphicButton
            variant="accent"
            size="lg"
            onClick={handleGetCertificate}
            icon={ExternalLink}
            className="px-8 py-4 text-lg"
          >
            Get Certificate
          </NeumorphicButton>
        </div>
      </div>
    </div>
  );
};

export default memo(CertificateDetails);
