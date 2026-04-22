import React from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Recharts Data for 30 Day Severity Profile
const data = [
  { day: '1', severity: 1 }, { day: '5', severity: 2 },
  { day: '10', severity: 4 }, { day: '15', severity: 3 },
  { day: '20', severity: 5 }, { day: '25', severity: 2 },
  { day: '30', severity: 1 },
];

const mockReports = [
  { id: 101, timestamp: '2026-04-21T09:30:00Z', bodyPart: 'Chest', severity: 4, painType: 'Sharp', note: 'Patient exhibits elevated heart rate.' },
  { id: 102, timestamp: '2026-04-20T14:15:00Z', bodyPart: 'Chest', severity: 2, painType: 'Pressure', note: 'Routine check, subsiding pain.' },
  { id: 103, timestamp: '2026-04-19T08:00:00Z', bodyPart: 'Head', severity: 1, painType: 'Throbbing', note: 'Mild headache.' }
];

export default function PatientDetail() {
  const { id } = useParams();

  // Mock patient finding
  const patient = { id, name: "Ananya Sharma", roomNumber: "ICU-4", DOB: "1990-05-12", diagnosis: "Post-op Recovery" };

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Patient Details</h1>
      
      <div style={{
        backgroundColor: 'var(--doc-card)',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--doc-border)',
        marginBottom: '24px',
        display: 'flex',
        gap: '40px'
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--doc-text-sec)' }}>Patient Name</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{patient.name}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--doc-text-sec)' }}>Room</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{patient.roomNumber}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--doc-text-sec)' }}>DOB</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{patient.DOB}</div>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--doc-text-sec)' }}>Diagnosis</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{patient.diagnosis}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{
          flex: 2,
          backgroundColor: 'var(--doc-card)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--doc-border)'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Recent Reports History</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--doc-border)', color: 'var(--doc-text-sec)', fontSize: '14px' }}>
                <th style={{ padding: '12px' }}>Time</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Severity</th>
                <th style={{ padding: '12px' }}>Type</th>
                <th style={{ padding: '12px' }}>Clinical Note</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.map(report => (
                <tr key={report.id} style={{ borderBottom: '1px solid #f0f4f2' }}>
                  <td style={{ padding: '16px 12px' }}>{new Date(report.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</td>
                  <td style={{ padding: '16px 12px', fontWeight: '500' }}>{report.bodyPart}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      backgroundColor: report.severity >= 4 ? 'var(--doc-alert-red)' : report.severity >= 3 ? 'var(--doc-alert-amber)' : 'var(--doc-alert-green)',
                      color: '#FFF', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' 
                    }}>
                      {report.severity}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>{report.painType}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--doc-text-sec)' }}>{report.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          flex: 1,
          backgroundColor: 'var(--doc-card)',
          padding: '24px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--doc-border)',
          minWidth: '350px'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Severity Trend (30 Days) - Chest</h2>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--doc-border)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="severity" stroke="var(--doc-primary)" strokeWidth={3} dot={{ fill: 'var(--doc-primary)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
