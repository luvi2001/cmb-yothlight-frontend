// src/components/forms/ViewAttendanceModal.tsx
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { apiService } from '../../api/apiService';
import { exportToExcel, exportToPDF } from '../../utils/exportUtils';

type AttendanceRow = {
  id: string;
  memberId: string;
  attended: boolean;
  notes?: string | null;
  member?: { id: string; name: string } | null;
};

type MemberRow = {
  id: string;
  name: string;
};

type DisplayRow = {
  id: string;
  memberId: string;
  memberName: string;
  attended: boolean;
  notes?: string | null;
};

export const ViewAttendanceModal = ({
  event,
  onClose,
}: {
  event: { id: string; name: string; area?: string };
  onClose?: () => void;
}) => {
  const [rows, setRows] = useState<DisplayRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!event?.id || !event?.area) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const [attendanceData, membersData] = await Promise.all([
          apiService.getEventAttendance(event.id),
          event.area ? apiService.getMembersByArea(event.area) : Promise.resolve([]),
        ]);

        if (cancelled) return;

        const attendanceList: AttendanceRow[] = Array.isArray(attendanceData)
          ? attendanceData
          : [];
        const membersList: MemberRow[] = Array.isArray(membersData) ? membersData : [];

        const attendanceByMemberId = new Map<string, AttendanceRow>();
        for (const item of attendanceList) {
          attendanceByMemberId.set(item.memberId, item);
        }

        const mergedRows: DisplayRow[] = membersList
          .map((member) => {
            const marked = attendanceByMemberId.get(member.id);
            return {
              id: marked?.id ?? member.id,
              memberId: member.id,
              memberName: member.name,
              attended: marked?.attended ?? false,
              notes: marked?.notes ?? '',
            };
          })
          .sort((a, b) => a.memberName.localeCompare(b.memberName));

        setRows(mergedRows);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load attendance');
        setRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [event?.id, event?.area]);

  const total = rows.length;
  const attendedCount = rows.filter((a) => a.attended).length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-3xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{event?.name}</h3>
        <div className="flex gap-2">
          {!loading && !error && rows.length > 0 && (
            <>
              <button
                onClick={() =>
                  exportToExcel({
                    eventName: event?.name || 'Event',
                    area: event?.area,
                    records: rows.map((r) => ({
                      memberName: r.memberName,
                      attended: r.attended,
                      notes: r.notes,
                    })),
                    total: rows.length,
                    attended: rows.filter((a) => a.attended).length,
                    absent: rows.filter((a) => !a.attended).length,
                  })
                }
                className="flex items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white transition"
                title="Download as Excel"
              >
                <Download size={16} />
                Excel
              </button>
              <button
                onClick={() =>
                  exportToPDF({
                    eventName: event?.name || 'Event',
                    area: event?.area,
                    records: rows.map((r) => ({
                      memberName: r.memberName,
                      attended: r.attended,
                      notes: r.notes,
                    })),
                    total: rows.length,
                    attended: rows.filter((a) => a.attended).length,
                    absent: rows.filter((a) => !a.attended).length,
                  })
                }
                className="flex items-center gap-1 px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition"
                title="Download as PDF"
              >
                <Download size={16} />
                PDF
              </button>
            </>
          )}
          {onClose && (
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
              Close
            </button>
          )}
        </div>
      </div>

      {loading && <div className="text-gray-600 dark:text-gray-400">Loading...</div>}
      {!loading && error && <div className="text-red-600 dark:text-red-400">{error}</div>}

      {!loading && !error && (
        <>
          <p className="text-gray-900 dark:text-gray-100">Total: {total}</p>
          <p className="text-gray-900 dark:text-gray-100">Attended: {attendedCount}</p>
          <p className="text-gray-900 dark:text-gray-100">Absent: {total - attendedCount}</p>

          <table className="w-full mt-4">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Member</th>
                <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Status</th>
                <th className="text-left text-gray-700 dark:text-gray-300 font-medium py-2 px-2">Notes</th>
              </tr>
            </thead>

            <tbody>
                {rows.map((a) => (
                  <tr key={a.memberId} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="text-gray-900 dark:text-gray-100 py-2 px-2">{a.memberName}</td>
                  <td className="text-gray-900 dark:text-gray-100 py-2 px-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      a.attended 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {a.attended ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td className="text-gray-700 dark:text-gray-300 py-2 px-2">{a.notes ?? ''}</td>
                </tr>
              ))}

                {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500 dark:text-gray-400">
                    No attendance marked yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
