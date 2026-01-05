import React, { useState, useEffect, useMemo } from 'react';
import { Users, Eye, Search } from 'lucide-react';
import NeumorphicCard from '../components/NeumorphicCard';
import NeumorphicButton from '../components/NeumorphicButton';
import UserDetailModal from '../components/UserDetailModal';
import { firestoreOperations, User } from '../firebase/firestore';
import { safeFormatDate } from '../utils/dateFormat';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const usersData = await firestoreOperations.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query) ||
      user.phoneNumber?.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const handleViewUser = (user: User) => {
    console.log('View button clicked for user:', user);
    setSelectedUser(user);
    setIsModalOpen(true);
    console.log('Modal state - isOpen:', true, 'selectedUser:', user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-16 bg-gray-200 rounded-2xl"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">User Management</h1>
        <p className="text-gray-200">Manage all users in the platform</p>
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <NeumorphicCard padding="md" className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, role, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-gray-100 placeholder-gray-400"
            />
          </div>
        </NeumorphicCard>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">All Users</h2>
          <div className="text-sm text-gray-200">
            {searchQuery ? (
              <>
                Showing {filteredUsers.length} of {users.length} users
              </>
            ) : (
              <>Total Users: {users.length}</>
            )}
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <NeumorphicCard padding="lg" className="text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300">
              {searchQuery ? 'No users found matching your search.' : 'No users found.'}
            </p>
          </NeumorphicCard>
        ) : (
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
            <NeumorphicCard key={user.uid} padding="lg" hoverable>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-100" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-100">{user.name}</h3>
                    <p className="text-gray-200">{user.email}</p>
                    <p className="text-sm text-gray-300">
                      Joined {safeFormatDate(user.createdAt, 'MMM d, yyyy', 'date unavailable')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    user.role === 'admin' 
                      ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-600'
                      : 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600'
                  }`}>
                    {user.role}
                  </span>
                  <NeumorphicButton 
                    variant="ghost" 
                    size="sm" 
                    icon={Eye}
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </NeumorphicButton>
                </div>
              </div>
            </NeumorphicCard>
            ))}
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AdminUsers;

