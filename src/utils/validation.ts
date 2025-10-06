// Input validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

export const validateTestQuestion = (question: {
  question: string;
  options: string[];
  correctAnswer: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!question.question || question.question.trim().length < 10) {
    errors.push('Question must be at least 10 characters long');
  }

  if (question.options.length < 2) {
    errors.push('At least 2 options are required');
  }

  if (question.options.some(option => !option.trim())) {
    errors.push('All options must have content');
  }

  if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
    errors.push('Correct answer must be a valid option index');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateStudyPlan = (plan: {
  title: string;
  schedule: Array<{ module: string; date: string; completed: boolean }>;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!plan.title || plan.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (plan.schedule.length === 0) {
    errors.push('At least one schedule item is required');
  }

  const validModules = ['excel', 'powerbi', 'sql', 'python', 'statistics', 'ml', 'prompt', 'advanced'];
  const invalidModules = plan.schedule.filter(item => !validModules.includes(item.module));
  if (invalidModules.length > 0) {
    errors.push('All schedule items must have valid modules');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
