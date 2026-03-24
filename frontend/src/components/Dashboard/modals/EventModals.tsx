import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddEventForm } from '../../../components/forms/AddEventForm';
import { EditEventForm } from '../../../components/forms/EditEventForm';
import { MarkAttendanceForm } from '../../../components/forms/MarkAttendanceForm';
import { ViewAttendanceModal } from '../../../components/forms/ViewAttendanceModal';
import { Event } from '../../../types';

interface EventModalsProps {
  showAdd: boolean;
  showEdit: boolean;
  showMarkAttendance: boolean;
  showViewAttendance: boolean;
  selectedEvent: Event | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseMarkAttendance: () => void;
  onCloseViewAttendance: () => void;
  onSuccess: (message: string) => void;
}

export const EventModals: React.FC<EventModalsProps> = ({
  showAdd,
  showEdit,
  showMarkAttendance,
  showViewAttendance,
  selectedEvent,
  onCloseAdd,
  onCloseEdit,
  onCloseMarkAttendance,
  onCloseViewAttendance,
  onSuccess,
}) => {
  return (
    <>
      <Modal isOpen={showAdd} onClose={onCloseAdd} title="Create New Event">
        <AddEventForm
          onClose={onCloseAdd}
          onSuccess={() => {
            onSuccess('Event created successfully!');
            onCloseAdd();
          }}
        />
      </Modal>

      <Modal isOpen={showEdit} onClose={onCloseEdit} title="Edit Event">
        {selectedEvent && (
          <EditEventForm
            event={selectedEvent}
            onClose={onCloseEdit}
            onSuccess={() => {
              onSuccess('Event updated successfully!');
              onCloseEdit();
            }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showMarkAttendance}
        onClose={onCloseMarkAttendance}
        title="Mark Attendance"
      >
        {selectedEvent && (
          <MarkAttendanceForm
            event={selectedEvent}
            onClose={onCloseMarkAttendance}
            onSuccess={() => {
              onSuccess('Attendance marked successfully!');
              onCloseMarkAttendance();
            }}
          />
        )}
      </Modal>

      <Modal
        isOpen={showViewAttendance}
        onClose={onCloseViewAttendance}
        title="View Attendance"
      >
        {selectedEvent && (
          <ViewAttendanceModal event={selectedEvent} onClose={onCloseViewAttendance} />
        )}
      </Modal>
    </>
  );
};

export default EventModals;