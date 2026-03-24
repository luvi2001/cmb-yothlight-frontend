// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      {/* Clickable backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-white/20 dark:border-gray-700/50">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-gray-700">
          {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors text-xl leading-none"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 max-h-[70vh] overflow-y-auto text-gray-900 dark:text-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};
