import React from 'react';
import { usePatientFlow } from '../../contexts/PatientFlowContext';
import { useNavigate } from 'react-router-dom';

export default function SOSButton() {
  const { submitSOS } = usePatientFlow();
  const navigate = useNavigate();

  const handleSOS = async () => {
    await submitSOS();
    navigate('/patient/confirm?sos=true');
  };

  return (
    <button 
      onClick={handleSOS}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '30px',
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        backgroundColor: 'var(--patient-error)',
        color: '#FFF',
        fontSize: '32px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 0 30px rgba(255, 71, 87, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div style={{ fontSize: '32px' }}>🚨</div>
      <div>SOS</div>
    </button>
  );
}
