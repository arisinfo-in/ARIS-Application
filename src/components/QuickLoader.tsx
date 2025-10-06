import React from 'react';

const QuickLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-200 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default QuickLoader;
