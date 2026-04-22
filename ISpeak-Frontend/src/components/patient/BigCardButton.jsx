export default function BigCardButton({ label, icon, onClick, active, subLabel, width = '200px', height = '200px' }) {
  const baseStyle = {
    width: width,
    height: height,
    backgroundColor: active ? 'var(--patient-primary)' : 'var(--patient-card)',
    color: active ? '#000' : 'var(--patient-text)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: `4px solid ${active ? 'var(--patient-hover)' : 'transparent'}`,
    transition: 'all 0.3s ease',
    boxShadow: active ? '0 0 30px var(--patient-hover)' : 'none',
    margin: '10px',
  };

  return (
    <div 
      style={baseStyle} 
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.boxShadow = '0 0 20px var(--patient-hover)';
        if (!active) e.currentTarget.style.borderColor = 'var(--patient-hover)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.boxShadow = 'none';
        if (!active) e.currentTarget.style.borderColor = 'transparent';
      }}
    >
      {icon && <div style={{ fontSize: '64px', marginBottom: '10px' }}>{icon}</div>}
      {label && <div style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', padding: '0 10px' }}>{label}</div>}
      {subLabel && <div style={{ fontSize: '20px', marginTop: '5px', opacity: 0.8 }}>{subLabel}</div>}
    </div>
  );
}
