import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditHistory, UserActivity, Post } from '../types';
import CreditStats from '../components/dashboard/CreditStats';
import ActivitySummary from '../components/dashboard/ActivitySummary';
import ProfileCompletion from '../components/dashboard/ProfileCompletion';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [creditHistory, setCreditHistory] = useState<CreditHistory[]>([]);
  const [activities, setActivities] = useState<(UserActivity & { post?: Post })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch credit history and activities
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Mock data
        const mockCreditHistory: CreditHistory[] = [
          {
            id: '1',
            userId: user?.id || '',
            amount: 10,
            reason: 'daily_login',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
          {
            id: '2',
            userId: user?.id || '',
            amount: 50,
            reason: 'profile_completion',
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          },
          {
            id: '3',
            userId: user?.id || '',
            amount: 5,
            reason: 'post_interaction',
            createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          },
          {
            id: '4',
            userId: user?.id || '',
            amount: 10,
            reason: 'daily_login',
            createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          },
          {
            id: '5',
            userId: user?.id || '',
            amount: 2,
            reason: 'post_interaction',
            createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
          },
        ];

        const mockActivities: (UserActivity & { post?: Post })[] = [
          {
            id: '1',
            userId: user?.id || '',
            type: 'save',
            postId: '1',
            createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            post: {
              id: '1',
              source: 'twitter',
              author: 'TechInsider',
              content: 'The latest AI developments are changing how we interact with technology. What do you think about these advancements?',
              likes: 245,
              comments: 34,
              shares: 18,
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              url: 'https://twitter.com/sample/1'
            }
          },
          {
            id: '2',
            userId: user?.id || '',
            type: 'share',
            postId: '2',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            post: {
              id: '2',
              source: 'reddit',
              author: 'dev_guru',
              content: 'Just launched my new open-source project! It\'s a framework for building interactive web applications with minimal JavaScript.',
              likes: 189,
              comments: 45,
              shares: 12,
              createdAt: new Date(Date.now() - 172800000).toISOString(),
              url: 'https://reddit.com/r/programming/sample/2'
            }
          },
          {
            id: '3',
            userId: user?.id || '',
            type: 'report',
            postId: '3',
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            post: {
              id: '3',
              source: 'twitter',
              author: 'SpamAccount',
              content: 'This is inappropriate content that was reported.',
              likes: 5,
              comments: 2,
              shares: 0,
              createdAt: new Date(Date.now() - 259200000).toISOString(),
              url: 'https://twitter.com/sample/3'
            }
          },
        ];

        setCreditHistory(mockCreditHistory);
        setActivities(mockActivities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Please log in to view your dashboard</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-5 w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {user.username}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CreditStats user={user} creditHistory={creditHistory} />
        </div>
        <div>
          <ProfileCompletion user={user} />
        </div>
      </div>
      
      <div className="mt-6">
        <ActivitySummary activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;