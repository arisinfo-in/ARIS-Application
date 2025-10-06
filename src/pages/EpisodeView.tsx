import React, { useState, useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Circle, Calendar } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { format } from 'date-fns';
import { seriesService, SeriesData, SeriesEpisode } from '../services/seriesService';

const EpisodeView: React.FC = () => {
  const { moduleId, episodeId } = useParams<{ moduleId: string; episodeId: string }>();
  const navigate = useNavigate();
  const [seriesData, setSeriesData] = useState<SeriesData | null>(null);
  const [episode, setEpisode] = useState<SeriesEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodeData = async () => {
      if (moduleId && episodeId) {
        try {
          const data = seriesService.getModuleSeries(moduleId);
          setSeriesData(data);
          
          const foundEpisode = data.episodes.find(ep => ep.id === episodeId);
          setEpisode(foundEpisode || null);
        } catch (error) {
          console.error('Error loading episode data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadEpisodeData();
  }, [moduleId, episodeId]);

  // Scroll to top when episode changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [episodeId]);

  const handleMarkComplete = () => {
    if (episode) {
      // In a real app, this would update the user's progress
      console.log(`Marking episode ${episode.id} as complete`);
      // You could implement local storage or API call here
    }
  };

  const handleNextEpisode = () => {
    if (seriesData && episode) {
      const currentIndex = seriesData.episodes.findIndex(ep => ep.id === episode.id);
      const nextEpisode = seriesData.episodes[currentIndex + 1];
      
      if (nextEpisode) {
        navigate(`/news/series/${moduleId}/episode/${nextEpisode.id}`);
      }
    }
  };

  const handlePreviousEpisode = () => {
    if (seriesData && episode) {
      const currentIndex = seriesData.episodes.findIndex(ep => ep.id === episode.id);
      const previousEpisode = seriesData.episodes[currentIndex - 1];
      
      if (previousEpisode) {
        navigate(`/news/series/${moduleId}/episode/${previousEpisode.id}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!episode || !seriesData) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Episode Not Found</h1>
          <NeumorphicButton onClick={() => navigate(`/news/series/${moduleId}`)}>
            Back to Series
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  const currentIndex = seriesData.episodes.findIndex(ep => ep.id === episode.id);
  const hasNext = currentIndex < seriesData.episodes.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <NeumorphicButton
              onClick={() => navigate(`/news/series/${moduleId}`)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Series
            </NeumorphicButton>
          </div>

          {/* Episode Header */}
          <NeumorphicCard className="p-8 mb-6">
            <div className="mb-6">
              {/* Series Title */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-lg">
                  {seriesData.title}
                </span>
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg">
                  Part {episode.partNumber}
                </span>
              </div>

              {/* Episode Title */}
              <h1 className="text-3xl font-bold text-gray-100 mb-4 leading-tight">
                {episode.title}
              </h1>
              
              {/* Episode Summary */}
              <p className="text-lg text-gray-200 mb-6">
                {episode.summary}
              </p>
            </div>

            {/* Episode Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{episode.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(episode.publishedAt), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                {episode.isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span>{episode.isCompleted ? 'Completed' : 'Not Started'}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {episode.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-200 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </NeumorphicCard>
        </div>

        {/* Episode Content */}
        <NeumorphicCard className="p-8 mb-6">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: episode.content
                  .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-gray-100 mb-8 mt-8 leading-tight">$1</h1>')
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-100 mb-6 mt-8 border-b border-orange-500 pb-2">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-orange-400 mb-4 mt-6">$1</h3>')
                  .replace(/^- (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1">•</span><span>$1</span></li>')
                  .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 mb-3 flex items-start"><span class="text-orange-400 mr-2 mt-1 font-bold">$1</span></li>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-400 font-bold">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="text-orange-300 italic">$1</em>')
                  .replace(/```([^`]*)```/g, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-green-400">$1</code></pre>')
                  .replace(/`([^`]*)`/g, '<code class="bg-gray-800 text-orange-400 px-2 py-1 rounded">$1</code>')
                  .replace(/\n\n/g, '</p><p class="mb-6 text-lg leading-relaxed">')
                  .replace(/^(?!<[h|l|p|d])/gm, '<p class="mb-6 text-lg leading-relaxed">')
                  .replace(/<p class="mb-6 text-lg leading-relaxed"><\/p>/g, '')
              }}
            />
          </div>
        </NeumorphicCard>

        {/* Episode Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            {hasPrevious && (
              <NeumorphicButton
                onClick={handlePreviousEpisode}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Episode
              </NeumorphicButton>
            )}
          </div>

          <div className="flex items-center gap-4">
            <NeumorphicButton
              variant="secondary"
              onClick={handleMarkComplete}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </NeumorphicButton>
          </div>

          <div className="flex-1 flex justify-end">
            {hasNext && (
              <NeumorphicButton
                onClick={handleNextEpisode}
                className="flex items-center gap-2"
              >
                Next Episode
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </NeumorphicButton>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        <NeumorphicCard padding="lg" className="text-center">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Series Progress</h3>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {currentIndex + 1}
              </div>
              <div className="text-sm text-gray-300">Current Episode</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">
                {seriesData.episodes.length}
              </div>
              <div className="text-sm text-gray-300">Total Episodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {Math.round(((currentIndex + 1) / seriesData.episodes.length) * 100)}%
              </div>
              <div className="text-sm text-gray-300">Progress</div>
            </div>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  );
};

export default memo(EpisodeView);
