// src/pages/Dashboard/modals/InventoryModals.tsx
import React from 'react';
import { Modal } from '../../../components/Modal';
import { AddInventoryForm } from '../../../components/forms/AddInventoryForm';
import { EditInventoryForm } from '../../../components/forms/EditInventoryForm';
import { BorrowItemForm } from '../../../components/forms/BorrowItemForm';
import { ReturnItemForm } from '../../../components/forms/ReturnItemForm';
import { Inventory } from '../../../types';

interface InventoryModalsProps {
  showAdd: boolean;
  showEdit: boolean;
  showBorrow: boolean;
  showReturn: boolean;
  selectedItem: Inventory | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseBorrow: () => void;
  onCloseReturn: () => void;
  onSuccess: (message: string) => void;
}

export const InventoryModals: React.FC<InventoryModalsProps> = ({
  showAdd,
  showEdit,
  showBorrow,
  showReturn,
  selectedItem,
  onCloseAdd,
  onCloseEdit,
  onCloseBorrow,
  onCloseReturn,
  onSuccess,
}) => (
  <>
    <Modal isOpen={showAdd} onClose={onCloseAdd} title="Add Inventory Item">
      <AddInventoryForm
        onClose={onCloseAdd}
        onSuccess={() => onSuccess('Inventory item added successfully!')}
      />
    </Modal>

    <Modal isOpen={showEdit} onClose={onCloseEdit} title="Edit Inventory Item">
      {selectedItem && (
        <EditInventoryForm
          item={selectedItem}
          onClose={onCloseEdit}
          onSuccess={() => onSuccess('Item updated successfully!')}
        />
      )}
    </Modal>

    <Modal isOpen={showBorrow} onClose={onCloseBorrow} title="Borrow Item">
      {selectedItem && (
        <BorrowItemForm
          itemId={selectedItem.id}
          itemName={selectedItem.name}
          onClose={onCloseBorrow}
          onSuccess={() => onSuccess('Item borrowed successfully!')}
        />
      )}
    </Modal>

    <Modal isOpen={showReturn} onClose={onCloseReturn} title="Return Item">
      {selectedItem &&
        selectedItem.borrowRecords &&
        selectedItem.borrowRecords[0] && (
          <ReturnItemForm
            itemId={selectedItem.id}
            itemName={selectedItem.name}
            borrowerName={
              selectedItem.borrowRecords[0].borrower?.name || 'Unknown'
            }
            onClose={onCloseReturn}
            onSuccess={() => onSuccess('Item returned successfully!')}
          />
        )}
    </Modal>
  </>
);
