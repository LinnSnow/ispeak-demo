import React, { createContext } from 'react';
import { usePatientFlow } from './PatientFlowContext';
import { useGazeTracker } from '../components/gaze/useGazeTracker';

export const GazeContext = createContext();

export const GazeProvider = ({ children }) => {
  const { reportData } = usePatientFlow();
  // Using patient ID from PatientFlowContext
  const { gazeX, gazeY, isCalibrated, inputMode } = useGazeTracker(reportData.patientId);

  return (
    <GazeContext.Provider value={{ gazeX, gazeY, isCalibrated, inputMode }}>
      {children}
    </GazeContext.Provider>
  );
};
