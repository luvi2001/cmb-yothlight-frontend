import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../layouts/AdminLayout';
import { DashboardSidebar, DashboardTab } from './DashboardSidebar';
import { Alert } from '../../components/Alert';
import { Modal } from '../../components/Modal';
import { AddMemberForm } from '../../components/forms/AddMemberForm';
import { EditMemberForm } from '../../components/forms/EditMemberForm';
import { UsersSection } from './sections/UsersSection';
import { DonorsSection } from './sections/DonorsSection';
import { InventorySection } from './sections/InventorySection';
import { MembersSection } from './sections/MembersSection';
import { NewMembersSection } from './sections/NewMembersSection';
import { EventsSection } from './sections/EventsSection';
import { DashboardOverview } from './sections/DashboardOverview';
import { UserModals } from './modals/UserModals';
import { DonorModals } from './modals/DonorModals';
import { InventoryModals } from './modals/InventoryModals';
import { MemberModals } from './modals/MemberModals';
import { EventModals } from './modals/EventModals';
import { InventoryDetailsModal } from './modals/InventoryDetailsModal';
import { apiService } from '../../api/apiService';
import { User, Donor, Inventory, Member, Event, Stats, AlertState } from '../../types';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [alert, setAlert] = useState<AlertState | null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMembers, setNewMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDonors: 0,
    totalDonations: '0',
    totalInventory: 0,
    availableInventory: 0,
    borrowedInventory: 0,
    totalMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    recentDonations: [],
    recentBorrows: [],
  });

  // User modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Donor modals
  const [showAddDonorModal, setShowAddDonorModal] = useState(false);
  const [showEditDonorModal, setShowEditDonorModal] = useState(false);
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  // Inventory modals
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [showEditInventoryModal, setShowEditInventoryModal] = useState(false);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsItemId, setDetailsItemId] = useState<string | null>(null);

  // Member modals
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showMemberHistoryModal, setShowMemberHistoryModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // New Member modals
  const [showAddNewMemberModal, setShowAddNewMemberModal] = useState(false);
  const [showEditNewMemberModal, setShowEditNewMemberModal] = useState(false);
  const [selectedNewMember, setSelectedNewMember] = useState<Member | null>(null);

  // Event modals
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showMarkAttendanceModal, setShowMarkAttendanceModal] = useState(false);
  const [showViewAttendanceModal, setShowViewAttendanceModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const showAlert = (type: AlertState['type'], message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const loadDashboardData = async () => {
    try {
      // Users
      if (activeTab === 'dashboard' || activeTab === 'users') {
        const usersData = await apiService.getUsers();
        setUsers(usersData);
        setStats((prev) => ({ ...prev, totalUsers: usersData.length }));
      }

      // Donors
      if (activeTab === 'dashboard' || activeTab === 'donors') {
        const donorsData = await apiService.getDonors();
        const donorStats = await apiService.getDonorStats();
        setDonors(donorsData);
        setStats((prev) => ({
          ...prev,
          totalDonors: donorStats.totalDonors,
          totalDonations: `Rs. ${(donorStats.totalAmount / 1000000).toFixed(1)}M`,
          recentDonations: donorStats.recentDonations || [],
        }));
      }

      // Inventory
      if (activeTab === 'dashboard' || activeTab === 'inventory') {
        const inventoryData = await apiService.getInventory();
        const inventoryStats = await apiService.getInventoryStats();
        setInventory(inventoryData);

        const recentBorrows =
          inventoryStats.recentBorrows?.map((b: any) => ({
            itemName: b.inventory?.name ?? 'Unknown',
            borrowerName: b.borrower?.name ?? 'Unknown',
            borrowDate: b.borrowDate,
          })) ?? [];

        setStats((prev) => ({
          ...prev,
          totalInventory: inventoryStats.total,
          availableInventory: inventoryStats.available,
          borrowedInventory: inventoryStats.borrowed,
          recentBorrows,
        }));
      }

      // Members
      if (activeTab === 'dashboard' || activeTab === 'members') {
        const membersData = await apiService.getMembers();
        setMembers(membersData);
        setStats((prev) => ({ ...prev, totalMembers: membersData.length }));
      }

      // New Members
      if (activeTab === 'dashboard' || activeTab === 'new-members') {
        const newMembersData = await apiService.getNewMembers();
        setNewMembers(newMembersData);
      }

      // Events
      if (activeTab === 'dashboard' || activeTab === 'events') {
        const eventsData = await apiService.getEvents();
        const upcomingEvents = await apiService.getUpcomingEvents();
        setEvents(eventsData);
        setStats((prev) => ({
          ...prev,
          totalEvents: eventsData.length,
          upcomingEvents: upcomingEvents.length,
        }));
      }
    } catch (error: any) {
      showAlert('error', 'Failed to load data: ' + error.message);
    }
  };

  // User handlers
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

  // Donor handlers
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

  // Inventory handlers
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

  const handleViewInventory = (item: Inventory) => {
    setDetailsItemId(item.id);
    setShowDetailsModal(true);
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

  // Member handlers
  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowEditMemberModal(true);
  };

  const handleViewMemberHistory = (member: Member) => {
    setSelectedMember(member);
    setShowMemberHistoryModal(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await apiService.deleteMember(id);
      showAlert('success', 'Member deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  // New Member handlers
  const handleEditNewMember = (member: Member) => {
    setSelectedNewMember(member);
    setShowEditNewMemberModal(true);
  };

  const handleDeleteNewMember = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this new member?')) return;
    try {
      await apiService.deleteNewMember(id);
      showAlert('success', 'New member deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  // Event handlers
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEditEventModal(true);
  };

  const handleMarkAttendance = (event: Event) => {
    setSelectedEvent(event);
    setShowMarkAttendanceModal(true);
  };

  const handleViewAttendance = (event: Event) => {
    setSelectedEvent(event);
    setShowViewAttendanceModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await apiService.deleteEvent(id);
      showAlert('success', 'Event deleted successfully');
      loadDashboardData();
    } catch (error: any) {
      showAlert('error', error.message);
    }
  };

  return (
    <>
      <AdminLayout
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        onLogout={onLogout}
        sidebar={<DashboardSidebar activeTab={activeTab} onChangeTab={setActiveTab} />}
      >
        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            stats={stats}
            onAddUser={() => setShowAddUserModal(true)}
            onAddDonor={() => setShowAddDonorModal(true)}
            onAddInventory={() => setShowAddInventoryModal(true)}
            onAddMember={() => setShowAddMemberModal(true)}
            onAddEvent={() => setShowAddEventModal(true)}
          />
        )}

        {activeTab === 'users' && (
          <UsersSection
            users={users}
            onAddUser={() => setShowAddUserModal(true)}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        )}

        {activeTab === 'donors' && (
          <DonorsSection
            donors={donors}
            onAddDonor={() => setShowAddDonorModal(true)}
            onEditDonor={handleEditDonor}
            onDeleteDonor={handleDeleteDonor}
            onAddDonation={handleAddDonation}
          />
        )}

        {activeTab === 'inventory' && (
          <InventorySection
            inventory={inventory}
            onAddInventory={() => setShowAddInventoryModal(true)}
            onEditItem={handleEditInventory}
            onDeleteItem={handleDeleteInventory}
            onBorrowItem={handleBorrowItem}
            onReturnItem={handleReturnItem}
            onViewItem={handleViewInventory}
          />
        )}

        {activeTab === 'members' && (
          <MembersSection
            members={members}
            onAddMember={() => setShowAddMemberModal(true)}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
            onViewHistory={handleViewMemberHistory}
          />
        )}

        {activeTab === 'new-members' && (
          <NewMembersSection
            newMembers={newMembers}
            onAddMember={() => setShowAddNewMemberModal(true)}
            onEditMember={handleEditNewMember}
            onDeleteMember={handleDeleteNewMember}
          />
        )}

        {activeTab === 'events' && (
          <EventsSection
            events={events}
            onAddEvent={() => setShowAddEventModal(true)}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            onMarkAttendance={handleMarkAttendance}
            onViewAttendance={handleViewAttendance}
          />
        )}
      </AdminLayout>

      {/* User modals */}
      <UserModals
        showAdd={showAddUserModal}
        showEdit={showEditUserModal}
        selectedUser={selectedUser}
        onCloseAdd={() => setShowAddUserModal(false)}
        onCloseEdit={() => setShowEditUserModal(false)}
        onSuccess={(msg) => {
          showAlert('success', msg);
          loadDashboardData();
        }}
      />

      {/* Donor modals */}
      <DonorModals
        showAddDonor={showAddDonorModal}
        showEditDonor={showEditDonorModal}
        showAddDonation={showAddDonationModal}
        selectedDonor={selectedDonor}
        onCloseAddDonor={() => setShowAddDonorModal(false)}
        onCloseEditDonor={() => setShowEditDonorModal(false)}
        onCloseAddDonation={() => setShowAddDonationModal(false)}
        onSuccess={(msg) => {
          showAlert('success', msg);
          loadDashboardData();
        }}
      />

      {/* Inventory modals */}
      <InventoryModals
        showAdd={showAddInventoryModal}
        showEdit={showEditInventoryModal}
        showBorrow={showBorrowModal}
        showReturn={showReturnModal}
        selectedItem={selectedInventory}
        onCloseAdd={() => setShowAddInventoryModal(false)}
        onCloseEdit={() => setShowEditInventoryModal(false)}
        onCloseBorrow={() => setShowBorrowModal(false)}
        onCloseReturn={() => setShowReturnModal(false)}
        onSuccess={(msg) => {
          showAlert('success', msg);
          loadDashboardData();
        }}
      />

      <InventoryDetailsModal
        isOpen={showDetailsModal}
        itemId={detailsItemId}
        onClose={() => {
          setShowDetailsModal(false);
          setDetailsItemId(null);
        }}
      />

      {/* Member modals */}
      <MemberModals
        showAdd={showAddMemberModal}
        showEdit={showEditMemberModal}
        showHistory={showMemberHistoryModal}
        selectedMember={selectedMember}
        onCloseAdd={() => setShowAddMemberModal(false)}
        onCloseEdit={() => setShowEditMemberModal(false)}
        onCloseHistory={() => setShowMemberHistoryModal(false)}
        onSuccess={(msg) => {
          showAlert('success', msg);
          loadDashboardData();
        }}
      />

      {/* New Member modals */}
      <Modal
        isOpen={showAddNewMemberModal}
        onClose={() => setShowAddNewMemberModal(false)}
        title="Add New Member"
      >
        <AddMemberForm
          onClose={() => setShowAddNewMemberModal(false)}
          onSuccess={() => {
            showAlert('success', 'New Member created successfully!');
            setShowAddNewMemberModal(false);
            loadDashboardData();
          }}
        />
      </Modal>

      <Modal
        isOpen={showEditNewMemberModal}
        onClose={() => setShowEditNewMemberModal(false)}
        title="Edit New Member"
      >
        {selectedNewMember && (
          <EditMemberForm
            member={selectedNewMember}
            onClose={() => setShowEditNewMemberModal(false)}
            onSuccess={() => {
              showAlert('success', 'New Member updated successfully!');
              setShowEditNewMemberModal(false);
              loadDashboardData();
            }}
          />
        )}
      </Modal>

      {/* Event modals */}
      <EventModals
        showAdd={showAddEventModal}
        showEdit={showEditEventModal}
        showMarkAttendance={showMarkAttendanceModal}
        showViewAttendance={showViewAttendanceModal}
        selectedEvent={selectedEvent}
        onCloseAdd={() => setShowAddEventModal(false)}
        onCloseEdit={() => setShowEditEventModal(false)}
        onCloseMarkAttendance={() => setShowMarkAttendanceModal(false)}
        onCloseViewAttendance={() => setShowViewAttendanceModal(false)}
        onSuccess={(msg) => {
          showAlert('success', msg);
          loadDashboardData();
        }}
      />
    </>
  );
};