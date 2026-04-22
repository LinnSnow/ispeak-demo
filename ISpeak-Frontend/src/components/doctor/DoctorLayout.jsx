import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import ToastManager from './ToastManager';

export default function DoctorLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="doctor-layout">
      <Sidebar />
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <Outlet />
      </div>
      <ToastManager />
    </div>
  );
}
