// src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Heart, Package, BarChart3, Menu, X, LogOut, Trash2, Edit, Plus, DollarSign, ArrowLeft, ArrowRight } from 'lucide-react';
import { Modal } from '../components/Modal';
import { Alert } from '../components/Alert';
import { AddUserForm } from '../components/forms/AddUserForm';
import { EditUserForm } from '../components/forms/EditUserForm';
import { AddDonorForm } from '../components/forms/AddDonorForm';
import { EditDonorForm } from '../components/forms/EditDonorForm';
import { AddInventoryForm } from '../components/forms/AddInventoryForm';
import { EditInventoryForm } from '../components/forms/EditInventoryForm';
import { AddDonationForm } from '../components/forms/AddDonationForm';
import { BorrowItemForm } from '../components/forms/BorrowItemForm';
import { ReturnItemForm } from '../components/forms/ReturnItemForm';
import { apiService } from '../api/apiService';
import { User, Donor, Inventory, Stats, AlertState } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [alert, setAlert] = useState<AlertState | null>(null);

  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showAddDonorModal, setShowAddDonorModal] = useState(false);
  const [showEditDonorModal, setShowEditDonorModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);

  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [showEditInventoryModal, setShowEditInventoryModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  // Data states
  const [users, setUsers] = useState<User[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDonors: 0,
    totalDonations: '0',
    totalInventory: 0,
    totalMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      if (activeTab === 'dashboard' || activeTab === 'users') {
        const usersData = await apiService.getUsers();
        setUsers(usersData);
        setStats(prev => ({ ...prev, totalUsers: usersData.length }));
      }

      if (activeTab === 'dashboard' || activeTab === 'donors') {
        const donorsData = await apiService.getDonors();
        const donorStats = await apiService.getDonorStats();
        setDonors(donorsData);
        setStats(prev => ({
          ...prev,
          totalDonors: donorStats.totalDonors,
          totalDonations: `Rs. ${(donorStats.totalAmount / 1000000).toFixed(1)}M`,
        }));
      }

      if (activeTab === 'dashboard' || activeTab === 'inventory') {
        const inventoryData = await apiService.getInventory();
        const inventoryStats = await apiService.getInventoryStats();
        setInventory(inventoryData);
        setStats(prev => ({ ...prev, totalInventory: inventoryStats.total }));
      }
    } catch (error: any) {
      showAlert('error', 'Failed to load data: ' + error.message);
    }
  };

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await apiService.deleteUser(id);
      showAlert('success', 'User deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  const handleEditDonor = (donor: Donor) => {
    setSelectedDonor(donor);
    setShowEditDonorModal(true);
  };

  const handleAddDonation = (donor: Donor) => {
    setSelectedDonor(donor);
    setShowAddDonationModal(true);
  };

  const handleDeleteDonor = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) return;
    
    try {
      await apiService.deleteDonor(id);
      showAlert('success', 'Donor deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  const handleEditInventory = (item: Inventory) => {
    setSelectedInventory(item);
    setShowEditInventoryModal(true);
  };

  const handleBorrowItem = (item: Inventory) => {
    setSelectedInventory(item);
    setShowBorrowModal(true);
  };

  const handleReturnItem = (item: Inventory) => {
    setSelectedInventory(item);
    setShowReturnModal(true);
  };

  const handleDeleteInventory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await apiService.deleteInventory(id);
      showAlert('success', 'Item deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'donors', label: 'Manage Donors', icon: Heart },
    { id: 'inventory', label: 'Manage Inventory', icon: Package },
  ];

  const statsData = [
    { label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { label: 'Active Donors', value: stats.totalDonors, color: 'bg-green-500' },
    { label: 'Total Donations', value: stats.totalDonations, color: 'bg-purple-500' },
    { label: 'Inventory Items', value: stats.totalInventory, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User Modals */}
      <Modal isOpen={showAddUserModal} onClose={() => setShowAddUserModal(false)} title="Add New User">
        <AddUserForm 
          onClose={() => setShowAddUserModal(false)} 
          onSuccess={() => {
            showAlert('success', 'User created successfully!');
            loadDashboardData();
          }} 
        />
      </Modal>

      <Modal isOpen={showEditUserModal} onClose={() => setShowEditUserModal(false)} title="Edit User">
        {selectedUser && (
          <EditUserForm 
            user={selectedUser}
            onClose={() => setShowEditUserModal(false)} 
            onSuccess={() => {
              showAlert('success', 'User updated successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      {/* Donor Modals */}
      <Modal isOpen={showAddDonorModal} onClose={() => setShowAddDonorModal(false)} title="Add New Donor">
        <AddDonorForm 
          onClose={() => setShowAddDonorModal(false)} 
          onSuccess={() => {
            showAlert('success', 'Donor created successfully!');
            loadDashboardData();
          }} 
        />
      </Modal>

      <Modal isOpen={showEditDonorModal} onClose={() => setShowEditDonorModal(false)} title="Edit Donor">
        {selectedDonor && (
          <EditDonorForm 
            donor={selectedDonor}
            onClose={() => setShowEditDonorModal(false)} 
            onSuccess={() => {
              showAlert('success', 'Donor updated successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      <Modal isOpen={showAddDonationModal} onClose={() => setShowAddDonationModal(false)} title="Add Donation">
        {selectedDonor && (
          <AddDonationForm 
            donorId={selectedDonor.id}
            donorName={selectedDonor.name}
            onClose={() => setShowAddDonationModal(false)} 
            onSuccess={() => {
              showAlert('success', 'Donation added successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      {/* Inventory Modals */}
      <Modal isOpen={showAddInventoryModal} onClose={() => setShowAddInventoryModal(false)} title="Add Inventory Item">
        <AddInventoryForm 
          onClose={() => setShowAddInventoryModal(false)} 
          onSuccess={() => {
            showAlert('success', 'Inventory item added successfully!');
            loadDashboardData();
          }} 
        />
      </Modal>

      <Modal isOpen={showEditInventoryModal} onClose={() => setShowEditInventoryModal(false)} title="Edit Inventory Item">
        {selectedInventory && (
          <EditInventoryForm 
            item={selectedInventory}
            onClose={() => setShowEditInventoryModal(false)} 
            onSuccess={() => {
              showAlert('success', 'Item updated successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      <Modal isOpen={showBorrowModal} onClose={() => setShowBorrowModal(false)} title="Borrow Item">
        {selectedInventory && (
          <BorrowItemForm 
            itemId={selectedInventory.id}
            itemName={selectedInventory.name}
            onClose={() => setShowBorrowModal(false)} 
            onSuccess={() => {
              showAlert('success', 'Item borrowed successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      <Modal isOpen={showReturnModal} onClose={() => setShowReturnModal(false)} title="Return Item">
        {selectedInventory && selectedInventory.borrowRecords && selectedInventory.borrowRecords[0] && (
          <ReturnItemForm 
            itemId={selectedInventory.id}
            itemName={selectedInventory.name}
            borrowerName={selectedInventory.borrowRecords[0].borrower?.name || 'Unknown'}
            onClose={() => setShowReturnModal(false)} 
            onSuccess={() => {
              showAlert('success', 'Item returned successfully!');
              loadDashboardData();
            }} 
          />
        )}
      </Modal>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-indigo-900 text-white transition-all duration-300 overflow-hidden`}>
        <div className="p-6 relative h-full">
          <h1 className="text-2xl font-bold mb-8">CMB Youthlight</h1>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-200 hover:bg-indigo-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <button 
              onClick={onLogout} 
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-2xl font-bold text-gray-800">Super Admin Panel</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

          {activeTab === 'dashboard' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Dashboard Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} w-12 h-12 rounded-full opacity-20`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Quick Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => setShowAddUserModal(true)}
                    className="flex items-center space-x-3 p-4 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <UserPlus size={24} />
                    <span className="font-medium">Add New User</span>
                  </button>
                  <button 
                    onClick={() => setShowAddDonorModal(true)}
                    className="flex items-center space-x-3 p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <Heart size={24} />
                    <span className="font-medium">Add New Donor</span>
                  </button>
                  <button 
                    onClick={() => setShowAddInventoryModal(true)}
                    className="flex items-center space-x-3 p-4 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <Package size={24} />
                    <span className="font-medium">Add Inventory Item</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Users</h3>
                <button 
                  onClick={() => setShowAddUserModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <UserPlus size={20} />
                  <span>Add New User</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.area}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
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
          )}

          {activeTab === 'donors' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Donors</h3>
                <button 
                  onClick={() => setShowAddDonorModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Heart size={20} />
                  <span>Add New Donor</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {donors.map((donor) => (
                      <tr key={donor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{donor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.email || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.area || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">
                          Rs. {parseFloat(donor.totalAmount.toString()).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            donor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {donor.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleAddDonation(donor)}
                            className="text-purple-600 hover:text-purple-900 mr-3 transition-colors"
                            title="Add Donation"
                          >
                            <DollarSign size={18} />
                          </button>
                          <button 
                            onClick={() => handleEditDonor(donor)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                            title="Edit Donor"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteDonor(donor.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete Donor"
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
          )}

          {activeTab === 'inventory' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Manage Inventory</h3>
                <button 
                  onClick={() => setShowAddInventoryModal(true)}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.location || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 
                            item.status === 'BORROWED' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.status === 'AVAILABLE' && (
                            <button 
                              onClick={() => handleBorrowItem(item)}
                              className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                              title="Borrow Item"
                            >
                              <ArrowRight size={18} />
                            </button>
                          )}
                          {item.status === 'BORROWED' && (
                            <button 
                              onClick={() => handleReturnItem(item)}
                              className="text-green-600 hover:text-green-900 mr-3 transition-colors"
                              title="Return Item"
                            >
                              <ArrowLeft size={18} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleEditInventory(item)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3 transition-colors"
                            title="Edit Item"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteInventory(item.id)}
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
