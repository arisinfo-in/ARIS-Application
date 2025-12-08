import React, { useState, useEffect } from 'react';
import { Users, FileText, BarChart3, Shield } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import { firestoreOperations, User, Test } from '../firebase/firestore';

const AdminAnalytics: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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
      console.error('Error loading analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Analytics</h1>
        <p className="text-gray-200">Platform statistics and insights</p>
      </div>

      <div className="space-y-6">
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
    </div>
  );
};

export default AdminAnalytics;

