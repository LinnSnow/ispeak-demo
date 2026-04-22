import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [socket, setSocket] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Connect to WebSocket: ws://localhost:8000/ws/dashboard/
    let ws = new WebSocket('ws://localhost:8000/ws/dashboard/');

    ws.onopen = () => {
      console.log('WS Connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Expecting: newReport, sosAlert, checkinPrompt
        if (['newReport', 'sosAlert', 'checkinPrompt'].includes(data.type)) {
          addToast(data);
        }
      } catch (e) {
        console.error('WebSocket message parsing error', e);
      }
    };

    ws.onclose = () => {
      console.log('WS Disconnected');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [isAuthenticated]);

  const addToast = (notification) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, ...notification }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DashboardContext.Provider value={{ toasts, removeToast }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
