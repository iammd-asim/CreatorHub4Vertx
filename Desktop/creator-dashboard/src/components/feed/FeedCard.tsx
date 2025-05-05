import React, { useState } from 'react';
import { Post } from '../../types';
import { 
  Heart, MessageCircle, Share2, Bookmark, Flag, 
  Twitter, FileText
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface FeedCardProps {
  post: Post;
  onSave: (post: Post) => void;
  onShare: (post: Post) => void;
  onReport: (post: Post) => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ 
  post, 
  onSave, 
  onShare,
  onReport
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(post);
  };

  const handleShare = () => {
    onShare(post);
  };

  const handleReport = () => {
    setMenuOpen(false);
    onReport(post);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const renderSourceIcon = () => {
    switch (post.source) {
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'reddit':
        return <FileText className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Author initial or avatar */}
              <span className="font-medium text-gray-700">{post.author.charAt(0).toUpperCase()}</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <div className="flex items-center text-xs text-gray-500">
                {renderSourceIcon()}
                <span className="ml-1">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <div className="py-1">
                  <button
                    onClick={handleReport}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Flag className="h-4 w-4 mr-2 text-red-500" />
                    Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
        </div>
        
        {/* Image if available */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {/* Stats */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <Heart className="h-4 w-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
            {likes}
          </div>
          <div className="flex items-center mr-4">
            <MessageCircle className="h-4 w-4 mr-1" />
            {post.comments}
          </div>
          <div className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            {post.shares}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex border-t pt-3 -mx-1">
          <button 
            className={`flex-1 flex items-center justify-center px-2 py-1 rounded-md mx-1 text-sm font-medium ${
              isLiked 
                ? 'text-pink-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4 mr-1" fill={isLiked ? "currentColor" : "none"} />
            Like
          </button>
          <button 
            className="flex-1 flex items-center justify-center px-2 py-1 rounded-md mx-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            onClick={() => window.open(post.url, '_blank')}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Comment
          </button>
          <button 
            className="flex-1 flex items-center justify-center px-2 py-1 rounded-md mx-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </button>
          <button 
            className={`flex-1 flex items-center justify-center px-2 py-1 rounded-md mx-1 text-sm font-medium ${
              isSaved 
                ? 'text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={handleSave}
          >
            <Bookmark className="h-4 w-4 mr-1" fill={isSaved ? "currentColor" : "none"} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;