import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users, 
  FileText, 
  Briefcase,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar: React.FC = () => {
  const [sidebarHeight, setSidebarHeight] = useState('100vh');

  useEffect(() => {
    const updateHeight = () => {
      const vh = window.innerHeight;
      setSidebarHeight(`${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const adminNavItems = [
    { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', name: 'Users', icon: Users },
    { path: '/admin/tests', name: 'Tests', icon: FileText },
    { path: '/admin/jobs', name: 'Jobs', icon: Briefcase },
  ];

  return (
    <div 
      className="fixed left-0 top-0 w-64 bg-aris-gradient p-4 z-40 overflow-y-auto scrollbar-hide flex flex-col"
      style={{ height: sidebarHeight }}
    >
      <div className="flex-1">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-center">
            <img 
              src="/logo_icon_1024.png" 
              alt="ARIS Logo" 
              className="w-16 h-16 mx-auto"
            />
          </div>
        </div>

        {/* Back to Main App */}
        <div className="mb-6">
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-gray-200 hover:text-orange-400 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]"
          >
            <ArrowLeft size={18} />
            <span className="font-medium text-lg">Back to App</span>
          </NavLink>
        </div>

        {/* Admin Navigation */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-orange-400 mb-3 px-2">ADMIN</h3>
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-gradient text-gray-100 shadow-[8px_8px_16px_rgba(249,115,22,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)]'
                      : 'text-gray-200 hover:text-orange-400 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]'
                  }`
                }
              >
                <item.icon size={18} />
                <span className="font-medium text-lg">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSidebar);

