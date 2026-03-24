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
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons: Record<AlertType, React.ReactNode> = {
    success: <CheckCircle className="text-green-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    info: <AlertCircle className="text-blue-500" size={20} />,
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 flex items-center justify-between ${styles[type]}`}>
      <div className="flex items-center space-x-3">
        {icons[type]}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};