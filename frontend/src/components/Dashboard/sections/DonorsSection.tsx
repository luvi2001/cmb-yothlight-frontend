// src/pages/Dashboard/sections/DonorsSection.tsx
import React from 'react';
import { Heart, DollarSign, Edit, Trash2 } from 'lucide-react';
import { Donor } from '../../../types';

interface DonorsSectionProps {
  donors: Donor[];
  onAddDonor: () => void;
  onEditDonor: (donor: Donor) => void;
  onDeleteDonor: (id: string) => void;
  onAddDonation: (donor: Donor) => void;
}

export const DonorsSection: React.FC<DonorsSectionProps> = ({
  donors,
  onAddDonor,
  onEditDonor,
  onDeleteDonor,
  onAddDonation,
}) => (
  <div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <h3 className="text-xl font-semibold">Manage Donors</h3>
      <button
        onClick={onAddDonor}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
      >
        <Heart size={20} />
        <span>Add New Donor</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full min-w-max sm:min-w-0">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donors.map((donor) => (
            <tr key={donor.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 text-sm font-medium">{donor.name}</td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">{donor.phone}</td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                {donor.email || 'N/A'}
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                {donor.area || 'N/A'}
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm font-semibold text-green-600">
                Rs. {parseFloat(donor.totalAmount.toString()).toLocaleString()}
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    donor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {donor.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onAddDonation(donor)}
                    className="text-purple-600 hover:text-purple-900 transition-colors p-1 hover:bg-purple-50 rounded"
                    title="Add Donation"
                  >
                    <DollarSign size={18} />
                  </button>
                  <button
                    onClick={() => onEditDonor(donor)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 hover:bg-indigo-50 rounded"
                    title="Edit Donor"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteDonor(donor.id)}
                    className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded"
                    title="Delete Donor"
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
export default DonorsSection;