import { gapiComplete, loadGapiInsideDOM } from 'gapi-script';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLASSROOM_CLIENT_ID;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest'];
const SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly'
].join(' ');

export interface GoogleClassroomToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  scope: string;
}

export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  description?: string;
  room?: string;
  ownerId: string;
  creationTime?: string;
  updateTime?: string;
  enrollmentCode?: string;
  courseState: string;
  alternateLink?: string;
  teacherGroupEmail?: string;
  courseGroupEmail?: string;
  teacherFolder?: {
    id: string;
    title: string;
    alternateLink: string;
  };
  courseMaterialSets?: Array<{
    title: string;
    materials: Array<{
      driveFile?: {
        driveFile: {
          id: string;
          title: string;
          alternateLink: string;
        };
      };
      youTubeVideo?: {
        id: string;
        title: string;
        alternateLink: string;
      };
      link?: {
        url: string;
        title: string;
      };
    }>;
  }>;
}

export interface ClassroomCoursework {
  id: string;
  title: string;
  description?: string;
  materials?: Array<{
    driveFile?: {
      driveFile: {
        id: string;
        title: string;
        alternateLink: string;
      };
    };
    youTubeVideo?: {
      id: string;
      title: string;
      alternateLink: string;
    };
    link?: {
      url: string;
      title: string;
    };
  }>;
  state: string;
  alternateLink?: string;
  creationTime: string;
  updateTime: string;
  dueDate?: {
    year: number;
    month: number;
    day: number;
  };
  dueTime?: {
    hours: number;
    minutes: number;
  };
  maxPoints?: number;
  workType: string;
  associatedWithDeveloper?: boolean;
  assigneeMode: string;
  individualStudentsOptions?: {
    studentIds: string[];
  };
  submissionModificationMode: string;
  creatorUserId: string;
  topicId?: string;
}

export interface StudentSubmission {
  id: string;
  userId: string;
  courseId: string;
  courseWorkId: string;
  state: string;
  assignedGrade?: number;
  draftGrade?: number;
  courseWorkType: string;
  creationTime: string;
  updateTime: string;
  alternateLink?: string;
}

let gapiLoaded = false;
let gapiInitialized = false;

// Load Google API
export const loadGoogleAPI = async (): Promise<void> => {
  if (gapiLoaded) return;
  
  try {
    // Load gapi into the DOM if not already loaded
    if (!window.gapi) {
      await loadGapiInsideDOM();
    } else {
      // Wait for gapi to be complete if it's already loading
      await gapiComplete;
    }
    gapiLoaded = true;
  } catch (error) {
    console.error('Error loading Google API:', error);
    throw error;
  }
};

// Initialize Google API
export const initGoogleAPI = async (): Promise<void> => {
  if (gapiInitialized) return;
  
  if (!gapiLoaded) {
    await loadGoogleAPI();
  }

  // Wait for gapi to be available
  if (!window.gapi) {
    throw new Error('Google API not loaded');
  }

  try {
    // First load client and auth2
    await new Promise<void>((resolve, reject) => {
      window.gapi.load('client:auth2', () => {
        resolve();
      });
    });

    // Initialize the client
    await window.gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });

    // Initialize auth2
    await window.gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES
    });

    gapiInitialized = true;
  } catch (error) {
    console.error('Error initializing Google API:', error);
    throw error;
  }
};

// Get stored token from Firestore
export const getStoredToken = async (userId: string): Promise<GoogleClassroomToken | null> => {
  try {
    if (!userId) return null;
    const tokenDoc = await getDoc(doc(db, 'users', userId, 'classroomTokens', 'token'));
    if (tokenDoc.exists()) {
      const data = tokenDoc.data();
      // Check if token is valid (has accessToken and expiresAt)
      if (data && data.accessToken && data.expiresAt) {
        return data as GoogleClassroomToken;
      }
    }
    return null;
  } catch (error: any) {
    // Silently handle permission errors - user just needs to authenticate
    if (error?.code === 'permission-denied') {
      return null;
    }
    console.error('Error getting stored token:', error);
    return null;
  }
};

// Store token in Firestore
export const storeToken = async (userId: string, token: GoogleClassroomToken): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', userId, 'classroomTokens', 'token'), token);
  } catch (error) {
    console.error('Error storing token:', error);
    throw error;
  }
};

// Check if token is expired
export const isTokenExpired = (token: GoogleClassroomToken): boolean => {
  return Date.now() >= token.expiresAt;
};

// Authenticate with Google
export const authenticateWithGoogle = async (userId: string): Promise<GoogleClassroomToken> => {
  try {
    if (!CLIENT_ID) {
      throw new Error('Google Classroom Client ID is not configured. Please check your environment variables.');
    }

    await initGoogleAPI();
    
    if (!window.gapi || !window.gapi.auth2) {
      throw new Error('Google API not initialized. Please try again.');
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      // Try to initialize auth2 if not available
      try {
        await window.gapi.auth2.init({
          client_id: CLIENT_ID,
          scope: SCOPES
        });
        const newAuthInstance = window.gapi.auth2.getAuthInstance();
        if (!newAuthInstance) {
          throw new Error('Failed to initialize Google authentication. Please refresh the page and try again.');
        }
        
        const user = await newAuthInstance.signIn();
        const authResponse = user.getAuthResponse(true);
        
        const token: GoogleClassroomToken = {
          accessToken: authResponse.access_token,
          refreshToken: authResponse.refresh_token,
          expiresAt: Date.now() + (authResponse.expires_in * 1000),
          scope: authResponse.scope
        };
        
        await storeToken(userId, token);
        return token;
      } catch (initError) {
        throw new Error('Failed to initialize Google authentication. Please refresh the page and try again.');
      }
    }
    
    const user = await authInstance.signIn();
    const authResponse = user.getAuthResponse(true);
    
    if (!authResponse || !authResponse.access_token) {
      throw new Error('Authentication failed. Please try again.');
    }
    
    const token: GoogleClassroomToken = {
      accessToken: authResponse.access_token,
      refreshToken: authResponse.refresh_token,
      expiresAt: Date.now() + (authResponse.expires_in * 1000),
      scope: authResponse.scope
    };
    
    await storeToken(userId, token);
    return token;
  } catch (error: any) {
    // Log full error for debugging
    console.error('Error authenticating with Google - Full error:', JSON.stringify(error, null, 2));
    console.error('Error authenticating with Google:', error);
    
    // Handle specific error types
    if (error?.error === 'popup_closed_by_user') {
      throw new Error('Sign-in was cancelled. Please try again and complete the sign-in process.');
    }
    
    if (error?.error === 'access_denied') {
      throw new Error('Access was denied. Please grant the required permissions to use Google Classroom.');
    }
    
    if (error?.error === 'redirect_uri_mismatch' || error?.message?.includes('redirect_uri_mismatch')) {
      throw new Error('OAuth configuration error: Redirect URI mismatch. Please check Google Cloud Console settings. The redirect URI must match exactly: http://localhost:5173');
    }
    
    if (error?.error === 'invalid_client') {
      throw new Error('Invalid OAuth client configuration. Please check your Client ID in the environment variables.');
    }
    
    // Handle server_error - usually means OAuth consent screen or app configuration issue
    if (error?.error === 'server_error') {
      throw new Error('Google authentication server error. This usually means: 1) OAuth consent screen is not properly configured, 2) App is in Testing mode and your email is not added as a test user, or 3) Required scopes are not approved. Please check Google Cloud Console OAuth consent screen settings.');
    }
    
    // Handle 403 errors - usually means permission or configuration issue
    if (error?.status === 403 || error?.code === 403 || error?.message?.includes('403')) {
      throw new Error('Access forbidden (403). Please verify: 1) OAuth consent screen is configured, 2) Your email is added as a test user (if app is in Testing mode), 3) All required Classroom scopes are added and approved.');
    }
    
    // Extract error message from Google error object
    if (error?.error) {
      const errorMsg = error.error;
      if (errorMsg === 'server_error') {
        throw new Error('Google authentication server error. Please check OAuth consent screen configuration in Google Cloud Console.');
      }
      throw new Error(`Google authentication error: ${errorMsg}. Please try again or contact support if the issue persists.`);
    }
    
    // Use the error message if available, otherwise provide a generic one
    if (error?.message) {
      throw error;
    }
    
    throw new Error('Failed to authenticate with Google Classroom. Please try again.');
  }
};

// Get access token (with auto-refresh if needed)
export const getAccessToken = async (userId: string): Promise<string | null> => {
  try {
    let token = await getStoredToken(userId);
    
    if (!token) {
      return null;
    }
    
    // Check if token is expired
    if (isTokenExpired(token)) {
      // Try to refresh token
      if (token.refreshToken) {
        try {
          await initGoogleAPI();
          if (!window.gapi || !window.gapi.auth2) {
            return null;
          }
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance && authInstance.isSignedIn.get()) {
            await authInstance.currentUser.get().reloadAuthResponse();
            const user = authInstance.currentUser.get();
            const authResponse = user.getAuthResponse(true);
            
            token = {
              accessToken: authResponse.access_token,
              refreshToken: authResponse.refresh_token || token.refreshToken,
              expiresAt: Date.now() + (authResponse.expires_in * 1000),
              scope: authResponse.scope
            };
            
            await storeToken(userId, token);
          } else {
            // Not signed in, need to re-authenticate
            return null;
          }
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Token refresh failed, need to re-authenticate
          return null;
        }
      } else {
        // No refresh token, need to re-authenticate
        return null;
      }
    }
    
    return token.accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = async (userId: string): Promise<boolean> => {
  const token = await getStoredToken(userId);
  if (!token) return false;
  if (isTokenExpired(token)) {
    // Try to refresh
    const accessToken = await getAccessToken(userId);
    return accessToken !== null;
  }
  return true;
};

// Sign out from Google Classroom
export const signOutFromGoogle = async (userId: string): Promise<void> => {
  try {
    if (gapiInitialized && window.gapi && window.gapi.auth2) {
      try {
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance && authInstance.isSignedIn.get()) {
          await authInstance.signOut();
        }
      } catch (error) {
        console.error('Error signing out from Google auth:', error);
        // Continue to remove token even if signOut fails
      }
    }
    
    // Remove token from Firestore
    await setDoc(doc(db, 'users', userId, 'classroomTokens', 'token'), {
      accessToken: '',
      expiresAt: 0
    });
  } catch (error) {
    console.error('Error signing out from Google:', error);
    throw error;
  }
};

// List all courses
export const listCourses = async (userId: string): Promise<ClassroomCourse[]> => {
  try {
    const accessToken = await getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in to Google Classroom.');
    }
    
    await initGoogleAPI();
    if (!window.gapi || !window.gapi.client) {
      throw new Error('Google API client not initialized');
    }
    
    window.gapi.client.setToken({ access_token: accessToken });
    
    const response = await window.gapi.client.classroom.courses.list({
      studentId: 'me',
      courseStates: 'ACTIVE'
    });
    
    if (response.result && response.result.courses) {
      return response.result.courses as ClassroomCourse[];
    }
    return [];
  } catch (error) {
    console.error('Error listing courses:', error);
    throw error;
  }
};

// Get course details
export const getCourse = async (userId: string, courseId: string): Promise<ClassroomCourse> => {
  try {
    const accessToken = await getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in to Google Classroom.');
    }
    
    await initGoogleAPI();
    if (!window.gapi || !window.gapi.client) {
      throw new Error('Google API client not initialized');
    }
    
    window.gapi.client.setToken({ access_token: accessToken });
    
    const response = await window.gapi.client.classroom.courses.get({
      id: courseId
    });
    
    if (!response.result) {
      throw new Error('No course data returned');
    }
    
    return response.result as ClassroomCourse;
  } catch (error) {
    console.error('Error getting course:', error);
    throw error;
  }
};

// List coursework (assignments) for a course
export const listCoursework = async (userId: string, courseId: string): Promise<ClassroomCoursework[]> => {
  try {
    const accessToken = await getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in to Google Classroom.');
    }
    
    await initGoogleAPI();
    if (!window.gapi || !window.gapi.client) {
      throw new Error('Google API client not initialized');
    }
    
    window.gapi.client.setToken({ access_token: accessToken });
    
    const response = await window.gapi.client.classroom.courses.courseWork.list({
      courseId: courseId
    });
    
    if (response.result && response.result.courseWork) {
      return response.result.courseWork as ClassroomCoursework[];
    }
    return [];
  } catch (error) {
    console.error('Error listing coursework:', error);
    throw error;
  }
};

// Get student submissions for a coursework
export const getStudentSubmissions = async (
  userId: string,
  courseId: string,
  courseWorkId: string
): Promise<StudentSubmission[]> => {
  try {
    const accessToken = await getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in to Google Classroom.');
    }
    
    await initGoogleAPI();
    if (!window.gapi || !window.gapi.client) {
      throw new Error('Google API client not initialized');
    }
    
    window.gapi.client.setToken({ access_token: accessToken });
    
    const response = await window.gapi.client.classroom.courses.courseWork.studentSubmissions.list({
      courseId: courseId,
      courseWorkId: courseWorkId,
      userId: 'me'
    });
    
    if (response.result && response.result.studentSubmissions) {
      return response.result.studentSubmissions as StudentSubmission[];
    }
    return [];
  } catch (error) {
    console.error('Error getting student submissions:', error);
    throw error;
  }
};

// Join a course with enrollment code
export const joinCourse = async (userId: string, enrollmentCode: string): Promise<ClassroomCourse> => {
  try {
    const accessToken = await getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Not authenticated. Please sign in to Google Classroom.');
    }
    
    await initGoogleAPI();
    if (!window.gapi || !window.gapi.client) {
      throw new Error('Google API client not initialized');
    }
    
    window.gapi.client.setToken({ access_token: accessToken });
    
    const response = await window.gapi.client.classroom.courses.join({
      enrollmentCode: enrollmentCode
    });
    
    if (!response.result) {
      throw new Error('No course data returned');
    }
    
    return response.result as ClassroomCourse;
  } catch (error) {
    console.error('Error joining course:', error);
    throw error;
  }
};

// Declare gapi types for TypeScript
declare global {
  interface Window {
    gapi: any;
  }
}

