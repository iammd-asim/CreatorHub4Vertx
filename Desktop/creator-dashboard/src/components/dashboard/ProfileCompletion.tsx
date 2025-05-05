import React from 'react';
import { User } from '../../types';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface ProfileCompletionProps {
  user: User;
}

const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ user }) => {
  // These would be determined from actual user data in a real app
  const steps = [
    { id: 'profile', name: 'Complete your profile', completed: user.profileCompleted },
    { id: 'feed', name: 'Interact with the feed', completed: true },
    { id: 'daily', name: 'Login daily for 7 days', completed: false },
    { id: 'share', name: 'Share your first post', completed: false },
  ];
  
  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Complete Your Profile</h2>
          <span className="text-sm font-medium text-indigo-600">{completedSteps}/{totalSteps} complete</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="flex justify-between items-center">
              <div className="flex items-center">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
                <span className={`ml-3 text-sm ${step.completed ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                  {step.name}
                </span>
              </div>
              {!step.completed && (
                <a 
                  href={`/${step.id}`} 
                  className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center"
                >
                  Complete <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {progressPercentage < 100 && (
        <div className="bg-indigo-50 px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                Complete all steps to earn <span className="font-bold">50 bonus credits</span>!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletion;