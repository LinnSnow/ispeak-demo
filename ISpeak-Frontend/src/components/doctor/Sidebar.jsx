import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, Users, AlertTriangle, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
    color: isActive ? 'var(--doc-primary)' : 'var(--doc-text-sec)',
    backgroundColor: isActive ? 'var(--doc-hover)' : 'transparent',
    fontWeight: isActive ? '600' : '500',
    marginBottom: '8px',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--doc-sidebar)',
      borderRight: '1px solid var(--doc-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--doc-primary)' }}></div>
        <h2 style={{ color: 'var(--doc-primary)', fontWeight: 'bold' }}>ISpeak</h2>
      </div>

      <nav style={{ flex: 1 }}>
        <NavLink to="/dashboard" end style={navLinkStyle}><LayoutDashboard size={20} /> Dashboard</NavLink>
        <NavLink to="/dashboard/patients" style={navLinkStyle}><Users size={20} /> Patients</NavLink>
        <NavLink to="/dashboard/alerts" style={navLinkStyle}><AlertTriangle size={20} /> SOS Alerts</NavLink>
        <NavLink to="/dashboard/settings" style={navLinkStyle}><Settings size={20} /> Settings</NavLink>
      </nav>

      <div style={{ 
        marginTop: 'auto', 
        paddingTop: '20px',
        borderTop: '1px solid var(--doc-border)' 
      }}>
        <div style={{ marginBottom: '16px', color: 'var(--doc-text-main)', fontWeight: '500' }}>
          {user?.name}
        </div>
        <button onClick={logout} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--doc-text-sec)', fontWeight: '500', padding: '8px 0'
        }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
