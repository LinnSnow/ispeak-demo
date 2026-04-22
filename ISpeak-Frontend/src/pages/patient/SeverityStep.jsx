import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';

const SEVERITIES = [
  { num: 1, label: 'Mild', color: '#00D4C8' },
  { num: 2, label: 'Mild-Moderate', color: '#66D400' },
  { num: 3, label: 'Moderate', color: '#D4C800' },
  { num: 4, label: 'Moderately Severe', color: '#FF8800' },
  { num: 5, label: 'Severe', color: '#FF4757' }
];

export default function SeverityStep() {
  const navigate = useNavigate();
  const { updateReport } = usePatientFlow();

  const handleSelect = (num) => {
    updateReport('severity', num);
    navigate('/patient/pain-type');
  };

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1200px' }}>
      {SEVERITIES.map(sev => (
        <div 
          key={sev.num}
          onClick={() => handleSelect(sev.num)}
          style={{
            width: '180px',
            height: '240px',
            backgroundColor: 'var(--patient-card)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: `4px solid ${sev.color}`,
            boxShadow: `0 0 15px ${sev.color}88`,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ fontSize: '80px', fontWeight: 'bold', color: sev.color }}>{sev.num}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', padding: '0 10px', color: '#FFF' }}>{sev.label}</div>
        </div>
      ))}
    </div>
  );
}
