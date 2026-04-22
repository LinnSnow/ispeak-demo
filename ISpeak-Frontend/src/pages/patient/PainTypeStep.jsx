import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';
import BigCardButton from '../../components/patient/BigCardButton';

const TYPES = [
  { id: 'sharp', label: 'Sharp' },
  { id: 'burning', label: 'Burning' },
  { id: 'pressure', label: 'Pressure' },
  { id: 'throbbing', label: 'Throbbing' },
  { id: 'numb', label: 'Numb' },
  { id: 'cant_describe', label: "Can't Describe" }
];

export default function PainTypeStep() {
  const navigate = useNavigate();
  const { updateReport, submitReport } = usePatientFlow();

  const handleSelect = async (type) => {
    updateReport('painType', type);
    await submitReport();
    navigate('/patient/confirm');
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gap: '30px',
      maxWidth: '1200px'
    }}>
      {TYPES.map(type => (
        <BigCardButton 
          key={type.id} 
          label={type.label} 
          onClick={() => handleSelect(type.id)} 
        />
      ))}
    </div>
  );
}
