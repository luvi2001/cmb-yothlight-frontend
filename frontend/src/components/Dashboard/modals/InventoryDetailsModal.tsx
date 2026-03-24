// src/pages/Dashboard/modals/InventoryDetailsModal.tsx
import React, { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { apiService } from '../../../api/apiService';
import { Inventory } from '../../../types';

interface BorrowRecord {
  id: string;
  borrowDate: string;
  returnDate: string | null;
  expectedReturnDate: string | null;
  status: string;
  notes: string | null;
  borrower: {
    id: string;
    name: string;
    email?: string | null;
    phone?: string | null;
  };
}

interface InventoryDetails {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
  location?: string | null;
  description?: string | null;
  purchaseDate?: string | null;
  purchasePrice?: number | null;
  borrowRecords: BorrowRecord[];
}

interface InventoryDetailsModalProps {
  isOpen: boolean;
  itemId: string | null;
  onClose: () => void;
}

export const InventoryDetailsModal: React.FC<InventoryDetailsModalProps> = ({
  isOpen,
  itemId,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<InventoryDetails | null>(null);
  const [history, setHistory] = useState<BorrowRecord[]>([]);

  useEffect(() => {
    if (!isOpen || !itemId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [inventoryItem, borrowHistory] = await Promise.all([
          apiService.getInventoryItem(itemId),
          apiService.getBorrowHistory(itemId),
        ]);
        setItem(inventoryItem);
        setHistory(borrowHistory);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isOpen, itemId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Inventory Details">
      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {!loading && !item && <p className="text-sm text-gray-500">Item not found.</p>}

      {!loading && item && (
        <div className="space-y-4">
          {/* Basic info */}
          <div>
            <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600">
              Category: <span className="uppercase">{item.category.replace(/_/g, ' ')}</span>
            </p>
            <p className="text-sm text-gray-600">Status: {item.status}</p>
            {item.location && (
              <p className="text-sm text-gray-600">Location: {item.location}</p>
            )}
            {item.purchaseDate && (
              <p className="text-sm text-gray-600">
                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
              </p>
            )}
            {item.purchasePrice != null && (
              <p className="text-sm text-gray-600">
                Purchase Price: Rs. {item.purchasePrice.toLocaleString()}
              </p>
            )}
            {item.description && (
              <p className="text-sm text-gray-600 mt-2">Description: {item.description}</p>
            )}
          </div>

          {/* Current borrow (if any) */}
          {item.borrowRecords && item.borrowRecords[0] && (
            <div className="border-t pt-3">
              <h4 className="text-md font-semibold mb-2">Recent Borrower</h4>
              <p className="text-sm text-gray-600">
                Borrower: {item.borrowRecords[0].borrower?.name || 'Unknown'}
              </p>
              <p className="text-sm text-gray-600">
                Borrowed on:{' '}
                {new Date(item.borrowRecords[0].borrowDate).toLocaleDateString()}
              </p>
              {item.borrowRecords[0].expectedReturnDate && (
                <p className="text-sm text-gray-600">
                  Expected return:{' '}
                  {new Date(
                    item.borrowRecords[0].expectedReturnDate
                  ).toLocaleDateString()}
                </p>
              )}
              {item.borrowRecords[0].notes && (
                <p className="text-sm text-gray-600 mt-1">
                  Notes: {item.borrowRecords[0].notes}
                </p>
              )}
            </div>
          )}

          {/* Borrow history */}
          <div className="border-t pt-3">
            <h4 className="text-md font-semibold mb-2">Borrow History</h4>
            {history.length === 0 && (
              <p className="text-sm text-gray-500">No borrow history for this item.</p>
            )}
            {history.length > 0 && (
              <div className="max-h-64 overflow-auto text-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase">
                      <th className="py-1 pr-2">Borrower</th>
                      <th className="py-1 pr-2">Borrowed</th>
                      <th className="py-1 pr-2">Returned</th>
                      <th className="py-1 pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((record) => (
                      <tr key={record.id} className="border-t">
                        <td className="py-1 pr-2">{record.borrower?.name || 'Unknown'}</td>
                        <td className="py-1 pr-2">
                          {new Date(record.borrowDate).toLocaleDateString()}
                        </td>
                        <td className="py-1 pr-2">
                          {record.returnDate
                            ? new Date(record.returnDate).toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="py-1 pr-2">{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
export default InventoryDetailsModal;