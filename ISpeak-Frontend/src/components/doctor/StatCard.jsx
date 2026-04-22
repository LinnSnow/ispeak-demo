import React from 'react';

export default function StatCard({ title, value, subtext, color = 'var(--doc-primary)' }) {
  return (
    <div style={{
      backgroundColor: 'var(--doc-card)',
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-soft)',
      border: '1px solid var(--doc-border)',
      minWidth: '220px',
      flex: 1
    }}>
      <div style={{ color: 'var(--doc-text-sec)', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ color: color, fontSize: '36px', fontWeight: 'bold', marginBottom: '4px' }}>
        {value}
      </div>
      {subtext && (
        <div style={{ color: 'var(--doc-text-sec)', fontSize: '12px' }}>
          {subtext}
        </div>
      )}
    </div>
  );
}
