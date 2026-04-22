import { useEffect, useRef, useState } from 'react';
import apiClient from '../../apiClient';

export const CALIBRATION_POINTS = [
  { x: 0.1,  y: 0.1  },  // top-left
  { x: 0.9,  y: 0.1  },  // top-right
  { x: 0.5,  y: 0.5  },  // center
  { x: 0.1,  y: 0.9  },  // bottom-left
  { x: 0.9,  y: 0.9  },  // bottom-right
];

export function useCalibration(patientId) {
  const [currentDot, setCurrentDot] = useState(0);   
  const [isComplete, setIsComplete] = useState(false);
  const collectedPoints = useRef([]);

  const recordPoint = async (gazeX, gazeY, screenX, screenY) => {
    collectedPoints.current.push({ gazeX, gazeY, screenX, screenY });

    try {
      // POST point to backend (API specified in document)
      await apiClient.post('/api/calibration/', {
        patientId, gazeX, gazeY, screenX, screenY,
        sessionId: Date.now().toString()
      });
    } catch (e) {
      console.warn("Backend unavailable, calibration stored locally");
      // Store locally so it works without the physical backend
      const existing = JSON.parse(localStorage.getItem(`ispeak_calibration_${patientId}`) || '[]');
      existing.push({ gazeX, gazeY, screenX, screenY });
      localStorage.setItem(`ispeak_calibration_${patientId}`, JSON.stringify(existing));
    }

    if (currentDot < 4) {
      setCurrentDot(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  return { currentDot, isComplete, recordPoint, CALIBRATION_POINTS };
}
