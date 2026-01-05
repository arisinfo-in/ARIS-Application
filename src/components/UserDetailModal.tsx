import React, { useEffect } from 'react';
import { X, User, Mail, Phone, Shield, Calendar, CheckCircle, XCircle } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { User as UserType } from '../firebase/firestore';
import { safeFormatDate } from '../utils/dateFormat';

interface UserDetailModalProps {
  user: UserType | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, isOpen, onClose }) => {
  // All hooks must be called before any early returns
  useEffect(() => {
    console.log('UserDetailModal - isOpen:', isOpen, 'user:', user);
  }, [isOpen, user]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Early return after all hooks
  if (!isOpen || !user) {
    console.log('UserDetailModal - Not rendering. isOpen:', isOpen, 'user:', user);
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-2xl z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        <NeumorphicCard padding="xl" className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">User Details</h2>
            <p className="text-gray-300">Complete user information</p>
          </div>

          {/* User Photo */}
          <div className="flex justify-center mb-6">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-orange-500"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center border-4 border-orange-500">
                <User className="w-12 h-12 text-gray-100" />
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Name</p>
                <p className="text-gray-100 font-medium">{user.name || 'N/A'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-gray-100 font-medium">{user.email || 'N/A'}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Role</p>
                <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                  user.role === 'admin' 
                    ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600'
                    : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600'
                }`}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            {user.phoneNumber && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-400 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-100 font-medium">{user.phoneNumber}</p>
                    {user.phoneVerified ? (
                      <span className="flex items-center gap-1 text-green-400 text-xs">
                        <CheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-xs">
                        <XCircle className="w-4 h-4" />
                        Not Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Created Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-orange-400 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-400 mb-1">Joined Date</p>
                <p className="text-gray-100 font-medium">
                  {safeFormatDate(user.createdAt, 'MMMM d, yyyy', 'Date unavailable')}
                </p>
              </div>
            </div>

            {/* Trial Information */}
            {user.trialStartDate && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-gray-100 mb-4">Trial Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Trial Status</p>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      user.trialActive
                        ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-600'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                    }`}>
                      {user.trialActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {user.trialStartDate && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Trial Start</p>
                      <p className="text-gray-100 font-medium">
                        {safeFormatDate(user.trialStartDate, 'MMM d, yyyy', 'Date unavailable')}
                      </p>
                    </div>
                  )}
                  {user.trialEndDate && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Trial End</p>
                      <p className="text-gray-100 font-medium">
                        {safeFormatDate(user.trialEndDate, 'MMM d, yyyy', 'Date unavailable')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* User ID */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-1">User ID</p>
              <p className="text-gray-300 text-xs font-mono break-all">{user.uid}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end">
            <NeumorphicButton variant="accent" onClick={onClose}>
              Close
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default UserDetailModal;

