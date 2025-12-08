import React from 'react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

const AdminSettings: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">System Settings</h1>
        <p className="text-gray-200">Configure platform settings and preferences</p>
      </div>

      <div className="space-y-6">
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
    </div>
  );
};

export default AdminSettings;

