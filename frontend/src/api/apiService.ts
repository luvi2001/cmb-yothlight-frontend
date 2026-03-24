// src/api/apiService.ts

import { API_URL } from './config';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

class ApiService {
  private async request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async googleLogin(googleUser: { email: string; name: string }) {
    return this.request('/auth/google', {
      method: 'POST',
      body: JSON.stringify(googleUser),
    });
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  // User APIs
  async getUsers() {
    return this.request('/users');
  }

  async createUser(data: any) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: string, data: any) {
    return this.request(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, { method: 'DELETE' });
  }

  async getUsersByRole(role: string) {
    return this.request(`/users/role/${role}`);
  }

  // Donor APIs
  async getDonors() {
    return this.request('/donors');
  }

  async getDonorStats() {
    return this.request('/donors/stats');
  }

  async getDonor(id: string) {
    return this.request(`/donors/${id}`);
  }

  async createDonor(data: any) {
    return this.request('/donors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDonor(id: string, data: any) {
    return this.request(`/donors/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteDonor(id: string) {
    return this.request(`/donors/${id}`, { method: 'DELETE' });
  }

  async addDonation(donorId: string, data: any) {
    return this.request(`/donors/${donorId}/donations`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDonations(donorId: string) {
    return this.request(`/donors/${donorId}/donations`);
  }

  // Inventory APIs
  async getInventory(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request(`/inventory${query}`);
  }

  async getInventoryStats() {
    return this.request('/inventory/stats');
  }

  async getInventoryItem(id: string) {
    return this.request(`/inventory/${id}`);
  }

  async createInventory(data: any) {
    return this.request('/inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInventory(id: string, data: any) {
    return this.request(`/inventory/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteInventory(id: string) {
    return this.request(`/inventory/${id}`, { method: 'DELETE' });
  }

  async borrowItem(id: string, data: any) {
    return this.request(`/inventory/${id}/borrow`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async returnItem(id: string, data: any) {
    return this.request(`/inventory/${id}/return`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBorrowHistory(id: string) {
    return this.request(`/inventory/${id}/history`);
  }

  async getMembers(area?: string) {
    const query = area ? `?area=${area}` : '';
    return this.request(`/members${query}`);
  }

  async getMember(id: string) {
    return this.request(`/members/${id}`);
  }

  async createMember(data: any) {
    return this.request('/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMember(id: string, data: any) {
    return this.request(`/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteMember(id: string) {
    return this.request(`/members/${id}`, { method: 'DELETE' });
  }

  async getMembersByArea(area: string) {
    return this.request(`/members/area/${area}`);
  }

  async getTrainingGroupMembersByArea(area: string) {
    return this.request(`/members/training-group/${area}`);
  }

  async getMemberStats() {
    return this.request('/members/stats');
  }

  // New Members APIs
  async getNewMembers(area?: string) {
    const query = area ? `?area=${area}` : '';
    return this.request(`/new-members${query}`);
  }

  async getNewMember(id: string) {
    return this.request(`/new-members/${id}`);
  }

  async createNewMember(data: any) {
    return this.request('/new-members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNewMember(id: string, data: any) {
    return this.request(`/new-members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteNewMember(id: string) {
    return this.request(`/new-members/${id}`, { method: 'DELETE' });
  }

  async getNewMembersByArea(area: string) {
    return this.request(`/new-members/area/${area}`);
  }

  async getNewMemberStats() {
    return this.request('/new-members/stats');
  }

  // Events APIs
  async getEvents(area?: string) {
    const query = area ? `?area=${area}` : '';
    return this.request(`/events${query}`);
  }

  async getEvent(id: string) {
    return this.request(`/events/${id}`);
  }

  async createEvent(data: any) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(id: string, data: any) {
    return this.request(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(id: string) {
    return this.request(`/events/${id}`, { method: 'DELETE' });
  }

  async getUpcomingEvents() {
    return this.request('/events/upcoming');
  }

  // Attendance APIs
  async markAttendance(eventId: string, data: any) {
    return this.request(`/events/${eventId}/attendance`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async bulkMarkAttendance(eventId: string, data: any) {
    return this.request(`/events/${eventId}/attendance/bulk`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getEventAttendance(eventId: string) {
    return this.request(`/events/${eventId}/attendance`);
  }

  async getEventStats(eventId: string) {
    return this.request(`/events/${eventId}/stats`);
  }

  async getMemberAttendanceHistory(memberId: string) {
    return this.request(`/events/members/${memberId}/attendance-history`);
  }

}



export const apiService = new ApiService();