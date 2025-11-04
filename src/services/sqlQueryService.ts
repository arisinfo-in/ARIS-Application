import { firestoreOperations } from '../firebase/firestore';

export interface SavedQuery {
  id: string;
  query: string;
  dataset: string;
  title: string;
  createdAt: string;
}

class SQLQueryService {
  async saveQuery(userId: string, query: string, dataset: string, title?: string): Promise<string> {
    try {
      const queryId = await firestoreOperations.saveSQLQuery(userId, query, dataset, title);
      return queryId;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving SQL query:', error);
      }
      throw new Error('Failed to save query');
    }
  }

  async getUserQueries(userId: string): Promise<SavedQuery[]> {
    try {
      const queries = await firestoreOperations.getUserSQLQueries(userId);
      return queries;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading SQL queries:', error);
      }
      return [];
    }
  }

  async deleteQuery(queryId: string): Promise<void> {
    try {
      await firestoreOperations.deleteSQLQuery(queryId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting SQL query:', error);
      }
      throw new Error('Failed to delete query');
    }
  }

  async trackQueryExecution(userId: string, planId: string | undefined, queriesExecuted: number): Promise<void> {
    if (planId) {
      try {
        await firestoreOperations.updateStudyPlanSQLProgress(planId, queriesExecuted);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error updating study plan progress:', error);
        }
      }
    }
  }
}

export const sqlQueryService = new SQLQueryService();

