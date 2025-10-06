import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Heart, ShoppingCart, Car, GraduationCap, Shield, Plane, Gamepad2, Home, Briefcase, Target, TrendingUp } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const IndustryGuides: React.FC = () => {
  const navigate = useNavigate();

  const industryGuides = [
    {
      id: 'healthcare',
      name: 'Healthcare & Pharma',
      icon: Heart,
      color: 'from-orange-400 to-orange-500',
      description: 'Medical data analysis, patient outcomes, drug research',
      keySkills: ['SQL', 'Python', 'R', 'SAS', 'Healthcare Analytics', 'Clinical Data'],
      salaryRange: '4-12 LPA',
      companies: ['Apollo Hospitals', 'Fortis Healthcare', 'Dr. Reddy\'s', 'Sun Pharma']
    },
    {
      id: 'finance',
      name: 'Banking & Finance',
      icon: Building2,
      color: 'from-orange-400 to-orange-500',
      description: 'Risk analysis, fraud detection, investment insights',
      keySkills: ['SQL', 'Python', 'R', 'SAS', 'Risk Analytics', 'Financial Modeling'],
      salaryRange: '5-15 LPA',
      companies: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Kotak Mahindra']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce & Retail',
      icon: ShoppingCart,
      color: 'from-orange-400 to-orange-500',
      description: 'Customer analytics, supply chain, recommendation systems',
      keySkills: ['SQL', 'Python', 'R', 'Machine Learning', 'Customer Analytics', 'A/B Testing'],
      salaryRange: '4-10 LPA',
      companies: ['Flipkart', 'Amazon', 'Myntra', 'Nykaa','Ajio','Reliance Retail']
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      color: 'from-orange-400 to-orange-500',
      description: 'Vehicle data, manufacturing analytics, connected cars',
      keySkills: ['SQL', 'Python', 'IoT Analytics', 'Predictive Maintenance'],
      salaryRange: '4-9 LPA',
      companies: ['Tata Motors', 'Maruti Suzuki', 'Mahindra']
    },
    {
      id: 'education',
      name: 'EdTech & Education',
      icon: GraduationCap,
      color: 'from-orange-400 to-orange-500',
      description: 'Learning analytics, student performance, course optimization',
      keySkills: ['SQL', 'Python', 'R', 'Learning Analytics', 'Educational Data Mining'],
      salaryRange: '3-8 LPA',
      companies: ['Byju\'s', 'Unacademy', 'Vedantu', 'Toppr']
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: Shield,
      color: 'from-orange-400 to-orange-500',
      description: 'Claims analysis, risk assessment, fraud detection',
      keySkills: ['SQL', 'Python', 'R', 'Actuarial Science', 'Risk Analytics'],
      salaryRange: '4-11 LPA',
      companies: ['LIC', 'HDFC Life', 'ICICI Prudential', 'SBI Life']
    },
    {
      id: 'aviation',
      name: 'Aviation & Travel',
      icon: Plane,
      color: 'from-orange-400 to-orange-500',
      description: 'Flight data, passenger analytics, route optimization',
      keySkills: ['SQL', 'Python', 'R', 'Operations Research', 'Demand Forecasting'],
      salaryRange: '4-10 LPA',
      companies: ['IndiGo', 'SpiceJet', 'Air India', 'Vistara']
    },
    {
      id: 'gaming',
      name: 'Gaming & Entertainment',
      icon: Gamepad2,
      color: 'from-orange-400 to-orange-500',
      description: 'Player analytics, game optimization, user engagement',
      keySkills: ['SQL', 'Python', 'R', 'Game Analytics', 'User Behavior Analysis'],
      salaryRange: '3-8 LPA',
      companies: ['Zynga', 'Nazara', '99Games','Bharat Games']
    },
    {
      id: 'realestate',
      name: 'Real Estate',
      icon: Home,
      color: 'from-orange-400 to-orange-500',
      description: 'Property analytics, market trends, investment insights',
      keySkills: ['SQL', 'Python', 'R', 'Geospatial Analytics', 'Market Analysis'],
      salaryRange: '3-7 LPA',
      companies: ['DLF', 'Godrej Properties', 'Prestige', 'Brigade']
    }
  ];

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
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Industry-Specific Guides</h1>
            <p className="text-gray-200">How to break into different industries as a data analyst</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Building2 className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">9</h3>
              <p className="text-secondary-contrast text-xs">Industries</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <Target className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">50+</h3>
              <p className="text-secondary-contrast text-xs">Companies</p>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-gradient rounded-lg orange-glow flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-gray-100" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-high-contrast">3-15 LPA</h3>
              <p className="text-secondary-contrast text-xs">Salary Range</p>
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Industry Guides */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {industryGuides.map((industry) => {
          const IconComponent = industry.icon;
          return (
            <NeumorphicCard key={industry.id} padding="lg" hoverable className="h-full">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">{industry.name}</h3>
                <p className="text-gray-200 text-sm mb-4">{industry.description}</p>
                <div className="bg-gray-800 rounded-lg p-3 mb-4">
                  <p className="text-orange-400 font-semibold text-sm">Salary Range: {industry.salaryRange}</p>
                </div>
              </div>

              <div className="space-y-4">

                <div>
                  <h4 className="font-semibold text-gray-100 mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-400" />
                    Top Companies
                  </h4>
                  <div className="text-sm text-gray-200">
                    {industry.companies.join(' • ')}
                  </div>
                </div>

              </div>

              <div className="mt-6">
                <NeumorphicButton
                  variant="accent"
                  className="w-full"
                  onClick={() => navigate(`/news/job-kit/industry-guides/${industry.id}`)}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  View Detailed Guide
                </NeumorphicButton>
              </div>
            </NeumorphicCard>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="mt-12">
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Ready to Choose Your Industry?</h3>
          <p className="text-gray-200 mb-6">
            Each industry has unique requirements and opportunities. Pick the one that aligns with your interests and start building relevant skills today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/news/job-kit/resume-templates')}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Build Your Resume
            </NeumorphicButton>
            <NeumorphicButton
              variant="secondary"
              onClick={() => navigate('/news/job-kit/interview-preparation')}
            >
              <Target className="w-4 h-4 mr-2" />
              Prepare for Interviews
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(IndustryGuides);
