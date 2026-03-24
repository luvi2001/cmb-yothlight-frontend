// src/layouts/AdminLayout.tsx
import React from 'react';
import { Menu, X, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onLogout: () => void;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onLogout,
  sidebar,
  children,
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-0'
          } bg-indigo-900 text-white transition-all duration-300 overflow-hidden`}
      >
        {sidebar}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={onLogout}
            className="w-full box-border flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200
             hover:bg-indigo-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Super Admin Panel</h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                SA
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
