import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatientFlow } from '../../contexts/PatientFlowContext';
import { useCalibration } from '../../components/gaze/useCalibration';
import { GazeContext } from '../../contexts/GazeContext';

export default function CalibrationStep() {
  const navigate = useNavigate();
  const { reportData } = usePatientFlow();
  const { gazeX, gazeY, isCalibrated } = useContext(GazeContext);
  const { currentDot, isComplete, recordPoint, CALIBRATION_POINTS } = useCalibration(reportData.patientId);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isCalibrated) {
      navigate('/patient/emotion'); // Skip immediately if already trained
    }
  }, [isCalibrated, navigate]);

  useEffect(() => {
    if (isComplete) {
      navigate('/patient/emotion');
    }
  }, [isComplete, navigate]);

  // Simulating dwell collection on the exact current dot
  useEffect(() => {
    if (gazeX === null || gazeY === null || isComplete) return;

    // Use current point screen coordinates
    const pt = CALIBRATION_POINTS[currentDot];
    const screenX = pt.x * window.innerWidth;
    const screenY = pt.y * window.innerHeight;

    // We do NOT use GazeButton here because GazeButton expects the model to already be trained.
    // Here we collect the RAW gaze points vs actual screen points.
    // If WebGazer predicts roughly in the quadrant, we build progress.
    // Since this is before training, we actually just fire recordPoint after a simple timer 
    // when they hold their gaze anywhere to simulate concentrating on the dot.
    
    // In a real strict implementation, we'd wait for std deviation of gaze to stabilize.
    // For this prototype, auto-advance progress while they sit on the screen.
    const interval = setInterval(() => {
      setProgress(p => {
        if (p + 5 >= 100) {
          clearInterval(interval);
          recordPoint(gazeX, gazeY, screenX, screenY);
          return 0; // reset for next point
        }
        return p + 5;
      });
    }, 100); // 2 second mock dwell
    
    return () => clearInterval(interval);
  }, [gazeX, gazeY, currentDot, isComplete]);

  if (isComplete) return null;

  const currentCoords = CALIBRATION_POINTS[currentDot];
  const dotX = currentCoords.x * window.innerWidth;
  const dotY = currentCoords.y * window.innerHeight;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', zIndex: 100000 }}>
      {/* Instructions */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#FFF', fontSize: '32px', textAlign: 'center' }}>
        Please stare at the red dot to calibrate eye tracking.
      </div>

      {/* The Target Dot */}
      <div style={{
        position: 'absolute',
        top: dotY,
        left: dotX,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'red',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 0 20px red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Progress Fill */}
        <div style={{
          width: `${progress}%`,
          height: `${progress}%`,
          backgroundColor: '#FFF',
          borderRadius: '50%',
          transition: 'all 0.1s linear'
        }} />
      </div>
    </div>
  );
}
