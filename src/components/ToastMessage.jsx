import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const ToastMessage = () => {
  const { toasts, hideToast } = useToast();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
      {toasts.map(t => (
        <Toast key={t.id} onClose={() => hideToast(t.id)} show>
          <Toast.Header>
            <strong className="me-auto">Notificación</strong>
          </Toast.Header>
          <Toast.Body>{t.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastMessage;
