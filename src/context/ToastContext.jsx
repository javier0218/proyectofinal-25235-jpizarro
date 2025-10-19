import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, ...options };
    setToasts((t) => [...t, toast]);
    if (options.duration !== 0) {
      const duration = options.duration || 3000;
      setTimeout(() => {
        setToasts((t2) => t2.filter(x => x.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const hideToast = useCallback((id) => {
    setToasts((t) => t.filter(x => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastProvider;
