// src/pages/Dashboard/modals/UserModals.tsx
import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddUserForm } from '../../../components/forms/AddUserForm';
import { EditUserForm } from '../../../components/forms/EditUserForm';
import { User } from '../../../types';

interface UserModalsProps {
  showAdd: boolean;
  showEdit: boolean;
  selectedUser: User | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onSuccess: (message: string) => void; // calls showAlert + reload in parent
}

export const UserModals: React.FC<UserModalsProps> = ({
  showAdd,
  showEdit,
  selectedUser,
  onCloseAdd,
  onCloseEdit,
  onSuccess,
}) => (
  <>
    <Modal isOpen={showAdd} onClose={onCloseAdd} title="Add New User">
      <AddUserForm
        onClose={onCloseAdd}
        onSuccess={onSuccess}
      />
    </Modal>

    <Modal isOpen={showEdit} onClose={onCloseEdit} title="Edit User">
      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          onClose={onCloseEdit}
          onSuccess={onSuccess}
        />
      )}
    </Modal>
  </>
);
export default UserModals;