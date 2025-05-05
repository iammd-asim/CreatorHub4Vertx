import React from 'react';
import { User, CreditHistory } from '../../types';
import { CreditCard, TrendingUp, Calendar, UserCheck } from 'lucide-react';

interface CreditStatsProps {
  user: User;
  creditHistory: CreditHistory[];
}

const CreditStats: React.FC<CreditStatsProps> = ({ user, creditHistory }) => {
  // Calculate credits earned from different sources
  const loginCredits = creditHistory
    .filter(record => record.reason === 'daily_login')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const profileCredits = creditHistory
    .filter(record => record.reason === 'profile_completion')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const interactionCredits = creditHistory
    .filter(record => record.reason === 'post_interaction')
    .reduce((sum, record) => sum + record.amount, 0);
    
  const adminCredits = creditHistory
    .filter(record => record.reason === 'admin_adjustment')
    .reduce((sum, record) => sum + record.amount, 0);

  // Get total earned credits
  const totalEarned = loginCredits + profileCredits + interactionCredits + adminCredits;
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Credit Balance</h2>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-indigo-600">{user.credits}</span>
          <span className="ml-2 text-sm text-gray-500">total credits</span>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">Total Earned</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-indigo-600">{totalEarned}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">Login Bonus</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-600">{loginCredits}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <UserCheck className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">Profile Bonus</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-600">{profileCredits}</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <CreditCard className="h-4 w-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-600">Interaction</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-purple-600">{interactionCredits}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 px-6 py-4">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Credit Activity</h3>
        {creditHistory.length > 0 ? (
          <div className="space-y-3">
            {creditHistory.slice(0, 5).map((record) => (
              <div key={record.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  {record.reason === 'daily_login' && (
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                  )}
                  {record.reason === 'profile_completion' && (
                    <UserCheck className="h-4 w-4 text-blue-500 mr-2" />
                  )}
                  {record.reason === 'post_interaction' && (
                    <CreditCard className="h-4 w-4 text-purple-500 mr-2" />
                  )}
                  {record.reason === 'admin_adjustment' && (
                    <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
                  )}
                  <span className="text-sm text-gray-600">
                    {record.reason === 'daily_login' && 'Daily Login Bonus'}
                    {record.reason === 'profile_completion' && 'Profile Completion'}
                    {record.reason === 'post_interaction' && 'Content Interaction'}
                    {record.reason === 'admin_adjustment' && 'Admin Adjustment'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${record.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {record.amount >= 0 ? `+${record.amount}` : record.amount}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No recent credit activity</p>
        )}
      </div>
    </div>
  );
};

export default CreditStats;