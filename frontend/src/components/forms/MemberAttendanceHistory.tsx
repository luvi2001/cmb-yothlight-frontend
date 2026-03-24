import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/apiService';

export const MemberAttendanceHistory = ({ memberId }: any) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    apiService.getMemberAttendanceHistory(memberId).then(setHistory);
  }, [memberId]);

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Event</th>
          <th>Date</th>
          <th>Purpose</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {history.map(h => (
          <tr key={h.id}>
            <td>{h.eventName}</td>
            <td>{h.date}</td>
            <td>{h.purpose}</td>
            <td>{h.present ? 'Attended' : 'Absent'}</td>
            <td>{h.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
