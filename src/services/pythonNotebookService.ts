import { firestoreOperations, PythonNotebook, NotebookCell } from '../firebase/firestore';

export interface SavedNotebook {
  id: string;
  title: string;
  cells: NotebookCell[];
  createdAt: string;
  updatedAt: string;
}

class PythonNotebookService {
  async saveNotebook(userId: string, title: string, cells: NotebookCell[]): Promise<string> {
    try {
      const notebookId = await firestoreOperations.createPythonNotebook({
        userId,
        title,
        cells,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return notebookId;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error saving Python notebook:', error);
      }
      throw new Error('Failed to save notebook');
    }
  }

  async updateNotebook(notebookId: string, title: string, cells: NotebookCell[]): Promise<void> {
    try {
      await firestoreOperations.updatePythonNotebook(notebookId, {
        title,
        cells,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error updating Python notebook:', error);
      }
      throw new Error('Failed to update notebook');
    }
  }

  async getUserNotebooks(userId: string): Promise<SavedNotebook[]> {
    try {
      const notebooks = await firestoreOperations.getUserPythonNotebooks(userId);
      return notebooks.map(notebook => ({
        id: notebook.id,
        title: notebook.title,
        cells: notebook.cells,
        createdAt: notebook.createdAt,
        updatedAt: notebook.updatedAt
      }));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading Python notebooks:', error);
      }
      return [];
    }
  }

  async getNotebook(notebookId: string): Promise<SavedNotebook | null> {
    try {
      const notebook = await firestoreOperations.getPythonNotebook(notebookId);
      if (!notebook) return null;
      return {
        id: notebook.id,
        title: notebook.title,
        cells: notebook.cells,
        createdAt: notebook.createdAt,
        updatedAt: notebook.updatedAt
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading Python notebook:', error);
      }
      return null;
    }
  }

  async deleteNotebook(notebookId: string): Promise<void> {
    try {
      await firestoreOperations.deletePythonNotebook(notebookId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error deleting Python notebook:', error);
      }
      throw new Error('Failed to delete notebook');
    }
  }

  async getLatestNotebook(userId: string): Promise<SavedNotebook | null> {
    try {
      const notebook = await firestoreOperations.getLatestPythonNotebook(userId);
      if (!notebook) return null;
      return {
        id: notebook.id,
        title: notebook.title,
        cells: notebook.cells,
        createdAt: notebook.createdAt,
        updatedAt: notebook.updatedAt
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error loading latest Python notebook:', error);
      }
      return null;
    }
  }
}

export const pythonNotebookService = new PythonNotebookService();

