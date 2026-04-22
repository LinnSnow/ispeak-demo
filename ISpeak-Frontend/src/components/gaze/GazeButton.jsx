import React, { useRef, useEffect, useState, useContext } from 'react';
import { GazeContext } from '../../contexts/GazeContext';

const DwellRing = ({ progress }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="80" height="80" style={{
      position: 'absolute', top: '50%', left: '50%', 
      transform: 'translate(-50%, -50%) rotate(-90deg)', 
      pointerEvents: 'none', zIndex: 9999
    }}>
      <circle cx="40" cy="40" r={radius} stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="transparent" />
      <circle cx="40" cy="40" r={radius} stroke="#00D4C8" strokeWidth="6" fill="transparent"
        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
        style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
    </svg>
  );
};

export default function GazeButton({ children, dwellTime = 1000, onSelect }) {
  const ref = useRef(null);
  const { gazeX, gazeY } = useContext(GazeContext);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!ref.current || gazeX === null || gazeY === null) return;
    
    const rect = ref.current.getBoundingClientRect();
    const inside = gazeX >= rect.left && gazeX <= rect.right &&
                   gazeY >= rect.top && gazeY <= rect.bottom;

    if (inside) {
      // Simulate hover state onto children optionally? Handled in individual components.
      if (!startRef.current) {
        startRef.current = Date.now();
        timerRef.current = setInterval(() => {
          const elapsed = Date.now() - startRef.current;
          const pct = Math.min((elapsed / dwellTime) * 100, 100);
          setProgress(pct);
          if (pct >= 100) {
            clearInterval(timerRef.current);
            startRef.current = null;
            setProgress(0);
            if (onSelect) onSelect();
          }
        }, 50);
      }
    } else {
      if (startRef.current) {
        clearInterval(timerRef.current);
        startRef.current = null;
        setProgress(0);
      }
    }

    return () => clearInterval(timerRef.current);
  }, [gazeX, gazeY, dwellTime, onSelect]);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {progress > 0 && <DwellRing progress={progress} />}
      {children}
      {/* Fallback to click if they are using a mouse during testing */}
      <div 
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'pointer'}} 
        onClick={onSelect}
      />
    </div>
  );
}
