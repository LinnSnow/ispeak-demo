import { useState, useEffect, useRef } from 'react';
import { GazeModel } from './gazeModel';
import { qualityMonitor } from './qualityMonitor';
import apiClient from '../../apiClient';

export function useGazeTracker(patientId) {
  const [gazeX, setGazeX] = useState(null);
  const [gazeY, setGazeY] = useState(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [inputMode, setInputMode] = useState('gaze'); 
  const model = useRef(new GazeModel());
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load saved calibration points
    const loadCalibration = async () => {
      try {
        const res = await apiClient.get(`/api/calibration/?patient_id=${patientId}`);
        const points = res.data;
        if (points && points.length >= 5) {
          model.current.train(points);
          setIsCalibrated(true);
        }
      } catch (e) {
        // Fallback to local storage if API is mock
        const points = JSON.parse(localStorage.getItem(`ispeak_calibration_${patientId}`) || '[]');
        if (points.length >= 5) {
          model.current.train(points);
          setIsCalibrated(true);
        }
      }
    };
    
    loadCalibration();

    // Boot WebGazer safely for React
    const wg = window.webgazer;
    if (wg) {
      const listener = (data) => {
        if (!data) return;
        const refined = model.current.predict(data.x, data.y);
        setGazeX(refined.x);
        setGazeY(refined.y);

        const quality = qualityMonitor.update(refined.x, refined.y);
        if (quality < 0.6) setInputMode('switchScan');
        else setInputMode('gaze');
      };

      if (!window.__webgazer_started) {
        window.__webgazer_started = true;
        wg.clearData()
          .showPredictionPoints(true)
          .setGazeListener(listener)
          .begin()
          .catch(e => console.warn("WebGazer begin error:", e));
      } else {
        wg.setGazeListener(listener);
        if (typeof wg.resume === 'function') wg.resume();
      }
    }

    return () => {
      // Intentionally avoiding window.webgazer.end() as WebGazer cannot handle rapid unmount/remount loops in React.
      const wg = window.webgazer;
      if (wg && typeof wg.pause === 'function') {
        wg.pause();
      }
    };
  }, [patientId]);

  return { gazeX, gazeY, isCalibrated, inputMode };
}
