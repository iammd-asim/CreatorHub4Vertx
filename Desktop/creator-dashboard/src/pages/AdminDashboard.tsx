import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';
import UserTable from '../components/admin/UserTable';
import { useNavigate } from 'react-router-dom';
import { Users, Database, Activity, PieChart } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }

    // Fetch users (mock)
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Mock data
        const mockUsers: User[] = [
          {
            id: '1',
            email: 'user1@example.com',
            username: 'creator1',
            role: 'user',
            credits: 150,
            profileCompleted: true,
            lastLogin: new Date().toISOString(),
            createdAt: '2023-01-01T00:00:00Z',
          },
          {
            id: '2',
            email: 'user2@example.com',
            username: 'creator2',
            role: 'user',
            credits: 75,
            profileCompleted: false,
            lastLogin: new Date(Date.now() - 86400000).toISOString(),
            createdAt: '2023-01-15T00:00:00Z',
          },
          {
            id: '3',
            email: 'admin@example.com',
            username: 'admin',
            role: 'admin',
            credits: 500,
            profileCompleted: true,
            lastLogin: new Date().toISOString(),
            createdAt: '2022-12-01T00:00:00Z',
          },
          {
            id: '4',
            email: 'user3@example.com',
            username: 'creator3',
            role: 'user',
            credits: 210,
            profileCompleted: true,
            lastLogin: new Date(Date.now() - 172800000).toISOString(),
            createdAt: '2023-02-05T00:00:00Z',
          },
          {
            id: '5',
            email: 'user4@example.com',
            username: 'creator4',
            role: 'user',
            credits: 50,
            profileCompleted: false,
            lastLogin: new Date(Date.now() - 604800000).toISOString(),
            createdAt: '2023-03-10T00:00:00Z',
          },
        ];

        setUsers(mockUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleEditCredits = (userId: string, currentCredits: number) => {
    const newCredits = prompt('Enter new credit balance:', currentCredits.toString());
    
    if (newCredits !== null) {
      const credits = parseInt(newCredits);
      
      if (!isNaN(credits)) {
        // Update user credits
        setUsers(users.map(user => 
          user.id === userId ? { ...user, credits } : user
        ));
      }
    }
  };

  const handleDeleteUser = (userId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    
    if (confirmed) {
      // Delete user
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  // Calculate stats
  const totalUsers = users.filter(u => u.role === 'user').length;
  const totalCredits = users.reduce((sum, user) => sum + user.credits, 0);
  const averageCredits = Math.round(totalCredits / (users.length || 1));
  const activeUsers = users.filter(u => 
    new Date(u.lastLogin).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center text-green-600">
              <Activity className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
              <p className="text-2xl font-semibold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
              <Database className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Credits</h3>
              <p className="text-2xl font-semibold text-gray-900">{totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-md bg-amber-100 flex items-center justify-center text-amber-600">
              <PieChart className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Avg. Credits</h3>
              <p className="text-2xl font-semibold text-gray-900">{averageCredits}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* User management */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">User Management</h2>
        
        {loading ? (
          <div className="bg-white shadow-sm rounded-lg p-8 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-indigo-600 animate-spin" />
              </div>
              <p className="mt-2 text-sm text-gray-500">Loading users...</p>
            </div>
          </div>
        ) : (
          <UserTable 
            users={users} 
            onEditCredits={handleEditCredits} 
            onDelete={handleDeleteUser} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;