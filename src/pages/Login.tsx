import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { Brain, Sparkles, BarChart3, Mail, Phone, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import RippleButton from '../components/RippleButton';
import FloatingLabelInput from '../components/FloatingLabelInput';
import ParticleBackground from '../components/ParticleBackground';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '../firebase/config';
import { 
  signInWithGoogle, 
  signUpWithEmail, 
  signInWithEmail, 
  sendPhoneOTP, 
  verifyPhoneOTP,
  resetPassword
} from '../firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'google'>('google');
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  
  // Phone state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpResendTimer, setOtpResendTimer] = useState(0);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationResultRef = useRef<ConfirmationResult | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // Initialize reCAPTCHA for phone auth
  useEffect(() => {
    if (authMethod === 'phone' && !recaptchaVerifierRef.current && recaptchaContainerRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(
          auth,
          recaptchaContainerRef.current,
          {
            size: 'invisible',
            callback: () => {
              // reCAPTCHA solved
            }
          }
        );
      } catch (error) {
        console.error('Error initializing reCAPTCHA:', error);
      }
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, [authMethod]);

  // OTP Resend Timer
  useEffect(() => {
    if (otpResendTimer > 0) {
      const timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResendTimer]);

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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    // Check if it's a valid phone number (at least 10 digits)
    return cleaned.length >= 10;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    // Add + if not present and format
    if (cleaned.length > 0 && !value.startsWith('+')) {
      return `+${cleaned}`;
    }
    return value;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoadingState(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setLoadingState(false);
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoadingState(false);
      return;
    }

    if (authMode === 'signup' && !name.trim()) {
      setError('Please enter your name');
      setLoadingState(false);
      return;
    }

    try {
      if (authMode === 'signup') {
        await signUpWithEmail(email, password, name);
        setSuccess('Account created! Please check your email for verification.');
        setLoadingState(false);
        // Reset form
        setEmail('');
        setPassword('');
        setName('');
      } else {
        await signInWithEmail(email, password);
        // Success - user will be redirected automatically
        // Loading state will be reset when component unmounts or redirects
      }
    } catch (error: any) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (firebaseError.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (firebaseError.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (firebaseError.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up first.');
      } else if (firebaseError.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (firebaseError.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(firebaseError.message || 'Authentication failed. Please try again.');
      }
      setLoadingState(false);
    }
  };

  const handlePhoneOTPSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid phone number (include country code, e.g., +1234567890)');
      return;
    }

    if (!recaptchaVerifierRef.current) {
      setError('reCAPTCHA not initialized. Please refresh the page.');
      return;
    }

    setLoadingState(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const confirmation = await sendPhoneOTP(formattedPhone, recaptchaVerifierRef.current);
      confirmationResultRef.current = confirmation;
      setOtpSent(true);
      setOtpResendTimer(60);
      setSuccess('OTP sent to your phone number');
    } catch (error: any) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please check and try again.');
      } else if (firebaseError.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else if (firebaseError.code === 'auth/captcha-check-failed') {
        setError('reCAPTCHA verification failed. Please try again.');
      } else {
        setError(firebaseError.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoadingState(false);
    }
  };

  const handlePhoneOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResultRef.current) {
      setError('OTP session expired. Please request a new OTP.');
      return;
    }

    setLoadingState(true);
    try {
      await verifyPhoneOTP(confirmationResultRef.current, otp);
      setOtpSent(false);
      setOtp('');
      setPhoneNumber('');
    } catch (error: any) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please check and try again.');
      } else if (firebaseError.code === 'auth/code-expired') {
        setError('OTP has expired. Please request a new one.');
        setOtpSent(false);
      } else {
        setError(firebaseError.message || 'Failed to verify OTP. Please try again.');
      }
      setLoadingState(false);
    }
  };

  const handleResendOTP = async () => {
    if (otpResendTimer > 0) return;
    setError(null);
    setOtpSent(false);
    setOtp('');
    await handlePhoneOTPSend(new Event('submit') as any);
  };

  const handleGoogleSignIn = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setError(null);
    setSuccess(null);
    setLoadingState(true);
    try {
      await signInWithGoogle();
      // Success - user will be redirected automatically by the auth state change
      // Loading state will be reset when component unmounts or redirects
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/popup-blocked') {
        setError('Pop-up blocked! Please allow pop-ups for this site in your browser settings and try again.');
      } else if (firebaseError.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (firebaseError.code === 'auth/popup-closed-by-user') {
        setError('Sign-in window was closed. Please try again.');
      } else if (firebaseError.code === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection and try again.');
      } else {
        setError(firebaseError.message || 'Failed to sign in. Please try again.');
      }
      setLoadingState(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoadingState(true);
    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Please check your inbox.');
      setForgotPassword(false);
    } catch (error: any) {
      const firebaseError = error as { code?: string; message?: string };
      
      if (firebaseError.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else {
        setError(firebaseError.message || 'Failed to send reset email. Please try again.');
      }
      setLoadingState(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhoneNumber('');
    setOtp('');
    setOtpSent(false);
    setError(null);
    setSuccess(null);
    setForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-animated-gradient flex relative overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground particleCount={20} />
      
      {/* LEFT SIDE - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center pl-4 pr-0 py-8 relative z-10">
        <div className="max-w-2xl w-full ml-auto -mr-8 slide-in-left">
          <NeumorphicCard variant="floating" padding="xl" className="pulse-glow">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                <img 
                  src="/logo_icon_1024.png" 
                  alt="ARIS Logo" 
                  className="w-24 h-24 relative z-10 icon-bounce"
                />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-high-contrast mb-6 text-center slide-up">
              <span className="text-orange-500">ARIS</span> - AI Data Analyst
            </h1>
            <p className="text-secondary-contrast text-xl leading-relaxed mb-8 text-center slide-up">
              Master data analysis with AI-powered tutors, practice tests, and personalized learning paths.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <NeumorphicCard padding="md" className="text-center card-hover-animate transition-all duration-300 hover:scale-105">
                <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-3 icon-bounce" />
                <p className="text-base font-medium text-high-contrast">Analytics</p>
                <p className="text-sm text-secondary-contrast">Specialized Tutors</p>
              </NeumorphicCard>
              <NeumorphicCard padding="md" className="text-center card-hover-animate transition-all duration-300 hover:scale-105">
                <BarChart3 className="w-12 h-12 text-orange-500 mx-auto mb-3 icon-bounce-delay-1" />
                <p className="text-base font-medium text-high-contrast">Analytics</p>
                <p className="text-sm text-secondary-contrast">Track Progress</p>
              </NeumorphicCard>
              <NeumorphicCard padding="md" className="text-center card-hover-animate transition-all duration-300 hover:scale-105">
                <Brain className="w-12 h-12 text-orange-500 mx-auto mb-3 icon-bounce-delay-2" />
                <p className="text-base font-medium text-high-contrast">Analytics</p>
                <p className="text-sm text-secondary-contrast">Practice Tests</p>
              </NeumorphicCard>
            </div>
          </NeumorphicCard>
        </div>
      </div>

      {/* RIGHT SIDE - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center pl-0 pr-4 py-4 relative z-10">
        <div className="w-full max-w-md -ml-8 slide-in-right">
          <NeumorphicCard variant="floating" padding="xl" className="w-full tab-content bg-white shadow-none">
            {/* Tabs: Sign In / Sign Up */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setAuthMode('signin');
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  authMode === 'signin'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  resetForm();
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  authMode === 'signup'
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="text-center mb-6 slide-up">
              <h3 className="text-2xl font-bold text-high-contrast mb-2">
                {authMode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-secondary-contrast">
                {authMode === 'signin' 
                  ? 'Sign in to continue your learning journey' 
                  : 'Start your data analysis journey today'}
              </p>
            </div>

            {/* Auth Method Selector */}
            {!forgotPassword && (
              <div className="flex gap-2 mb-6 slide-up">
                <button
                  onClick={() => {
                    setAuthMethod('email');
                    resetForm();
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 ${
                    authMethod === 'email'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mail className={`w-4 h-4 ${authMethod === 'email' ? 'icon-bounce' : ''}`} />
                  Email
                </button>
                <button
                  onClick={() => {
                    setAuthMethod('phone');
                    resetForm();
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 ${
                    authMethod === 'phone'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Phone className={`w-4 h-4 ${authMethod === 'phone' ? 'icon-bounce' : ''}`} />
                  Phone
                </button>
                <button
                  onClick={() => {
                    setAuthMethod('google');
                    resetForm();
                  }}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 ${
                    authMethod === 'google'
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <svg className={`w-4 h-4 ${authMethod === 'google' ? 'icon-bounce' : ''}`} viewBox="0 0 24 24">
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
                  Google
                </button>
              </div>
            )}

            {/* Error/Success Messages */}
            {error && (
              <NeumorphicCard variant="default" padding="sm" className="mb-4 bg-red-50/10 border border-red-500/50 shake slide-up">
                <p className="text-red-500 text-sm text-center flex items-center justify-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </NeumorphicCard>
            )}

            {success && (
              <NeumorphicCard variant="default" padding="sm" className="mb-4 bg-green-50/10 border border-green-500/50 slide-up">
                <p className="text-green-500 text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 checkmark-animate" />
                  {success}
                </p>
              </NeumorphicCard>
            )}

            {/* reCAPTCHA Container (hidden) */}
            <div ref={recaptchaContainerRef} id="recaptcha-container"></div>

            {/* Email Authentication Form */}
            {authMethod === 'email' && !forgotPassword && (
              <form onSubmit={handleEmailAuth} className="space-y-4 slide-up">
                {authMode === 'signup' && (
                  <FloatingLabelInput
                    type="text"
                    label="Full Name"
                    icon={User}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                )}

                <FloatingLabelInput
                  type="email"
                  label="Email Address"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!(error && error.includes('email'))}
                  required
                />

                <div className="relative">
                  <FloatingLabelInput
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!(error && error.includes('password'))}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300 z-20"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {authMode === 'signin' && (
                  <div className="flex justify-end slide-up">
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-sm text-orange-500 hover:text-orange-400 transition-colors duration-300"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <RippleButton
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  loading={loadingState}
                  disabled={loadingState}
                >
                  {loadingState ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      {authMode === 'signup' ? 'Creating Account...' : 'Signing in...'}
                    </div>
                  ) : (
                    authMode === 'signup' ? 'Create Account' : 'Sign In'
                  )}
                </RippleButton>
              </form>
            )}

            {/* Forgot Password Form */}
            {authMethod === 'email' && forgotPassword && (
              <form onSubmit={handleForgotPassword} className="space-y-4 slide-up">
                <FloatingLabelInput
                  type="email"
                  label="Email Address"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!(error && error.includes('email'))}
                  required
                />

                <div className="flex gap-2">
                  <RippleButton
                    type="button"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={() => {
                      setForgotPassword(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </RippleButton>
                  <RippleButton
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="flex-1"
                    loading={loadingState}
                    disabled={loadingState}
                  >
                    {loadingState ? 'Sending...' : 'Send Reset Link'}
                  </RippleButton>
                </div>
              </form>
            )}

            {/* Phone Authentication Form */}
            {authMethod === 'phone' && !otpSent && (
              <form onSubmit={handlePhoneOTPSend} className="space-y-4 slide-up">
                <FloatingLabelInput
                  type="tel"
                  label="Phone Number"
                  icon={Phone}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!(error && error.includes('phone'))}
                  required
                />
                <p className="text-xs text-gray-400 mt-1 slide-up">
                  Include country code (e.g., +1 for US, +91 for India)
                </p>

                <RippleButton
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  loading={loadingState}
                  disabled={loadingState}
                >
                  {loadingState ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </RippleButton>
              </form>
            )}

            {/* Phone OTP Verification Form */}
            {authMethod === 'phone' && otpSent && (
              <form onSubmit={handlePhoneOTPVerify} className="space-y-4 slide-up">
                <div>
                  <label className="block text-sm font-medium text-high-contrast mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="otp-input w-full px-4 py-3 rounded-lg border border-gray-300 bg-white/5 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl tracking-widest text-white"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1 text-center slide-up">
                    OTP sent to {phoneNumber}
                  </p>
                </div>

                <RippleButton
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  loading={loadingState}
                  disabled={loadingState || otp.length !== 6}
                >
                  {loadingState ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </RippleButton>

                <div className="text-center slide-up">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={otpResendTimer > 0}
                    className={`text-sm transition-all duration-300 ${
                      otpResendTimer > 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-orange-500 hover:text-orange-400'
                    }`}
                  >
                    {otpResendTimer > 0
                      ? `Resend OTP in ${otpResendTimer}s`
                      : 'Resend OTP'}
                  </button>
                </div>
              </form>
            )}

            {/* Google Authentication */}
            {authMethod === 'google' && (
              <div className="space-y-4 slide-up">
                <RippleButton
                  type="button"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={(e) => handleGoogleSignIn(e)}
                  loading={loadingState}
                  disabled={loadingState}
                >
                  {loadingState ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 icon-bounce" viewBox="0 0 24 24">
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
                </RippleButton>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-300">
                By {authMode === 'signin' ? 'signing in' : 'signing up'}, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
