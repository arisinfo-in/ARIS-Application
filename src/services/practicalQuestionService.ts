import { FIREBASE_FUNCTIONS } from '../utils/firebaseFunctions';

export interface TestCase {
  description: string;
  expectedOutput: string;
  input?: string;
}

export interface PracticalQuestion {
  question: string;
  scenario: string;
  requirements: string[];
  dataContext?: string;
  difficulty: string;
  estimatedTime: string;
  testCases: TestCase[];
  hints?: string[];
  module: string;
}

class PracticalQuestionService {
  async generatePracticalQuestion(
    theoryQuestion: string,
    userTranscript: string,
    module: string,
    difficulty: string,
    technicalTerms: string[]
  ): Promise<PracticalQuestion> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Generating practical question from theory response...');
      }
      
      const prompt = this.createPrompt(
        theoryQuestion,
        userTranscript,
        module,
        difficulty,
        technicalTerms
      );

      const response = await fetch(FIREBASE_FUNCTIONS.generatePracticalQuestion, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          module,
          difficulty,
          theoryQuestion,
          userTranscript,
          technicalTerms
        })
      });

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Firebase function failed, using fallback');
        }
        return this.getFallbackQuestion(module, difficulty);
      }

      const data = await response.json();
      const parsed = this.parseResponse(data.response || data);
      
      if (parsed) {
        return parsed;
      }

      return this.getFallbackQuestion(module, difficulty);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error generating practical question:', error);
      }
      return this.getFallbackQuestion(module, difficulty);
    }
  }

  private createPrompt(
    theoryQuestion: string,
    userTranscript: string,
    module: string,
    difficulty: string,
    technicalTerms: string[]
  ): string {
    return `You are an expert data analyst interview coach. Generate a practical coding question based on a candidate's verbal response to a theory question.

THEORY QUESTION:
"${theoryQuestion}"

CANDIDATE'S RESPONSE:
"${userTranscript}"

MODULE: ${module}
DIFFICULTY: ${difficulty}
TECHNICAL TERMS MENTIONED: ${technicalTerms.join(', ')}

TASK:
Create a practical, scenario-based coding question that:
1. Tests the concepts the candidate mentioned in their verbal answer
2. Requires them to apply what they just explained
3. Uses a real-world business scenario
4. Matches the difficulty level (${difficulty})
5. Is specific to ${module} (SQL, Python, Excel, etc.)

REQUIREMENTS:
- Question should be contextual to what they said
- Include specific business scenario
- Provide sample data schema/context if needed
- Mention constraints or requirements
- Make it practical and applicable

RESPONSE FORMAT (JSON):
{
  "question": "Full question text with scenario",
  "scenario": "Business context/background",
  "requirements": ["requirement1", "requirement2"],
  "dataContext": "Description of data/schema if needed",
  "difficulty": "${difficulty}",
  "estimatedTime": "5-10 minutes",
  "testCases": [
    {
      "description": "Basic functionality",
      "expectedOutput": "Description of expected result"
    }
  ],
  "hints": ["Optional hint if user struggles"]
}

GUIDELINES:
- Make it realistic and business-relevant
- Build on concepts they mentioned
- If they showed strong understanding, make it challenging
- If they struggled, make it more foundational
- Include edge cases appropriate for difficulty level
- Return ONLY valid JSON, no markdown or code blocks`;
  }

  private parseResponse(response: string): PracticalQuestion | null {
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = response.trim();
      
      // Remove markdown code blocks if present
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      
      // Try to find JSON object
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        return {
          question: parsed.question || 'Write code to solve the given problem',
          scenario: parsed.scenario || 'Business scenario',
          requirements: Array.isArray(parsed.requirements) ? parsed.requirements : [],
          dataContext: parsed.dataContext || '',
          difficulty: parsed.difficulty || 'medium',
          estimatedTime: parsed.estimatedTime || '5-10 minutes',
          testCases: Array.isArray(parsed.testCases) ? parsed.testCases : [],
          hints: Array.isArray(parsed.hints) ? parsed.hints : [],
          module: parsed.module || 'general'
        };
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing AI response:', error);
      }
    }
    
    return null;
  }

  private getFallbackQuestion(module: string, difficulty: string): PracticalQuestion {
    const fallbackQuestions: { [key: string]: { [key: string]: PracticalQuestion } } = {
      sql: {
        easy: {
          question: "Write a SQL query to find the top 5 customers by total purchase amount",
          scenario: "You work for an e-commerce company. You have two tables: customers (customer_id, name, email) and orders (order_id, customer_id, order_date, amount).",
          requirements: [
            "Use appropriate JOIN to combine tables",
            "Calculate total purchase amount per customer",
            "Order by total amount in descending order",
            "Limit results to top 5"
          ],
          dataContext: "customers table has customer_id (primary key), name, email. orders table has order_id, customer_id (foreign key), order_date, amount.",
          difficulty: "easy",
          estimatedTime: "5-7 minutes",
          testCases: [
            {
              description: "Should return top 5 customers",
              expectedOutput: "List of 5 customers with highest total purchase amounts"
            }
          ],
          module: "sql"
        },
        medium: {
          question: "Write a SQL query using window functions to find customers who made purchases in at least 3 consecutive months",
          scenario: "E-commerce analytics task: Identify loyal customers with consistent purchasing behavior.",
          requirements: [
            "Use window functions (ROW_NUMBER, LAG, or similar)",
            "Identify consecutive months",
            "Filter customers with at least 3 consecutive months",
            "Include customer_id and month information"
          ],
          dataContext: "orders table: order_id, customer_id, order_date, amount",
          difficulty: "medium",
          estimatedTime: "10-15 minutes",
          testCases: [
            {
              description: "Should identify consecutive months correctly",
              expectedOutput: "List of customers with 3+ consecutive purchase months"
            }
          ],
          module: "sql"
        },
        hard: {
          question: "Optimize and rewrite this SQL query for better performance: SELECT * FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_date > '2024-01-01'",
          scenario: "Performance optimization task for a slow-running query affecting dashboard load times.",
          requirements: [
            "Remove SELECT * and specify only needed columns",
            "Add appropriate indexes",
            "Consider query rewriting if needed",
            "Explain optimization strategy"
          ],
          dataContext: "orders table with millions of rows, customers table with thousands of rows",
          difficulty: "hard",
          estimatedTime: "15-20 minutes",
          testCases: [
            {
              description: "Query should be optimized",
              expectedOutput: "Optimized query with better performance"
            }
          ],
          module: "sql"
        }
      },
      excel: {
        easy: {
          question: "Write an Excel formula or describe how you would use VLOOKUP to find product prices from a separate table",
          scenario: "You have a sales report with product IDs and need to add product prices from a master product list.",
          requirements: [
            "Use VLOOKUP formula (or INDEX/MATCH)",
            "Handle cases where product is not found",
            "Explain your approach"
          ],
          dataContext: "Sales sheet: Column A has Product IDs, Column B should have Prices. Master Product List: Sheet2 with Product IDs in column A and Prices in column B.",
          difficulty: "easy",
          estimatedTime: "5-7 minutes",
          testCases: [
            {
              description: "Should correctly look up prices",
              expectedOutput: "Prices displayed in Column B of sales sheet"
            }
          ],
          module: "excel"
        },
        medium: {
          question: "Create a Pivot Table or describe how you would analyze sales data by region and product category",
          scenario: "Analyze quarterly sales performance by region and product category to identify trends.",
          requirements: [
            "Group data by region and product category",
            "Calculate sum of sales",
            "Show quarterly breakdown",
            "Describe steps or provide formula approach"
          ],
          dataContext: "Sales data with columns: Date, Region, Product_Category, Sales_Amount, Units_Sold",
          difficulty: "medium",
          estimatedTime: "10-15 minutes",
          testCases: [
            {
              description: "Should correctly aggregate by region and category",
              expectedOutput: "Pivot table showing sales by region and category"
            }
          ],
          module: "excel"
        },
        hard: {
          question: "Design a complex Excel solution using array formulas or Power Query to consolidate data from multiple sheets",
          scenario: "Consolidate monthly sales reports from 12 different sheets into a single summary with dynamic calculations.",
          requirements: [
            "Combine data from multiple sheets",
            "Handle inconsistent formats",
            "Create dynamic summary calculations",
            "Explain your approach in detail"
          ],
          dataContext: "12 sheets (Jan, Feb, Mar... Dec) each with columns: Date, Product, Sales, Region",
          difficulty: "hard",
          estimatedTime: "20-25 minutes",
          testCases: [
            {
              description: "Should consolidate all sheets correctly",
              expectedOutput: "Summary sheet with all consolidated data"
            }
          ],
          module: "excel"
        }
      },
      python: {
        easy: {
          question: "Write a Python function to clean a pandas DataFrame by removing duplicates and filling missing values",
          scenario: "Data cleaning task for a customer dataset with duplicate records and missing values.",
          requirements: [
            "Remove duplicate rows",
            "Fill numeric columns with median",
            "Fill categorical columns with mode",
            "Return cleaned DataFrame"
          ],
          dataContext: "DataFrame with columns: customer_id, name, age, city, email",
          difficulty: "easy",
          estimatedTime: "5-10 minutes",
          testCases: [
            {
              description: "Should remove duplicates",
              expectedOutput: "DataFrame with no duplicate rows"
            },
            {
              description: "Should fill missing values",
              expectedOutput: "DataFrame with no missing values"
            }
          ],
          module: "python"
        },
        medium: {
          question: "Write Python code to analyze sales data and create visualizations showing trends and top products",
          scenario: "Business intelligence task: Analyze monthly sales trends and identify top-performing products.",
          requirements: [
            "Load data from CSV or DataFrame",
            "Calculate monthly sales trends",
            "Identify top 5 products by revenue",
            "Create visualizations using matplotlib or seaborn"
          ],
          dataContext: "sales_data.csv with columns: date, product_id, quantity, price, region",
          difficulty: "medium",
          estimatedTime: "15-20 minutes",
          testCases: [
            {
              description: "Should show monthly trends",
              expectedOutput: "Line chart showing sales over time"
            },
            {
              description: "Should identify top products",
              expectedOutput: "Bar chart or list of top 5 products"
            }
          ],
          module: "python"
        },
        hard: {
          question: "Write a Python function to detect outliers using IQR method and create a robust data pipeline",
          scenario: "Advanced data quality task: Build a production-ready pipeline for outlier detection.",
          requirements: [
            "Implement IQR (Interquartile Range) method",
            "Handle multiple columns",
            "Return filtered DataFrame",
            "Include error handling and logging"
          ],
          dataContext: "DataFrame with numeric columns that may contain outliers",
          difficulty: "hard",
          estimatedTime: "20-25 minutes",
          testCases: [
            {
              description: "Should detect outliers correctly",
              expectedOutput: "DataFrame with outliers removed or flagged"
            }
          ],
          module: "python"
        }
      }
    };

    const moduleQuestions = fallbackQuestions[module.toLowerCase()];
    if (moduleQuestions && moduleQuestions[difficulty.toLowerCase()]) {
      return moduleQuestions[difficulty.toLowerCase()];
    }

    // Default fallback
    return {
      question: `Write ${module} code to solve the given problem based on the concepts discussed`,
      scenario: "Practical application of the theory concepts you explained",
      requirements: ["Implement the solution", "Follow best practices"],
      dataContext: "Use appropriate data structures",
      difficulty: difficulty,
      estimatedTime: "10 minutes",
      testCases: [
        {
          description: "Basic functionality",
          expectedOutput: "Correct implementation"
        }
      ],
      module: module
    };
  }
}

export const practicalQuestionService = new PracticalQuestionService();

