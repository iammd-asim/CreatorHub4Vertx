import React from 'react';
import { UserActivity, Post } from '../../types';
import { Bookmark, Share2, Flag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivitySummaryProps {
  activities: (UserActivity & { post?: Post })[];
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ activities }) => {
  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'save':
        return <Bookmark className="h-4 w-4 text-indigo-500" />;
      case 'share':
        return <Share2 className="h-4 w-4 text-green-500" />;
      case 'report':
        return <Flag className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActivityText = (type: string) => {
    switch (type) {
      case 'save':
        return 'Saved a post';
      case 'share':
        return 'Shared a post';
      case 'report':
        return 'Reported a post';
      default:
        return 'Interacted with content';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Recent Activity</h2>
        
        {activities.length > 0 ? (
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                    {renderActivityIcon(activity.type)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {getActivityText(activity.type)}
                  </p>
                  {activity.post && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {activity.post.content}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
      
      {activities.length > 5 && (
        <div className="border-t border-gray-100 px-6 py-3">
          <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all activity
          </a>
        </div>
      )}
    </div>
  );
};

export default ActivitySummary;