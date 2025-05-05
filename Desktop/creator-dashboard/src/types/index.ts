export interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin';
  credits: number;
  profileCompleted: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Post {
  id: string;
  source: 'twitter' | 'reddit';
  author: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  url: string;
}

export interface SavedPost extends Post {
  savedAt: string;
}

export interface CreditHistory {
  id: string;
  userId: string;
  amount: number;
  reason: 'daily_login' | 'profile_completion' | 'post_interaction' | 'admin_adjustment';
  createdAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'save' | 'share' | 'report';
  postId: string;
  createdAt: string;
}