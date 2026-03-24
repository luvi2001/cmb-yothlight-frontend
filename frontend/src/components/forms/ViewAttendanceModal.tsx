// src/components/forms/ViewAttendanceModal.tsx
import React, { useEffect, useState } from 'react';
import { apiService } from '../../api/apiService';

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
          apiService.getMembersByArea(event.area),
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
    <div className="bg-white rounded-lg w-full max-w-3xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{event?.name}</h3>
        {onClose && (
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">
            Close
          </button>
        )}
      </div>

      {loading && <div>Loading...</div>}
      {!loading && error && <div className="text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <p>Total: {total}</p>
          <p>Attended: {attendedCount}</p>
          <p>Absent: {total - attendedCount}</p>

          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="text-left">Member</th>
                <th className="text-left">Status</th>
                <th className="text-left">Notes</th>
              </tr>
            </thead>

            <tbody>
                {rows.map((a) => (
                  <tr key={a.memberId}>
                    <td>{a.memberName}</td>
                  <td>{a.attended ? 'Present' : 'Absent'}</td>
                  <td>{a.notes ?? ''}</td>
                </tr>
              ))}

                {rows.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-500">
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
