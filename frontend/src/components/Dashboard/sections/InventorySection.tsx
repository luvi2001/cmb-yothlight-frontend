// src/pages/Dashboard/sections/InventorySection.tsx
import React from 'react';
import { Package, Edit, Trash2, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
import { Inventory } from '../../../types';

interface InventorySectionProps {
  inventory: Inventory[];
  onAddInventory: () => void;
  onEditItem: (item: Inventory) => void;
  onDeleteItem: (id: string) => void;
  onBorrowItem: (item: Inventory) => void;
  onReturnItem: (item: Inventory) => void;
  onViewItem: (item: Inventory) => void; // NEW
}

export const InventorySection: React.FC<InventorySectionProps> = ({
  inventory,
  onAddInventory,
  onEditItem,
  onDeleteItem,
  onBorrowItem,
  onReturnItem,
  onViewItem, // NEW
}) => (
  <div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manage Inventory</h3>
      <button
        onClick={onAddInventory}
        className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start"
      >
        <Package size={20} />
        <span>Add Inventory Item</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full min-w-max sm:min-w-0">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Item Name
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Location
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-3 sm:px-6 py-4 text-sm font-medium">{item.name}</td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  {item.category.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">{item.quantity}</td>
              <td className="px-3 sm:px-6 py-4 text-sm text-gray-600">
                {item.location || 'N/A'}
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'AVAILABLE'
                      ? 'bg-green-100 text-green-800'
                      : item.status === 'BORROWED'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-3 sm:px-6 py-4 text-sm">
                <div className="flex flex-wrap gap-2">
                  {/* View details button */}
                  <button
                    onClick={() => onViewItem(item)}
                    className="text-gray-600 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>

                  {item.status === 'AVAILABLE' && (
                    <button
                      onClick={() => onBorrowItem(item)}
                      className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-50 rounded"
                      title="Borrow Item"
                    >
                      <ArrowRight size={18} />
                    </button>
                  )}
                  {item.status === 'BORROWED' && (
                    <button
                      onClick={() => onReturnItem(item)}
                      className="text-green-600 hover:text-green-900 transition-colors p-1 hover:bg-green-50 rounded"
                      title="Return Item"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => onEditItem(item)}
                    className="text-indigo-600 hover:text-indigo-900 transition-colors p-1 hover:bg-indigo-50 rounded"
                    title="Edit Item"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-50 rounded"
                    title="Delete Item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default InventorySection;