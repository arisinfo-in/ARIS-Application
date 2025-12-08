import React, { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, Shield, RefreshCw, Clock, TrendingUp, UserPlus, FilePlus } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { firestoreOperations, User, Test, TestAttempt } from '../firebase/firestore';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading admin dashboard data...');
      
      // Load users
      let usersData: User[] = [];
      try {
        usersData = await firestoreOperations.getAllUsers();
        console.log('Loaded users:', usersData?.length || 0, usersData);
      } catch (err) {
        console.error('Error loading users:', err);
        usersData = [];
      }
      
      // Load tests - this may fail due to Firestore rules
      let testsData: Test[] = [];
      try {
        testsData = await firestoreOperations.getTests();
        console.log('Loaded tests:', testsData?.length || 0, testsData);
      } catch (err: any) {
        console.error('Error loading tests:', err);
        // Check if it's a permission error
        if (err?.code === 'permission-denied' || err?.message?.includes('permission')) {
          console.warn('Tests permission denied - Firestore rules need admin override for tests collection');
        }
        testsData = [];
      }
      
      // Load test attempts
      let attemptsData: TestAttempt[] = [];
      try {
        attemptsData = await firestoreOperations.getAllTestAttempts().catch(() => []);
      } catch (err) {
        console.error('Error loading test attempts:', err);
        attemptsData = [];
      }
      
      setUsers(Array.isArray(usersData) ? usersData : []);
      setTests(Array.isArray(testsData) ? testsData : []);
      setTestAttempts(attemptsData);
      
      // Show warning if tests couldn't be loaded but users could
      if (usersData.length > 0 && testsData.length === 0) {
        console.warn('Tests collection may be empty or admin lacks permission to read all tests. Check Firestore rules.');
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dashboard data';
      setError(`Error: ${errorMessage}. Please check Firestore security rules allow admin to list users and tests.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto w-full">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto w-full">
        <NeumorphicCard padding="xl" className="text-center">
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-200 mb-2">{error}</p>
          <p className="text-sm text-gray-400 mb-4">
            Note: Admin users need Firestore rules that allow listing all users and tests.
          </p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Retry
          </button>
        </NeumorphicCard>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Admin Dashboard</h1>
          <p className="text-gray-200">Overview of your platform metrics and statistics</p>
        </div>
        <NeumorphicButton
          variant="ghost"
          size="md"
          icon={RefreshCw}
          onClick={loadData}
          disabled={loading}
        >
          Refresh
        </NeumorphicButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <NeumorphicCard padding="lg" className="text-center">
          <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">{users?.length || 0}</h3>
          <p className="text-gray-200">Total Users</p>
        </NeumorphicCard>

        <NeumorphicCard padding="lg" className="text-center">
          <FileText className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">{tests?.length || 0}</h3>
          <p className="text-gray-200">Total Tests</p>
          {tests?.length === 0 && (
            <p className="text-xs text-gray-400 mt-2">
              {users?.length > 0 ? 'Check Firestore rules' : ''}
            </p>
          )}
        </NeumorphicCard>

        <NeumorphicCard padding="lg" className="text-center">
          <Shield className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">
            {users?.filter(u => u?.role === 'admin').length || 0}
          </h3>
          <p className="text-gray-200">Admins</p>
        </NeumorphicCard>
      </div>

      {/* Quick Actions */}
      <NeumorphicCard padding="lg" className="mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NavLink
            to="/admin/users"
            className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 text-center"
          >
            <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-gray-200 text-sm">Manage Users</p>
          </NavLink>
          <NavLink
            to="/admin/tests"
            className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-200 text-center"
          >
            <FileText className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <p className="text-gray-200 text-sm">Manage Tests</p>
          </NavLink>
        </div>
      </NeumorphicCard>

      {/* Recent Activity */}
      <RecentActivity 
        users={users}
        tests={tests}
        testAttempts={testAttempts}
      />
    </div>
  );
};

interface RecentActivityProps {
  users: User[];
  tests: Test[];
  testAttempts: TestAttempt[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ users, tests, testAttempts }) => {
  const recentActivity = useMemo(() => {
    const activities: Array<{
      id: string;
      type: 'test_attempt' | 'new_user' | 'new_test';
      title: string;
      description: string;
      timestamp: string;
      icon: React.ReactNode;
    }> = [];

    // Recent test attempts (last 10)
    const recentAttempts = [...testAttempts]
      .sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime())
      .slice(0, 10);

    recentAttempts.forEach(attempt => {
      const test = tests.find(t => t.id === attempt.testId);
      const user = users.find(u => u.uid === attempt.userId);
      if (test) {
        activities.push({
          id: attempt.id,
          type: 'test_attempt',
          title: `${user?.name || 'User'} completed a test`,
          description: `${test.title} - Score: ${attempt.score}%`,
          timestamp: attempt.finishedAt,
          icon: <TrendingUp className="w-5 h-5 text-green-400" />
        });
      }
    });

    // Recent new users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = users
      .filter(u => new Date(u.createdAt) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    recentUsers.forEach(user => {
      activities.push({
        id: user.uid,
        type: 'new_user',
        title: 'New user registered',
        description: `${user.name} (${user.email})`,
        timestamp: user.createdAt,
        icon: <UserPlus className="w-5 h-5 text-blue-400" />
      });
    });

    // Recent new tests (last 7 days)
    const recentNewTests = tests
      .filter(t => new Date(t.createdAt) >= sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    recentNewTests.forEach(test => {
      const creator = users.find(u => u.uid === test.createdBy);
      activities.push({
        id: test.id,
        type: 'new_test',
        title: 'New test created',
        description: `${test.title} by ${creator?.name || 'Unknown'}`,
        timestamp: test.createdAt,
        icon: <FilePlus className="w-5 h-5 text-orange-400" />
      });
    });

    // Sort all activities by timestamp (most recent first)
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);
  }, [users, tests, testAttempts]);

  return (
    <NeumorphicCard padding="lg">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-100">Recent Activity</h3>
      </div>
      
      {recentActivity.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <Clock className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">No recent activity</p>
          <p className="text-sm mt-2">Activity will appear here as users interact with the platform</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors"
            >
              <div className="mt-1">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-100 font-medium text-sm">{activity.title}</p>
                <p className="text-gray-400 text-xs mt-1">{activity.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </NeumorphicCard>
  );
};

export default AdminDashboard;

