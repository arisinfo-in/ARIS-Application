import * as functions from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { Response } from 'express';

// Firebase Admin is automatically initialized in Cloud Functions

// Define secret for GROQ API key
const groqApiKey = defineSecret('GROQ_API_KEY');

// Import all function modules
import { aiTutor } from './ai-tutor';
import { generateTest } from './generate-test';
import { generateTheoryQuestion } from './generate-theory-question';
import { generatePracticalQuestion } from './generate-practical-question';
import { speechAnalysis } from './speech-analysis';
import { validateCode } from './validate-code';
import { newsFeed } from './news-feed';

// Helper function to set CORS headers
const setCorsHeaders = (res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Content-Type', 'application/json');
};

// Export all functions as HTTP callable functions with secrets
export const aiTutorFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    // Set the API key in environment for the function
    process.env.GROQ_API_KEY = groqApiKey.value();
    await aiTutor(req as any, res as any);
  });

export const generateTestFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await generateTest(req, res);
  });

export const generateTheoryQuestionFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await generateTheoryQuestion(req, res);
  });

export const generatePracticalQuestionFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await generatePracticalQuestion(req, res);
  });

export const speechAnalysisFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await speechAnalysis(req, res);
  });

export const validateCodeFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await validateCode(req, res);
  });

export const newsFeedFunction = functions.https.onRequest({
  secrets: [groqApiKey],
}, async (req, res) => {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).send('');
      return;
    }
    
    process.env.GROQ_API_KEY = groqApiKey.value();
    await newsFeed(req, res);
  });

