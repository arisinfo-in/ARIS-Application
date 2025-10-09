import { db } from './config';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

// User types
export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  photoURL?: string;
}

// AI Session types
export interface AIMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export interface AISession {
  id: string;
  userId: string;
  module: string;
  messages: AIMessage[];
  createdAt: string;
}

// Test types
export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Test {
  id: string;
  title: string;
  module: string;
  questions: TestQuestion[];
  createdBy: string;
  createdAt: string;
  isDefault?: boolean;
  isCustom?: boolean;
  isDynamic?: boolean;
  topics?: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  answers: number[];
  score: number;
  startedAt: string;
  finishedAt: string;
}

// Study Plan types
export interface StudyPlan {
  id: string;
  userId: string;
  title: string;
  schedule: {
    module: string;
    date: string;
    completed: boolean;
  }[];
  progressPercent: number;
  createdAt: string;
}

// Firestore operations
export const firestoreOperations = {
  // Users
  async getUser(uid: string): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() as User : null;
  },

  async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => doc.data() as User);
  },

  // AI Sessions
  async createAISession(session: Omit<AISession, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'aiSessions'), session);
    return docRef.id;
  },

  async getAISession(sessionId: string): Promise<AISession | null> {
    const sessionDoc = await getDoc(doc(db, 'aiSessions', sessionId));
    return sessionDoc.exists() ? { id: sessionDoc.id, ...sessionDoc.data() } as AISession : null;
  },

  async updateAISession(sessionId: string, updates: Partial<AISession>): Promise<void> {
    await updateDoc(doc(db, 'aiSessions', sessionId), updates);
  },

  async getLatestAISession(userId: string, module: string): Promise<AISession | null> {
    const sessionsQuery = query(
      collection(db, 'aiSessions'),
      where('userId', '==', userId),
      where('module', '==', module),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const sessionsSnapshot = await getDocs(sessionsQuery);
    if (sessionsSnapshot.empty) {
      return null;
    }
    
    const sessionDoc = sessionsSnapshot.docs[0];
    return { id: sessionDoc.id, ...sessionDoc.data() } as AISession;
  },

  // Tests
  async createTest(test: Omit<Test, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tests'), test);
    return docRef.id;
  },

  async getTests(module?: string): Promise<Test[]> {
    const testsQuery = module 
      ? query(collection(db, 'tests'), where('module', '==', module))
      : collection(db, 'tests');
    
    const testsSnapshot = await getDocs(testsQuery);
    return testsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test));
  },

  async getTest(testId: string): Promise<Test | null> {
    const testDoc = await getDoc(doc(db, 'tests', testId));
    return testDoc.exists() ? { id: testDoc.id, ...testDoc.data() } as Test : null;
  },

  async deleteTest(testId: string): Promise<void> {
    try {
      console.log('Firestore: Attempting to delete test:', testId);
      const testRef = doc(db, 'tests', testId);
      await deleteDoc(testRef);
      console.log('Firestore: Test deleted successfully');
    } catch (error) {
      console.error('Firestore deleteTest error:', error);
      throw error;
    }
  },

  // Test Attempts
  async createTestAttempt(attempt: Omit<TestAttempt, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'testAttempts'), attempt);
    return docRef.id;
  },

  async getUserTestAttempts(userId: string): Promise<TestAttempt[]> {
    const attemptsQuery = query(
      collection(db, 'testAttempts'), 
      where('userId', '==', userId),
      orderBy('finishedAt', 'desc')
    );
    
    const attemptsSnapshot = await getDocs(attemptsQuery);
    return attemptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TestAttempt));
  },

  // Study Plans
  async createStudyPlan(plan: Omit<StudyPlan, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'studyPlans'), plan);
    return docRef.id;
  },

  async getUserStudyPlans(userId: string): Promise<StudyPlan[]> {
    const plansQuery = query(collection(db, 'studyPlans'), where('userId', '==', userId));
    const plansSnapshot = await getDocs(plansQuery);
    return plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as StudyPlan));
  },

  async updateStudyPlan(planId: string, updates: Partial<StudyPlan>): Promise<void> {
    await updateDoc(doc(db, 'studyPlans', planId), updates);
  },

  async deleteStudyPlan(planId: string): Promise<void> {
    await deleteDoc(doc(db, 'studyPlans', planId));
  }
};