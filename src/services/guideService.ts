import { geminiService } from './geminiService';
import { guideKnowledgeBase, FeatureGuide } from '../data/guideKnowledgeBase';

export interface GuideResponse {
  answer: string;
  feature?: FeatureGuide;
  steps?: string[];
  route?: string;
  externalLink?: string; // External URL for company-related queries
  relatedFeatures?: FeatureGuide[];
  quickActions?: Array<{ label: string; action: string; route: string }>;
}

class GuideService {
  private getSystemPrompt(): string {
    return `You are ARIS Bot - a helpful guide bot for the ARIS learning platform.

CRITICAL: Keep responses VERY SHORT and formatted like a concise article.

Response Rules:
1. Maximum 50 words total
2. One sentence description only
3. Use article-style formatting with clear headings
4. Bullet points for steps (max 3-4 steps)
5. Be direct, no explanations
6. NO examples or lengthy text

ARIS Company Context:
- ARIS is a leading AI data analytics company specializing in agentic AI training and consultancy
- Founded in 2020, Tagline: "Human + AI = Super Intelligence Analytics"
- 50,000+ students, 4.9/5 rating, 98% satisfaction
- Trainers: Syed Shabaz (CEO), Syed Rahman Hussain (Lead AI Analyst), Mohammed Imtiyaz (AI Engineer), Eshwar Kumar (Data Analyst)
- Courses: Vibe Analytics (₹5,000), Data Analytics & AI (₹10,000), Prompting & AI Tools (₹5,000), Excel (₹5,000), Power BI (₹8,000), Python (₹8,000), SQL (₹5,000), Statistics (₹5,000), Machine Learning (₹5,000)
- Contact: arisinfo.in@gmail.com, +91 8374316403, Hyderabad, INDIA
- Platform: https://aris-aidataanlayst.web.app/

Available Features Knowledge Base:
${JSON.stringify(guideKnowledgeBase.map(f => ({
  id: f.id,
  name: f.name,
  description: f.description,
  route: f.route,
  steps: f.steps,
  keywords: f.keywords
})), null, 2)}

Response Format (Article Style):
**Overview**
[One sentence - what it is and why use it]

**Steps** (ONLY include if user asks "how to" or needs instructions)
• [Step 1]
• [Step 2]
• [Step 3]

**Note** (ONLY include for "how to" questions - DO NOT include for who/what/when/where/why questions)
[One short tip - optional]

IMPORTANT: Only include **Steps** section when:
- User asks "how to" do something
- User asks for instructions or steps
- User needs guidance on using a feature
- User asks "how do I" questions

IMPORTANT: Only include **Note** section when:
- User asks "how to" do something
- User needs guidance or tips on using a feature
- DO NOT include Note for factual questions (who, what, when, where, why)

For general questions (what, who, when, where, why), DO NOT include steps or notes. Just provide the answer directly in the Overview section only.

Maximum 50 words. Be concise and article-like.`;
  }

  async getGuideResponse(
    userQuery: string,
    conversationHistory: Array<{ content: string; isUser: boolean }> = []
  ): Promise<GuideResponse> {
    try {
      // First, try to match query to a specific feature
      const matchedFeature = this.matchFeature(userQuery);
      
      // Build context with knowledge base
      const context = matchedFeature 
        ? `User is asking about: ${matchedFeature.name}. Here's the feature info: ${JSON.stringify({
            name: matchedFeature.name,
            description: matchedFeature.description,
            route: matchedFeature.route,
            steps: matchedFeature.steps,
            relatedFeatures: matchedFeature.relatedFeatures
          })}`
        : `User query: ${userQuery}. Search the knowledge base for relevant features.`;

      const fullPrompt = `${this.getSystemPrompt()}\n\n${context}\n\nUser: ${userQuery}`;

      // Get AI response - ARIS Bot allows fallback to default API
      const aiResponse = await geminiService.generateResponse(
        fullPrompt,
        'general',
        conversationHistory,
        true // allowFallback = true for ARIS Bot
      );

      // Determine if steps are needed based on query
      const needsSteps = this.queryNeedsSteps(userQuery);
      
      // Only show related features for "how to" questions
      const shouldShowRelatedFeatures = needsSteps && matchedFeature;
      
      // Parse response and extract feature info
      const response: GuideResponse = {
        answer: aiResponse,
        feature: matchedFeature || undefined,
        route: matchedFeature?.route,
        externalLink: matchedFeature?.externalLink,
        steps: needsSteps && matchedFeature ? matchedFeature.steps : undefined,
        relatedFeatures: shouldShowRelatedFeatures && matchedFeature
          ? this.getRelatedFeatures(matchedFeature.relatedFeatures)
          : undefined,
        quickActions: matchedFeature?.quickActions?.map(action => ({
          label: action.label,
          action: action.action,
          route: matchedFeature.route
        }))
      };

      return response;
    } catch (error: any) {
      console.error('Error getting guide response:', error);
      // Preserve rate limit error messages
      if (error?.message?.includes('API_RATE_LIMIT')) {
        throw error;
      }
      throw new Error('Failed to get guide response. Please try again.');
    }
  }

  private matchFeature(query: string): FeatureGuide | null {
    const lowerQuery = query.toLowerCase();
    
    // Exact match by name
    let match = guideKnowledgeBase.find(
      feature => feature.name.toLowerCase() === lowerQuery
    );
    
    if (match) return match;

    // Match by keywords (check if query contains any keyword)
    const keywordMatches = guideKnowledgeBase
      .map(feature => ({
        feature,
        score: feature.keywords.filter(keyword => 
          lowerQuery.includes(keyword.toLowerCase())
        ).length
      }))
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    if (keywordMatches.length > 0) {
      return keywordMatches[0].feature;
    }

    // Match by common questions
    match = guideKnowledgeBase.find(feature =>
      feature.commonQuestions.some(question =>
        lowerQuery.includes(question.toLowerCase().substring(0, 20))
      )
    );

    return match || null;
  }

  private getRelatedFeatures(featureNames: string[]): FeatureGuide[] {
    return guideKnowledgeBase.filter(feature =>
      featureNames.includes(feature.name)
    );
  }

  private queryNeedsSteps(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    const stepKeywords = [
      'how to',
      'how do i',
      'how can i',
      'steps',
      'instructions',
      'guide',
      'walkthrough',
      'tutorial',
      'process',
      'procedure',
      'way to',
      'method'
    ];
    
    return stepKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  getQuickActions(): Array<{ label: string; route: string; description: string }> {
    return [
      { label: 'How to use AI Tutors', route: '/tutor/excel', description: 'Learn about AI-powered tutoring' },
      { label: 'Take a Practice Test', route: '/tests', description: 'Test your knowledge' },
      { label: 'Create Study Plan', route: '/study-plans', description: 'Plan your learning' },
      { label: 'Practice SQL', route: '/study-plans/sql-practice', description: 'Write SQL queries' },
      { label: 'Browse The Hub', route: '/news', description: 'Explore content library' },
      { label: 'Job Kit Resources', route: '/news/job-kit', description: 'Career resources' }
    ];
  }
}

export const guideService = new GuideService();

