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
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">Manage Users</h3>
      <button
        onClick={onAddUser}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <UserPlus size={20} />
        <span>Add New User</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.area}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.role !== 'SUPER_ADMIN' && (
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                )}

                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
