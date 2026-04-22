import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';
import BigCardButton from '../../components/patient/BigCardButton';

export default function EmotionStep() {
  const navigate = useNavigate();
  const { updateReport } = usePatientFlow();

  const handleSelect = (emotion) => {
    updateReport('emotion', emotion);
    navigate('/patient/body-part');
  };

  return (
    <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
      <BigCardButton width="300px" height="300px" icon="😊" label="Happy" onClick={() => handleSelect('happy')} />
      <BigCardButton width="300px" height="300px" icon="😐" label="Neutral" onClick={() => handleSelect('neutral')} />
      <BigCardButton width="300px" height="300px" icon="😢" label="Pain" onClick={() => handleSelect('pain')} />
    </div>
  );
}
