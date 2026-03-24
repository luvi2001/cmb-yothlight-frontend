// src/components/Alert.tsx

import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info';

interface AlertProps {
  type?: AlertType;
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose }) => {
  const styles: Record<AlertType, string> = {
    success: 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
  };

  const icons: Record<AlertType, React.ReactNode> = {
    success: <CheckCircle className="text-green-500 dark:text-green-400" size={20} />,
    error: <AlertCircle className="text-red-500 dark:text-red-400" size={20} />,
    info: <AlertCircle className="text-blue-500 dark:text-blue-400" size={20} />,
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${styles[type]}`}>
      <div className="flex items-center space-x-3">
        {icons[type]}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};