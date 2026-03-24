// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { apiService } from '../api/apiService';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'; // match your API_URL

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await apiService.login(email, password);
      localStorage.setItem('token', response.access_token);
      setAlert({ type: 'success', message: 'Login successful!' });
      setTimeout(() => onLoginSuccess(), 500);
    } catch (error: any) {
      setAlert({ type: 'error', message: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // redirect to NestJS /auth/google (will then redirect back with token)
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-red-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl transform transition-transform duration-300 hover:scale-105">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-900 mb-2 tracking-wide">
            CMB Youthlight
          </h1>
          <p className="text-gray-600 dark:text-gray-900 text-lg">Login Portal</p>
        </div>

        {alert && (
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        )}

        {/* Super admin login */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-900 mb-2">
              Email (Super Admin)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 shadow-sm transition placeholder-gray-500 text-gray-900 dark:text-gray-900"
              placeholder="admin@cmbyouthlight.org"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 shadow-sm transition placeholder-gray-500 text-gray-900 dark:text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-rose-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {loading ? 'Logging in...' : 'Login as Super Admin'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs font-semibold text-gray-400 dark:text-gray-900 uppercase">
            Or sign in with Google
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google login button (redirect-based) */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center space-x-3 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition shadow-sm"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-900">Sign in with Google</span>
          </button>
        </div>

        <div className="mt-6 text-center text-gray-500 dark:text-gray-900 text-sm">
          &copy; {new Date().getFullYear()} CMB Youthlight. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
