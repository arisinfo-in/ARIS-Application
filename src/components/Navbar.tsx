import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import NeumorphicButton from './NeumorphicButton';
import NeumorphicCard from './NeumorphicCard';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase/auth';

const Navbar: React.FC = () => {
  const { user, userProfile } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-20 bg-aris-gradient border-b border-gray-700 px-4 sm:px-6 flex items-center justify-between z-30">
      {/* Brand/Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg sm:text-xl font-bold truncate">
          <span className="text-orange-500">ARIS</span>
          <span className="text-gray-100 hidden sm:inline"> - AI Data Analyst Companion</span>
          <span className="text-gray-100 sm:hidden"> - AI Data Analyst</span>
        </h1>
      </div>

      {/* Right side - notifications and user menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <NeumorphicButton variant="ghost" size="sm" className="hidden sm:flex">
          <Bell size={20} />
        </NeumorphicButton>

        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            <NeumorphicCard padding="sm" className="flex items-center gap-2 sm:gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                />
              ) : (
                <>
                  <User size={16} className="text-gray-100 sm:hidden" />
                  <User size={20} className="text-gray-100 hidden sm:block" />
                </>
              )}
              <div className="text-xs sm:text-sm hidden sm:block">
                <p className="font-medium text-gray-100 truncate max-w-32">{user.displayName}</p>
                <p className="text-gray-200 text-xs">{userProfile?.role || 'user'}</p>
              </div>
            </NeumorphicCard>
            
            <NeumorphicButton
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex-shrink-0"
            >
              <LogOut size={16} className="sm:hidden" />
              <LogOut size={20} className="hidden sm:block" />
            </NeumorphicButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;