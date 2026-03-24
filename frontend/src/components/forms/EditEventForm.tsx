import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert } from '../Alert';
import { apiService } from '../../api/apiService';

interface EditEventFormProps {
  event: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({
  event,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Convert ISO date -> datetime-local format (YYYY-MM-DDTHH:mm)
  const formatDateTimeLocal = (value: string) => {
    if (!value) return '';
    const d = new Date(value);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  };

  const [formData, setFormData] = useState({
    name: event.name || '',
    date: formatDateTimeLocal(event.date), // ✅ correct field
    purpose: event.purpose || '',
    area: event.area || '',
    location: event.location || '',
    description: event.description || '',
    isActive: event.isActive ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiService.updateEvent(event.id, {
        ...formData,
        date: new Date(formData.date).toISOString(), // ✅ convert back to ISO
      });

      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Event Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Event Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Date & Area */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date & Time *
          </label>
          <input
            type="datetime-local"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Area *
          </label>
          <input
            type="text"
            name="area"
            required
            value={formData.area}
            onChange={handleChange}
            placeholder="e.g., Colombo"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Purpose */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Purpose *
        </label>
        <textarea
          name="purpose"
          required
          value={formData.purpose}
          onChange={handleChange}
          rows={3}
          placeholder="Explain the purpose..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., Church Hall"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Additional details..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Active Toggle */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Event Status</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Disable event if it's cancelled or completed.
          </p>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-5 h-5 accent-teal-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Event'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
