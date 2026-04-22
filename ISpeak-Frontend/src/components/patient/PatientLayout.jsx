import React from 'react';
import { Outlet } from 'react-router-dom';
import SOSButton from './SOSButton';
import ProgressIndicator from './ProgressIndicator';

export default function PatientLayout() {
  return (
    <div className="patient-layout" style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <ProgressIndicator />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px 40px 20px' }}>
        <Outlet />
      </div>
      <SOSButton />
    </div>
  );
}
