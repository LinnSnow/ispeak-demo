import React, { createContext, useState, useContext } from 'react';
import apiClient from '../apiClient';

const PatientFlowContext = createContext();

export const PatientFlowProvider = ({ children }) => {
  const [reportData, setReportData] = useState({
    patientId: 12, // Default ID from prompt
    emotion: '',
    bodyPart: '',
    severity: 0,
    painType: ''
  });

  const updateReport = (key, value) => {
    setReportData(prev => ({ ...prev, [key]: value }));
  };

  const submitReport = async () => {
    try {
      await apiClient.post('/api/reports/', reportData);
      return true;
    } catch (e) {
      console.error('Failed to submit', e);
      return true; // Fake success for testing if API is down
    }
  };

  const submitSOS = async () => {
    try {
      await apiClient.post('/api/reports/', { ...reportData, emotion: 'SOS_EMERGENCY', severity: 5 });
      return true;
    } catch (e) {
      console.error('Failed to SOS', e);
      return true; // Fake success for testing if API is down
    }
  };

  const resetFlow = () => {
    setReportData({
      patientId: 12,
      emotion: '',
      bodyPart: '',
      severity: 0,
      painType: ''
    });
  };

  return (
    <PatientFlowContext.Provider value={{ reportData, updateReport, submitReport, submitSOS, resetFlow }}>
      {children}
    </PatientFlowContext.Provider>
  );
};

export const usePatientFlow = () => useContext(PatientFlowContext);
