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
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">Manage Inventory</h3>
      <button
        onClick={onAddInventory}
        className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
      >
        <Package size={20} />
        <span>Add Inventory Item</span>
      </button>
    </div>

    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  {item.category.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {item.location || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
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
              <td className="px-6 py-4 whitespace-nowrap">
                {/* View details button */}
                <button
                  onClick={() => onViewItem(item)}
                  className="text-gray-600 hover:text-gray-900 mr-3 transition-colors"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>

                {item.status === 'AVAILABLE' && (
                  <button
                    onClick={() => onBorrowItem(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                    title="Borrow Item"
                  >
                    <ArrowRight size={18} />
                  </button>
                )}
                {item.status === 'BORROWED' && (
                  <button
                    onClick={() => onReturnItem(item)}
                    className="text-green-600 hover:text-green-900 mr-3 transition-colors"
                    title="Return Item"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <button
                  onClick={() => onEditItem(item)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                  title="Edit Item"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                  title="Delete Item"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default InventorySection;