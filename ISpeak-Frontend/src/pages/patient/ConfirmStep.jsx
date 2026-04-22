import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';

export default function ConfirmStep() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetFlow } = usePatientFlow();
  const isSOS = new URLSearchParams(location.search).get('sos') === 'true';

  useEffect(() => {
    const timer = setTimeout(() => {
      resetFlow();
      navigate('/patient');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ 
        fontSize: '120px', 
        marginBottom: '20px',
        color: isSOS ? 'var(--patient-error)' : 'var(--patient-primary)'
      }}>
        {isSOS ? '🚨' : '✅'}
      </div>
      <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>
        {isSOS ? 'Emergency Alert Sent!' : 'Report Sent'}
      </h1>
      <p style={{ fontSize: '32px', opacity: 0.8 }}>
        Your report has been sent to your doctor. Returning to home in 5 seconds...
      </p>
    </div>
  );
}
