import React, { useState, useEffect } from 'react';
import { Users, FileText, BarChart3, Settings, Eye, Trash2, Shield } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { firestoreOperations, User, Test } from '../firebase/firestore';
import { format } from 'date-fns';

const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [usersData, testsData] = await Promise.all([
        firestoreOperations.getAllUsers(),
        firestoreOperations.getTests()
      ]);
      
      setUsers(usersData);
      setTests(testsData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-6">
        <NeumorphicCard padding="xl" className="text-center">
          <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Access Denied</h2>
          <p className="text-gray-200">You don't have permission to access the admin panel.</p>
        </NeumorphicCard>
      </div>
    );
  }

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'tests', name: 'Tests', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const renderUsers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">User Management</h2>
        <div className="text-sm text-gray-200">
          Total Users: {users.length}
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <NeumorphicCard key={user.uid} padding="lg" hoverable>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-100" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-100">{user.name}</h3>
                  <p className="text-gray-200">{user.email}</p>
                  <p className="text-sm text-gray-300">
                    Joined {format(new Date(user.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600'
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600'
                }`}>
                  {user.role}
                </span>
                <NeumorphicButton variant="ghost" size="sm" icon={Eye}>
                  View
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicCard>
        ))}
      </div>
    </div>
  );

  const renderTests = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Test Management</h2>
        <div className="text-sm text-gray-200">
          Total Tests: {tests.length}
        </div>
      </div>

      <div className="grid gap-4">
        {tests.map((test) => (
          <NeumorphicCard key={test.id} padding="lg" hoverable>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-100 mb-2">{test.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-200">
                  <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 rounded">
                    {test.module}
                  </span>
                  <span>{test.questions.length} questions</span>
                  <span>{test.isDefault ? 'Default' : 'Custom'}</span>
                  <span>Created {format(new Date(test.createdAt), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <NeumorphicButton variant="ghost" size="sm" icon={Eye}>
                  View
                </NeumorphicButton>
                <NeumorphicButton variant="ghost" size="sm" icon={Trash2} className="text-red-500">
                  Delete
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicCard>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeumorphicCard padding="lg" className="text-center">
          <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">{users.length}</h3>
          <p className="text-gray-200">Total Users</p>
        </NeumorphicCard>

        <NeumorphicCard padding="lg" className="text-center">
          <FileText className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">{tests.length}</h3>
          <p className="text-gray-200">Total Tests</p>
        </NeumorphicCard>

        <NeumorphicCard padding="lg" className="text-center">
          <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">85%</h3>
          <p className="text-gray-200">Avg Score</p>
        </NeumorphicCard>

        <NeumorphicCard padding="lg" className="text-center">
          <Shield className="w-8 h-8 text-orange-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-100">
            {users.filter(u => u.role === 'admin').length}
          </h3>
          <p className="text-gray-200">Admins</p>
        </NeumorphicCard>
      </div>

      <NeumorphicCard padding="lg">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">User Registration Over Time</h3>
        <div className="h-64 flex items-center justify-center text-gray-300">
          Chart placeholder - Would integrate with a charting library
        </div>
      </NeumorphicCard>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">System Settings</h2>
      
      <NeumorphicCard padding="lg">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-100">User Registration</h4>
              <p className="text-sm text-gray-300">Allow new users to register</p>
            </div>
            <NeumorphicButton variant="accent" size="sm">
              Enabled
            </NeumorphicButton>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-100">Test Creation</h4>
              <p className="text-sm text-gray-300">Allow users to create custom tests</p>
            </div>
            <NeumorphicButton variant="accent" size="sm">
              Enabled
            </NeumorphicButton>
          </div>
        </div>
      </NeumorphicCard>

      <NeumorphicCard padding="lg">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">AI Settings</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-100 mb-2">Gemini API Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-200">Connected</span>
            </div>
          </div>
        </div>
      </NeumorphicCard>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Admin Panel</h1>
        <p className="text-gray-200">Manage users, content, and system settings</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <NeumorphicCard padding="md">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <NeumorphicButton
                key={tab.id}
                variant={activeTab === tab.id ? 'accent' : 'ghost'}
                size="md"
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
              >
                {tab.name}
              </NeumorphicButton>
            ))}
          </div>
        </NeumorphicCard>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default AdminPanel;