import React, { useState, useEffect, useCallback, memo } from 'react';
import { Plus, Play, Trophy, Clock, BookOpen, Filter, Target, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { useAuth } from '../contexts/AuthContext';
import { firestoreOperations, Test } from '../firebase/firestore';
import { dynamicTestService } from '../services/dynamicTestService';

const Tests: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestModule, setNewTestModule] = useState('excel');
  const [newTestLevel, setNewTestLevel] = useState('beginner');
  const [newTestTopics, setNewTestTopics] = useState('');

  const modules = [
    { id: 'all', name: 'All Modules' },
    { id: 'excel', name: 'Excel' },
    { id: 'powerbi', name: 'Power BI' },
    { id: 'sql', name: 'SQL & Database' },
    { id: 'python', name: 'Python' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'prompt', name: 'Prompt Engineering' },
    { id: 'advanced', name: 'Advanced AI' }
  ];

  const loadTests = useCallback(async () => {
    setLoading(false); // Set loading to false immediately
    try {
      const testsData = selectedModule === 'all' 
        ? await firestoreOperations.getTests()
        : await firestoreOperations.getTests(selectedModule);
      setTests(testsData);
    } catch (error) {
      console.error('Error loading tests:', error);
    }
  }, [selectedModule]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const createRecommendedTests = async () => {
    if (!user) return;

    setIsGeneratingRecommendation(true);
    try {
      // Get user's test attempts to analyze performance
      const testAttempts = await firestoreOperations.getUserTestAttempts(user.uid);
      
      // Analyze performance and create recommendations
      const recommendations = analyzePerformanceAndRecommendTests(testAttempts);
      
      // Create recommended tests
      for (const testData of recommendations) {
        const testWithQuestions = {
          ...testData,
          questions: generateAIQuestions(testData.module, testData.level || 'beginner', 10),
          createdBy: user.uid,
          createdAt: new Date().toISOString(),
          isRecommended: true
        };
        await firestoreOperations.createTest(testWithQuestions);
      }
      
      loadTests();
    } catch (error) {
      console.error('Error creating recommended tests:', error);
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };

  const analyzePerformanceAndRecommendTests = (testAttempts: Array<{ testId: string; score: number }>) => {
    // Analyze test performance by module
    const modulePerformance: { [key: string]: { scores: number[], count: number } } = {};
    
    testAttempts.forEach(attempt => {
      const module = attempt.testId?.split('-')[0] || 'general';
      if (!modulePerformance[module]) {
        modulePerformance[module] = { scores: [], count: 0 };
      }
      modulePerformance[module].scores.push(attempt.score);
      modulePerformance[module].count++;
    });

    // Calculate average scores and identify weak areas
    const moduleAverages: { [key: string]: number } = {};
    Object.keys(modulePerformance).forEach(module => {
      const scores = modulePerformance[module].scores;
      moduleAverages[module] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    // Determine skill level based on overall performance
    const overallAverage = Object.values(moduleAverages).length > 0 
      ? Object.values(moduleAverages).reduce((sum, avg) => sum + avg, 0) / Object.values(moduleAverages).length
      : 0;

    let skillLevel = 'beginner';
    if (overallAverage >= 80) skillLevel = 'advanced';
    else if (overallAverage >= 60) skillLevel = 'intermediate';

    // Identify weak areas (modules with scores below 70%)
    const weakAreas = Object.entries(moduleAverages)
      .filter(([, avg]) => avg < 70)
      .map(([module]) => module);

    // Create recommended tests based on analysis
    const recommendedTests = [];

    if (skillLevel === 'beginner' || testAttempts.length === 0) {
      recommendedTests.push(
        generateTestQuestions('excel', 'beginner', 'Excel Fundamentals'),
        generateTestQuestions('statistics', 'beginner', 'Statistics Basics'),
        generateTestQuestions('sql', 'beginner', 'SQL Introduction')
      );
    } else if (skillLevel === 'intermediate') {
      if (weakAreas.includes('python')) {
        recommendedTests.push(
          generateTestQuestions('python', 'intermediate', 'Python for Data Analysis'),
          generateTestQuestions('powerbi', 'intermediate', 'Power BI Essentials')
        );
      } else {
        recommendedTests.push(
          generateTestQuestions('python', 'intermediate', 'Python for Data Analysis'),
          generateTestQuestions('powerbi', 'intermediate', 'Power BI Essentials'),
          generateTestQuestions('statistics', 'intermediate', 'Advanced Statistics')
        );
      }
    } else {
      if (weakAreas.includes('ml') || weakAreas.includes('advanced')) {
        recommendedTests.push(
          generateTestQuestions('ml', 'advanced', 'Machine Learning Fundamentals'),
          generateTestQuestions('advanced', 'advanced', 'Advanced AI Concepts')
        );
      } else {
        recommendedTests.push(
          generateTestQuestions('ml', 'advanced', 'Machine Learning Fundamentals'),
          generateTestQuestions('advanced', 'advanced', 'Advanced AI Concepts'),
          generateTestQuestions('prompt', 'advanced', 'Prompt Engineering')
        );
      }
    }

    return recommendedTests;
  };

  const generateAIQuestions = (module: string, level: string, count: number = 10) => {
    const questionTemplates = {
      excel: {
        beginner: [
          {
            question: 'Which function is used to sum a range of cells in Excel?',
            options: ['SUM()', 'ADD()', 'TOTAL()', 'COUNT()'],
            correctAnswer: 0,
            explanation: 'SUM() is the correct function to add up values in a range of cells.'
          },
          {
            question: 'What does VLOOKUP stand for?',
            options: ['Vertical Lookup', 'Value Lookup', 'Variable Lookup', 'Vector Lookup'],
            correctAnswer: 0,
            explanation: 'VLOOKUP stands for Vertical Lookup, used to search for values in a table.'
          },
          {
            question: 'Which shortcut key is used to save a workbook in Excel?',
            options: ['Ctrl+S', 'Ctrl+N', 'Ctrl+O', 'Ctrl+P'],
            correctAnswer: 0,
            explanation: 'Ctrl+S is the standard shortcut to save a workbook in Excel.'
          },
          {
            question: 'What is the correct syntax for the IF function?',
            options: ['IF(condition, true_value, false_value)', 'IF(true_value, false_value, condition)', 'IF(condition, false_value, true_value)', 'IF(true_value, condition, false_value)'],
            correctAnswer: 0,
            explanation: 'The IF function syntax is IF(condition, true_value, false_value).'
          },
          {
            question: 'Which function counts the number of cells that contain numbers?',
            options: ['COUNT()', 'COUNTA()', 'COUNTIF()', 'COUNTBLANK()'],
            correctAnswer: 0,
            explanation: 'COUNT() function counts cells that contain numbers.'
          },
          {
            question: 'What does the AVERAGE function do?',
            options: ['Finds the middle value', 'Calculates the mean', 'Finds the highest value', 'Counts cells'],
            correctAnswer: 1,
            explanation: 'AVERAGE function calculates the arithmetic mean of a range of numbers.'
          },
          {
            question: 'Which function is used to find the maximum value in a range?',
            options: ['MAX()', 'LARGE()', 'TOP()', 'HIGHEST()'],
            correctAnswer: 0,
            explanation: 'MAX() function returns the largest value in a range of cells.'
          },
          {
            question: 'What does the CONCATENATE function do?',
            options: ['Adds numbers', 'Joins text strings', 'Finds duplicates', 'Sorts data'],
            correctAnswer: 1,
            explanation: 'CONCATENATE function joins two or more text strings into one string.'
          },
          {
            question: 'Which function is used to find the minimum value in a range?',
            options: ['MIN()', 'SMALL()', 'BOTTOM()', 'LOWEST()'],
            correctAnswer: 0,
            explanation: 'MIN() function returns the smallest value in a range of cells.'
          },
          {
            question: 'What does the LEN function return?',
            options: ['The number of characters in a text string', 'The number of cells', 'The length of a range', 'The number of rows'],
            correctAnswer: 0,
            explanation: 'LEN function returns the number of characters in a text string.'
          }
        ],
        intermediate: [
          {
            question: 'What does INDEX-MATCH combination do?',
            options: ['More flexible than VLOOKUP', 'Less accurate than VLOOKUP', 'Same as VLOOKUP', 'Replaces SUMIF'],
            correctAnswer: 0,
            explanation: 'INDEX-MATCH is more flexible than VLOOKUP as it can look up values in any column.'
          },
          {
            question: 'Which function is used to find the position of a value in a range?',
            options: ['MATCH()', 'FIND()', 'SEARCH()', 'LOOKUP()'],
            correctAnswer: 0,
            explanation: 'MATCH function returns the position of a value in a range.'
          },
          {
            question: 'What does the SUMPRODUCT function do?',
            options: ['Multiplies arrays and sums the results', 'Adds two ranges', 'Finds products', 'Counts products'],
            correctAnswer: 0,
            explanation: 'SUMPRODUCT multiplies corresponding elements in arrays and returns the sum of those products.'
          },
          {
            question: 'Which function is used to count cells that meet multiple criteria?',
            options: ['COUNTIFS()', 'COUNTIF()', 'COUNT()', 'COUNTA()'],
            correctAnswer: 0,
            explanation: 'COUNTIFS function counts cells that meet multiple criteria.'
          },
          {
            question: 'What does the OFFSET function do?',
            options: ['Returns a reference to a range', 'Finds the offset value', 'Calculates distance', 'Moves data'],
            correctAnswer: 0,
            explanation: 'OFFSET function returns a reference to a range that is offset from a starting point.'
          },
          {
            question: 'Which function is used to sum cells that meet multiple criteria?',
            options: ['SUMIFS()', 'SUMIF()', 'SUM()', 'SUMPRODUCT()'],
            correctAnswer: 0,
            explanation: 'SUMIFS function sums cells that meet multiple criteria.'
          },
          {
            question: 'What does the INDIRECT function do?',
            options: ['Returns a reference specified by a text string', 'Finds indirect values', 'Calculates indirectly', 'References indirectly'],
            correctAnswer: 0,
            explanation: 'INDIRECT function returns a reference specified by a text string.'
          },
          {
            question: 'Which function is used to find the largest value in a range?',
            options: ['LARGE()', 'MAX()', 'TOP()', 'HIGHEST()'],
            correctAnswer: 0,
            explanation: 'LARGE function returns the k-th largest value in a data set.'
          },
          {
            question: 'What does the CHOOSE function do?',
            options: ['Selects a value from a list', 'Chooses randomly', 'Picks the best option', 'Selects criteria'],
            correctAnswer: 0,
            explanation: 'CHOOSE function selects a value from a list of values based on an index number.'
          },
          {
            question: 'Which function is used to find the smallest value in a range?',
            options: ['SMALL()', 'MIN()', 'BOTTOM()', 'LOWEST()'],
            correctAnswer: 0,
            explanation: 'SMALL function returns the k-th smallest value in a data set.'
          }
        ]
      },
      python: {
        beginner: [
          {
            question: 'Which of the following is the correct way to create a list in Python?',
            options: ['list = []', 'list = ()', 'list = {}', 'list = ""'],
            correctAnswer: 0,
            explanation: 'Square brackets [] are used to create a list in Python.'
          },
          {
            question: 'What is the output of print(2 ** 3)?',
            options: ['6', '8', '9', '5'],
            correctAnswer: 1,
            explanation: '** is the exponentiation operator, so 2 ** 3 = 8.'
          },
          {
            question: 'Which keyword is used to define a function in Python?',
            options: ['def', 'function', 'define', 'func'],
            correctAnswer: 0,
            explanation: 'The "def" keyword is used to define a function in Python.'
          },
          {
            question: 'What is the correct way to create a dictionary in Python?',
            options: ['dict = {}', 'dict = []', 'dict = ()', 'dict = ""'],
            correctAnswer: 0,
            explanation: 'Curly braces {} are used to create a dictionary in Python.'
          },
          {
            question: 'Which operator is used for floor division in Python?',
            options: ['//', '/', '%', '**'],
            correctAnswer: 0,
            explanation: 'The // operator performs floor division in Python.'
          },
          {
            question: 'What is the output of len("Hello")?',
            options: ['4', '5', '6', 'Error'],
            correctAnswer: 1,
            explanation: 'len() returns the number of characters in the string "Hello", which is 5.'
          },
          {
            question: 'Which method is used to add an item to a list?',
            options: ['append()', 'add()', 'insert()', 'Both A and C'],
            correctAnswer: 3,
            explanation: 'Both append() and insert() can be used to add items to a list.'
          },
          {
            question: 'What is the output of "Hello" + "World"?',
            options: ['HelloWorld', 'Hello World', 'Error', 'Hello+World'],
            correctAnswer: 0,
            explanation: 'The + operator concatenates strings, so "Hello" + "World" = "HelloWorld".'
          },
          {
            question: 'Which function is used to get user input in Python?',
            options: ['input()', 'get_input()', 'read()', 'scan()'],
            correctAnswer: 0,
            explanation: 'The input() function is used to get user input in Python.'
          },
          {
            question: 'What is the correct way to create a tuple in Python?',
            options: ['tuple = ()', 'tuple = []', 'tuple = {}', 'tuple = ""'],
            correctAnswer: 0,
            explanation: 'Parentheses () are used to create a tuple in Python.'
          }
        ],
        intermediate: [
          {
            question: 'Which library is commonly used for data manipulation in Python?',
            options: ['pandas', 'numpy', 'matplotlib', 'seaborn'],
            correctAnswer: 0,
            explanation: 'pandas is the primary library for data manipulation and analysis in Python.'
          },
          {
            question: 'What does the following code do: df.head()?',
            options: ['Shows the first 5 rows', 'Shows the last 5 rows', 'Shows column names', 'Shows data types'],
            correctAnswer: 0,
            explanation: 'df.head() displays the first 5 rows of a DataFrame by default.'
          },
          {
            question: 'Which method is used to read a CSV file in pandas?',
            options: ['read_csv()', 'read_excel()', 'read_json()', 'read_sql()'],
            correctAnswer: 0,
            explanation: 'read_csv() is used to read CSV files in pandas.'
          },
          {
            question: 'What is the output of [x**2 for x in range(5)]?',
            options: ['[0, 1, 4, 9, 16]', '[1, 4, 9, 16, 25]', '[0, 1, 2, 3, 4]', '[1, 2, 3, 4, 5]'],
            correctAnswer: 0,
            explanation: 'This list comprehension squares each number from 0 to 4: [0, 1, 4, 9, 16].'
          },
          {
            question: 'Which method is used to drop missing values in pandas?',
            options: ['dropna()', 'fillna()', 'isna()', 'notna()'],
            correctAnswer: 0,
            explanation: 'dropna() is used to remove rows or columns with missing values.'
          },
          {
            question: 'What does the groupby() function do in pandas?',
            options: ['Groups data by specified columns', 'Sorts data', 'Filters data', 'Merges data'],
            correctAnswer: 0,
            explanation: 'groupby() groups data by specified columns for aggregation operations.'
          },
          {
            question: 'Which library is used for numerical computing in Python?',
            options: ['numpy', 'pandas', 'matplotlib', 'scipy'],
            correctAnswer: 0,
            explanation: 'NumPy is the fundamental library for numerical computing in Python.'
          },
          {
            question: 'What is the output of np.array([1, 2, 3]).shape?',
            options: ['(3,)', '(1, 3)', '(3, 1)', 'Error'],
            correctAnswer: 0,
            explanation: 'The shape of a 1D array with 3 elements is (3,).'
          },
          {
            question: 'Which method is used to merge two DataFrames in pandas?',
            options: ['merge()', 'join()', 'concat()', 'All of the above'],
            correctAnswer: 3,
            explanation: 'pandas provides merge(), join(), and concat() methods for combining DataFrames.'
          },
          {
            question: 'What does the apply() function do in pandas?',
            options: ['Applies a function to each element', 'Applies a function to each row/column', 'Applies a function to the entire DataFrame', 'All of the above'],
            correctAnswer: 3,
            explanation: 'apply() can be used to apply functions to elements, rows, columns, or the entire DataFrame.'
          }
        ]
      },
      statistics: {
        beginner: [
          {
            question: 'What is the mean of the numbers 2, 4, 6, 8?',
            options: ['4', '5', '6', '8'],
            correctAnswer: 1,
            explanation: 'Mean = (2+4+6+8)/4 = 20/4 = 5'
          },
          {
            question: 'What is the median of the numbers 1, 3, 5, 7, 9?',
            options: ['3', '5', '7', '9'],
            correctAnswer: 1,
            explanation: 'Median is the middle value when numbers are arranged in order: 5.'
          },
          {
            question: 'What is the mode of the numbers 1, 2, 2, 3, 4?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1,
            explanation: 'Mode is the most frequently occurring value: 2 appears twice.'
          },
          {
            question: 'What is the range of the numbers 10, 15, 20, 25, 30?',
            options: ['10', '15', '20', '25'],
            correctAnswer: 2,
            explanation: 'Range = Maximum - Minimum = 30 - 10 = 20.'
          },
          {
            question: 'What is the standard deviation used to measure?',
            options: ['Central tendency', 'Variability', 'Correlation', 'Probability'],
            correctAnswer: 1,
            explanation: 'Standard deviation measures the variability or spread of data points.'
          },
          {
            question: 'What is the probability of getting heads when flipping a fair coin?',
            options: ['0.25', '0.5', '0.75', '1.0'],
            correctAnswer: 1,
            explanation: 'A fair coin has equal probability (0.5) for heads and tails.'
          },
          {
            question: 'What is the sum of probabilities of all possible outcomes?',
            options: ['0', '0.5', '1', '2'],
            correctAnswer: 2,
            explanation: 'The sum of all probabilities in a probability distribution equals 1.'
          },
          {
            question: 'What is the variance of the numbers 1, 2, 3, 4, 5?',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1,
            explanation: 'Variance measures the average squared deviation from the mean.'
          },
          {
            question: 'What is the correlation coefficient range?',
            options: ['-1 to 0', '0 to 1', '-1 to 1', '0 to 2'],
            correctAnswer: 2,
            explanation: 'Correlation coefficient ranges from -1 (perfect negative) to +1 (perfect positive).'
          },
          {
            question: 'What is the sample size for statistical significance?',
            options: ['At least 5', 'At least 10', 'At least 30', 'At least 100'],
            correctAnswer: 2,
            explanation: 'A sample size of at least 30 is generally considered adequate for statistical significance.'
          }
        ]
      },
      sql: {
        beginner: [
          {
            question: 'Which SQL command is used to retrieve data from a database?',
            options: ['SELECT', 'GET', 'FETCH', 'RETRIEVE'],
            correctAnswer: 0,
            explanation: 'SELECT is used to retrieve data from database tables.'
          },
          {
            question: 'Which SQL command is used to insert data into a table?',
            options: ['INSERT', 'ADD', 'CREATE', 'UPDATE'],
            correctAnswer: 0,
            explanation: 'INSERT is used to add new rows of data to a table.'
          },
          {
            question: 'Which SQL command is used to update existing data?',
            options: ['UPDATE', 'MODIFY', 'CHANGE', 'ALTER'],
            correctAnswer: 0,
            explanation: 'UPDATE is used to modify existing data in a table.'
          },
          {
            question: 'Which SQL command is used to delete data from a table?',
            options: ['DELETE', 'REMOVE', 'DROP', 'CLEAR'],
            correctAnswer: 0,
            explanation: 'DELETE is used to remove rows from a table.'
          },
          {
            question: 'Which keyword is used to filter rows in SQL?',
            options: ['WHERE', 'FILTER', 'CONDITION', 'IF'],
            correctAnswer: 0,
            explanation: 'WHERE clause is used to filter rows based on specified conditions.'
          },
          {
            question: 'Which keyword is used to sort results in SQL?',
            options: ['ORDER BY', 'SORT BY', 'ARRANGE BY', 'GROUP BY'],
            correctAnswer: 0,
            explanation: 'ORDER BY is used to sort the result set in ascending or descending order.'
          },
          {
            question: 'Which function is used to count rows in SQL?',
            options: ['COUNT()', 'SUM()', 'TOTAL()', 'NUMBER()'],
            correctAnswer: 0,
            explanation: 'COUNT() function returns the number of rows that match a specified criterion.'
          },
          {
            question: 'Which keyword is used to group rows in SQL?',
            options: ['GROUP BY', 'COLLECT BY', 'BATCH BY', 'CLUSTER BY'],
            correctAnswer: 0,
            explanation: 'GROUP BY is used to group rows that have the same values into summary rows.'
          },
          {
            question: 'Which keyword is used to join tables in SQL?',
            options: ['JOIN', 'CONNECT', 'LINK', 'MERGE'],
            correctAnswer: 0,
            explanation: 'JOIN is used to combine rows from two or more tables based on related columns.'
          },
          {
            question: 'Which keyword is used to create a new table in SQL?',
            options: ['CREATE TABLE', 'NEW TABLE', 'MAKE TABLE', 'BUILD TABLE'],
            correctAnswer: 0,
            explanation: 'CREATE TABLE is used to create a new table in the database.'
          }
        ]
      },
      powerbi: {
        intermediate: [
          {
            question: 'What is DAX in Power BI?',
            options: ['Data Analysis Expressions', 'Data Access XML', 'Database Analysis XLS', 'Data Analytics XLS'],
            correctAnswer: 0,
            explanation: 'DAX stands for Data Analysis Expressions, a formula language used in Power BI.'
          },
          {
            question: 'Which visualization is best for showing trends over time?',
            options: ['Bar chart', 'Line chart', 'Pie chart', 'Table'],
            correctAnswer: 1,
            explanation: 'Line charts are ideal for showing trends and changes over time.'
          },
          {
            question: 'What is a measure in Power BI?',
            options: ['A calculated field', 'A column', 'A table', 'A relationship'],
            correctAnswer: 0,
            explanation: 'A measure is a calculated field that performs calculations on data.'
          },
          {
            question: 'Which function is used to calculate totals in DAX?',
            options: ['SUM()', 'TOTAL()', 'ADD()', 'CALCULATE()'],
            correctAnswer: 0,
            explanation: 'SUM() function is used to calculate totals in DAX formulas.'
          },
          {
            question: 'What is a slicer in Power BI?',
            options: ['A filter control', 'A chart type', 'A data source', 'A calculation'],
            correctAnswer: 0,
            explanation: 'A slicer is a visual filter that allows users to filter data interactively.'
          },
          {
            question: 'Which relationship type is most common in Power BI?',
            options: ['One-to-One', 'One-to-Many', 'Many-to-Many', 'Many-to-One'],
            correctAnswer: 1,
            explanation: 'One-to-Many relationships are the most common type in Power BI data models.'
          },
          {
            question: 'What is the purpose of Power Query in Power BI?',
            options: ['Data transformation', 'Data visualization', 'Data modeling', 'Data sharing'],
            correctAnswer: 0,
            explanation: 'Power Query is used for data transformation and cleaning before visualization.'
          },
          {
            question: 'Which chart type is best for comparing categories?',
            options: ['Line chart', 'Bar chart', 'Scatter plot', 'Gauge'],
            correctAnswer: 1,
            explanation: 'Bar charts are excellent for comparing values across different categories.'
          },
          {
            question: 'What is a calculated column in Power BI?',
            options: ['A new column created by a formula', 'A column from data source', 'A hidden column', 'A temporary column'],
            correctAnswer: 0,
            explanation: 'A calculated column is a new column created using a DAX formula.'
          },
          {
            question: 'Which function is used to filter data in DAX?',
            options: ['FILTER()', 'WHERE()', 'SELECT()', 'FIND()'],
            correctAnswer: 0,
            explanation: 'FILTER() function is used to filter data in DAX expressions.'
          }
        ]
      },
      ml: {
        advanced: [
          {
            question: 'What is the purpose of cross-validation in machine learning?',
            options: ['To test model performance', 'To reduce overfitting', 'To increase accuracy', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Cross-validation helps test performance, reduce overfitting, and improve accuracy.'
          },
          {
            question: 'What is overfitting in machine learning?',
            options: ['Model performs well on training data but poorly on new data', 'Model performs poorly on training data', 'Model is too simple', 'Model has no errors'],
            correctAnswer: 0,
            explanation: 'Overfitting occurs when a model learns the training data too well and fails to generalize.'
          },
          {
            question: 'Which algorithm is used for classification problems?',
            options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'DBSCAN'],
            correctAnswer: 1,
            explanation: 'Logistic Regression is commonly used for classification problems.'
          },
          {
            question: 'What is the purpose of feature scaling in machine learning?',
            options: ['To normalize features', 'To improve model performance', 'To prevent bias', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Feature scaling normalizes features, improves performance, and prevents bias.'
          },
          {
            question: 'Which metric is used to evaluate classification models?',
            options: ['Accuracy', 'Precision', 'Recall', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Classification models are evaluated using accuracy, precision, recall, and other metrics.'
          },
          {
            question: 'What is the bias-variance tradeoff?',
            options: ['Balance between model complexity and generalization', 'Balance between speed and accuracy', 'Balance between training and testing', 'Balance between features and samples'],
            correctAnswer: 0,
            explanation: 'The bias-variance tradeoff balances model complexity with generalization ability.'
          },
          {
            question: 'Which technique is used to handle missing data?',
            options: ['Imputation', 'Deletion', 'Both A and B', 'None of the above'],
            correctAnswer: 2,
            explanation: 'Both imputation (filling missing values) and deletion are used to handle missing data.'
          },
          {
            question: 'What is the purpose of regularization in machine learning?',
            options: ['To prevent overfitting', 'To improve generalization', 'To reduce model complexity', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Regularization prevents overfitting, improves generalization, and reduces complexity.'
          },
          {
            question: 'Which algorithm is unsupervised?',
            options: ['Linear Regression', 'K-Means', 'Random Forest', 'SVM'],
            correctAnswer: 1,
            explanation: 'K-Means is an unsupervised clustering algorithm that doesn\'t require labeled data.'
          },
          {
            question: 'What is the purpose of feature selection?',
            options: ['To choose relevant features', 'To reduce dimensionality', 'To improve model performance', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Feature selection chooses relevant features, reduces dimensionality, and improves performance.'
          }
        ]
      },
      advanced: {
        advanced: [
          {
            question: 'What is the difference between supervised and unsupervised learning?',
            options: ['Supervised uses labeled data', 'Unsupervised finds patterns without labels', 'Both are correct', 'Neither is correct'],
            correctAnswer: 2,
            explanation: 'Supervised learning uses labeled data, while unsupervised learning finds patterns without labels.'
          },
          {
            question: 'What is deep learning?',
            options: ['A subset of machine learning', 'Uses neural networks with multiple layers', 'Requires large amounts of data', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Deep learning is a subset of ML that uses multi-layer neural networks and requires large datasets.'
          },
          {
            question: 'What is transfer learning?',
            options: ['Using pre-trained models', 'Applying knowledge from one domain to another', 'Reducing training time', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Transfer learning uses pre-trained models and applies knowledge across domains to reduce training time.'
          },
          {
            question: 'What is ensemble learning?',
            options: ['Combining multiple models', 'Improving prediction accuracy', 'Reducing overfitting', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Ensemble learning combines multiple models to improve accuracy and reduce overfitting.'
          },
          {
            question: 'What is the purpose of hyperparameter tuning?',
            options: ['To optimize model parameters', 'To improve model performance', 'To find best configuration', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Hyperparameter tuning optimizes model parameters to find the best configuration and improve performance.'
          },
          {
            question: 'What is the curse of dimensionality?',
            options: ['Performance degrades with more features', 'Data becomes sparse in high dimensions', 'Computational complexity increases', 'All of the above'],
            correctAnswer: 3,
            explanation: 'The curse of dimensionality refers to various problems that arise when working with high-dimensional data.'
          },
          {
            question: 'What is gradient descent?',
            options: ['An optimization algorithm', 'Used to minimize cost function', 'Iterative process', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Gradient descent is an iterative optimization algorithm used to minimize cost functions.'
          },
          {
            question: 'What is the purpose of dropout in neural networks?',
            options: ['To prevent overfitting', 'To improve generalization', 'To reduce model complexity', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Dropout is a regularization technique that prevents overfitting and improves generalization.'
          },
          {
            question: 'What is the difference between batch and online learning?',
            options: ['Batch processes all data at once', 'Online processes data incrementally', 'Different training approaches', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Batch learning processes all data at once, while online learning processes data incrementally.'
          },
          {
            question: 'What is the purpose of data augmentation?',
            options: ['To increase training data', 'To improve model robustness', 'To prevent overfitting', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Data augmentation increases training data, improves robustness, and helps prevent overfitting.'
          }
        ]
      },
      prompt: {
        advanced: [
          {
            question: 'What is prompt engineering?',
            options: ['Crafting effective AI prompts', 'Building AI models', 'Training neural networks', 'Data preprocessing'],
            correctAnswer: 0,
            explanation: 'Prompt engineering is the practice of crafting effective prompts to get desired outputs from AI models.'
          },
          {
            question: 'What is the purpose of few-shot learning in prompts?',
            options: ['To provide examples in the prompt', 'To improve model performance', 'To reduce training data needs', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Few-shot learning provides examples in prompts to improve performance and reduce training data needs.'
          },
          {
            question: 'What is chain-of-thought prompting?',
            options: ['Breaking down complex problems', 'Showing reasoning steps', 'Improving model accuracy', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Chain-of-thought prompting breaks down problems, shows reasoning, and improves accuracy.'
          },
          {
            question: 'What is the purpose of system prompts?',
            options: ['To set model behavior', 'To define context', 'To improve consistency', 'All of the above'],
            correctAnswer: 3,
            explanation: 'System prompts set model behavior, define context, and improve response consistency.'
          },
          {
            question: 'What is prompt chaining?',
            options: ['Using multiple prompts in sequence', 'Building complex workflows', 'Improving output quality', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Prompt chaining uses multiple prompts in sequence to build complex workflows and improve output.'
          },
          {
            question: 'What is the purpose of prompt templates?',
            options: ['To standardize prompts', 'To improve reusability', 'To maintain consistency', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Prompt templates standardize prompts, improve reusability, and maintain consistency.'
          },
          {
            question: 'What is the difference between zero-shot and few-shot prompting?',
            options: ['Zero-shot uses no examples', 'Few-shot uses examples', 'Different learning approaches', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Zero-shot uses no examples, few-shot uses examples, representing different learning approaches.'
          },
          {
            question: 'What is the purpose of prompt optimization?',
            options: ['To improve prompt effectiveness', 'To reduce token usage', 'To increase accuracy', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Prompt optimization improves effectiveness, reduces token usage, and increases accuracy.'
          },
          {
            question: 'What is the role of context in prompts?',
            options: ['To provide background information', 'To improve understanding', 'To guide responses', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Context in prompts provides background, improves understanding, and guides appropriate responses.'
          },
          {
            question: 'What is the purpose of prompt testing?',
            options: ['To evaluate prompt effectiveness', 'To identify improvements', 'To measure performance', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Prompt testing evaluates effectiveness, identifies improvements, and measures performance.'
          }
        ]
      }
    };

    const questions = questionTemplates[module as keyof typeof questionTemplates]?.[level as keyof typeof questionTemplates[typeof module]] || 
                     questionTemplates[module as keyof typeof questionTemplates]?.beginner || 
                     [{
                       question: `Sample ${module} question`,
                       options: ['Option A', 'Option B', 'Option C', 'Option D'],
                       correctAnswer: 0,
                       explanation: `This is a sample question for ${module} at ${level} level.`
                     }];

    // Return the requested number of questions (up to 10)
    return questions.slice(0, count).map((q, index) => ({
      id: (index + 1).toString(),
      ...q
    }));
  };

  const generateTestQuestions = (module: string, level: string, title: string) => {
    const questionTemplates = {
      excel: {
        beginner: [
          {
            question: 'Which function is used to sum a range of cells in Excel?',
            options: ['SUM()', 'ADD()', 'TOTAL()', 'COUNT()'],
            correctAnswer: 0,
            explanation: 'SUM() is the correct function to add up values in a range of cells.'
          },
          {
            question: 'What does VLOOKUP stand for?',
            options: ['Vertical Lookup', 'Value Lookup', 'Variable Lookup', 'Vector Lookup'],
            correctAnswer: 0,
            explanation: 'VLOOKUP stands for Vertical Lookup, used to search for values in a table.'
          },
          {
            question: 'Which shortcut key is used to save a workbook in Excel?',
            options: ['Ctrl+S', 'Ctrl+N', 'Ctrl+O', 'Ctrl+P'],
            correctAnswer: 0,
            explanation: 'Ctrl+S is the standard shortcut to save a workbook in Excel.'
          }
        ],
        intermediate: [
          {
            question: 'Which function is used to find the maximum value in a range?',
            options: ['MAX()', 'LARGE()', 'TOP()', 'HIGHEST()'],
            correctAnswer: 0,
            explanation: 'MAX() function returns the largest value in a range of cells.'
          },
          {
            question: 'What does INDEX-MATCH combination do?',
            options: ['More flexible than VLOOKUP', 'Less accurate than VLOOKUP', 'Same as VLOOKUP', 'Replaces SUMIF'],
            correctAnswer: 0,
            explanation: 'INDEX-MATCH is more flexible than VLOOKUP as it can look up values in any column.'
          }
        ]
      },
      python: {
        beginner: [
          {
            question: 'Which of the following is the correct way to create a list in Python?',
            options: ['list = []', 'list = ()', 'list = {}', 'list = ""'],
            correctAnswer: 0,
            explanation: 'Square brackets [] are used to create a list in Python.'
          },
          {
            question: 'What is the output of print(2 ** 3)?',
            options: ['6', '8', '9', '5'],
            correctAnswer: 1,
            explanation: '** is the exponentiation operator, so 2 ** 3 = 8.'
          }
        ],
        intermediate: [
          {
            question: 'Which library is commonly used for data manipulation in Python?',
            options: ['pandas', 'numpy', 'matplotlib', 'seaborn'],
            correctAnswer: 0,
            explanation: 'pandas is the primary library for data manipulation and analysis in Python.'
          }
        ]
      },
      statistics: {
        beginner: [
          {
            question: 'What is the mean of the numbers 2, 4, 6, 8?',
            options: ['4', '5', '6', '8'],
            correctAnswer: 1,
            explanation: 'Mean = (2+4+6+8)/4 = 20/4 = 5'
          }
        ]
      },
      sql: {
        beginner: [
          {
            question: 'Which SQL command is used to retrieve data from a database?',
            options: ['SELECT', 'GET', 'FETCH', 'RETRIEVE'],
            correctAnswer: 0,
            explanation: 'SELECT is used to retrieve data from database tables.'
          }
        ]
      },
      powerbi: {
        intermediate: [
          {
            question: 'What is DAX in Power BI?',
            options: ['Data Analysis Expressions', 'Data Access XML', 'Database Analysis XLS', 'Data Analytics XLS'],
            correctAnswer: 0,
            explanation: 'DAX stands for Data Analysis Expressions, a formula language used in Power BI.'
          }
        ]
      },
      ml: {
        advanced: [
          {
            question: 'What is the purpose of cross-validation in machine learning?',
            options: ['To test model performance', 'To reduce overfitting', 'To increase accuracy', 'All of the above'],
            correctAnswer: 3,
            explanation: 'Cross-validation helps test performance, reduce overfitting, and improve accuracy.'
          }
        ]
      },
      advanced: {
        advanced: [
          {
            question: 'What is the difference between supervised and unsupervised learning?',
            options: ['Supervised uses labeled data', 'Unsupervised finds patterns without labels', 'Both are correct', 'Neither is correct'],
            correctAnswer: 2,
            explanation: 'Supervised learning uses labeled data, while unsupervised learning finds patterns without labels.'
          }
        ]
      },
      prompt: {
        advanced: [
          {
            question: 'What is prompt engineering?',
            options: ['Crafting effective AI prompts', 'Building AI models', 'Training neural networks', 'Data preprocessing'],
            correctAnswer: 0,
            explanation: 'Prompt engineering is the practice of crafting effective prompts to get desired outputs from AI models.'
          }
        ]
      }
    };

    const questions = questionTemplates[module as keyof typeof questionTemplates]?.[level as keyof typeof questionTemplates[typeof module]] || 
                     questionTemplates[module as keyof typeof questionTemplates]?.beginner || 
                     [{
                       question: `Sample ${module} question`,
                       options: ['Option A', 'Option B', 'Option C', 'Option D'],
                       correctAnswer: 0,
                       explanation: `This is a sample question for ${module} at ${level} level.`
                     }];

    return {
      title,
      module,
      questions: questions.map((q, index) => ({
        id: (index + 1).toString(),
        ...q
      }))
    };
  };

  const createCustomTest = async () => {
    if (!user || !newTestTitle.trim() || !newTestTopics.trim()) return;

    setIsGeneratingRecommendation(true);
    try {
      // Generate dynamic questions using Gemini
      const dynamicQuestions = await dynamicTestService.generateTestQuestions({
        title: newTestTitle.trim(),
        module: newTestModule,
        topics: newTestTopics.trim(),
        difficulty: newTestLevel,
        questionCount: 10
      });

      const customTest = {
        title: newTestTitle.trim(),
        module: newTestModule,
        level: newTestLevel,
        questions: dynamicQuestions.map((q, index) => ({
          id: (index + 1).toString(),
          ...q
        })),
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        isCustom: true,
        isDynamic: true,
        topics: newTestTopics.trim()
      };

      await firestoreOperations.createTest(customTest);
      setNewTestTitle('');
      setNewTestTopics('');
      setNewTestModule('excel');
      setNewTestLevel('beginner');
      setShowCreateForm(false);
      loadTests();
    } catch (error) {
      console.error('Error creating custom test:', error);
      
      // Check if it's a quota error
      if (error.message && error.message.includes('quota')) {
        alert('API quota exceeded. Please try again in a few minutes or upgrade your API plan. The AI tutors are also affected by this limitation.');
      } else {
        alert('Failed to create test. Please try again.');
      }
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };

  const deleteTest = async (testId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this test? This action cannot be undone.')) {
      try {
        await firestoreOperations.deleteTest(testId);
        loadTests();
      } catch (error) {
        console.error('Error deleting test:', error);
        alert('Failed to delete test. Please try again.');
      }
    }
  };

  const filteredTests = selectedModule === 'all' 
    ? tests 
    : tests.filter(test => test.module === selectedModule);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 mb-2">Practice Tests</h1>
            <p className="text-gray-100">Test your knowledge and track your progress</p>
          </div>
          <div className="flex gap-3">
            <NeumorphicButton
              variant="secondary"
              onClick={createRecommendedTests}
              icon={Target}
              disabled={isGeneratingRecommendation}
            >
              {isGeneratingRecommendation ? 'Analyzing...' : 'Get Recommended Tests'}
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              onClick={() => setShowCreateForm(true)}
              icon={Plus}
            >
              Create Test
            </NeumorphicButton>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <NeumorphicCard padding="md">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-white">Filter by module:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {modules.map((module) => (
                <NeumorphicButton
                  key={module.id}
                  variant={selectedModule === module.id ? 'accent' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedModule(module.id)}
                >
                  {module.name}
                </NeumorphicButton>
              ))}
            </div>
          </div>
        </NeumorphicCard>
      </div>

      {/* Create Test Form */}
      {showCreateForm && (
        <NeumorphicCard padding="lg" className="mb-6">
          <h3 className="text-xl font-bold text-gray-100 mb-6">Create Custom Test</h3>
          <div className="space-y-6">
            {/* Test Title */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Test Title
              </label>
              <input
                type="text"
                value={newTestTitle}
                onChange={(e) => setNewTestTitle(e.target.value)}
                placeholder="Enter test title..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Topics Input */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Topics to Cover
              </label>
              <textarea
                value={newTestTopics}
                onChange={(e) => setNewTestTopics(e.target.value)}
                placeholder="Enter specific topics you want to test (e.g., VLOOKUP, Pivot Tables, Data Analysis, Machine Learning algorithms, SQL joins, Python pandas...)"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
            </div>

            {/* Module Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-3">
                Select Module
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {modules.slice(1).map((module) => (
                  <NeumorphicCard
                    key={module.id}
                    padding="sm"
                    className={`cursor-pointer transition-all ${
                      newTestModule === module.id
                        ? 'ring-2 ring-orange-500 bg-orange-500/10'
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => setNewTestModule(module.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        newTestModule === module.id 
                          ? 'bg-orange-500' 
                          : 'bg-gray-600'
                      }`}></div>
                      <span className="text-sm text-gray-100">{module.name}</span>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>

            {/* Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-3">
                Select Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'beginner', name: 'Beginner', description: 'Basic concepts' },
                  { id: 'intermediate', name: 'Intermediate', description: 'Advanced concepts' },
                  { id: 'advanced', name: 'Advanced', description: 'Expert level' }
                ].map((level) => (
                  <NeumorphicCard
                    key={level.id}
                    padding="md"
                    className={`cursor-pointer transition-all ${
                      newTestLevel === level.id
                        ? 'ring-2 ring-orange-500 bg-orange-500/10'
                        : 'hover:bg-gray-800/50'
                    }`}
                    onClick={() => setNewTestLevel(level.id)}
                  >
                    <div className="text-center">
                      <h4 className="font-medium text-gray-100 mb-1">{level.name}</h4>
                      <p className="text-xs text-gray-300">{level.description}</p>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <NeumorphicButton
                variant="accent"
                onClick={createCustomTest}
                disabled={!newTestTitle.trim() || !newTestTopics.trim() || isGeneratingRecommendation}
              >
                {isGeneratingRecommendation ? 'Creating...' : 'Create Test'}
              </NeumorphicButton>
              <NeumorphicButton
                variant="secondary"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewTestTitle('');
                  setNewTestTopics('');
                  setNewTestModule('excel');
                  setNewTestLevel('beginner');
                }}
              >
                Cancel
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicCard>
      )}

      {/* Tests Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <NeumorphicCard padding="lg">
                <div className="h-48 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </NeumorphicCard>
            </div>
          ))}
        </div>
      ) : filteredTests.length === 0 ? (
        <NeumorphicCard padding="xl" className="text-center">
          <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-100 mb-2">No tests available</h3>
          <p className="text-gray-100 mb-6">
            {selectedModule === 'all' 
              ? 'Create your first test or add sample tests to get started.'
              : `No tests available for ${modules.find(m => m.id === selectedModule)?.name}.`
            }
          </p>
          <div className="flex gap-3 justify-center">
            <NeumorphicButton
              variant="secondary"
              onClick={createRecommendedTests}
              icon={Target}
              disabled={isGeneratingRecommendation}
            >
              {isGeneratingRecommendation ? 'Analyzing...' : 'Get Recommended Tests'}
            </NeumorphicButton>
            <NeumorphicButton
              variant="accent"
              onClick={() => setShowCreateForm(true)}
              icon={Plus}
            >
              Create Test
            </NeumorphicButton>
          </div>
        </NeumorphicCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <NeumorphicCard key={test.id} hoverable padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-100 mb-2">{test.title}</h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 text-sm font-medium rounded-lg">
                    {modules.find(m => m.id === test.module)?.name || test.module}
                  </span>
                </div>
                {/* Delete button - only show for custom, recommended, and dynamic tests */}
                {(test.isCustom || test.isRecommended || test.isDynamic) && (
                  <NeumorphicButton
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTest(test.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    icon={Trash2}
                  />
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-100">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                  <span>{test.questions.length} questions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-100">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>~{Math.ceil(test.questions.length * 1.5)} minutes</span>
                </div>
                        <div className="flex items-center gap-2 text-sm text-gray-100">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          <span>
                            {test.isRecommended ? 'Recommended' : test.isDynamic ? 'AI Generated' : test.isCustom ? 'Custom' : 'Default'} Test
                            {test.level && ` • ${test.level.charAt(0).toUpperCase() + test.level.slice(1)}`}
                          </span>
                        </div>
                        {test.topics && (
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <BookOpen className="w-4 h-4 text-orange-500" />
                            <span className="truncate" title={test.topics}>
                              Topics: {test.topics}
                            </span>
                          </div>
                        )}
              </div>

              <Link to={`/tests/${test.id}/attempt`}>
                <NeumorphicButton
                  variant="accent"
                  className="w-full"
                  icon={Play}
                >
                  Start Test
                </NeumorphicButton>
              </Link>
            </NeumorphicCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Tests);