import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddMemberForm } from '../../../components/forms/AddMemberForm';
import { EditMemberForm } from '../../../components/forms/EditMemberForm';
import { MemberAttendanceHistory } from '../../../components/forms/MemberAttendanceHistory';
import { Member } from '../../../types';

interface MemberModalsProps {
  showAdd: boolean;
  showEdit: boolean;
  showHistory: boolean;
  selectedMember: Member | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseHistory: () => void;
  onSuccess: (message: string) => void;
}

export const MemberModals: React.FC<MemberModalsProps> = ({
  showAdd,
  showEdit,
  showHistory,
  selectedMember,
  onCloseAdd,
  onCloseEdit,
  onCloseHistory,
  onSuccess,
}) => {
  return (
    <>
      <Modal isOpen={showAdd} onClose={onCloseAdd} title="Add New Member">
        <AddMemberForm
          onClose={onCloseAdd}
          onSuccess={() => {
            onSuccess('Member created successfully!');
            onCloseAdd();
          }}
        />
      </Modal>

      <Modal isOpen={showEdit} onClose={onCloseEdit} title="Edit Member">
        {selectedMember && (
          <EditMemberForm
            member={selectedMember}
            onClose={onCloseEdit}
            onSuccess={() => {
              onSuccess('Member updated successfully!');
              onCloseEdit();
            }}
          />
        )}
      </Modal>

      <Modal isOpen={showHistory} onClose={onCloseHistory} title="Attendance History">
        {selectedMember && (
          <MemberAttendanceHistory member={selectedMember} onClose={onCloseHistory} />
        )}
      </Modal>
    </>
  );
};

export default MemberModals;