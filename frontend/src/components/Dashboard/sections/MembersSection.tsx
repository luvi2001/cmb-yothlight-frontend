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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-semibold">Bible Study Members</h3>
        <button
          onClick={onAddMember}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
        >
          <UserPlus size={20} />
          <span>Add New Member</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-max sm:min-w-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Age
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Area
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Events Attended
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Member Type
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Year Joined
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 text-sm font-medium">{member.name}</td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">{member.age}</td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">{member.area}</td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                  {member.phone || 'N/A'}
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                  {member.email || 'N/A'}
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {member._count?.attendance || 0} events
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                  {member.type || 'N/A'}
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                  {member.yearJoined || 'N/A'}
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${member.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onViewHistory(member)}
                      className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-50 rounded"
                      title="View Attendance History"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEditMember(member)}
                      className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 hover:bg-indigo-50 rounded"
                      title="Edit Member"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDeleteMember(member.id)}
                      className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded"
                      title="Delete Member"
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
};

export default MembersSection;