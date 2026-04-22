import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';

export default function ToastManager() {
  const { toasts, removeToast } = useDashboard();

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: 9999
    }}>
      {toasts.map(toast => {
        const isSOS = toast.type === 'sosAlert';
        return (
          <div key={toast.id} style={{
            backgroundColor: isSOS ? 'var(--doc-alert-red)' : 'var(--doc-primary)',
            color: '#FFF',
            padding: '16px 24px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            <div>
              <strong>{isSOS ? '🚨 SOS Alert' : 'New Report'}</strong>
              <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.9 }}>
                {toast.message || (isSOS ? `SOS Alert from ${toast.patientName || 'a patient'}` : `New report from ${toast.patientName || 'a patient'}`)}
              </div>
            </div>
            <button 
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', opacity: 0.8 }}
            >
              ✕
            </button>
          </div>
        );
      })}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
