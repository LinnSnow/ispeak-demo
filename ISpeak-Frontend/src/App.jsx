import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import { PatientFlowProvider } from './contexts/PatientFlowContext';

// Patient Imports
import PatientLayout from './components/patient/PatientLayout';
import EmotionStep from './pages/patient/EmotionStep';
import BodyPartStep from './pages/patient/BodyPartStep';
import SeverityStep from './pages/patient/SeverityStep';
import PainTypeStep from './pages/patient/PainTypeStep';
import ConfirmStep from './pages/patient/ConfirmStep';

// Doctor Imports
import DoctorLayout from './components/doctor/DoctorLayout';
import Login from './pages/doctor/Login';
import Dashboard from './pages/doctor/Dashboard';
import PatientDetail from './pages/doctor/PatientDetail';

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <PatientFlowProvider>
          <BrowserRouter>
            <Routes>
              {/* Doctor Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DoctorLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="patients" element={<Dashboard />} /> {/* Placeholder */}
                <Route path="patient/:id" element={<PatientDetail />} />
                <Route path="alerts" element={<div>SOS Alerts Here</div>} />
                <Route path="settings" element={<div>Settings Here</div>} />
              </Route>

              {/* Patient Routes */}
              <Route path="/patient" element={<PatientLayout />}>
                <Route index element={<EmotionStep />} />
                <Route path="body-part" element={<BodyPartStep />} />
                <Route path="severity" element={<SeverityStep />} />
                <Route path="pain-type" element={<PainTypeStep />} />
                <Route path="confirm" element={<ConfirmStep />} />
              </Route>
              
              {/* Fallback */}
              <Route path="/" element={<Navigate to="/patient" replace />} />
            </Routes>
          </BrowserRouter>
        </PatientFlowProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
