import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import ToastMessage from './components/ToastMessage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
        <ToastMessage />
      </CartProvider>
    </ToastProvider>
  </StrictMode>,
)
