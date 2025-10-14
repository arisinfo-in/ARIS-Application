import React, { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Calendar,
  Settings,
  Brain,
  Database,
  Code,
  TrendingUp,
  MessageSquare,
  Zap,
  Newspaper
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { isAdmin } = useAuth();
  const [sidebarHeight, setSidebarHeight] = useState('100vh');

  useEffect(() => {
    const updateHeight = () => {
      // Use the actual window height to avoid viewport issues
      const vh = window.innerHeight;
      setSidebarHeight(`${vh}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const modules = [
    { id: 'advanced', name: 'Advanced AI Tutor', icon: Zap },
    { id: 'prompt', name: 'Prompt Engineering', icon: MessageSquare },
    { id: 'excel', name: 'Excel', icon: FileText },
    { id: 'powerbi', name: 'Power BI', icon: BarChart3 },
    { id: 'sql', name: 'SQL & Database', icon: Database },
    { id: 'python', name: 'Python', icon: Code },
    { id: 'statistics', name: 'Statistics', icon: TrendingUp },
    { id: 'ml', name: 'Machine Learning', icon: Brain }
  ];

  const mainNavItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/tests', name: 'Practice Tests', icon: FileText },
    { path: '/study-plans', name: 'Study Plans', icon: Calendar },
    { path: '/news', name: 'The Hub', icon: Newspaper },
  ];

  if (isAdmin) {
    mainNavItems.push({ path: '/admin', name: 'Admin Panel', icon: Settings });
  }

  return (
    <div 
      className="fixed left-0 top-0 w-64 bg-aris-gradient p-4 z-40 overflow-y-auto scrollbar-hide"
      style={{ height: sidebarHeight }}
    >
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

      {/* Main Navigation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-orange-400 mb-3 px-2">MAIN</h3>
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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

      {/* AI Tutors */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-orange-400 mb-3 px-2">AI TUTORS</h3>
        <div className="space-y-1">
          {modules.map((module) => (
            <NavLink
              key={module.id}
              to={`/tutor/${module.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-gradient text-gray-100 shadow-[8px_8px_16px_rgba(249,115,22,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)]'
                    : 'text-gray-200 hover:text-orange-400 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.02)]'
                }`
              }
            >
              <module.icon size={16} />
              <span className="text-base font-medium">{module.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);