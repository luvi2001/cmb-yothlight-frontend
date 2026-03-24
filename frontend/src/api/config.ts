// For browser requests, use the local proxy to avoid CORS issues
// For server-side, use the actual backend URL
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser - use local proxy
    return '/api/proxy';
  }
  // Server-side - use backend URL directly
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

const API_BASE = getApiUrl();
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