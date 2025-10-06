import { auth } from './config';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User,
  onAuthStateChanged
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