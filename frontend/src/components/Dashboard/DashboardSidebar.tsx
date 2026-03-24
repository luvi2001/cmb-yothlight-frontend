import React from 'react';
import { Users, Heart, Package, BarChart3, UserCheck, Calendar, Users2 } from 'lucide-react';

export type DashboardTab = 'dashboard' | 'users' | 'donors' | 'inventory' | 'members' | 'new-members' | 'events';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onChangeTab: (tab: DashboardTab) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activeTab, onChangeTab }) => {
  const menuItems = [
    { id: 'dashboard' as DashboardTab, label: 'Dashboard', icon: BarChart3 },
    { id: 'users' as DashboardTab, label: 'Manage Users', icon: Users },
    { id: 'donors' as DashboardTab, label: 'Manage Donors', icon: Heart },
    { id: 'inventory' as DashboardTab, label: 'Manage Inventory', icon: Package },
    { id: 'members' as DashboardTab, label: 'Bible Study Members', icon: UserCheck },
    { id: 'new-members' as DashboardTab, label: 'New Members', icon: Users2 },
    { id: 'events' as DashboardTab, label: 'Events & Attendance', icon: Calendar },
  ];

  return (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
            className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${activeTab === item.id
                ? 'bg-indigo-700 text-white'
                : 'text-indigo-200 hover:bg-indigo-800'
              }`}
            title={item.label}
          >
            <Icon size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default DashboardSidebar;