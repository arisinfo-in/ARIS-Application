import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Brain, Sparkles, BarChart3 } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { signInWithGoogle } from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <NeumorphicCard>
          <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
        </NeumorphicCard>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/popup-blocked') {
        setError('Pop-up blocked! Please allow pop-ups for this site in your browser settings and try again.');
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (firebaseError.code === 'auth/popup-closed-by-user') {
        setError('Sign-in window was closed. Please try again.');
      } else {
        setError(firebaseError.message || 'Failed to sign in. Please try again.');
      }
      setSigningIn(false);
    } finally {
      // Ensure signing state is reset even if there's an unexpected error
      if (signingIn) {
        setSigningIn(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-aris-gradient flex items-center justify-center p-4">
      <div className="max-w-2xl w-full flex flex-col gap-8 items-center">
        {/* Top - Login */}
        <div className="w-full">
          <NeumorphicCard variant="floating" padding="xl" className="w-full">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-high-contrast mb-2">Welcome Back</h3>
              <p className="text-secondary-contrast">Sign in to continue your learning journey</p>
            </div>

            {error && (
              <NeumorphicCard variant="inset" padding="sm" className="mb-6 bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </NeumorphicCard>
            )}

            <NeumorphicButton
              variant="accent"
              size="lg"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={signingIn}
            >
              {signingIn ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </NeumorphicButton>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </NeumorphicCard>
        </div>

        {/* Bottom - Branding */}
        <div className="w-full">
          <NeumorphicCard variant="floating" padding="xl">
            <div className="flex justify-center mb-6">
              <img 
                src="/logo_icon_1024.png" 
                alt="ARIS Logo" 
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-3xl font-bold text-high-contrast mb-4 text-center">
              <span className="text-orange-500">ARIS</span> - AI Data Analyst
            </h1>
            <p className="text-secondary-contrast text-lg leading-relaxed mb-6 text-center">
              Master data analysis with AI-powered tutors, practice tests, and personalized learning paths.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NeumorphicCard padding="sm" className="text-center">
                <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-high-contrast">AI Tutors</p>
                <p className="text-xs text-secondary-contrast">8 Specialized Modules</p>
              </NeumorphicCard>
              <NeumorphicCard padding="sm" className="text-center">
                <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-high-contrast">Analytics</p>
                <p className="text-xs text-secondary-contrast">Track Progress</p>
              </NeumorphicCard>
              <NeumorphicCard padding="sm" className="text-center">
                <Brain className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-high-contrast">Practice</p>
                <p className="text-xs text-secondary-contrast">Custom Tests</p>
              </NeumorphicCard>
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default Login;