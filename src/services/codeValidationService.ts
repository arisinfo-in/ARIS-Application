import { FIREBASE_FUNCTIONS } from '../utils/firebaseFunctions';
import { PracticalQuestion, TestCase } from './practicalQuestionService';

export interface CodeValidationResult {
  syntaxValid: boolean;
  logicCorrect: boolean;
  score: number; // 0-10
  feedback: string[];
  testCaseResults: TestCaseResult[];
  suggestions: string[];
  executionTime?: number;
}

export interface TestCaseResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput?: string;
  error?: string;
}

class CodeValidationService {
  async validateCode(
    code: string,
    question: PracticalQuestion,
    module: string
  ): Promise<CodeValidationResult> {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log(`Validating ${module} code...`);
      }

      // Basic syntax check first
      const syntaxCheck = this.checkSyntax(code, module);
      
      if (!syntaxCheck.valid) {
        return {
          syntaxValid: false,
          logicCorrect: false,
          score: 0,
          feedback: [`Syntax Error: ${syntaxCheck.error}`],
          testCaseResults: [],
          suggestions: ['Fix syntax errors before logic validation']
        };
      }

      // Call validation API
      const response = await fetch(FIREBASE_FUNCTIONS.validateCode, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          question: question.question,
          module,
          requirements: question.requirements,
          testCases: question.testCases,
          scenario: question.scenario
        })
      });

      if (!response.ok) {
        throw new Error('Validation service unavailable');
      }

      const data = await response.json();
      return this.parseValidationResponse(data, question.testCases);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error validating code:', error);
      }
      // Fallback to basic validation
      return this.basicValidation(code, question);
    }
  }

  private checkSyntax(code: string, module: string): { valid: boolean; error?: string } {
    if (!code || code.trim().length === 0) {
      return { valid: false, error: 'Code cannot be empty' };
    }

    // Basic syntax checks
    const moduleLower = module.toLowerCase();
    
    if (moduleLower === 'sql') {
      // Basic SQL syntax checks
      const upperCode = code.toUpperCase();
      
      // Check for basic SQL structure
      if (!upperCode.includes('SELECT')) {
        return { valid: false, error: 'SQL query must contain SELECT statement' };
      }

      // Check for balanced parentheses
      const openParens = (code.match(/\(/g) || []).length;
      const closeParens = (code.match(/\)/g) || []).length;
      if (openParens !== closeParens) {
        return { valid: false, error: 'Unbalanced parentheses' };
      }
    }
    
    if (moduleLower === 'excel') {
      // Excel formulas - more lenient validation
      // Excel can be formulas or descriptive text
      if (code.trim().length === 0) {
        return { valid: false, error: 'Please provide your Excel solution or approach' };
      }
      // Excel formulas typically start with =, but we also accept descriptive answers
      // So we allow both formula syntax and descriptive text
      return { valid: true };
    }

    if (module.toLowerCase() === 'python') {
      // Basic Python syntax checks
      try {
        // Check for balanced brackets, braces, parentheses
        const brackets = { '(': ')', '[': ']', '{': '}' };
        const stack: string[] = [];
        let inString = false;
        let stringChar = '';

        for (let i = 0; i < code.length; i++) {
          const char = code[i];
          
          // Handle string literals
          if ((char === '"' || char === "'") && code[i - 1] !== '\\') {
            if (!inString) {
              inString = true;
              stringChar = char;
            } else if (char === stringChar) {
              inString = false;
            }
            continue;
          }

          if (inString) continue;

          if (char in brackets) {
            stack.push(brackets[char as keyof typeof brackets]);
          } else if ([')', ']', '}'].includes(char)) {
            if (stack.length === 0 || stack.pop() !== char) {
              return { valid: false, error: 'Unbalanced brackets or braces' };
            }
          }
        }

        if (stack.length > 0) {
          return { valid: false, error: 'Unbalanced brackets or braces' };
        }
      } catch {
        return { valid: false, error: 'Syntax validation error' };
      }
    }

    return { valid: true };
  }

  private parseValidationResponse(
    data: { validation?: {
      syntaxValid?: boolean;
      logicCorrect?: boolean;
      score?: number;
      feedback?: string | string[];
      suggestions?: string | string[];
      testCaseResults?: Array<{
        description?: string;
        passed?: boolean;
        actualOutput?: string;
        error?: string;
      }>;
      executionTime?: number;
    } },
    testCases: TestCase[]
  ): CodeValidationResult {
    try {
      const validation = data.validation || data;
      
      return {
        syntaxValid: validation.syntaxValid !== false,
        logicCorrect: validation.logicCorrect === true,
        score: validation.score || 0,
        feedback: Array.isArray(validation.feedback) 
          ? validation.feedback 
          : [validation.feedback || 'Validation completed'],
        testCaseResults: this.mapTestCases(validation.testCaseResults, testCases),
        suggestions: Array.isArray(validation.suggestions) 
          ? validation.suggestions 
          : [],
        executionTime: validation.executionTime
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error parsing validation response:', error);
      }
      return this.basicValidation('', { testCases } as PracticalQuestion);
    }
  }

  private mapTestCases(
    results: Array<{ description?: string; passed?: boolean; actualOutput?: string; error?: string }>,
    testCases: TestCase[]
  ): TestCaseResult[] {
    if (!Array.isArray(results) || results.length === 0) {
      // Default: mark all as pending if no results
      return testCases.map(tc => ({
        testCase: tc,
        passed: false,
        error: 'Test not executed'
      }));
    }

      return testCases.map((tc, index) => {
        const result = results[index] || results.find((r) => r.description === tc.description);
        return {
          testCase: tc,
          passed: result?.passed === true,
          actualOutput: result?.actualOutput,
          error: result?.error
        };
      });
  }

  private basicValidation(
    code: string,
    question: PracticalQuestion
  ): CodeValidationResult {
    // Basic validation when API fails
    const hasCode = code && code.trim().length > 0;
    const score = hasCode ? 5 : 0; // Basic score if code exists

    return {
      syntaxValid: hasCode,
      logicCorrect: false, // Cannot determine without API
      score,
      feedback: hasCode 
        ? ['Code submitted successfully. Detailed validation unavailable.']
        : ['Please write code to solve the problem'],
      testCaseResults: question.testCases.map(tc => ({
        testCase: tc,
        passed: false,
        error: 'Validation service unavailable'
      })),
      suggestions: ['Ensure your code matches the requirements', 'Test your code manually']
    };
  }

  // Helper method to extract code from response
  extractCodeFromResponse(text: string): string {
    // Try to extract code blocks
    const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
    const matches = codeBlockRegex.exec(text);
    
    if (matches && matches[1]) {
      return matches[1].trim();
    }

    // Try to extract inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    const inlineMatches = inlineCodeRegex.exec(text);
    
    if (inlineMatches && inlineMatches[1]) {
      return inlineMatches[1].trim();
    }

    return text.trim();
  }
}

export const codeValidationService = new CodeValidationService();

