import React, { useState, memo } from 'react';
import { ArrowLeft, Search, Play, Calendar, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';

interface VideoClip {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  youtubeId: string;
  thumbnail?: string;
  publishedAt: string;
}

const AIClips: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoClip | null>(null);

  // News-focused video clips data
  const videoClips: VideoClip[] = [
    {
      id: 'ai-analytics-news',
      title: 'AI & Analytics Industry News Update',
      description: 'Latest breaking news in AI and analytics industry trends, market updates, and technological breakthroughs',
      duration: '12:45',
      category: 'ai',
      youtubeId: 'DlHOQCci98w',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'excel-news',
      title: 'Microsoft Excel News & Updates',
      description: 'Recent Excel feature announcements, productivity tips, and industry news for data analysts',
      duration: '15:30',
      category: 'excel',
      youtubeId: '1ef6KgfZ_0A',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'ml-news',
      title: 'Machine Learning Industry News',
      description: 'Latest developments in machine learning, new algorithms, and industry applications',
      duration: '18:20',
      category: 'ml',
      youtubeId: 'lBfIK__Ii0s',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'powerbi-news',
      title: 'Power BI News & Feature Updates',
      description: 'Microsoft Power BI latest features, dashboard innovations, and business intelligence trends',
      duration: '14:15',
      category: 'powerbi',
      youtubeId: 'iKuswQzmaIM',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'prompt-news',
      title: 'Prompt Engineering News & Trends',
      description: 'Latest developments in AI prompt engineering, new techniques, and industry best practices',
      duration: '16:40',
      category: 'ai',
      youtubeId: 'DLXE-HgH694',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'python-news',
      title: 'Python Data Science News',
      description: 'Python ecosystem updates, new libraries, and data science community developments',
      duration: '20:25',
      category: 'python',
      youtubeId: 'IeLLDpAGu6o',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'sql-news',
      title: 'Database & SQL Industry News',
      description: 'Database technology updates, SQL innovations, and data management trends',
      duration: '17:50',
      category: 'sql',
      youtubeId: 'JOVEMQUsmBA',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'statistics-news',
      title: 'Statistical Analysis News',
      description: 'Latest developments in statistical methods, research findings, and analytical techniques',
      duration: '13:35',
      category: 'statistics',
      youtubeId: 'ER1-Jyx000o',
      publishedAt: new Date().toISOString()
    }
  ];


  // Filter videos based on search query only
  const filteredVideos = videoClips.filter(video => {
    const matchesSearch = searchQuery.trim() === '' ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleVideoClick = (video: VideoClip) => {
    setSelectedVideo(video);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-aris-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <NeumorphicButton
                onClick={() => navigate('/news')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </NeumorphicButton>
              <div>
                <h1 className="text-3xl font-bold text-gray-100 mb-2">AI Clips</h1>
                <p className="text-gray-200">Watch latest news and industry updates in AI & Analytics</p>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="w-80">
              <NeumorphicCard padding="md">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-orange-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-400"
                  />
                </div>
              </NeumorphicCard>
            </div>
          </div>
        </div>


        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <NeumorphicCard padding="xl" className="text-center">
            <Play className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-100 mb-2">No videos found</h3>
            <p className="text-gray-200 mb-6">
              {searchQuery 
                ? 'Try adjusting your search terms.' 
                : 'No videos available at the moment.'}
            </p>
            {searchQuery && (
              <NeumorphicButton
                variant="secondary"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </NeumorphicButton>
            )}
          </NeumorphicCard>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <NeumorphicCard 
                key={video.id} 
                hoverable 
                padding="lg" 
                className="cursor-pointer transition-all hover:scale-105 text-center"
                onClick={() => handleVideoClick(video)}
              >
                {/* Video Icon */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>

                {/* Video Name */}
                <h3 className="text-lg font-bold text-gray-100 mb-3">
                  {video.title}
                </h3>
                
                {/* Video Description */}
                <p className="text-gray-200 text-sm mb-6 line-clamp-3">
                  {video.description}
                </p>

                {/* Watch Video Button */}
                <NeumorphicButton
                  variant="accent"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVideoClick(video);
                  }}
                >
                  Watch Video
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Video Player Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                  <p className="text-gray-300 text-sm">{selectedVideo.description}</p>
                </div>
                <NeumorphicButton
                  onClick={closeVideoPlayer}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </NeumorphicButton>
              </div>

              {/* Video Player */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                />
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <NeumorphicButton
                    onClick={() => {
                      const iframe = document.querySelector('iframe');
                      if (iframe && iframe.requestFullscreen) {
                        iframe.requestFullscreen();
                      }
                    }}
                    className="p-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </NeumorphicButton>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(selectedVideo.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded">
                      {selectedVideo.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AIClips);
