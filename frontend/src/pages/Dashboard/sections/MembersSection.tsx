import React from 'react';
import { UserPlus, Edit, Trash2, Eye } from 'lucide-react';
import { Member } from '../../../types';

interface MembersSectionProps {
  members: Member[];
  onAddMember: () => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  onViewHistory: (member: Member) => void;
}

export const MembersSection: React.FC<MembersSectionProps> = ({
  members,
  onAddMember,
  onEditMember,
  onDeleteMember,
  onViewHistory,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Bible Study Members</h3>
        <button
          onClick={onAddMember}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <UserPlus size={20} />
          <span>Add New Member</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Events Attended
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Member Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Year Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.area}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {member.phone || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {member.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {member._count?.attendance || 0} events
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {member.type || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {member.yearJoined || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewHistory(member)}
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                    title="View Attendance History"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEditMember(member)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                    title="Edit Member"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteMember(member.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete Member"
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
};