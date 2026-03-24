// src/types/index.ts

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  address: string;
  area: string;
  phone: string;
  role: 'SUPER_ADMIN' | 'COORDINATOR' | 'USER';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface Donor {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  area?: string;
  totalAmount: string | number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalUsers: number;
  totalDonors: number;
  totalDonations: string;
  totalInventory: number;
  totalMembers: number;
  totalEvents: number;
  upcomingEvents: number;
  availableInventory?: number;
  borrowedInventory?: number;
  recentDonations?: { donorName: string; amount: number; date: string }[];
  recentBorrows?: { itemName: string; borrowerName: string; borrowDate: string }[];
}


export interface Inventory {
  id: string;
  name: string;
  category: InventoryCategory;
  description?: string;
  quantity: number;
  status: BorrowStatus;
  location?: string;
  purchaseDate?: string;
  purchasePrice?: string | number;
  serialNumber?: string;
  condition?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  borrowRecords?: BorrowRecord[];
}

export interface BorrowRecord {
  id: string;
  borrowDate: string;
  returnDate?: string;
  expectedReturnDate: string;
  status: BorrowStatus;
  notes?: string;
  borrower?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export type InventoryCategory =
  | 'ELECTRONICS'
  | 'FURNITURE'
  | 'BOOKS'
  | 'SPORTS_EQUIPMENT'
  | 'MEDICAL_SUPPLIES'
  | 'STATIONERY'
  | 'OTHER';

export type BorrowStatus = 'AVAILABLE' | 'BORROWED' | 'RETURNED' | 'OVERDUE';



export interface AlertState {
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface Member {
  id: string;
  name: string;
  age: number;
  gender?: string;
  phone?: string;
  email?: string;
  type?: string;
  programType?: string;
  address?: string;
  area: string;
  yearJoined: string;
  dateJoined: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    attendance: number;
  };
  attendance?: EventAttendance[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  purpose: string;
  area: string;
  location?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    attendance: number;
  };
  attendance?: EventAttendance[];
}

export interface EventAttendance {
  id: string;
  attended: boolean;
  notes?: string;
  markedAt: string;
  createdAt: string;
  updatedAt: string;
  event?: {
    id: string;
    name: string;
    date: string;
    purpose: string;
  };
  member?: {
    id: string;
    name: string;
    age: number;
    area: string;
    phone?: string;
    email?: string;
  };
  markedBy?: {
    id: string;
    name: string;
  };
}

export interface EventStats {
  total: number;
  attended: number;
  absent: number;
  attendanceRate: string;
}