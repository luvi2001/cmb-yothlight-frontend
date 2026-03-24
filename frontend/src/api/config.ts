const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_URL = API_BASE.replace(/\/$/, '');

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleApiError = (error: any): string => {
  if (error.response) {
    return error.response.data?.message || 'Request failed';
  }
  return error.message || 'An unexpected error occurred';
};