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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <aside
        className={`${isSidebarOpen ? 'w-48 sm:w-64' : 'w-0'
          } bg-indigo-900 dark:bg-indigo-950 text-white transition-all duration-300 overflow-hidden fixed sm:relative h-screen z-40`}
      >
        <div className="p-4 overflow-y-auto h-full pb-20">
          {sidebar}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-900 dark:bg-indigo-950 p-4 border-t border-indigo-800 dark:border-indigo-900">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-indigo-200 dark:text-indigo-300
             hover:bg-indigo-800 dark:hover:bg-indigo-800 transition-colors text-sm sm:text-base"
          >
            <LogOut size={18} className="sm:w-5 sm:h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto w-full">
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-30 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0 text-gray-700 dark:text-gray-300"
              >
                {isSidebarOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
              </button>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">Super Admin Panel</h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
                <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">Super Admin</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 dark:bg-indigo-700 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                SA
              </div>
            </div>
          </div>
        </header>

        <main className="p-3 sm:p-6 text-gray-900 dark:text-gray-100">{children}</main>
      </div>
    </div>
  );
};
