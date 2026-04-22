import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ProgressIndicator() {
  const location = useLocation();
  const path = location.pathname;
  
  let step = 1;
  if (path.includes('body-part')) step = 2;
  if (path.includes('severity')) step = 3;
  if (path.includes('pain-type')) step = 4;
  if (path.includes('confirm')) return null;

  return (
    <div style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--patient-primary)' }}>
        Step {step} of 4
      </div>
    </div>
  );
}
