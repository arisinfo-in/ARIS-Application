import React, { memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, Heart, ShoppingCart, Car, GraduationCap, Shield, Plane, Gamepad2, Home, Briefcase, Target, TrendingUp, Clock, User, Calendar, Tag } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { format } from 'date-fns';

const IndustryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { industryId } = useParams<{ industryId: string }>();

  const industryDetails = {
    healthcare: {
      name: 'Healthcare & Pharma',
      icon: Heart,
      color: 'from-orange-400 to-orange-500',
      description: 'Medical data analysis, patient outcomes, drug research',
      keySkills: ['SQL', 'Python', 'R', 'SAS', 'Healthcare Analytics', 'Clinical Data'],
      salaryRange: '4-12 LPA',
      companies: ['Apollo Hospitals', 'Fortis Healthcare', 'Dr. Reddy\'s', 'Sun Pharma'],
      author: 'Dr. Sarah Chen',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: 12,
      category: 'Healthcare Analytics',
      tags: ['Healthcare', 'Data Analysis', 'Medical Data', 'Clinical Research', 'HIPAA', 'EHR'],
      content: `# Breaking into Healthcare & Pharma as a Data Analyst

The healthcare industry is experiencing a digital transformation, creating unprecedented opportunities for data analysts. With the increasing digitization of medical records and the growing need for evidence-based healthcare decisions, this sector offers both meaningful work and excellent career prospects.

## Industry Overview

Healthcare analytics involves analyzing medical data to improve patient outcomes, reduce costs, and enhance operational efficiency. The industry is rapidly growing with increasing digitization of medical records and the need for evidence-based healthcare decisions.

Key focus areas include:
- Clinical research and drug development
- Patient care optimization
- Healthcare operations and efficiency
- Population health management

Data analysts in healthcare work with Electronic Health Records (EHR), medical imaging data, clinical trial data, and patient monitoring systems.

## Required Skills & Tools

To succeed in healthcare analytics, you'll need a combination of technical and domain-specific skills:

**Technical Skills:**
- SQL for querying medical databases and patient records
- Python/R for statistical analysis and machine learning in clinical research
- SAS for regulatory compliance and clinical trial analysis
- Healthcare-specific tools like Epic, Cerner, or Allscripts

**Domain Knowledge:**
- Understanding of medical terminology and coding systems (ICD-10, CPT)
- Knowledge of healthcare regulations (HIPAA, FDA guidelines)
- Experience with clinical data standards (HL7, FHIR)

## Getting Started Steps

**1. Learn Healthcare Data Privacy and Security**
- Understand HIPAA compliance requirements
- Learn about data anonymization techniques
- Study healthcare data governance frameworks

**2. Build Domain Knowledge**
- Understand medical terminology and common healthcare metrics
- Learn about healthcare workflows and processes
- Study clinical research methodologies

**3. Practice with Real Data**
- Work with publicly available healthcare datasets (MIMIC, UCI ML Repository)
- Build projects analyzing patient outcomes or hospital operations
- Get familiar with Electronic Health Record (EHR) systems

**4. Get Certified**
- Consider healthcare analytics certifications (CHDA, CPHIMS)
- Network with healthcare professionals and attend medical conferences
- Join healthcare analytics communities and professional associations

## Job Search Strategy

**Target Companies:**
- Healthcare companies, hospitals, and pharmaceutical firms
- Health tech startups and digital health companies
- Government health agencies and research institutions

**Key Roles to Look For:**
- Clinical Data Analyst
- Healthcare Data Scientist
- Medical Informatics Analyst
- Population Health Analyst

**Application Tips:**
- Emphasize your understanding of healthcare regulations
- Build a portfolio with healthcare-specific projects and case studies
- Consider internships or volunteer work in healthcare settings
- Highlight any healthcare-related experience or education

## Career Growth Path

**Entry Level (0-2 years):** Clinical Data Analyst
- Analyze patient data and clinical outcomes
- Support clinical research and quality improvement initiatives
- Learn healthcare systems and regulations

**Mid Level (2-5 years):** Senior Healthcare Analyst
- Lead analytics projects and mentor junior analysts
- Work on complex healthcare problems and research studies
- Collaborate with clinical teams and stakeholders

**Senior Level (5+ years):** Healthcare Data Scientist
- Develop advanced analytics solutions and predictive models
- Lead strategic initiatives and drive innovation
- Influence healthcare policy and decision-making

**Leadership (8+ years):** Director of Healthcare Analytics
- Oversee analytics teams and strategic initiatives
- Drive organizational change and digital transformation
- Shape healthcare analytics strategy and vision

**Specializations:**
- Clinical Research Analytics
- Population Health Analytics
- Medical Informatics
- Healthcare Operations Analytics

**Advanced Roles:**
- Chief Medical Information Officer (CMIO)
- Chief Data Officer (CDO)
- Healthcare Analytics Consultant

## Salary Expectations

- **Entry Level:** 4-6 LPA
- **Mid Level:** 6-9 LPA
- **Senior Level:** 9-12 LPA
- **Leadership:** 12+ LPA

## Top Companies Hiring

- Apollo Hospitals
- Fortis Healthcare
- Dr. Reddy's Laboratories
- Sun Pharmaceutical Industries
- AIIMS (All India Institute of Medical Sciences)
- Max Healthcare
- Manipal Hospitals

## Final Thoughts

The healthcare industry offers data analysts the opportunity to make a real difference in people's lives while building a rewarding career. With the right combination of technical skills, domain knowledge, and passion for healthcare, you can build a successful career in this growing field.

**Ready to start your healthcare analytics journey?** Focus on building the right skills, gaining relevant experience, and networking with healthcare professionals. The opportunities are vast and the impact you can make is truly meaningful.`
    },
    finance: {
      name: 'Banking & Finance',
      icon: Building2,
      color: 'from-orange-400 to-orange-500',
      description: 'Risk analysis, fraud detection, investment insights',
      keySkills: ['SQL', 'Python', 'R', 'SAS', 'Risk Analytics', 'Financial Modeling'],
      salaryRange: '5-15 LPA',
      companies: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Kotak Mahindra'],
      author: 'Rajesh Kumar',
      publishedAt: '2024-01-20T10:00:00Z',
      readTime: 14,
      category: 'Financial Analytics',
      tags: ['Finance', 'Banking', 'Risk Analysis', 'Fraud Detection', 'Investment', 'Regulatory'],
      content: `# Breaking into Banking & Finance as a Data Analyst

The financial services industry is at the forefront of data analytics adoption, offering lucrative opportunities for data analysts who understand both quantitative methods and financial markets. With increasing regulatory requirements and the rise of fintech, this sector provides excellent career growth potential.

## Industry Overview

Financial analytics focuses on risk management, fraud detection, investment analysis, and regulatory compliance. Banks and financial institutions rely heavily on data analytics for credit scoring, market analysis, and operational efficiency.

Key focus areas include:
- Credit risk modeling and assessment
- Fraud detection and prevention
- Algorithmic trading and market analysis
- Customer analytics and personalization
- Regulatory reporting and compliance

Data analysts in finance work with transaction data, market data, customer behavior data, and regulatory datasets.

## Required Skills & Tools

**Technical Skills:**
- SQL for querying financial databases and transaction records
- Python/R for statistical modeling and risk analysis
- SAS for regulatory reporting and compliance analytics
- Financial modeling tools (Excel, VBA, or specialized software)

**Domain Knowledge:**
- Understanding of financial markets and instruments
- Knowledge of banking regulations (RBI, Basel III)
- Experience with risk management frameworks and methodologies
- Understanding of financial products and services

## Getting Started Steps

**1. Learn Financial Fundamentals**
- Study financial markets, instruments, and regulatory frameworks
- Understand risk management concepts and credit scoring models
- Learn about different financial products and services

**2. Build Technical Skills**
- Practice with financial datasets and market data
- Build projects on credit risk prediction or fraud detection
- Get familiar with banking systems and transaction processing

**3. Get Certified**
- Consider financial analytics certifications (FRM, CFA)
- Network with finance professionals and attend industry events
- Join finance analytics communities and professional groups

## Job Search Strategy

**Target Companies:**
- Banks and financial institutions
- Investment firms and asset management companies
- Insurance companies and fintech startups
- Regulatory bodies and consulting firms

**Key Roles to Look For:**
- Risk Analyst
- Credit Analyst
- Financial Data Scientist
- Quantitative Analyst
- Compliance Analyst

**Application Tips:**
- Emphasize your quantitative skills and risk management knowledge
- Build a portfolio with financial modeling and risk analysis projects
- Consider internships in banking or investment firms
- Highlight any finance-related education or experience

## Career Growth Path

**Entry Level (0-2 years):** Credit Analyst
- Analyze credit applications and assess risk
- Support loan approval processes
- Learn banking systems and regulations

**Mid Level (2-5 years):** Risk Analyst
- Develop risk models and frameworks
- Monitor portfolio performance and risk metrics
- Lead risk assessment projects

**Senior Level (5+ years):** Senior Risk Manager
- Oversee risk management strategies
- Lead complex risk modeling initiatives
- Mentor junior analysts and drive innovation

**Leadership (8+ years):** Director of Risk Management
- Set risk management policies and strategies
- Lead enterprise-wide risk initiatives
- Influence regulatory compliance and reporting

**Specializations:**
- Credit Risk Analytics
- Market Risk Management
- Operational Risk Analysis
- Regulatory Compliance

**Advanced Roles:**
- Chief Risk Officer (CRO)
- Quantitative Analyst (Quant)
- Financial Modeler
- Risk Management Consultant

## Salary Expectations

- **Entry Level:** 5-7 LPA
- **Mid Level:** 7-10 LPA
- **Senior Level:** 10-15 LPA
- **Leadership:** 15+ LPA

## Top Companies Hiring

- HDFC Bank
- ICICI Bank
- State Bank of India
- Kotak Mahindra Bank
- Axis Bank
- Bajaj Finserv
- Paytm
- PhonePe

## Final Thoughts

The banking and finance industry offers data analysts the opportunity to work with complex financial data while building expertise in risk management and regulatory compliance. With the right combination of technical skills and financial knowledge, you can build a successful and rewarding career in this dynamic field.

**Ready to start your finance analytics journey?** Focus on building strong quantitative skills, understanding financial markets, and gaining relevant certifications. The opportunities are vast and the compensation is highly competitive.`
    },
    ecommerce: {
      name: 'E-commerce & Retail',
      icon: ShoppingCart,
      color: 'from-orange-400 to-orange-500',
      description: 'Customer analytics, supply chain, recommendation systems',
      keySkills: ['SQL', 'Python', 'R', 'Machine Learning', 'Customer Analytics', 'A/B Testing'],
      salaryRange: '4-10 LPA',
      companies: ['Flipkart', 'Amazon', 'Myntra', 'Nykaa','Ajio','Reliance Retail'],
      author: 'Priya Sharma',
      publishedAt: '2024-01-25T10:00:00Z',
      readTime: 11,
      category: 'E-commerce Analytics',
      tags: ['E-commerce', 'Retail', 'Customer Analytics', 'Recommendation Systems', 'A/B Testing', 'Conversion'],
      content: `# Breaking into E-commerce & Retail as a Data Analyst

The e-commerce and retail industry is experiencing explosive growth, creating massive opportunities for data analysts who understand customer behavior, supply chain optimization, and digital marketing. With the rise of online shopping and omnichannel retail, this sector offers dynamic and rewarding career paths.

## Industry Overview

E-commerce analytics focuses on customer behavior, supply chain optimization, and recommendation systems. Retail companies use data analytics to understand customer preferences, optimize pricing, and improve operations.

Key focus areas include:
- Customer segmentation and personalization
- Product recommendation systems
- Inventory management and demand forecasting
- Marketing analytics and campaign optimization
- Supply chain and logistics optimization

Data analysts in e-commerce work with customer data, product data, transaction data, and web analytics.

## Required Skills & Tools

**Technical Skills:**
- SQL for querying customer and product databases
- Python/R for machine learning and statistical analysis
- Web analytics tools (Google Analytics, Adobe Analytics)
- A/B testing frameworks and experimentation platforms

**Domain Knowledge:**
- Understanding of customer lifecycle and retention metrics
- Knowledge of recommendation algorithms and personalization
- Experience with e-commerce platforms and APIs
- Understanding of digital marketing and conversion optimization

## Getting Started Steps

**1. Learn Customer Analytics**
- Study customer behavior analysis techniques
- Understand recommendation systems and personalization strategies
- Learn about customer segmentation and targeting

**2. Build Technical Skills**
- Practice with e-commerce datasets and customer behavior data
- Build projects on customer segmentation or product recommendation
- Get familiar with web analytics and conversion optimization

**3. Get Industry Experience**
- Consider e-commerce analytics certifications or courses
- Network with retail professionals and attend industry conferences
- Join e-commerce analytics communities and professional groups

## Job Search Strategy

**Target Companies:**
- E-commerce companies and marketplace platforms
- Retail chains and omnichannel retailers
- Digital marketing agencies and consultancies
- Supply chain and logistics companies

**Key Roles to Look For:**
- Customer Analytics Manager
- Product Analyst
- E-commerce Data Scientist
- Marketing Analytics Specialist
- Supply Chain Analyst

**Application Tips:**
- Emphasize your understanding of customer behavior and conversion optimization
- Build a portfolio with e-commerce and customer analytics projects
- Consider internships in retail or e-commerce companies
- Highlight any experience with A/B testing and experimentation

## Career Growth Path

**Entry Level (0-2 years):** E-commerce Analyst
- Analyze customer behavior and purchase patterns
- Support marketing campaigns and product recommendations
- Learn e-commerce platforms and analytics tools

**Mid Level (2-5 years):** Customer Analytics Manager
- Lead customer segmentation and personalization initiatives
- Develop recommendation systems and targeting strategies
- Manage A/B testing and experimentation programs

**Senior Level (5+ years):** Senior Product Analyst
- Oversee analytics strategy and advanced modeling
- Lead cross-functional teams and strategic initiatives
- Drive innovation in customer experience and personalization

**Leadership (8+ years):** Director of Analytics
- Set analytics strategy and vision for the organization
- Lead enterprise-wide analytics initiatives
- Influence business strategy and decision-making

**Specializations:**
- Customer Analytics and Personalization
- Supply Chain and Operations Analytics
- Marketing Analytics and Attribution
- Product Analytics and User Experience

**Advanced Roles:**
- Chief Data Officer (CDO)
- VP of Analytics
- E-commerce Analytics Consultant
- Head of Customer Intelligence

## Salary Expectations

- **Entry Level:** 4-6 LPA
- **Mid Level:** 6-8 LPA
- **Senior Level:** 8-10 LPA
- **Leadership:** 10+ LPA

## Top Companies Hiring

- Flipkart
- Amazon India
- Myntra
- Nykaa
- Ajio
- Reliance Retail
- BigBasket
- Grofers

## Final Thoughts

The e-commerce and retail industry offers data analysts the opportunity to work with diverse datasets while driving business growth through data-driven insights. With the right combination of technical skills and business acumen, you can build a successful career in this fast-paced and innovative field.

**Ready to start your e-commerce analytics journey?** Focus on understanding customer behavior, mastering recommendation systems, and building strong analytical skills. The opportunities are vast and the impact you can make is directly measurable through business metrics.`
    },
    automotive: {
      name: 'Automotive',
      icon: Car,
      color: 'from-orange-400 to-orange-500',
      description: 'Vehicle data, manufacturing analytics, connected cars',
      keySkills: ['SQL', 'Python', 'IoT Analytics', 'Predictive Maintenance'],
      salaryRange: '4-9 LPA',
      companies: ['Tata Motors', 'Maruti Suzuki', 'Mahindra'],
      author: 'Amit Patel',
      publishedAt: '2024-01-30T10:00:00Z',
      readTime: 10,
      category: 'Automotive Analytics',
      tags: ['Automotive', 'Manufacturing', 'IoT', 'Predictive Maintenance', 'Connected Cars', 'Supply Chain'],
      content: `# Breaking into Automotive as a Data Analyst

The automotive industry is undergoing a digital transformation with connected cars, autonomous vehicles, and smart manufacturing creating new opportunities for data analysts. This sector combines traditional manufacturing with cutting-edge technology.

## Industry Overview

Automotive analytics focuses on vehicle data, manufacturing optimization, and connected car technologies. Companies use data analytics to improve production efficiency, predict maintenance needs, and enhance vehicle performance.

Key focus areas include:
- Manufacturing process optimization
- Predictive maintenance and quality control
- Connected car data analysis
- Supply chain optimization
- Customer behavior and preferences

## Required Skills & Tools

**Technical Skills:**
- SQL for querying manufacturing and vehicle databases
- Python for IoT data analysis and machine learning
- IoT analytics platforms and tools
- Statistical modeling and predictive analytics

**Domain Knowledge:**
- Understanding of manufacturing processes
- Knowledge of automotive systems and components
- Experience with IoT and sensor data
- Understanding of quality control and Six Sigma

## Getting Started Steps

**1. Learn Manufacturing Analytics**
- Study manufacturing processes and quality control
- Understand IoT data and sensor analytics
- Learn about predictive maintenance techniques

**2. Build Technical Skills**
- Practice with manufacturing and IoT datasets
- Build projects on predictive maintenance or quality control
- Get familiar with automotive industry standards

**3. Get Industry Experience**
- Consider automotive analytics certifications
- Network with manufacturing professionals
- Join automotive analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Manufacturing Analyst
**Mid Level (2-5 years):** Senior Manufacturing Analyst
**Senior Level (5+ years):** Automotive Data Scientist
**Leadership (8+ years):** Director of Manufacturing Analytics

## Salary Expectations

- **Entry Level:** 4-6 LPA
- **Mid Level:** 6-8 LPA
- **Senior Level:** 8-9 LPA
- **Leadership:** 9+ LPA

## Top Companies Hiring

- Tata Motors
- Maruti Suzuki
- Mahindra & Mahindra
- Hyundai India
- Bosch
- Continental

## Final Thoughts

The automotive industry offers data analysts the opportunity to work with cutting-edge technology while contributing to the future of transportation. With the right skills and passion for innovation, you can build a rewarding career in this evolving field.`
    },
    education: {
      name: 'EdTech & Education',
      icon: GraduationCap,
      color: 'from-orange-400 to-orange-500',
      description: 'Learning analytics, student performance, course optimization',
      keySkills: ['SQL', 'Python', 'R', 'Learning Analytics', 'Educational Data Mining'],
      salaryRange: '3-8 LPA',
      companies: ['Byju\'s', 'Unacademy', 'Vedantu', 'Toppr'],
      author: 'Dr. Anjali Singh',
      publishedAt: '2024-02-01T10:00:00Z',
      readTime: 9,
      category: 'Education Analytics',
      tags: ['EdTech', 'Education', 'Learning Analytics', 'Student Performance', 'E-learning', 'Assessment'],
      content: `# Breaking into EdTech & Education as a Data Analyst

The education technology sector is revolutionizing how we learn and teach, creating exciting opportunities for data analysts who want to make a difference in education. With the rise of online learning and personalized education, this field offers meaningful work and growth potential.

## Industry Overview

Education analytics focuses on learning outcomes, student performance, and course optimization. EdTech companies use data analytics to personalize learning experiences, improve student engagement, and optimize educational content.

Key focus areas include:
- Student performance and learning outcomes
- Course effectiveness and content optimization
- Personalized learning and adaptive systems
- Student engagement and retention
- Assessment and evaluation analytics

## Required Skills & Tools

**Technical Skills:**
- SQL for querying educational databases
- Python/R for learning analytics and educational data mining
- Statistical analysis and educational research methods
- Data visualization and reporting tools

**Domain Knowledge:**
- Understanding of educational psychology and learning theories
- Knowledge of assessment and evaluation methods
- Experience with learning management systems
- Understanding of educational standards and regulations

## Getting Started Steps

**1. Learn Education Analytics**
- Study educational psychology and learning theories
- Understand assessment and evaluation methods
- Learn about learning management systems

**2. Build Technical Skills**
- Practice with educational datasets and student performance data
- Build projects on student performance prediction or course optimization
- Get familiar with educational technology platforms

**3. Get Industry Experience**
- Consider education analytics certifications
- Network with educators and EdTech professionals
- Join education analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Education Analyst
**Mid Level (2-5 years):** Learning Analytics Manager
**Senior Level (5+ years):** Senior Education Data Scientist
**Leadership (8+ years):** Director of Learning Analytics

## Salary Expectations

- **Entry Level:** 3-5 LPA
- **Mid Level:** 5-6 LPA
- **Senior Level:** 6-8 LPA
- **Leadership:** 8+ LPA

## Top Companies Hiring

- Byju's
- Unacademy
- Vedantu
- Toppr
- Coursera
- UpGrad

## Final Thoughts

The education technology sector offers data analysts the opportunity to contribute to the future of learning while building a rewarding career. With the right combination of technical skills and passion for education, you can make a meaningful impact on students' lives.`
    },
    insurance: {
      name: 'Insurance',
      icon: Shield,
      color: 'from-orange-400 to-orange-500',
      description: 'Claims analysis, risk assessment, fraud detection',
      keySkills: ['SQL', 'Python', 'R', 'Actuarial Science', 'Risk Analytics'],
      salaryRange: '4-11 LPA',
      companies: ['LIC', 'HDFC Life', 'ICICI Prudential', 'SBI Life'],
      author: 'Ravi Kumar',
      publishedAt: '2024-02-05T10:00:00Z',
      readTime: 12,
      category: 'Insurance Analytics',
      tags: ['Insurance', 'Risk Analysis', 'Actuarial Science', 'Fraud Detection', 'Claims', 'Underwriting'],
      content: `# Breaking into Insurance as a Data Analyst

The insurance industry is increasingly data-driven, offering excellent opportunities for data analysts who understand risk assessment, fraud detection, and actuarial science. With growing digitalization and regulatory requirements, this sector provides stable and rewarding career paths.

## Industry Overview

Insurance analytics focuses on risk assessment, claims analysis, and fraud detection. Insurance companies use data analytics to price policies, assess risks, and prevent fraud while ensuring regulatory compliance.

Key focus areas include:
- Risk modeling and pricing
- Claims analysis and fraud detection
- Customer segmentation and retention
- Regulatory compliance and reporting
- Underwriting and policy optimization

## Required Skills & Tools

**Technical Skills:**
- SQL for querying insurance databases
- Python/R for statistical modeling and risk analysis
- Actuarial science and risk management tools
- Statistical modeling and predictive analytics

**Domain Knowledge:**
- Understanding of insurance products and policies
- Knowledge of actuarial science and risk management
- Experience with regulatory compliance
- Understanding of underwriting and claims processes

## Getting Started Steps

**1. Learn Insurance Fundamentals**
- Study insurance products and risk management
- Understand actuarial science and statistical modeling
- Learn about regulatory compliance and reporting

**2. Build Technical Skills**
- Practice with insurance datasets and claims data
- Build projects on risk modeling or fraud detection
- Get familiar with actuarial tools and software

**3. Get Industry Experience**
- Consider actuarial science or insurance analytics certifications
- Network with insurance professionals
- Join insurance analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Insurance Analyst
**Mid Level (2-5 years):** Risk Analyst
**Senior Level (5+ years):** Senior Actuarial Analyst
**Leadership (8+ years):** Chief Risk Officer

## Salary Expectations

- **Entry Level:** 4-6 LPA
- **Mid Level:** 6-8 LPA
- **Senior Level:** 8-11 LPA
- **Leadership:** 11+ LPA

## Top Companies Hiring

- LIC
- HDFC Life Insurance
- ICICI Prudential Life
- SBI Life Insurance
- Bajaj Allianz
- Max Life Insurance

## Final Thoughts

The insurance industry offers data analysts the opportunity to work with complex risk models while building expertise in actuarial science and regulatory compliance. With the right combination of technical skills and domain knowledge, you can build a successful career in this stable and growing field.`
    },
    aviation: {
      name: 'Aviation & Travel',
      icon: Plane,
      color: 'from-orange-400 to-orange-500',
      description: 'Flight data, passenger analytics, route optimization',
      keySkills: ['SQL', 'Python', 'R', 'Operations Research', 'Demand Forecasting'],
      salaryRange: '4-10 LPA',
      companies: ['IndiGo', 'SpiceJet', 'Air India', 'Vistara'],
      author: 'Captain Rajesh',
      publishedAt: '2024-02-10T10:00:00Z',
      readTime: 10,
      category: 'Aviation Analytics',
      tags: ['Aviation', 'Travel', 'Operations Research', 'Demand Forecasting', 'Route Optimization', 'Passenger Analytics'],
      content: `# Breaking into Aviation & Travel as a Data Analyst

The aviation and travel industry is highly data-driven, offering exciting opportunities for data analysts who understand operations research, demand forecasting, and customer analytics. With the recovery of travel post-pandemic, this sector is experiencing renewed growth.

## Industry Overview

Aviation analytics focuses on flight operations, passenger behavior, and route optimization. Airlines use data analytics to optimize schedules, improve customer experience, and maximize operational efficiency.

Key focus areas include:
- Flight operations and scheduling optimization
- Passenger behavior and demand forecasting
- Revenue management and pricing
- Route planning and network optimization
- Customer experience and loyalty analytics

## Required Skills & Tools

**Technical Skills:**
- SQL for querying flight and passenger databases
- Python/R for operations research and forecasting
- Statistical modeling and time series analysis
- Optimization algorithms and linear programming

**Domain Knowledge:**
- Understanding of aviation operations and regulations
- Knowledge of revenue management and pricing strategies
- Experience with demand forecasting and capacity planning
- Understanding of airline economics and business models

## Getting Started Steps

**1. Learn Aviation Operations**
- Study airline operations and business models
- Understand revenue management and pricing strategies
- Learn about aviation regulations and safety standards

**2. Build Technical Skills**
- Practice with aviation datasets and flight data
- Build projects on demand forecasting or route optimization
- Get familiar with operations research techniques

**3. Get Industry Experience**
- Consider aviation analytics certifications
- Network with aviation professionals
- Join aviation analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Aviation Analyst
**Mid Level (2-5 years):** Revenue Management Analyst
**Senior Level (5+ years):** Senior Operations Analyst
**Leadership (8+ years):** Director of Analytics

## Salary Expectations

- **Entry Level:** 4-6 LPA
- **Mid Level:** 6-8 LPA
- **Senior Level:** 8-10 LPA
- **Leadership:** 10+ LPA

## Top Companies Hiring

- IndiGo
- SpiceJet
- Air India
- Vistara
- GMR Airports
- Delhi International Airport

## Final Thoughts

The aviation industry offers data analysts the opportunity to work with complex operational data while contributing to the efficiency and safety of air travel. With the right skills and passion for aviation, you can build a rewarding career in this dynamic and global industry.`
    },
    gaming: {
      name: 'Gaming & Entertainment',
      icon: Gamepad2,
      color: 'from-orange-400 to-orange-500',
      description: 'Player analytics, game optimization, user engagement',
      keySkills: ['SQL', 'Python', 'R', 'Game Analytics', 'User Behavior Analysis'],
      salaryRange: '3-8 LPA',
      companies: ['Zynga', 'Nazara', '99Games','Bharat Games'],
      author: 'Gaming Pro',
      publishedAt: '2024-02-15T10:00:00Z',
      readTime: 8,
      category: 'Gaming Analytics',
      tags: ['Gaming', 'Entertainment', 'User Behavior', 'Game Analytics', 'Player Engagement', 'Monetization'],
      content: `# Breaking into Gaming & Entertainment as a Data Analyst

The gaming industry is one of the fastest-growing sectors globally, offering exciting opportunities for data analysts who understand player behavior, game mechanics, and monetization strategies. With the rise of mobile gaming and esports, this field offers creative and rewarding career paths.

## Industry Overview

Gaming analytics focuses on player behavior, game optimization, and monetization strategies. Game companies use data analytics to improve player engagement, optimize game mechanics, and maximize revenue.

Key focus areas include:
- Player behavior and engagement analysis
- Game balance and mechanics optimization
- Monetization and in-game economy analysis
- User acquisition and retention
- A/B testing and experimentation

## Required Skills & Tools

**Technical Skills:**
- SQL for querying player and game databases
- Python/R for user behavior analysis and machine learning
- Game analytics platforms and tools
- Statistical analysis and A/B testing

**Domain Knowledge:**
- Understanding of game mechanics and player psychology
- Knowledge of monetization strategies and in-game economies
- Experience with user acquisition and retention metrics
- Understanding of gaming industry trends and platforms

## Getting Started Steps

**1. Learn Gaming Analytics**
- Study game mechanics and player psychology
- Understand monetization strategies and in-game economies
- Learn about user acquisition and retention

**2. Build Technical Skills**
- Practice with gaming datasets and player behavior data
- Build projects on player segmentation or game optimization
- Get familiar with game analytics platforms

**3. Get Industry Experience**
- Consider gaming analytics certifications
- Network with gaming professionals
- Join gaming analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Game Analyst
**Mid Level (2-5 years):** Senior Game Analyst
**Senior Level (5+ years):** Gaming Data Scientist
**Leadership (8+ years):** Director of Gaming Analytics

## Salary Expectations

- **Entry Level:** 3-5 LPA
- **Mid Level:** 5-6 LPA
- **Senior Level:** 6-8 LPA
- **Leadership:** 8+ LPA

## Top Companies Hiring

- Zynga
- Nazara Technologies
- 99Games
- Bharat Games
- Reliance Jio Games
- Dream11

## Final Thoughts

The gaming industry offers data analysts the opportunity to work with creative and engaging data while contributing to the success of games and entertainment products. With the right skills and passion for gaming, you can build a rewarding career in this exciting and innovative field.`
    },
    realestate: {
      name: 'Real Estate',
      icon: Home,
      color: 'from-orange-400 to-orange-500',
      description: 'Property analytics, market trends, investment insights',
      keySkills: ['SQL', 'Python', 'R', 'Geospatial Analytics', 'Market Analysis'],
      salaryRange: '3-7 LPA',
      companies: ['DLF', 'Godrej Properties', 'Prestige', 'Brigade'],
      author: 'Property Expert',
      publishedAt: '2024-02-20T10:00:00Z',
      readTime: 9,
      category: 'Real Estate Analytics',
      tags: ['Real Estate', 'Property', 'Market Analysis', 'Geospatial', 'Investment', 'Housing'],
      content: `# Breaking into Real Estate as a Data Analyst

The real estate industry is becoming increasingly data-driven, offering opportunities for data analysts who understand market trends, property valuation, and investment analysis. With the growth of proptech and digital platforms, this sector provides diverse career opportunities.

## Industry Overview

Real estate analytics focuses on property valuation, market trends, and investment analysis. Real estate companies use data analytics to understand market dynamics, optimize pricing, and make informed investment decisions.

Key focus areas include:
- Property valuation and pricing analysis
- Market trends and demand forecasting
- Investment analysis and ROI optimization
- Location analysis and geospatial data
- Customer behavior and preferences

## Required Skills & Tools

**Technical Skills:**
- SQL for querying property and market databases
- Python/R for market analysis and geospatial analytics
- GIS tools and geospatial analysis
- Statistical modeling and forecasting

**Domain Knowledge:**
- Understanding of real estate markets and trends
- Knowledge of property valuation methods
- Experience with investment analysis and ROI calculations
- Understanding of real estate regulations and policies

## Getting Started Steps

**1. Learn Real Estate Fundamentals**
- Study real estate markets and valuation methods
- Understand investment analysis and ROI calculations
- Learn about real estate regulations and policies

**2. Build Technical Skills**
- Practice with real estate datasets and market data
- Build projects on property valuation or market analysis
- Get familiar with GIS tools and geospatial analysis

**3. Get Industry Experience**
- Consider real estate analytics certifications
- Network with real estate professionals
- Join real estate analytics communities

## Career Growth Path

**Entry Level (0-2 years):** Real Estate Analyst
**Mid Level (2-5 years):** Senior Market Analyst
**Senior Level (5+ years):** Real Estate Data Scientist
**Leadership (8+ years):** Director of Real Estate Analytics

## Salary Expectations

- **Entry Level:** 3-4 LPA
- **Mid Level:** 4-5 LPA
- **Senior Level:** 5-7 LPA
- **Leadership:** 7+ LPA

## Top Companies Hiring

- DLF
- Godrej Properties
- Prestige Group
- Brigade Group
- Housing.com
- 99acres.com

## Final Thoughts

The real estate industry offers data analysts the opportunity to work with diverse datasets while contributing to property investment and market analysis. With the right skills and understanding of real estate markets, you can build a successful career in this stable and growing field.`
    }
  };

  const currentIndustry = industryDetails[industryId as keyof typeof industryDetails];

  if (!currentIndustry) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Industry Guide Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/job-kit/industry-guides')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industry Guides
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  // const IconComponent = currentIndustry.icon;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <NeumorphicButton
          onClick={() => navigate('/news/job-kit/industry-guides')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </NeumorphicButton>
      </div>

      {/* Article Header */}
      <NeumorphicCard className="p-8 mb-6">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 text-sm font-medium rounded-lg mb-4">
            <TrendingUp className="w-4 h-4" />
            Industry Guide
          </span>
          <h1 className="text-3xl font-bold text-gray-100 mb-4 leading-tight">
            {currentIndustry.name}
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            {currentIndustry.description}
          </p>
        </div>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{currentIndustry.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(currentIndustry.publishedAt), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{currentIndustry.readTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            <span className="capitalize">{currentIndustry.category}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {currentIndustry.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-700 text-gray-200 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </NeumorphicCard>

      {/* Article Content */}
      <NeumorphicCard className="p-8">
        <div className="prose prose-invert max-w-none">
          <div 
            className="text-gray-200 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: currentIndustry.content
                .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-100 mb-8 mt-8 leading-tight">$1</h1>')
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-100 mb-6 mt-8 border-b border-orange-500 pb-2">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-orange-400 mb-4 mt-6">$1</h3>')
                .replace(/^- (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1">•</span><span>$1</span></li>')
                .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1 font-bold">$1</span></li>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-400 font-bold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="text-orange-300 italic">$1</em>')
                .replace(/\n\n/g, '</p><p class="mb-6 text-lg leading-relaxed">')
                .replace(/^(?!<[h|l])/gm, '<p class="mb-6 text-lg leading-relaxed">')
                .replace(/<p class="mb-6 text-lg leading-relaxed"><\/p>/g, '')
            }}
          />
        </div>
      </NeumorphicCard>

      {/* Footer CTA */}
      <div className="mt-12">
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-200 mb-6">
            Now that you understand the {currentIndustry.name} industry, it's time to build the right skills and start applying.
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

export default memo(IndustryDetail);
