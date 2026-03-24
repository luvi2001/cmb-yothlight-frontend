import React from 'react';
import { Calendar, Edit, Trash2, Users, CheckSquare } from 'lucide-react';
import { Event } from '../../../types';

interface EventsSectionProps {
  events: Event[];
  onAddEvent: () => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onMarkAttendance: (event: Event) => void;
  onViewAttendance: (event: Event) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  onMarkAttendance,
  onViewAttendance,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Events & Attendance</h3>
        <button
          onClick={onAddEvent}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Calendar size={20} />
          <span>Create New Event</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Event Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Purpose
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Attendance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{event.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {formatDate(event.date)}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="max-w-xs truncate" title={event.purpose}>
                    {event.purpose}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {event.area}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {event.location || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {event._count?.attendance || 0} marked
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onMarkAttendance(event)}
                    className="text-green-600 hover:text-green-900 mr-3 transition-colors"
                    title="Mark Attendance"
                  >
                    <CheckSquare size={18} />
                  </button>
                  <button
                    onClick={() => onViewAttendance(event)}
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                    title="View Attendance"
                  >
                    <Users size={18} />
                  </button>
                  <button
                    onClick={() => onEditEvent(event)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                    title="Edit Event"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete Event"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsSection;