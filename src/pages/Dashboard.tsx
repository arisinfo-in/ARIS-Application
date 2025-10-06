import React, { useState, useEffect, memo } from 'react';
import { BookOpen, Calendar, Target, Clock, Star, Trophy } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import { useAuth } from '../contexts/AuthContext';
import { TestAttempt, StudyPlan } from '../firebase/firestore';
import { format } from 'date-fns';
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
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
      console.error('Error listening to test attempts:', error);
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
      console.error('Error listening to study plans:', error);
    });

    return () => {
      unsubscribeTestAttempts();
      unsubscribeStudyPlans();
    };
  }, [user]);

  // Real-time streak calculation
  const calculateStudyStreak = () => {
    if (testAttempts.length === 0) return 0;
    
    const today = new Date();
    const sortedAttempts = [...testAttempts].sort((a, b) => 
      new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
    );
    
    let streak = 0;
    const currentDate = new Date(today);
    
    for (const attempt of sortedAttempts) {
      const attemptDate = new Date(attempt.finishedAt);
      const daysDiff = Math.floor((currentDate.getTime() - attemptDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (daysDiff > streak) {
        break;
      }
    }
    
    return streak;
  };

  // Real-time performance metrics - Only 3 specific metrics
  const stats = {
    studyPlansActive: studyPlans.filter(plan => plan.progressPercent < 100).length,
    studyStreak: calculateStudyStreak(),
    totalStudyTime: studyPlans.reduce((acc, plan) => {
      const completedItems = plan.schedule.filter(s => s.completed).length;
      return acc + (completedItems * 30); // 30 minutes per study item
    }, 0)
  };

  const recentActivity = testAttempts.slice(0, 5);

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
        <h1 className="text-3xl font-bold text-high-contrast mb-2">
          Welcome back, {user?.displayName?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-secondary-contrast">Ready to continue your data analysis journey?</p>
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
          <h3 className="text-2xl font-bold text-high-contrast">{stats.studyStreak}</h3>
          <p className="text-secondary-contrast text-sm">Day Streak</p>
        </NeumorphicCard>

        <NeumorphicCard hoverable className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-gradient rounded-xl mx-auto mb-3 orange-glow">
            <Clock className="w-6 h-6 text-gray-100" />
          </div>
          <h3 className="text-2xl font-bold text-high-contrast">{Math.floor(stats.totalStudyTime / 60)}h</h3>
          <p className="text-secondary-contrast text-sm">Study Time</p>
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
                  {studyPlans.slice(0, 3).map((plan) => (
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