import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag, TrendingUp } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { format } from 'date-fns';
import { newsService, NewsArticle } from '../services/newsService';

// News article types are imported from newsService

const ArticleView: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  // News data is now fetched from the news service

  useEffect(() => {
    const loadArticle = async () => {
      if (articleId) {
        try {
          // Define all valid module IDs
          const moduleIds = ['advanced-ai', 'prompt-engineering', 'excel', 'powerbi', 'sql-database', 'python', 'statistics', 'machine-learning'];
          
          // Check if this is a module ID
          if (moduleIds.includes(articleId)) {
            // This is a module ID, get module-specific news
            const articles = await newsService.getModuleNews(articleId);
            if (articles.length > 0) {
              // Show the first article from the module
              setArticle(articles[0]);
            }
          } else {
            // This is a specific article ID, get from general news
            const articles = await newsService.getTrendingNews();
            const foundArticle = articles.find(article => article.id === articleId);
            
            if (foundArticle) {
              setArticle(foundArticle);
            }
          }
        } catch (error) {
          console.error('Error loading article:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Article Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/all-articles')}>
            Back
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <NeumorphicButton
            onClick={() => navigate('/news/all-articles')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </NeumorphicButton>
        </div>

        {/* Article Header */}
        <NeumorphicCard className="p-8 mb-6">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600 text-sm font-medium rounded-lg mb-4">
              <TrendingUp className="w-4 h-4" />
              Trending
            </span>
            <h1 className="text-3xl font-bold text-gray-100 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-gray-200 mb-6">
              {article.summary}
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="capitalize">{article.category}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 text-gray-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </NeumorphicCard>

        {/* Article Content */}
        <NeumorphicCard className="p-8">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-100 mb-8 mt-8 leading-tight">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-100 mb-6 mt-8 border-b border-orange-500 pb-2">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-orange-400 mb-4 mt-6">$1</h3>')
                  .replace(/^- (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1">•</span><span>$1</span></li>')
                  .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1 font-bold">$1</span></li>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-400 font-bold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="text-orange-300 italic">$1</em>')
                  .replace(/\n\n/g, '</p><p class="mb-6 text-lg leading-relaxed">')
                  .replace(/^(?!<[h|l])/gm, '<p class="mb-6 text-lg leading-relaxed">')
                  .replace(/<p class="mb-6 text-lg leading-relaxed"><\/p>/g, '')
              }}
            />
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default ArticleView;
