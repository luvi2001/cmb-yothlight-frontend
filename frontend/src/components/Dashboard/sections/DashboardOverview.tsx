// src/pages/Dashboard/sections/DashboardOverview.tsx
import React from 'react';
import { UserPlus, Heart, Package } from 'lucide-react';
import { Stats } from '../../../types';

interface DashboardOverviewProps {
  stats: Stats;
  onAddUser: () => void;
  onAddDonor: () => void;
  onAddInventory: () => void;
  onAddMember:()=>void;
  onAddEvent:()=>void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  onAddUser,
  onAddDonor,
  onAddInventory,
}) => {
  const statsData = [
    { label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { label: 'Active Donors', value: stats.totalDonors, color: 'bg-green-500' },
    { label: 'Total Donations', value: stats.totalDonations, color: 'bg-purple-500' },
    { label: 'Inventory Items', value: stats.totalInventory, color: 'bg-orange-500' },
  ];

  // Optional extra stats if you extend Stats in FE (e.g. available, borrowed)
  const inventoryExtra =
    stats.availableInventory != null && stats.borrowedInventory != null
      ? [
          { label: 'Available Items', value: stats.availableInventory },
          { label: 'Borrowed Items', value: stats.borrowedInventory },
        ]
      : [];

  // Recent activities: expect you to shape these arrays in DashboardPage
  const recentDonations = stats.recentDonations || []; // [{ donorName, amount, date }]
  const recentBorrows = stats.recentBorrows || [];     // [{ itemName, borrowerName, borrowDate }]

  return (
    <div className="space-y-6">
      <h3 className="text-lg sm:text-xl font-semibold">Dashboard Overview</h3>

      {/* Top KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-xs sm:text-sm mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full opacity-20`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions + extra inventory stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 lg:col-span-2">
          <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={onAddUser}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <UserPlus size={20} className="sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base text-center">Add New User</span>
            </button>
            <button
              onClick={onAddDonor}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <Heart size={20} className="sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base text-center">Add New Donor</span>
            </button>
            <button
              onClick={onAddInventory}
              className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <Package size={20} className="sm:w-6 sm:h-6" />
              <span className="font-medium text-sm sm:text-base text-center">Add Inventory Item</span>
            </button>
          </div>
        </div>

        {/* Extra inventory summary (optional) */}
        {inventoryExtra.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Inventory Status</h4>
            <div className="space-y-2">
              {inventoryExtra.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent activity row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent donations */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold mb-4">Recent Donations</h4>
          {recentDonations.length === 0 ? (
            <p className="text-sm text-gray-500">No recent donations.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto text-sm">
              {recentDonations.map((donation, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-800 truncate">{donation.donorName}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600 whitespace-nowrap">
                    Rs. {Number(donation.amount).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent borrows */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold mb-4">Recent Borrowed Items</h4>
          {recentBorrows.length === 0 ? (
            <p className="text-sm text-gray-500">No recent borrow activity.</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto text-sm">
              {recentBorrows.map((borrow, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-800 truncate">{borrow.itemName}</p>
                    <p className="text-gray-500 text-xs">
                      Borrower: {borrow.borrowerName || 'Unknown'}
                    </p>
                  </div>
                  <p className="text-gray-500 text-xs whitespace-nowrap">
                    {new Date(borrow.borrowDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
