import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange } from '../firebase/auth';
import { firestoreOperations, User as UserProfile } from '../firebase/firestore';
import { setCurrentUserId } from '../services/geminiService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  phoneVerified: boolean;
  refreshUserProfile: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Add a function to refresh user profile
  const refreshUserProfile = useCallback(async () => {
    if (user?.uid) {
      try {
        const profile = await firestoreOperations.getUser(user.uid);
        setUserProfile(profile);
        return profile;
      } catch (error) {
        console.error('Error refreshing user profile:', error);
        return null;
      }
    }
    return null;
  }, [user?.uid]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setUser(user);
      setLoading(false); // Set loading to false immediately after user state is set
      
      // Update current user ID for geminiService
      setCurrentUserId(user?.uid || null);
      
      // Load user profile asynchronously without blocking
      if (user) {
        try {
          const profile = await firestoreOperations.getUser(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  const phoneVerified = userProfile?.phoneVerified === true;

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    phoneVerified,
    refreshUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};