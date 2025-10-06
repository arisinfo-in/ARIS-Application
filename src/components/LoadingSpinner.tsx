import React from 'react';
import NeumorphicCard from './NeumorphicCard';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
      <NeumorphicCard padding="lg" className="text-center">
        <img 
          src="/logo_icon_1024.png" 
          alt="ARIS Logo" 
          className="w-16 h-16 mx-auto mb-4"
        />
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-200">Loading...</p>
      </NeumorphicCard>
    </div>
  );
};

export default LoadingSpinner;
