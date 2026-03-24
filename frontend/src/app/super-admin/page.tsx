'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dashboard } from '../../pages/Dashboard/DashboardPage'; // UPDATED PATH

export default function SuperAdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return <Dashboard onLogout={handleLogout} />;
}
