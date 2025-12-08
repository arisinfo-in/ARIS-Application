import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import NeumorphicCard from './NeumorphicCard';
import { Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center p-6">
        <NeumorphicCard padding="xl" className="text-center max-w-md">
          <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">Access Denied</h2>
          <p className="text-gray-200">You don't have permission to access the admin panel.</p>
        </NeumorphicCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aris-gradient">
      <AdminSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <main className="flex-1 overflow-auto pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

