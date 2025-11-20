import React, { useState, useEffect } from 'react';
import { Bell, User, LogOut, Instagram, Facebook, Linkedin, Youtube, Key } from 'lucide-react';
import NeumorphicButton from './NeumorphicButton';
import NeumorphicCard from './NeumorphicCard';
import GuideBot from './GuideBot';
import APISettingsModal from './APISettingsModal';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase/auth';

// API Settings Button Component - Similar to ARIS Bot
const APISettingsButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick();
  };

  return (
    <div
      className="relative flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title="API Settings - Manage Your API Keys"
    >
      {/* Animated Key Icon */}
      <div className="relative">
        {/* Pulse animation ring */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping"></div>
        )}
        
        {/* Key icon with animations */}
        <div
          className={`relative transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${isClicked ? 'scale-95' : ''}`}
        >
          <div className="relative flex items-center gap-2">
            {/* Glow effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 bg-orange-400/30 blur-md rounded-full"></div>
            )}
            <span className={`text-sm font-semibold text-gray-100 transition-all duration-300 ${
              isHovered ? 'text-white' : ''
            } hidden sm:inline`}>
              API
            </span>
            <Key 
              size={20} 
              className={`text-gray-100 transition-all duration-300 ${
                isHovered ? 'text-white' : ''
              }`}
              style={{
                animation: isHovered && !isClicked 
                  ? 'wave 1s ease-in-out infinite' 
                  : undefined
              }}
            />
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);

  // Listen for custom event to open API settings from other components
  useEffect(() => {
    const handleOpenAPISettings = () => {
      setIsAPIModalOpen(true);
    };

    window.addEventListener('openAPISettings', handleOpenAPISettings);
    return () => {
      window.removeEventListener('openAPISettings', handleOpenAPISettings);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Social media links
  const socialLinks = {
    instagram: 'https://www.instagram.com/arisinfo.in/',
    facebook: 'https://www.facebook.com/arisinfo.in',
    linkedin: 'https://www.linkedin.com/company/arisinfo-in/',
    youtube: 'https://www.youtube.com/@arisaidataanalyst'
  };

  const handleSocialClick = (platform: string) => {
    window.open(socialLinks[platform as keyof typeof socialLinks], '_blank', 'noopener,noreferrer');
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

      {/* Right side - social media, notifications and user menu */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Guide Bot */}
        <GuideBot />
        
        {/* API Settings Button - Similar to ARIS Bot */}
        <APISettingsButton onClick={() => setIsAPIModalOpen(true)} />
        
        {/* Social Media Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NeumorphicButton 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSocialClick('instagram')}
            title="Follow us on Instagram"
          >
            <Instagram size={16} />
          </NeumorphicButton>
          
          <NeumorphicButton 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSocialClick('facebook')}
            title="Follow us on Facebook"
          >
            <Facebook size={16} />
          </NeumorphicButton>
          
          <NeumorphicButton 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSocialClick('linkedin')}
            title="Connect with us on LinkedIn"
          >
            <Linkedin size={16} />
          </NeumorphicButton>
          
          <NeumorphicButton 
            variant="ghost" 
            size="sm" 
            onClick={() => handleSocialClick('youtube')}
            title="Subscribe to our YouTube channel"
          >
            <Youtube size={16} />
          </NeumorphicButton>
        </div>

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
      
      {/* API Settings Modal */}
      <APISettingsModal 
        isOpen={isAPIModalOpen} 
        onClose={() => setIsAPIModalOpen(false)} 
      />
    </div>
  );
};

export default Navbar;