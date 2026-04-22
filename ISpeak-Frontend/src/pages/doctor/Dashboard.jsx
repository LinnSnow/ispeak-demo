import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from '../../components/doctor/StatCard';
import apiClient from '../../apiClient';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients
    const fetchPatients = async () => {
      try {
        const res = await apiClient.get('/api/patients/');
        // Expecting array, but prompt said GET returns a single object payload for some reason.
        // We will mock an array if the real backend isn't ready.
        if (Array.isArray(res.data)) {
          setPatients(res.data);
        } else if (res.data?.id) {
          setPatients([res.data]);
        }
      } catch (e) {
        console.warn('Backend not reachable, using mock patient data');
        setPatients([
          {
            id: 12, name: "Ananya Sharma", roomNumber: "ICU-4",
            lastReportTimestamp: new Date().toISOString(),
            alertStatus: "red", hasUnreadReport: true
          },
          {
            id: 14, name: "Rajesh Kumar", roomNumber: "ICU-2",
            lastReportTimestamp: new Date(Date.now() - 86400000).toISOString(),
            alertStatus: "green", hasUnreadReport: false
          }
        ]);
      }
    };
    fetchPatients();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'red': return 'var(--doc-alert-red)';
      case 'amber': return 'var(--doc-alert-amber)';
      case 'green': return 'var(--doc-alert-green)';
      default: return 'var(--doc-text-sec)';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', color: 'var(--doc-text-main)', marginBottom: '4px' }}>
            Good morning, {user?.name || 'Doctor'}
          </h1>
          <p style={{ color: 'var(--doc-text-sec)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
        <StatCard title="Total Patients" value={patients.length} />
        <StatCard title="Active Alerts" value={patients.filter(p => p.alertStatus === 'red').length} color="var(--doc-alert-red)" />
        <StatCard title="Unread Reports" value={patients.filter(p => p.hasUnreadReport).length} color="var(--doc-alert-amber)" />
        <StatCard title="SOS Today" value="1" color="var(--doc-alert-red)" />
      </div>

      <div style={{ backgroundColor: 'var(--doc-card)', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--doc-border)' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Patient Monitoring</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--doc-border)', color: 'var(--doc-text-sec)', fontSize: '14px' }}>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Room</th>
              <th style={{ padding: '12px' }}>Last Report</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id} style={{ borderBottom: '1px solid #f0f4f2' }}>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: getStatusColor(patient.alertStatus) }}></div>
                </td>
                <td style={{ padding: '16px 12px', fontWeight: '500' }}>{patient.name}</td>
                <td style={{ padding: '16px 12px', color: 'var(--doc-text-sec)' }}>{patient.roomNumber}</td>
                <td style={{ padding: '16px 12px', color: 'var(--doc-text-sec)' }}>{new Date(patient.lastReportTimestamp).toLocaleTimeString()}</td>
                <td style={{ padding: '16px 12px' }}>
                  <button onClick={() => navigate(`/dashboard/patient/${patient.id}`)} style={{
                    backgroundColor: 'var(--doc-primary)', color: '#FFF',
                    padding: '8px 16px', border: 'none', borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', fontSize: '14px'
                  }}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
