import { PythonProblem, getAllProblems, getProblemsByDifficulty, getProblemById } from '../data/pythonProblems';

class PythonProblemService {
  async getProblems(): Promise<PythonProblem[]> {
    return getAllProblems();
  }

  async getProblemsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<PythonProblem[]> {
    return getProblemsByDifficulty(difficulty);
  }

  async getProblemById(id: string): Promise<PythonProblem | undefined> {
    return getProblemById(id);
  }

  async loadDatasetAsCode(datasetPath: string): Promise<string> {
    // Generate code snippet to load dataset
    return `import pandas as pd

# Load the dataset
df = pd.read_csv('${datasetPath}')

# Display first few rows
print("Dataset loaded successfully!")
print(f"Shape: {df.shape}")
print("\\nFirst 5 rows:")
print(df.head())
`;
  }

  async getDatasetInfo(datasetPath: string): Promise<string | null> {
    try {
      // Try to fetch dataset to verify it exists
      const response = await fetch(datasetPath);
      if (response.ok) {
        return `Dataset available at: ${datasetPath}`;
      }
      return null;
    } catch {
      return null;
    }
  }
}

export const pythonProblemService = new PythonProblemService();

