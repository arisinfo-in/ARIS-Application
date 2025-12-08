import React, { useEffect, useState, useRef } from 'react';
import { Phone, AlertCircle, X, CheckCircle, Loader2 } from 'lucide-react';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import { auth } from '../firebase/config';
import { sendPhoneOTP, verifyPhoneOTP } from '../firebase/auth';
import { firestoreOperations } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

interface MobileNumberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNumberModal: React.FC<MobileNumberModalProps> = ({ isOpen, onClose }) => {
  const { user, refreshUserProfile } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Initialize reCAPTCHA verifier with a delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (!recaptchaVerifierRef.current) {
          try {
            // Use the container element reference
            const container = recaptchaContainerRef.current;
            if (container) {
              // Clear any existing reCAPTCHA widgets first
              const existingWidget = document.getElementById('recaptcha-container');
              if (existingWidget) {
                existingWidget.innerHTML = '';
              }
              
              recaptchaVerifierRef.current = new RecaptchaVerifier(auth, container, {
                size: 'invisible',
                callback: () => {
                  // reCAPTCHA solved, will allow sending SMS
                  console.log('reCAPTCHA verified successfully');
                },
                'expired-callback': () => {
                  setError('reCAPTCHA expired. Please try again.');
                  // Re-initialize on expiration
                  if (recaptchaVerifierRef.current) {
                    recaptchaVerifierRef.current.clear();
                    recaptchaVerifierRef.current = null;
                  }
                }
              });
            }
          } catch (error: any) {
            console.error('Error initializing reCAPTCHA:', error);
            setError('Failed to initialize reCAPTCHA. Please ensure Phone Authentication is enabled in Firebase Console.');
          }
        }
      }, 200);

      return () => {
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = 'unset';
      // Clean up reCAPTCHA
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (error) {
          console.error('Error clearing reCAPTCHA:', error);
        }
        recaptchaVerifierRef.current = null;
      }
      // Reset state
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setError(null);
      setConfirmationResult(null);
    }
  }, [isOpen]);

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // If starts with country code, format accordingly
    if (digits.length > 10) {
      return `+${digits}`;
    }
    
    // Format as US number if 10 digits
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    
    // Return with + if it doesn't have it
    if (digits.length > 0 && !value.startsWith('+')) {
      return `+${digits}`;
    }
    
    return value;
  };

  const handleSendOTP = async () => {
    if (!user) {
      setError('You must be logged in to verify your phone number.');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number with country code (e.g., +1234567890)');
      return;
    }

    if (!recaptchaVerifierRef.current) {
      setError('reCAPTCHA not initialized. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const result = await sendPhoneOTP(formattedPhone, recaptchaVerifierRef.current);
      setConfirmationResult(result);
      setStep('otp');
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.code === 'auth/invalid-phone-number') {
        errorMessage = 'Invalid phone number format. Please include country code (e.g., +1234567890)';
      } else if (error.code === 'auth/too-many-requests') {
        // IMPORTANT: Firebase rate limits by IP address/device, NOT just phone number
        // Even with a different phone number, same IP/device will be rate limited
        errorMessage = 'Too many OTP requests from this device/IP address. Firebase rate limits apply to your device/IP, not just the phone number. Please wait 15-30 minutes, use a different network, or use test phone numbers for development.';
        
        // Clear reCAPTCHA immediately on rate limit to prevent further issues
        // Don't re-initialize immediately - user needs to wait
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
            recaptchaVerifierRef.current = null;
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
        }
        // Don't re-initialize reCAPTCHA on rate limit - user must wait
      } else if (error.code === 'auth/captcha-check-failed') {
        errorMessage = 'reCAPTCHA verification failed. Please refresh and try again.';
        // Reset and re-initialize reCAPTCHA
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
        // Re-initialize after a delay
        setTimeout(() => {
          if (recaptchaContainerRef.current) {
            try {
              recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
                size: 'invisible',
                callback: () => {},
                'expired-callback': () => {
                  setError('reCAPTCHA expired. Please try again.');
                }
              });
            } catch (initError) {
              console.error('Error re-initializing reCAPTCHA:', initError);
            }
          }
        }, 1000);
      } else if (error.code === 'auth/invalid-app-credential') {
        errorMessage = 'Phone Authentication is not properly configured. Please enable Phone Authentication in Firebase Console (Authentication → Sign-in method → Phone).';
        // Reset reCAPTCHA on error
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
      } else if (error.code === 'auth/missing-or-invalid-nonce') {
        errorMessage = 'reCAPTCHA verification failed. Please refresh the page and try again.';
        // Reset and re-initialize reCAPTCHA
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
        // Re-initialize after a delay
        setTimeout(() => {
          if (recaptchaContainerRef.current) {
            try {
              recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
                size: 'invisible',
                callback: () => {},
                'expired-callback': () => {
                  setError('reCAPTCHA expired. Please try again.');
                }
              });
            } catch (initError) {
              console.error('Error re-initializing reCAPTCHA:', initError);
            }
          }
        }, 1000);
      } else if (error.code === 'auth/app-not-authorized') {
        errorMessage = 'This app is not authorized. Please check Firebase Console settings and authorized domains.';
        // Reset reCAPTCHA on error
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'SMS sending is not enabled for this phone number region. Please enable the country/region in Firebase Console (Authentication → Sign-in method → Phone → Phone numbers → Enable regions).';
        // Reset reCAPTCHA on error
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
      } else {
        // For other errors, reset and re-initialize reCAPTCHA
        if (recaptchaVerifierRef.current) {
          try {
            recaptchaVerifierRef.current.clear();
          } catch (clearError) {
            console.error('Error clearing reCAPTCHA:', clearError);
          }
          recaptchaVerifierRef.current = null;
        }
        // Re-initialize after a delay
        setTimeout(() => {
          if (recaptchaContainerRef.current) {
            try {
              recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
                size: 'invisible',
                callback: () => {},
                'expired-callback': () => {
                  setError('reCAPTCHA expired. Please try again.');
                }
              });
            } catch (initError) {
              console.error('Error re-initializing reCAPTCHA:', initError);
            }
          }
        }, 1000);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!user) {
      setError('You must be logged in to verify your phone number.');
      return;
    }

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    if (!confirmationResult) {
      setError('OTP session expired. Please request a new code.');
      setStep('phone');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Verify OTP - this verifies the phone number
      await verifyPhoneOTP(confirmationResult, otp);
      
      // IMPORTANT: Use the current authenticated user's UID (from AuthContext)
      // This ensures we update the correct user document that the user is currently signed in with
      // Phone verification just confirms the phone number, it doesn't change the authenticated user
      if (!user || !user.uid) {
        throw new Error('User not authenticated. Please sign in again.');
      }
      
      // Update user profile with phone number and trial information
      const formattedPhone = formatPhoneNumber(phoneNumber);
      await firestoreOperations.updateUserPhone(user.uid, formattedPhone);
      
      // Mark as verified locally
      setIsVerified(true);
      
      // Refresh user profile instead of reloading page
      // This ensures the modal closes and user can access the app without full page reload
      if (refreshUserProfile) {
        await refreshUserProfile();
      }
      
      // Close modal after a brief delay to show success message
      // The modal will automatically close when phoneVerified becomes true in AuthContext
      setTimeout(() => {
        // Modal will close automatically when phoneVerified becomes true
      }, 1500);
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      let errorMessage = 'Invalid OTP code. Please try again.';
      
      if (error.code === 'auth/invalid-verification-code') {
        errorMessage = 'Invalid OTP code. Please check and try again.';
      } else if (error.code === 'auth/code-expired') {
        errorMessage = 'OTP code has expired. Please request a new code.';
        setStep('phone');
        setConfirmationResult(null);
      } else if (error.code === 'auth/session-expired') {
        errorMessage = 'Session expired. Please request a new OTP.';
        setStep('phone');
        setConfirmationResult(null);
      } else if (error.code === 'permission-denied' || error.message?.includes('permission') || error.message?.includes('Missing or insufficient permissions')) {
        errorMessage = 'Permission denied. The phone number was verified, but we couldn\'t update your profile. Please refresh the page.';
        // Reload after a delay to refresh auth state
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setStep('phone');
    setOtp('');
    setConfirmationResult(null);
    setError(null);
    // Re-initialize reCAPTCHA
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
    }
    if (recaptchaContainerRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
          size: 'invisible',
          callback: () => {},
          'expired-callback': () => {
            setError('reCAPTCHA expired. Please try again.');
          }
        });
      } catch (initError) {
        console.error('Error re-initializing reCAPTCHA:', initError);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="animate-scaleIn w-full max-w-md">
        <NeumorphicCard className="w-full" variant="dark" padding="lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Phone className="text-orange-500 animate-pulse" size={28} />
                <CheckCircle className="absolute -top-1 -right-1 text-green-400" size={16} />
              </div>
              <h2 className="text-2xl font-bold text-gray-100">
                {step === 'phone' ? 'Verify Your Phone' : 'Enter OTP Code'}
              </h2>
            </div>
            {/* Close button disabled until phone is verified */}
            {isVerified ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-green-400 text-sm">Verified!</span>
              </div>
            ) : (
              <div className="w-6 h-6" /> // Placeholder to maintain layout
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-6">
            {isVerified ? (
              <div className="text-center py-4">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <p className="text-gray-100 text-lg font-semibold mb-2">
                  Phone Verified Successfully!
                </p>
                <p className="text-gray-300 text-sm">
                  Your 15-day free trial has been activated. Redirecting...
                </p>
              </div>
            ) : step === 'phone' ? (
              <>
                <div>
                  <p className="text-gray-100 text-lg font-semibold mb-2">
                    Get 15 Days Free Trial
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    Enter your mobile number to unlock <span className="text-orange-400 font-medium">15 days of free access</span> to all premium features. We'll send you a verification code via SMS.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Phone Number (with country code)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1234567890"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    disabled={loading}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !loading) {
                        handleSendOTP();
                      }
                    }}
                  />
                  <p className="text-xs text-gray-400">
                    Include country code (e.g., +1 for USA, +91 for India)
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <CheckCircle className="text-green-500" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-100 text-lg font-semibold mb-2">
                      Enter Verification Code
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      We've sent a 6-digit code to <span className="text-orange-400 font-medium">{phoneNumber}</span>. Please enter it below.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    placeholder="000000"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
                    disabled={loading}
                    maxLength={6}
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !loading && otp.length === 6) {
                        handleVerifyOTP();
                      }
                    }}
                  />
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="text-red-300 text-sm">{error}</p>
                  {error.includes('too-many-requests') && (
                    <div className="mt-2 p-2 bg-blue-900/20 border border-blue-700 rounded text-xs text-blue-300">
                      <p className="font-semibold mb-1">💡 Solutions:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Wait 15-30 minutes for rate limit to reset</li>
                        <li>Use a different network/IP address (mobile data, different WiFi)</li>
                        <li>Use test phone numbers for development (no rate limits)</li>
                        <li>Clear browser cache and try again later</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* reCAPTCHA Container (invisible) */}
            <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
          </div>

          {/* Action Buttons */}
          {!isVerified && (
            <div className="flex flex-col gap-3">
              {step === 'phone' ? (
              <NeumorphicButton
                variant="accent"
                onClick={handleSendOTP}
                className="w-full"
                disabled={loading || !phoneNumber}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Send OTP</span>
                    <Phone size={18} />
                  </div>
                )}
              </NeumorphicButton>
            ) : (
              <>
                <NeumorphicButton
                  variant="accent"
                  onClick={handleVerifyOTP}
                  className="w-full"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Verify OTP</span>
                      <CheckCircle size={18} />
                    </div>
                  )}
                </NeumorphicButton>
                <NeumorphicButton
                  variant="secondary"
                  onClick={handleResendOTP}
                  className="w-full"
                  disabled={loading}
                >
                  Resend OTP
                </NeumorphicButton>
              </>
              )}
            </div>
          )}
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default MobileNumberModal;

