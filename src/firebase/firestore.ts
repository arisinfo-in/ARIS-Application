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
import { UserAPIKey } from '../types/apiKey';

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

// Python Notebook types
export interface NotebookCell {
  id: string;
  code: string;
}

export interface PythonNotebook {
  id: string;
  userId: string;
  title: string;
  cells: NotebookCell[];
  createdAt: string;
  updatedAt: string;
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

  async getTests(module?: string, userId?: string): Promise<Test[]> {
    let testsQuery;
    
    if (module && userId) {
      testsQuery = query(
        collection(db, 'tests'), 
        where('module', '==', module),
        where('createdBy', '==', userId)
      );
    } else if (module) {
      testsQuery = query(collection(db, 'tests'), where('module', '==', module));
    } else if (userId) {
      testsQuery = query(collection(db, 'tests'), where('createdBy', '==', userId));
    } else {
      testsQuery = collection(db, 'tests');
    }
    
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
  },

  // SQL Queries
  async saveSQLQuery(userId: string, query: string, dataset: string, title?: string): Promise<string> {
    const queryData = {
      userId,
      query,
      dataset,
      title: title || `Query ${new Date().toISOString()}`,
      createdAt: new Date().toISOString(),
      executedCount: 0
    };
    const docRef = await addDoc(collection(db, 'userQueries'), queryData);
    return docRef.id;
  },

  async getUserSQLQueries(userId: string): Promise<Array<{ id: string; query: string; dataset: string; title: string; createdAt: string }>> {
    const queriesRef = collection(db, 'userQueries');
    const q = query(
      queriesRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as any));
  },

  async deleteSQLQuery(queryId: string): Promise<void> {
    await deleteDoc(doc(db, 'userQueries', queryId));
  },

  async updateStudyPlanSQLProgress(planId: string, queriesExecuted: number): Promise<void> {
    const planRef = doc(db, 'studyPlans', planId);
    const planDoc = await getDoc(planRef);
    
    if (planDoc.exists()) {
      const planData = planDoc.data() as StudyPlan;
      const schedule = planData.schedule;
      
      // Find SQL items and check if completion threshold is met (e.g., 5 queries)
      const sqlItems = schedule.filter(item => item.module === 'sql');
      const completedSqlItems = sqlItems.filter(item => {
        // Mark as complete if user has executed enough queries
        return queriesExecuted >= 5 || item.completed;
      });
      
      // Update completed status for SQL items that meet threshold
      const updatedSchedule = schedule.map(item => {
        if (item.module === 'sql' && queriesExecuted >= 5 && !item.completed) {
          return { ...item, completed: true };
        }
        return item;
      });
      
      const completedCount = updatedSchedule.filter(item => item.completed).length;
      const progressPercent = Math.round((completedCount / updatedSchedule.length) * 100);
      
      await updateDoc(planRef, {
        schedule: updatedSchedule,
        progressPercent
      });
    }
  },

  // Python Notebooks
  async createPythonNotebook(notebook: Omit<PythonNotebook, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'pythonNotebooks'), notebook);
    return docRef.id;
  },

  async getUserPythonNotebooks(userId: string): Promise<PythonNotebook[]> {
    const notebooksQuery = query(
      collection(db, 'pythonNotebooks'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const notebooksSnapshot = await getDocs(notebooksQuery);
    return notebooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PythonNotebook));
  },

  async getPythonNotebook(notebookId: string): Promise<PythonNotebook | null> {
    const notebookDoc = await getDoc(doc(db, 'pythonNotebooks', notebookId));
    return notebookDoc.exists() ? { id: notebookDoc.id, ...notebookDoc.data() } as PythonNotebook : null;
  },

  async updatePythonNotebook(notebookId: string, updates: Partial<PythonNotebook>): Promise<void> {
    await updateDoc(doc(db, 'pythonNotebooks', notebookId), {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  },

  async deletePythonNotebook(notebookId: string): Promise<void> {
    await deleteDoc(doc(db, 'pythonNotebooks', notebookId));
  },

  async getLatestPythonNotebook(userId: string): Promise<PythonNotebook | null> {
    const notebooksQuery = query(
      collection(db, 'pythonNotebooks'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
      limit(1)
    );
    const notebooksSnapshot = await getDocs(notebooksQuery);
    if (notebooksSnapshot.empty) {
      return null;
    }
    const notebookDoc = notebooksSnapshot.docs[0];
    return { id: notebookDoc.id, ...notebookDoc.data() } as PythonNotebook;
  },

  // API Keys
  async saveUserAPIKey(apiKey: Omit<UserAPIKey, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'userApiKeys'), {
      ...apiKey,
      createdAt: new Date().toISOString(),
      usageCount: 0
    });
    return docRef.id;
  },

  async getUserAPIKey(userId: string, provider: string): Promise<UserAPIKey | null> {
    const keysQuery = query(
      collection(db, 'userApiKeys'),
      where('userId', '==', userId),
      where('provider', '==', provider),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const keysSnapshot = await getDocs(keysQuery);
    if (keysSnapshot.empty) {
      return null;
    }
    const keyDoc = keysSnapshot.docs[0];
    return { id: keyDoc.id, ...keyDoc.data() } as UserAPIKey;
  },

  async getAllUserAPIKeys(userId: string): Promise<UserAPIKey[]> {
    const keysQuery = query(
      collection(db, 'userApiKeys'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const keysSnapshot = await getDocs(keysQuery);
    return keysSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserAPIKey));
  },

  async updateUserAPIKey(keyId: string, updates: Partial<UserAPIKey>): Promise<void> {
    await updateDoc(doc(db, 'userApiKeys', keyId), updates);
  },

  async deleteUserAPIKey(keyId: string): Promise<void> {
    await deleteDoc(doc(db, 'userApiKeys', keyId));
  },

  async incrementAPIKeyUsage(keyId: string): Promise<void> {
    const keyDoc = await getDoc(doc(db, 'userApiKeys', keyId));
    if (keyDoc.exists()) {
      const currentData = keyDoc.data() as UserAPIKey;
      await updateDoc(doc(db, 'userApiKeys', keyId), {
        usageCount: (currentData.usageCount || 0) + 1,
        lastUsed: new Date().toISOString()
      });
    }
  }
};