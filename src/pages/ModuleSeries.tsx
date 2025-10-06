import React, { useState, useEffect, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Circle, Play, Calendar, Target } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import { format } from 'date-fns';
import { seriesService, SeriesData } from '../services/seriesService';

const ModuleSeries: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [seriesData, setSeriesData] = useState<SeriesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSeriesData = async () => {
      if (moduleId) {
        try {
          const data = seriesService.getModuleSeries(moduleId);
          setSeriesData(data);
        } catch (error) {
          console.error('Error loading series data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSeriesData();
  }, [moduleId]);

  const handleEpisodeClick = (episodeId: string) => {
    navigate(`/news/series/${moduleId}/episode/${episodeId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!seriesData) {
    return (
      <div className="min-h-screen bg-aris-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Series Not Found</h1>
          <NeumorphicButton onClick={() => navigate('/news/series')}>
            Back to Series
          </NeumorphicButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <NeumorphicButton
              onClick={() => navigate('/news/series')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </NeumorphicButton>
          </div>

          {/* Series Header */}
          <NeumorphicCard className="p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-100 mb-4">
                  {seriesData.title}
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                  {seriesData.description}
                </p>
                
                {/* Series Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{seriesData.totalEpisodes} Episodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{seriesData.estimatedDuration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(seriesData.difficulty)}`}>
                      {seriesData.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {seriesData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-200">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {seriesData.prerequisites && seriesData.prerequisites.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-100 mb-3">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {seriesData.prerequisites.map((prereq, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </NeumorphicCard>
        </div>

        {/* Episodes List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Episodes</h2>
          
          {seriesData.episodes.length === 0 ? (
            <NeumorphicCard padding="xl" className="text-center">
              <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-100 mb-2">No Episodes Available</h3>
              <p className="text-gray-200">Episodes for this series are coming soon!</p>
            </NeumorphicCard>
          ) : (
            <div className="space-y-4">
              {seriesData.episodes.map((episode) => (
                <NeumorphicCard 
                  key={episode.id} 
                  hoverable 
                  padding="lg" 
                  className="cursor-pointer transition-all hover:scale-[1.02]"
                  onClick={() => handleEpisodeClick(episode.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Episode Number */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {episode.partNumber}
                        </span>
                      </div>
                    </div>

                    {/* Episode Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-100 mb-1">
                          {episode.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{episode.readTime} min</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                        {episode.summary}
                      </p>

                      {/* Episode Meta */}
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{format(new Date(episode.publishedAt), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {episode.isCompleted ? (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                          <span>{episode.isCompleted ? 'Completed' : 'Not Started'}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {episode.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Play Button */}
                    <div className="flex-shrink-0">
                      <NeumorphicButton
                        variant="accent"
                        className="flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEpisodeClick(episode.id);
                        }}
                      >
                        <Play className="w-4 h-4" />
                        Read
                      </NeumorphicButton>
                    </div>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </div>

        {/* Progress Summary */}
        {seriesData.episodes.length > 0 && (
          <NeumorphicCard padding="lg" className="text-center">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Series Progress</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {seriesData.episodes.filter(ep => ep.isCompleted).length}
                </div>
                <div className="text-sm text-gray-300">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-400">
                  {seriesData.episodes.length}
                </div>
                <div className="text-sm text-gray-300">Total Episodes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((seriesData.episodes.filter(ep => ep.isCompleted).length / seriesData.episodes.length) * 100)}%
                </div>
                <div className="text-sm text-gray-300">Progress</div>
              </div>
            </div>
          </NeumorphicCard>
        )}
      </div>
    </div>
  );
};

export default memo(ModuleSeries);
