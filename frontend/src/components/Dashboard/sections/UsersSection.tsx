// src/pages/Dashboard/sections/UsersSection.tsx
import React from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { User } from '../../../types';

interface UsersSectionProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export const UsersSection: React.FC<UsersSectionProps> = ({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) => (
  <div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manage Users</h3>
      <button
        onClick={onAddUser}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
      >
        <UserPlus size={20} />
        <span>Add New User</span>
      </button>
    </div>

    <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
      <table className="w-full min-w-max sm:min-w-0">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Name</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Email</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Role</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Area</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Status</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.area}</td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <div className="flex flex-wrap gap-2">
                  {user.role !== 'SUPER_ADMIN' && (
                    <button
                      onClick={() => onEditUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 hover:bg-indigo-50 rounded"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default UsersSection;