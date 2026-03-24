import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/apiService';

export const MemberAttendanceHistory = ({ memberId }: any) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    apiService.getMemberAttendanceHistory(memberId).then(setHistory);
  }, [memberId]);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Event</th>
          <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Date</th>
          <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Purpose</th>
          <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Status</th>
          <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {history.map(h => (
          <tr key={h.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td className="text-gray-900 dark:text-gray-100 py-2 px-2">{h.eventName}</td>
            <td className="text-gray-900 dark:text-gray-100 py-2 px-2">{h.date}</td>
            <td className="text-gray-700 dark:text-gray-300 py-2 px-2">{h.purpose}</td>
            <td className="py-2 px-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                h.present 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
              }`}>
                {h.present ? 'Attended' : 'Absent'}
              </span>
            </td>
            <td className="text-gray-700 dark:text-gray-300 py-2 px-2">{h.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
