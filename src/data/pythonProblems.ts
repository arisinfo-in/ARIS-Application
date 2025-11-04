export interface PythonProblem {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  dataset?: string;
  template: string;
  hints: string[];
}

export const pythonProblems: PythonProblem[] = [
  // Beginner Problems
  {
    id: 'python-001',
    title: 'Basic List Operations',
    difficulty: 'beginner',
    description: 'Create a list of numbers, find the sum, average, maximum, and minimum values.',
    template: `# Create a list of numbers
numbers = [10, 20, 30, 40, 50]

# Calculate sum
total = sum(numbers)
print(f"Sum: {total}")

# Calculate average
average = total / len(numbers)
print(f"Average: {average}")

# Find maximum
maximum = max(numbers)
print(f"Maximum: {maximum}")

# Find minimum
minimum = min(numbers)
print(f"Minimum: {minimum}")`,
    hints: ['Use sum() for summation', 'Use len() to get list length', 'Use max() and min() functions']
  },
  {
    id: 'python-002',
    title: 'Loop Through Data',
    difficulty: 'beginner',
    description: 'Use a for loop to iterate through a list of names and print each name with a greeting.',
    template: `# List of names
names = ["Alice", "Bob", "Charlie", "Diana"]

# Loop through and greet each person
for name in names:
    print(f"Hello, {name}!")`,
    hints: ['Use for loop with in keyword', 'Use f-strings for formatting']
  },
  {
    id: 'python-003',
    title: 'Function Creation',
    difficulty: 'beginner',
    description: 'Write a function that takes two numbers and returns their product.',
    template: `# Define a function to multiply two numbers
def multiply(a, b):
    return a * b

# Test the function
result = multiply(5, 7)
print(f"5 * 7 = {result}")`,
    hints: ['Use def keyword to define function', 'Use return statement to return value']
  },
  {
    id: 'python-004',
    title: 'Dictionary Operations',
    difficulty: 'beginner',
    description: 'Create a dictionary of student grades and calculate the average grade.',
    template: `# Create dictionary of student grades
grades = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78,
    "Diana": 96
}

# Calculate average grade
total = sum(grades.values())
average = total / len(grades)
print(f"Average grade: {average}")`,
    hints: ['Use .values() to get dictionary values', 'Use sum() and len() for average']
  },
  {
    id: 'python-005',
    title: 'List Comprehension',
    difficulty: 'beginner',
    description: 'Use list comprehension to create a list of squares from 1 to 10.',
    template: `# Create list of squares using list comprehension
squares = [x**2 for x in range(1, 11)]
print(squares)`,
    hints: ['Use range() function', 'Use ** for exponentiation', 'List comprehension: [expression for item in iterable]']
  },

  // Intermediate Problems
  {
    id: 'python-006',
    title: 'Load and Display CSV Data',
    difficulty: 'intermediate',
    description: 'Load a CSV file using pandas and display the first few rows and basic statistics.',
    dataset: '/datasets/sales_data.csv',
    template: `import pandas as pd

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Display first few rows
print("First 5 rows:")
print(df.head())

# Display basic statistics
print("\\nBasic Statistics:")
print(df.describe())

# Display data info
print("\\nData Info:")
print(df.info())`,
    hints: ['Use pd.read_csv() to load CSV', 'Use .head() to see first rows', 'Use .describe() for statistics']
  },
  {
    id: 'python-007',
    title: 'Data Cleaning',
    difficulty: 'intermediate',
    description: 'Clean a dataset by removing missing values and duplicates.',
    dataset: '/datasets/customer_data.csv',
    template: `import pandas as pd

# Load the dataset
df = pd.read_csv('/datasets/customer_data.csv')

# Check for missing values
print("Missing values before cleaning:")
print(df.isnull().sum())

# Remove rows with missing values
df_clean = df.dropna()

# Remove duplicates
df_clean = df_clean.drop_duplicates()

print(f"\\nOriginal rows: {len(df)}")
print(f"Cleaned rows: {len(df_clean)}")`,
    hints: ['Use .isnull() to find missing values', 'Use .dropna() to remove missing values', 'Use .drop_duplicates() to remove duplicates']
  },
  {
    id: 'python-008',
    title: 'Data Filtering and Grouping',
    difficulty: 'intermediate',
    description: 'Filter data based on conditions and group by categories.',
    template: `import pandas as pd

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Filter data (example: filter where sales > 1000)
filtered_df = df[df['sales'] > 1000]
print(f"Rows with sales > 1000: {len(filtered_df)}")

# Group by category and calculate sum
grouped = df.groupby('category')['sales'].sum()
print("\\nTotal sales by category:")
print(grouped)`,
    hints: ['Use boolean indexing for filtering', 'Use .groupby() for grouping', 'Adjust column names based on your dataset']
  },
  {
    id: 'python-009',
    title: 'Basic Data Visualization',
    difficulty: 'intermediate',
    description: 'Create a simple bar chart or line plot from data.',
    template: `import pandas as pd
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Create a simple plot
plt.figure(figsize=(10, 6))
plt.bar(df['category'], df['sales'])
plt.xlabel('Category')
plt.ylabel('Sales')
plt.title('Sales by Category')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()`,
    hints: ['Use matplotlib.pyplot for plotting', 'Use plt.bar() for bar chart', 'Use plt.show() to display plot']
  },
  {
    id: 'python-010',
    title: 'String Manipulation',
    difficulty: 'intermediate',
    description: 'Clean and transform text data in a DataFrame column.',
    template: `import pandas as pd

# Sample data
data = {
    'name': ['  John Doe  ', 'Jane Smith', '  Bob Johnson  '],
    'email': ['JOHN@EXAMPLE.COM', 'jane@example.com', 'Bob@Example.COM']
}

df = pd.DataFrame(data)

# Clean strings: strip whitespace and convert to lowercase
df['name'] = df['name'].str.strip()
df['email'] = df['email'].str.lower()

print(df)`,
    hints: ['Use .str.strip() to remove whitespace', 'Use .str.lower() to lowercase', 'Use .str for string operations']
  },

  // Advanced Problems
  {
    id: 'python-011',
    title: 'Advanced Data Analysis',
    difficulty: 'advanced',
    description: 'Perform correlation analysis and identify relationships between variables.',
    template: `import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Calculate correlation matrix
correlation_matrix = df.select_dtypes(include=[np.number]).corr()
print("Correlation Matrix:")
print(correlation_matrix)

# Find highest correlations
print("\\nStrongest correlations:")
# Adjust column names based on your dataset
for col in correlation_matrix.columns:
    for idx in correlation_matrix.index:
        if col != idx and abs(correlation_matrix.loc[idx, col]) > 0.7:
            print(f"{idx} <-> {col}: {correlation_matrix.loc[idx, col]:.2f}")`,
    hints: ['Use .corr() for correlation', 'Use select_dtypes() to get numeric columns', 'Filter for high correlation values']
  },
  {
    id: 'python-012',
    title: 'Time Series Analysis',
    difficulty: 'advanced',
    description: 'Analyze time series data with date parsing and aggregation.',
    template: `import pandas as pd
import matplotlib.pyplot as plt

# Load dataset with date column
df = pd.read_csv('/datasets/sales_data.csv')

# Convert date column to datetime (adjust column name)
df['date'] = pd.to_datetime(df['date'])

# Set date as index
df.set_index('date', inplace=True)

# Resample to monthly totals
monthly_sales = df.resample('M')['sales'].sum()

# Plot time series
plt.figure(figsize=(12, 6))
monthly_sales.plot()
plt.title('Monthly Sales Trend')
plt.xlabel('Date')
plt.ylabel('Total Sales')
plt.grid(True)
plt.show()`,
    hints: ['Use pd.to_datetime() for date conversion', 'Use .resample() for time-based aggregation', 'Use set_index() to set date index']
  },
  {
    id: 'python-013',
    title: 'Data Aggregation and Pivoting',
    difficulty: 'advanced',
    description: 'Create pivot tables and perform complex aggregations.',
    template: `import pandas as pd

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Create pivot table
pivot_table = pd.pivot_table(
    df,
    values='sales',
    index='category',
    columns='month',
    aggfunc='sum'
)

print("Pivot Table:")
print(pivot_table)

# Multi-level aggregation
grouped = df.groupby(['category', 'region']).agg({
    'sales': ['sum', 'mean', 'count']
})

print("\\nMulti-level Aggregation:")
print(grouped)`,
    hints: ['Use pd.pivot_table() for pivoting', 'Use .agg() for multiple aggregations', 'Use groupby() with multiple columns']
  },
  {
    id: 'python-014',
    title: 'Data Transformation',
    difficulty: 'advanced',
    description: 'Apply transformations like normalization and feature engineering.',
    template: `import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Normalize numeric columns (0-1 scaling)
numeric_cols = df.select_dtypes(include=[np.number]).columns
for col in numeric_cols:
    min_val = df[col].min()
    max_val = df[col].max()
    df[f'{col}_normalized'] = (df[col] - min_val) / (max_val - min_val)

# Create new features
df['sales_per_unit'] = df['sales'] / df['quantity']
df['month'] = pd.to_datetime(df['date']).dt.month

print("Transformed Data:")
print(df[['sales', 'sales_normalized', 'sales_per_unit', 'month']].head())`,
    hints: ['Use normalization formula: (x - min) / (max - min)', 'Create derived features from existing columns', 'Use .dt accessor for datetime operations']
  },
  {
    id: 'python-015',
    title: 'Statistical Analysis',
    difficulty: 'advanced',
    description: 'Perform statistical tests and hypothesis testing.',
    template: `import pandas as pd
import numpy as np
from scipy import stats

# Load the dataset
df = pd.read_csv('/datasets/sales_data.csv')

# Calculate z-scores for outlier detection
numeric_cols = df.select_dtypes(include=[np.number]).columns
for col in numeric_cols:
    z_scores = np.abs(stats.zscore(df[col]))
    outliers = df[z_scores > 3]
    print(f"\\nOutliers in {col}: {len(outliers)}")

# Perform t-test (example: compare two groups)
# Adjust based on your data structure
group1 = df[df['category'] == 'Category A']['sales']
group2 = df[df['category'] == 'Category B']['sales']

if len(group1) > 0 and len(group2) > 0:
    t_stat, p_value = stats.ttest_ind(group1, group2)
    print(f"\\nT-test results:")
    print(f"T-statistic: {t_stat:.4f}")
    print(f"P-value: {p_value:.4f}")`,
    hints: ['Use scipy.stats for statistical tests', 'Use z-score for outlier detection', 'Use ttest_ind() for comparing groups']
  }
];

export function getProblemsByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): PythonProblem[] {
  return pythonProblems.filter(p => p.difficulty === difficulty);
}

export function getProblemById(id: string): PythonProblem | undefined {
  return pythonProblems.find(p => p.id === id);
}

export function getAllProblems(): PythonProblem[] {
  return pythonProblems;
}

