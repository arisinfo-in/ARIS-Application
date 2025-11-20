import { auth } from './config';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user profile if doesn't exist
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        role: 'user',
        createdAt: new Date().toISOString(),
        photoURL: user.photoURL || ''
      });
    }
    
    return user;
  } catch (error) {
    const firebaseError = error as { code?: string };
    
    // Don't log popup-blocked errors as they're handled in the UI
    if (firebaseError.code !== 'auth/popup-blocked') {
      console.error('Error signing in with Google:', error);
    }
    
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    
    // Update profile with name
    await updateProfile(user, { displayName: name });
    
    // Send email verification
    await sendEmailVerification(user);
    
    // Create user profile in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name: name,
      email: user.email || '',
      role: 'user',
      createdAt: new Date().toISOString(),
      photoURL: '',
      emailVerified: false
    });
    
    return user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

// Send Email Verification
export const resendEmailVerification = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Phone Number OTP - Send Code
export const sendPhoneOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier): Promise<ConfirmationResult> => {
  try {
    // Ensure phone number is in E.164 format
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending phone OTP:', error);
    throw error;
  }
};

// Phone Number OTP - Verify Code
export const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, otp: string) => {
  try {
    const result = await confirmationResult.confirm(otp);
    const user = result.user;
    
    // Create user profile if doesn't exist
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: 'user',
        createdAt: new Date().toISOString(),
        photoURL: user.photoURL || ''
      });
    }
    
    return user;
  } catch (error) {
    console.error('Error verifying phone OTP:', error);
    throw error;
  }
};

// Password Reset
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset:', error);
    throw error;
  }
};