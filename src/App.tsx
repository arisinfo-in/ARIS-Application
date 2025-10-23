import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import QuickLoader from './components/QuickLoader';

// Import frequently used pages directly for better performance
import Dashboard from './pages/Dashboard';
import Tests from './pages/Tests';
import StudyPlans from './pages/StudyPlans';
import AITutor from './pages/AITutor';
import TheHub from './pages/News';
import ArticleView from './pages/ArticleView';
import AllArticles from './pages/AllArticles';
import Series from './pages/Series';
import ModuleSeries from './pages/ModuleSeries';
import EpisodeView from './pages/EpisodeView';
import AIClips from './pages/AIClips';
import FreeCertificates from './pages/FreeCertificates';
import CertificateDetails from './pages/CertificateDetails';
import JobKit from './pages/JobKit';
import JobEmailTemplates from './pages/JobEmailTemplates';
import EmailTemplateForm from './pages/EmailTemplateForm';
import CoverLetterTemplates from './pages/CoverLetterTemplates';
import CoverLetterForm from './pages/CoverLetterForm';
import InterviewPreparation from './pages/InterviewPreparation';
import MockInterview from './pages/MockInterview';
import InterviewResults from './pages/InterviewResults';
import ResumeTemplates from './pages/ResumeTemplates';
import PortfolioBuildingGuide from './pages/PortfolioBuildingGuide';
import LinkedInStrategy from './pages/LinkedInStrategy';
import IndustryGuides from './pages/IndustryGuides';
import IndustryDetail from './pages/IndustryDetail';
import AITools from './pages/AITools';
import StandardProjects from './pages/StandardProjects';
import ProjectDetail from './pages/ProjectDetail';
import JobFinder from './pages/JobFinder';

// Lazy load less frequently used pages with preloading
const TestAttempt = lazy(() => import('./pages/TestAttempt'));
const TestResults = lazy(() => import('./pages/TestResults'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

// Preload components for better performance
const preloadComponents = () => {
  import('./pages/TestAttempt');
  import('./pages/TestResults');
  import('./pages/AdminPanel');
};

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-aris-gradient">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 overflow-auto pt-20">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // Preload components after initial load
    const timer = setTimeout(preloadComponents, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<QuickLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tutor/:moduleId"
              element={
                <ProtectedRoute>
                  <AITutor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tests"
              element={
                <ProtectedRoute>
                  <Tests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tests/:testId/attempt"
              element={
                <ProtectedRoute>
                  <TestAttempt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tests/:testId/results"
              element={
                <ProtectedRoute>
                  <TestResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/study-plans"
              element={
                <ProtectedRoute>
                  <StudyPlans />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <TheHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/all-articles"
              element={
                <ProtectedRoute>
                  <AllArticles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/series"
              element={
                <ProtectedRoute>
                  <Series />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/ai-clips"
              element={
                <ProtectedRoute>
                  <AIClips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/free-certificates"
              element={
                <ProtectedRoute>
                  <FreeCertificates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/free-certificates/:certificateId"
              element={
                <ProtectedRoute>
                  <CertificateDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/series/:moduleId"
              element={
                <ProtectedRoute>
                  <ModuleSeries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/series/:moduleId/episode/:episodeId"
              element={
                <ProtectedRoute>
                  <EpisodeView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/:articleId"
              element={
                <ProtectedRoute>
                  <ArticleView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit"
              element={
                <ProtectedRoute>
                  <JobKit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/email-templates"
              element={
                <ProtectedRoute>
                  <JobEmailTemplates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/email-templates/:templateId"
              element={
                <ProtectedRoute>
                  <EmailTemplateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/cover-letters"
              element={
                <ProtectedRoute>
                  <CoverLetterTemplates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/cover-letters/:templateId"
              element={
                <ProtectedRoute>
                  <CoverLetterForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/interview-preparation"
              element={
                <ProtectedRoute>
                  <InterviewPreparation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/mock-interview"
              element={
                <ProtectedRoute>
                  <MockInterview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/interview-results"
              element={
                <ProtectedRoute>
                  <InterviewResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/resume-templates"
              element={
                <ProtectedRoute>
                  <ResumeTemplates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/portfolio-building-guide"
              element={
                <ProtectedRoute>
                  <PortfolioBuildingGuide />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/industry-guides"
              element={
                <ProtectedRoute>
                  <IndustryGuides />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/industry-guides/:industryId"
              element={
                <ProtectedRoute>
                  <IndustryDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/ai-tools"
              element={
                <ProtectedRoute>
                  <AITools />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/standard-projects"
              element={
                <ProtectedRoute>
                  <StandardProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/standard-projects/:projectId"
              element={
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-finder"
              element={
                <ProtectedRoute>
                  <JobFinder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news/job-kit/strategy/:strategyType"
              element={
                <ProtectedRoute>
                  <LinkedInStrategy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;