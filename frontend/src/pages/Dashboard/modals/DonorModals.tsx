// src/pages/Dashboard/modals/DonorModals.tsx
import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddDonorForm } from '../../../components/forms/AddDonorForm';
import { EditDonorForm } from '../../../components/forms/EditDonorForm';
import { AddDonationForm } from '../../../components/forms/AddDonationForm';
import { Donor } from '../../../types';

interface DonorModalsProps {
  showAddDonor: boolean;
  showEditDonor: boolean;
  showAddDonation: boolean;
  selectedDonor: Donor | null;
  onCloseAddDonor: () => void;
  onCloseEditDonor: () => void;
  onCloseAddDonation: () => void;
  onSuccess: (message: string) => void; // parent will showAlert + reload
}

export const DonorModals: React.FC<DonorModalsProps> = ({
  showAddDonor,
  showEditDonor,
  showAddDonation,
  selectedDonor,
  onCloseAddDonor,
  onCloseEditDonor,
  onCloseAddDonation,
  onSuccess,
}) => (
  <>
    <Modal isOpen={showAddDonor} onClose={onCloseAddDonor} title="Add New Donor">
      <AddDonorForm
        onClose={onCloseAddDonor}
        onSuccess={() => onSuccess('Donor created successfully!')}
      />
    </Modal>

    <Modal isOpen={showEditDonor} onClose={onCloseEditDonor} title="Edit Donor">
      {selectedDonor && (
        <EditDonorForm
          donor={selectedDonor}
          onClose={onCloseEditDonor}
          onSuccess={() => onSuccess('Donor updated successfully!')}
        />
      )}
    </Modal>

    <Modal isOpen={showAddDonation} onClose={onCloseAddDonation} title="Add Donation">
      {selectedDonor && (
        <AddDonationForm
          donorId={selectedDonor.id}
          donorName={selectedDonor.name}
          onClose={onCloseAddDonation}
          onSuccess={() => onSuccess('Donation added successfully!')}
        />
      )}
    </Modal>
  </>
);

export default DonorModals;