// Helper to get Firebase Functions URLs
const getFunctionUrl = (functionName: string): string => {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'aris-aidataanlayst';
  const region = 'us-central1'; // Default region for Firebase Functions
  return `https://${region}-${projectId}.cloudfunctions.net/${functionName}`;
};

export const FIREBASE_FUNCTIONS = {
  aiTutor: getFunctionUrl('aiTutorFunction'),
  generateTest: getFunctionUrl('generateTestFunction'),
  generateTheoryQuestion: getFunctionUrl('generateTheoryQuestionFunction'),
  generatePracticalQuestion: getFunctionUrl('generatePracticalQuestionFunction'),
  speechAnalysis: getFunctionUrl('speechAnalysisFunction'),
  validateCode: getFunctionUrl('validateCodeFunction'),
  newsFeed: getFunctionUrl('newsFeedFunction'),
};

