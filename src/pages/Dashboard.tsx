import React, { useState, useEffect, memo } from 'react';
import { BookOpen, Calendar, Target, Clock, Star, Trophy, Database, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { TestAttempt, StudyPlan, AISession } from '../firebase/firestore';
import { format } from 'date-fns';
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [aiSessions, setAISessions] = useState<AISession[]>([]);
  const [userQueries, setUserQueries] = useState<any[]>([]);
  const [pythonNotebooks, setPythonNotebooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(false); // Set loading to false immediately, don't wait for Firebase

    // Real-time listener for test attempts
    const testAttemptsQuery = query(
      collection(db, 'testAttempts'),
      where('userId', '==', user.uid),
      orderBy('finishedAt', 'desc')
    );

    const unsubscribeTestAttempts = onSnapshot(testAttemptsQuery, (snapshot) => {
      const attempts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TestAttempt[];
      setTestAttempts(attempts);
    }, (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error listening to test attempts:', error);
      }
    });

    // Real-time listener for study plans
    const studyPlansQuery = query(
      collection(db, 'studyPlans'),
      where('userId', '==', user.uid)
    );

    const unsubscribeStudyPlans = onSnapshot(studyPlansQuery, (snapshot) => {
      const plans = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as StudyPlan[];
      // Sort by createdAt in JavaScript instead of Firestore
      plans.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setStudyPlans(plans);
    }, (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error listening to study plans:', error);
      }
    });

    // Real-time listener for AI Sessions
    const aiSessionsQuery = query(
      collection(db, 'aiSessions'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeAISessions = onSnapshot(aiSessionsQuery, (snapshot) => {
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AISession[];
      setAISessions(sessions);
    }, (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error listening to AI sessions:', error);
      }
    });

    // Real-time listener for SQL Queries
    const userQueriesQuery = query(
      collection(db, 'userQueries'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeUserQueries = onSnapshot(userQueriesQuery, (snapshot) => {
      const queries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserQueries(queries);
    }, (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error listening to user queries:', error);
      }
    });

    // Real-time listener for Python Notebooks
    const pythonNotebooksQuery = query(
      collection(db, 'pythonNotebooks'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribePythonNotebooks = onSnapshot(pythonNotebooksQuery, (snapshot) => {
      const notebooks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPythonNotebooks(notebooks);
    }, (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error listening to Python notebooks:', error);
      }
    });

    return () => {
      unsubscribeTestAttempts();
      unsubscribeStudyPlans();
      unsubscribeAISessions();
      unsubscribeUserQueries();
      unsubscribePythonNotebooks();
    };
  }, [user]);

  // Enhanced learning streak calculation from multiple sources
  const calculateLearningStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Collect all activity dates from different sources
    const activityDates: Date[] = [];
    
    // From test attempts
    testAttempts.forEach(attempt => {
      const date = new Date(attempt.finishedAt);
      date.setHours(0, 0, 0, 0);
      activityDates.push(date);
    });
    
    // From AI sessions
    aiSessions.forEach(session => {
      const date = new Date(session.createdAt);
      date.setHours(0, 0, 0, 0);
      activityDates.push(date);
    });
    
    // From SQL queries
    userQueries.forEach(query => {
      const date = new Date(query.createdAt);
      date.setHours(0, 0, 0, 0);
      activityDates.push(date);
    });
    
    // From Python notebooks
    pythonNotebooks.forEach(notebook => {
      const date = new Date(notebook.updatedAt);
      date.setHours(0, 0, 0, 0);
      activityDates.push(date);
    });
    
    // Get unique dates
    const uniqueDates = Array.from(new Set(
      activityDates.map(d => d.getTime())
    )).map(time => new Date(time)).sort((a, b) => b.getTime() - a.getTime());
    
    if (uniqueDates.length === 0) return 0;
    
    // Calculate streak
    let streak = 0;
    const currentDate = new Date(today);
    
    for (const activityDate of uniqueDates) {
      const daysDiff = Math.floor(
        (currentDate.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysDiff === streak) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (daysDiff > streak) {
        break;
      }
    }
    
    return streak;
  };

  // Enhanced real-time performance metrics
  const stats = {
    studyPlansActive: studyPlans.filter(plan => plan.progressPercent < 100).length,
    learningStreak: calculateLearningStreak(),
    totalActivity: testAttempts.length + 
                 aiSessions.length + 
                 userQueries.length + 
                 pythonNotebooks.length
  };

  const recentActivity = testAttempts.slice(0, 2);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-aris-gradient min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-high-contrast mb-2">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-secondary-contrast">Ready to continue your data analysis journey?</p>
          </div>
          <div className="flex items-center gap-3">
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/study-plans/sql-practice')}
              icon={Database}
            >
              SQL Editor
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              onClick={() => navigate('/python-notebook')}
              icon={Code}
            >
              Python Notebook
            </NeumorphicButton>
          </div>
        </div>
      </div>

      {/* Stats Cards - Only 3 specific cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <NeumorphicCard hoverable className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-gradient rounded-xl mx-auto mb-3 orange-glow">
            <Target className="w-6 h-6 text-gray-100" />
          </div>
          <h3 className="text-2xl font-bold text-high-contrast">{stats.studyPlansActive}</h3>
          <p className="text-secondary-contrast text-sm">Active Plans</p>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-gradient rounded-xl mx-auto mb-3 orange-glow">
            <Star className="w-6 h-6 text-gray-100" />
          </div>
          <h3 className="text-2xl font-bold text-high-contrast">{stats.learningStreak}</h3>
          <p className="text-secondary-contrast text-sm">Learning Streak</p>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-gradient rounded-xl mx-auto mb-3 orange-glow">
            <Clock className="w-6 h-6 text-gray-100" />
          </div>
          <h3 className="text-2xl font-bold text-high-contrast">{stats.totalActivity}</h3>
          <p className="text-secondary-contrast text-sm">Total Activity</p>
        </NeumorphicCard>
      </div>



      {/* Recent Activity and Study Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="h-full">
          <NeumorphicCard padding="lg" className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-100">Recent Activity</h2>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Auto-updating</span>
              </div>
            </div>

            <div className="flex-1">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No tests taken yet</h3>
                  <p className="text-gray-300">Start by taking a practice test to see your progress here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((attempt, index) => (
                    <NeumorphicCard key={attempt.id} variant="pressed" padding="md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-gray-100" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-100">Test #{index + 1}</h4>
                            <p className="text-sm text-gray-200">
                              {format(new Date(attempt.finishedAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-100">{attempt.score}%</p>
                          <p className={`text-sm ${
                            attempt.score >= 80 ? 'text-green-600' : 
                            attempt.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attempt.score >= 80 ? 'Excellent' : 
                             attempt.score >= 60 ? 'Good' : 'Needs Work'}
                          </p>
                        </div>
                      </div>
                    </NeumorphicCard>
                  ))}
                </div>
              )}
            </div>
          </NeumorphicCard>
        </div>

        {/* Study Plans Section */}
        <div className="h-full">
          <NeumorphicCard padding="lg" className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-100">Study Plans</h2>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">Live progress</span>
              </div>
            </div>

            <div className="flex-1">
              {studyPlans.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">No study plans yet</h3>
                  <p className="text-gray-300">Create your first study plan to track your progress.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {studyPlans.slice(0, 2).map((plan) => (
                    <NeumorphicCard key={plan.id} variant="pressed" padding="md">
                      <h4 className="font-medium text-gray-100 mb-2">{plan.title}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${plan.progressPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-200">{plan.progressPercent}%</span>
                      </div>
                      <p className="text-xs text-gray-300">
                        {plan.schedule.filter(s => s.completed).length} / {plan.schedule.length} completed
                      </p>
                    </NeumorphicCard>
                  ))}
                </div>
              )}
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);