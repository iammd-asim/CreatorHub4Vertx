import React, { useState, useEffect } from 'react';
import { Post } from '../../types';
import FeedCard from './FeedCard';
import { useAuth } from '../../context/AuthContext';
import { 
  RefreshCw, ArrowUp, Filter, Twitter, FileText
} from 'lucide-react';

// Mock API function to fetch feed
const fetchFeed = async (sources: string[] = ['twitter', 'reddit']) => {
  // This would be an actual API call in a real app
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      const mockPosts: Post[] = [
        {
          id: '1',
          source: 'twitter',
          author: 'TechInsider',
          content: 'The latest AI developments are changing how we interact with technology. What do you think about these advancements?',
          likes: 245,
          comments: 34,
          shares: 18,
          createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          url: 'https://twitter.com/sample/1'
        },
        {
          id: '2',
          source: 'reddit',
          author: 'dev_guru',
          content: 'Just launched my new open-source project! It\'s a framework for building interactive web applications with minimal JavaScript. Check it out and let me know what you think!',
          likes: 189,
          comments: 45,
          shares: 12,
          createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          url: 'https://reddit.com/r/programming/sample/2'
        },
        {
          id: '3',
          source: 'twitter',
          author: 'DesignMatters',
          content: 'Design tip: Whitespace isn\'t empty space. It\'s a powerful tool that creates hierarchy and improves readability.',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          likes: 325,
          comments: 22,
          shares: 78,
          createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
          url: 'https://twitter.com/sample/3'
        },
        {
          id: '4',
          source: 'reddit',
          author: 'future_coder',
          content: 'Question: What\'s the best way to structure a React project for scalability? Working on something that might grow quite large over time.',
          likes: 56,
          comments: 89,
          shares: 5,
          createdAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
          url: 'https://reddit.com/r/reactjs/sample/4'
        },
        {
          id: '5',
          source: 'twitter',
          author: 'StartupFounder',
          content: 'Just raised our Series A! Excited to share that we\'ll be expanding our team and product offerings. Looking for talented developers and designers!',
          likes: 422,
          comments: 51,
          shares: 112,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          url: 'https://twitter.com/sample/5'
        }
      ].filter(post => sources.includes(post.source));
      
      resolve(mockPosts);
    }, 800);
  });
};

const FeedList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<string[]>(['twitter', 'reddit']);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const feedData = await fetchFeed(filters);
      setPosts(feedData);
    } catch (err) {
      setError('Failed to load feed. Please try again.');
      console.error('Feed error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [filters]);

  const handleRefresh = () => {
    loadFeed();
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFilter = (source: string) => {
    if (filters.includes(source)) {
      // Don't allow removing the last filter
      if (filters.length > 1) {
        setFilters(filters.filter(f => f !== source));
      }
    } else {
      setFilters([...filters, source]);
    }
  };

  const handleSavePost = (post: Post) => {
    // In a real app, this would call an API to save the post
    console.log('Saved post:', post.id);
    
    // Mock earning credits for interaction
    if (user) {
      console.log('Earned 2 credits for saving post');
    }
  };

  const handleSharePost = (post: Post) => {
    // In a real app, this would open a share dialog
    console.log('Shared post:', post.id);
    
    // Mock copy to clipboard
    navigator.clipboard.writeText(post.url).then(() => {
      alert('Link copied to clipboard!');
      
      // Mock earning credits for interaction
      if (user) {
        console.log('Earned 3 credits for sharing post');
      }
    });
  };

  const handleReportPost = (post: Post) => {
    // In a real app, this would open a report dialog
    const confirmed = window.confirm('Are you sure you want to report this post?');
    if (confirmed) {
      console.log('Reported post:', post.id);
      
      // Mock earning credits for helping moderate
      if (user) {
        console.log('Earned 1 credit for reporting inappropriate content');
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto pb-20">
      {/* Feed header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Feed</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <Filter className="h-5 w-5" />
          </button>
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 ${loading ? 'animate-spin' : ''}`}
            disabled={loading}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 border-b border-gray-200 flex flex-wrap gap-2">
          <button
            onClick={() => toggleFilter('twitter')}
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              filters.includes('twitter')
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Twitter className="h-4 w-4 mr-1" />
            Twitter
          </button>
          <button
            onClick={() => toggleFilter('reddit')}
            className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              filters.includes('reddit')
                ? 'bg-orange-100 text-orange-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FileText className="h-4 w-4 mr-1" />
            Reddit
          </button>
        </div>
      )}
      
      {/* Error state */}
      {error && !loading && (
        <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-md">
          <p>{error}</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 text-sm font-medium text-red-700 hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="p-8 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-indigo-600 animate-spin" />
            </div>
            <p className="mt-2 text-sm text-gray-500">Loading your feed...</p>
          </div>
        </div>
      )}
      
      {/* Feed list */}
      {!loading && posts.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No posts found. Try changing your filters.</p>
        </div>
      )}
      
      <div className="space-y-4 p-4">
        {posts.map(post => (
          <FeedCard 
            key={post.id} 
            post={post} 
            onSave={handleSavePost}
            onShare={handleSharePost}
            onReport={handleReportPost}
          />
        ))}
      </div>
      
      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          onClick={handleScrollToTop}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FeedList;