import React, { useEffect, useMemo, useState } from 'react';
import { apiService } from '../../api/apiService';
import { Loader2, Search } from 'lucide-react';
import { Alert } from '../Alert';

export const MarkAttendanceForm = ({ event, onSuccess }: any) => {
  const [members, setMembers] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any>({});
  const [search, setSearch] = useState('');
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMembers(true);
        setError('');
        
        // Fetch members for the area
        const membersData = await apiService.getMembersByArea(event.area);
        setMembers(membersData);
        
        // Fetch existing attendance records for this event
        const existingAttendance = await apiService.getEventAttendance(event.id);
        
        // Pre-populate attendance state with existing records
        const attendanceMap: any = {};
        existingAttendance.forEach((record: any) => {
          attendanceMap[record.memberId] = {
            present: record.attended,
            notes: record.notes || '',
          };
        });
        setAttendance(attendanceMap);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchData();
  }, [event.area, event.id]);

  const toggle = (id: string, present: boolean) => {
    setAttendance((prev: any) => ({
      ...prev,
      [id]: { present, notes: prev[id]?.notes || '' },
    }));
  };

  const handleNoteChange = (id: string, note: string) => {
    setAttendance((prev: any) => ({
      ...prev,
      [id]: { present: prev[id]?.present || false, notes: note },
    }));
  };

  const filteredMembers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;

    return members.filter((m) => m.name?.toLowerCase().includes(q));
  }, [members, search]);

  const submit = async () => {
    try {
      setSubmitting(true);
      setError('');

      const records = Object.entries(attendance).map(([memberId, value]: any) => ({
        memberId,
        attended: value.present,
        notes: value.notes || '',
      }));

      await apiService.bulkMarkAttendance(event.id, { attendance: records });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit attendance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
        <p className="text-sm text-gray-500">
          Area: <span className="font-medium text-gray-700">{event.area}</span>
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member by name..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Member list */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {loadingMembers ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" size={18} />
            Loading members...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No members found.
          </div>
        ) : (
          filteredMembers.map((m) => {
            const checked = attendance[m.id]?.present || false;

            return (
              <div
                key={m.id}
                className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => toggle(m.id, e.target.checked)}
                      className="w-5 h-5 accent-teal-600"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{m.name}</p>
                      {m.phone && <p className="text-xs text-gray-500">{m.phone}</p>}
                    </div>
                  </label>

                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      checked
                        ? 'bg-teal-100 text-teal-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {checked ? 'Present' : 'Absent'}
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={attendance[m.id]?.notes || ''}
                  onChange={(e) => handleNoteChange(m.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        disabled={submitting}
        className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center"
      >
        {submitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Attendance'}
      </button>
    </div>
  );
};
