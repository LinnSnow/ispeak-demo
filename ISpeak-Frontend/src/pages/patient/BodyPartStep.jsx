import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';

export default function BodyPartStep() {
  const navigate = useNavigate();
  const { updateReport, reportData } = usePatientFlow();
  const [hoveredPart, setHoveredPart] = useState(null);

  const handleSelect = (part) => {
    updateReport('bodyPart', part);
    setTimeout(() => {
      navigate('/patient/severity');
    }, 400);
  };

  const getStyle = (partId) => {
    const isSelected = reportData.bodyPart === partId;
    const isHovered = hoveredPart === partId;
    return {
      fill: isSelected ? 'var(--patient-primary)' : (isHovered ? 'var(--patient-hover)' : 'var(--patient-card)'),
      stroke: isSelected ? '#FFF' : 'var(--patient-primary)',
      strokeWidth: isSelected ? 3 : 2,
      opacity: isSelected || isHovered ? 1 : 0.6,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      filter: isSelected || isHovered ? 'drop-shadow(0 0 15px var(--patient-primary))' : 'none',
    };
  };

  const BodyZone = ({ pathElement, id, label, cx, cy }) => (
    <g 
      onClick={() => handleSelect(id)}
      onMouseEnter={() => setHoveredPart(id)}
      onMouseLeave={() => setHoveredPart(null)}
      style={{ cursor: 'pointer' }}
    >
      {React.cloneElement(pathElement, { style: getStyle(id) })}
      
      {(hoveredPart === id || reportData.bodyPart === id) && (
        <text 
          x={cx} y={cy} 
          fill={reportData.bodyPart === id ? '#0A0F2C' : '#FFF'} 
          fontSize="24" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" 
          pointerEvents="none"
        >
          {label}
        </text>
      )}
    </g>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px', textAlign: 'center' }}>Where does it hurt?</h1>
      <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '20px' }}>Select a large body zone</p>
      
      <div style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', minHeight: 0, paddingBottom: '20px' }}>
        <svg viewBox="0 0 400 600" style={{ height: '100%', maxHeight: '75vh', width: 'auto' }}>
          <BodyZone id="head" label="Head" cx={200} cy={70} pathElement={<circle cx="200" cy="70" r="70" />} />
          <BodyZone id="neck" label="Neck" cx={200} cy={160} pathElement={<rect x="135" y="142" width="130" height="40" rx="10" />} />
          <BodyZone id="chest" label="Chest" cx={200} cy={240} pathElement={<rect x="130" y="185" width="140" height="110" rx="20" />} />
          <BodyZone id="stomach" label="Stomach" cx={200} cy={347} pathElement={<rect x="130" y="300" width="140" height="95" rx="20" />} />
          <BodyZone id="left_arm" label="Left Arm" cx={80} cy={285} pathElement={<rect x="35" y="185" width="90" height="210" rx="30" />} />
          <BodyZone id="right_arm" label="Right Arm" cx={320} cy={285} pathElement={<rect x="275" y="185" width="90" height="210" rx="30" />} />
          <BodyZone id="left_leg" label="Left Leg" cx={160} cy={490} pathElement={<rect x="120" y="400" width="75" height="190" rx="25" />} />
          <BodyZone id="right_leg" label="Right Leg" cx={240} cy={490} pathElement={<rect x="205" y="400" width="75" height="190" rx="25" />} />
        </svg>
      </div>
    </div>
  );
}
