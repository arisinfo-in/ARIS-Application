import React, { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const FreeCertificates: React.FC = () => {
  const navigate = useNavigate();
  
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
      image: '/Cerificate Logos/Quntium Logo.png',
      link: 'https://www.theforage.com/simulations/quantium/data-analytics-rqkb',
      skills: ['Data Validation', 'Data Visualization', 'Data Cleaning', 'Programming', 'Data Analysis', 'Commercial Thinking', 'Statistical Analysis']
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
      image: '/Cerificate Logos/Deloitte.png',
      link: 'https://www.theforage.com/simulations/deloitte-au/data-analytics-s5zy',
      skills: ['Data Analysis', 'Client Consulting', 'Business Intelligence', 'Data Visualization', 'Statistical Analysis', 'Problem Solving', 'Team Collaboration']
    },
    {
      id: 'tata-genai-data-analytics',
      title: 'GenAI Powered Data Analytics',
      provider: 'TATA',
      description: 'GenAI-Powered No-Code Analytics to Realize Business Objectives',
      rating: '42950+ 5 Star Reviews',
      duration: '3-4 hours',
      level: 'Intermediate',
      price: 'Free',
      image: '/Cerificate Logos/TATA Logo.png',
      link: 'https://www.theforage.com/simulations/tata/data-analytics-t3zr',
      skills: ['Generative AI', 'Data Analytics', 'No-Code Platforms', 'Business Intelligence', 'Machine Learning', 'Prompt Engineering', 'Data Visualization']
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
      image: '/Cerificate Logos/Google Logo.png',
      link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/google-analytics',
      skills: ['Google Analytics', 'Web Analytics', 'Data Analysis', 'Digital Marketing', 'Campaign Tracking', 'User Behavior Analysis', 'Custom Reports']
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
      image: '/Cerificate Logos/Great Learning.png',
      link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/mastering-big-data-analytics',
      skills: ['Map Reduce', 'HDFS', 'YARN', 'Hive', 'Apache Hadoop', 'PySpark', 'Kafka', 'Spark Streaming']
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
      image: '/Cerificate Logos/Citi Logo.png',
      link: 'https://www.theforage.com/simulations/citi/global-quantitative-analysis-analyst-6b4m',
      skills: ['Capital Markets', 'Financial Mathematics', 'Quantitative Analysis', 'Risk Management', 'Market Analysis', 'Financial Analysis', 'Critical Thinking', 'Communication Skills']
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
      image: '/Cerificate Logos/Cisco Logo.png',
      link: 'https://www.netacad.com/courses/data-analytics-essentials?courseLang=en-US',
      skills: ['Data Analytics', 'Data Visualization', 'Statistical Analysis', 'Data Interpretation', 'Business Intelligence', 'Data Tools', 'Analytics Fundamentals', 'Data-Driven Decision Making']
    }
  ];

  const handleCertificateClick = (certificateId: string) => {
    navigate(`/news/free-certificates/${certificateId}`);
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
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Free Certificates</h1>
            <p className="text-gray-200">Access free data analytics & AI certificates from top providers</p>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <NeumorphicCard 
            key={certificate.id} 
            hoverable 
            padding="lg" 
            className="cursor-pointer transition-all hover:scale-105 text-center w-80 h-64 mx-auto flex flex-col justify-between"
            onClick={() => handleCertificateClick(certificate.id)}
          >
            {/* Certificate Logo */}
            <div className="mb-4 flex justify-center">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-32 h-32 object-contain rounded-xl"
              />
            </div>

            {/* Certificate Name Only */}
            <div className="flex-1 flex items-center justify-center">
              <h3 className="text-lg font-bold text-gray-100 mb-2">{certificate.title}</h3>
            </div>
          </NeumorphicCard>
        ))}
      </div>

      {/* Coming Soon Message */}
      <div className="mt-12 text-center">
        <NeumorphicCard padding="lg" className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-100 mb-2">More Certificates Coming Soon!</h3>
          <p className="text-gray-200">
            We're constantly adding new free certificates from top providers. 
            Check back regularly for the latest opportunities to enhance your skills.
          </p>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(FreeCertificates);
