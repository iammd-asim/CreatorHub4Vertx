import React from 'react';
import { useAuth } from '../context/AuthContext';
import FeedList from '../components/feed/FeedList';

const Feed: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your personalized feed</h2>
          <p className="text-gray-600 mb-6">
            Join our creator community to access your personalized content feed and start earning credits.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <a
              href="/login"
              className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="inline-flex items-center justify-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-4 pb-20">
      <FeedList />
    </div>
  );
};

export default Feed;